package app

import (
	"encoding/json"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestReturnsEmptyIfNoMovesExist(t *testing.T) {
	config = &Config{[]Move{}}

	req, err := http.NewRequest("GET", "/moves", nil)
	assert.NoError(t, err)

	rr := httptest.NewRecorder()
	http.HandlerFunc(routeMoves).ServeHTTP(rr, req)

	assert.Equal(t, http.StatusOK, rr.Code)
	assert.Equal(t, `{"moves":[]}`, rr.Body.String())
}

func TestReturnsMovesThatMatchTag(t *testing.T) {
	config = &Config{[]Move{
		{Title: "Some move", Tags: []string{"Skye"}},
		{Title: "Similar move", Tags: []string{"Felipe"}},
		{Title: "Non-matching move", Tags: []string{"Remy"}},
	}}

	req, err := http.NewRequest("GET", "/moves?tag=Skye&tag=Felipe", nil)
	assert.NoError(t, err)

	rr := httptest.NewRecorder()
	http.HandlerFunc(routeMoves).ServeHTTP(rr, req)

	assert.Equal(t, http.StatusOK, rr.Code)
	assert.Equal(t, `{"moves":[{"title":"Some move","tags":["Skye"],"videos":null,"thumbnail":"/thumbnails/0.gif?cache=7a5ea366c13c08a93f6bdaf91cbede96f4424dbb8e029cafbda8c2bce4572bfb"},{"title":"Similar move","tags":["Felipe"],"videos":null,"thumbnail":"/thumbnails/1.gif?cache=82ffe87c21e1bb2e7c4fe936e4209d9e402c0d1898c013f753926f13c9e7984e"}]}`, rr.Body.String())
}

func TestSearchesTitleWordByWord(t *testing.T) {
	config = &Config{[]Move{
		{Title: "Some move", Tags: []string{"Skye"}},
		{Title: "Similar move", Tags: []string{"Felipe"}},
		{Title: "Non-matching", Tags: []string{"Remy"}},
	}}

	table := map[string]struct{
		term string
		matches []int
	}{
		"Matches two moves": {"move",[]int{0, 1}},
		"Matches first move": {"mOVe some",[]int{0}},
		"Matches nothing": {"skye the best move in the world",[]int{}},
	}

	for testTitle, props := range table {
		t.Run(testTitle, func(t *testing.T) {
			req, err := http.NewRequest("GET", "/moves?search=" + props.term, nil)
			assert.NoError(t, err)

			rr := httptest.NewRecorder()
			http.HandlerFunc(routeMoves).ServeHTTP(rr, req)

			assert.Equal(t, http.StatusOK, rr.Code)

			matches := map[string][]ResponseMove{}
			matches["moves"] = []ResponseMove{}
			for _, index := range props.matches {
				matches["moves"] = append(matches["moves"], NewResponseMove(index, config.Moves[index]))
			}
			expected, err := json.Marshal(matches)
			assert.NoError(t, err)

			assert.Equal(t, string(expected), rr.Body.String())
		})
	}
}

