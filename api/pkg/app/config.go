package app

import (
	"gopkg.in/yaml.v2"
	"io/ioutil"
)

type Config struct {
	Moves []Move
}

func ParseConfig() (*Config, error) {
	contents, err := ioutil.ReadFile("config.yaml")
	if err != nil {
		return nil, err
	}

	config := &Config{}
	err = yaml.Unmarshal(contents, &config)
	if err != nil {
		return nil, err
	}

	return config, nil
}