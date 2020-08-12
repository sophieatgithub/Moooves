package app

import (
	"github.com/rs/zerolog/log"
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"os"
)

const stateFile = "storage/videos/state.yaml"

type ThumbnailSourceHash string
type State struct {
	Thumbnails map[string]ThumbnailSourceHash
}

func NewState() *State {
	return &State{Thumbnails: map[string]ThumbnailSourceHash{}}
}

func (s *State) FromFileSystem() error {
	if _, err := os.Stat(stateFile); os.IsNotExist(err) {
		log.Info().Msg("State file did not exist.")
		return nil
	}

	contents, err := ioutil.ReadFile(stateFile)
	if err != nil {
		return err
	}

	err = yaml.Unmarshal(contents, s)
	if err != nil {
		return err
	}

	return nil
}

func (s *State) Write() {
	out, err := yaml.Marshal(s)
	if err != nil {
		log.Error().Err(err).Msg("Couldn't encode the state")
	}

	err = ioutil.WriteFile(stateFile, out, 0644)
	if err != nil {
		log.Error().Err(err).Msg("Couldn't write the state")
	}
}