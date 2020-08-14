package app

import (
	"encoding/json"
	"fmt"
	"github.com/rs/zerolog/log"
	"net/http"
	"strconv"
	"strings"
)

type Move struct {
	Title  string `json:"title"`
	Tags []string `json:"tags"`
	Videos []Video `json:"videos"`
}

type Video struct {
	Url   string `json:"url"`
	Start string `json:"start"`
	End   string `json:"end"`
}

var config, _ = ParseConfig()

func ServeHttp() {
	http.HandleFunc("/tags", routeTags)
	http.HandleFunc("/thumbnails/", routeThumbnails)
	http.HandleFunc("/moves", routeMoves)
	http.HandleFunc("/demo", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "demo.html")
	})

	addr := "0.0.0.0:5555"
	log.Info().Msgf("Listening on http://%s", addr)
	log.Panic().Err(http.ListenAndServe(addr, http.HandlerFunc(middleware))).Send()
}

func middleware(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	http.DefaultServeMux.ServeHTTP(w, r)
}


func routeTags(w http.ResponseWriter, _ *http.Request) {
	var tags = map[string]bool{}
	for i := range config.Moves {
		for _, tag := range config.Moves[i].Tags {
			tags[tag] = true
		}
	}

	var flat []string
	for tag := range tags {
		flat = append(flat, tag)
	}

	respondWithJson(w, map[string]interface{}{
		"tags": flat,
	})
}

type ResponseMove struct {
	Move
	Thumbnail string `json:"thumbnail"`
}
func NewResponseMove(id int, move Move) ResponseMove {
	return ResponseMove{
		move,
		fmt.Sprintf("/thumbnails/%d.gif?cache=%s", id, move.getThumbnailSourceHash()),
	}
}
func routeMoves(w http.ResponseWriter, r *http.Request) {
	var responseMoves = []ResponseMove{}
	terms := strings.Split(strings.ToLower(r.URL.Query().Get("search")), " ")
	for i := range config.Moves {
		if r.URL.Query().Get("tag") != "" {
			found := false
			for _, tag := range r.URL.Query()["tag"] {
				for _, moveTag := range config.Moves[i].Tags {
					if moveTag == tag {
						found = true
					}
				}
			}
			if !found {
				continue
			}
		}

		if len(terms) > 0 {
			matches := true
			title := strings.ToLower(config.Moves[i].Title)
			for _, term := range terms {
				if !strings.Contains(title, term) {
					matches = false
				}
			}
			if !matches {
				continue
			}
		}

		// We use i in the URL because all thumbnail links are meant to be temporary anyway
		responseMoves = append(responseMoves, NewResponseMove(i, config.Moves[i]))
	}

	respondWithJson(w, map[string]interface{}{
		"moves": responseMoves,
	})
}

func routeThumbnails(w http.ResponseWriter, r *http.Request) {
	idFromUser := strings.ReplaceAll(r.URL.Path, "/thumbnails/", "")

	id, err := strconv.Atoi(idFromUser[:len(idFromUser)-4])
	if err != nil {
		w.Write([]byte("Couldn't parse id"))
		return
	}


	http.ServeFile(w, r, config.Moves[id].path("gif"))
}

func respondWithJson(w http.ResponseWriter, response map[string]interface{}) {
	jsonResponse, _ := json.Marshal(response)
	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)
}