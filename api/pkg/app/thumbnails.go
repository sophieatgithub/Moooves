package app

import (
	"crypto/sha256"
	"fmt"
	"github.com/pkg/errors"
	"github.com/rs/zerolog/log"
	"os/exec"
	"strings"
)

func (m Move) path(extension string) string {
	return fmt.Sprintf("storage/videos/%s.%s", m.Title, extension)
}

func (m Move) getThumbnailSourceHash() ThumbnailSourceHash {
	h := sha256.New()
	h.Write([]byte(fmt.Sprintf("%v", m.Videos[0])))

	return ThumbnailSourceHash(fmt.Sprintf("%x", h.Sum(nil)))
}

func (m Move) createThumbnail() bool {
	mp4 := m.path("mp4")

	err := m.Videos[0].download(mp4)
	if err != nil {
		log.Error().Err(err).Msg("Error while downloading video")
		return false
	}

	err = convertToGif(mp4, m.path("gif"))
	if err != nil {
		log.Error().Err(err).Send()
		return false
	}

	return true
}

func (v Video) download(output string) error {
	youtubeDlCmd := exec.Command("youtube-dl", "-f", "best", "--get-url", v.Url)
	youtubeDlOutput, err := youtubeDlCmd.CombinedOutput()
	if err != nil {
		return errors.Wrap(err, fmt.Sprintf("couldn't retrieve download url, output %s", youtubeDlOutput))
	}

	downloadCmd := exec.Command(
		"ffmpeg",
		"-ss",
		"00:" + v.Start  + ".00",
		"-to",
		"00:" + v.End + ".00",
		"-i",
		strings.TrimSpace(string(youtubeDlOutput)),
		"-c",
		"copy",
		"-y",
		output,
	)
	downloadOutput, err := downloadCmd.CombinedOutput()
	if err != nil {
		return errors.Wrap(err, fmt.Sprintf("couldn't execute, output %s", downloadOutput))
	}

	log.Info().Str("path", output).Msg("Downloaded video file")

	return nil
}

func convertToGif(source string, dest string) error {
	cmd := exec.Command(
		"ffmpeg",
		"-y",
		"-i",
		source,
		//"-filter_complex",
		//"[0:v] fps=12,scale=256:-1,split [a][b];[a] palettegen [p];[b][p] paletteuse",
		"-vf",
		"scale=256:-1",
		"-r",
		"15",
		dest,
	)
	output, err := cmd.CombinedOutput()
	if err != nil {
		return errors.Wrap(err, fmt.Sprintf("Couldn't convert, dest %s", output))
	}

	return nil
}

func CreateThumbnails(config *Config, state *State) {
	for _, move := range config.Moves {
		if move.getThumbnailSourceHash() == state.Thumbnails[move.Title] {
			continue
		}

		log.Info().Str("move", move.Title).Msg("Config for video changed. Will recreate thumbnail.")
		if move.createThumbnail() {
			state.Thumbnails[move.Title] = move.getThumbnailSourceHash()
			state.Write()
		}
	}
}
