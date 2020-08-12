package main

import (
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"go.bajescu.com/Moooves/v2/pkg/app"
	"os"
)


func main() {
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})

	state := app.NewState()
	err := state.FromFileSystem()
	if err != nil {
		log.Panic().Msgf("Couldn't read state: %s", err)
	}

	config, err := app.ParseConfig()
	if err != nil {
		log.Panic().Msgf("Couldn't read config: %s", err)
	}

	app.CreateThumbnails(config, state)
	app.ServeHttp()
}
