package app

import (
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
	assert.Equal(t, `{"moves":[{"title":"Some move","tags":["Skye"],"videos":null,"thumbnail":"/thumbnails/0.gif"},{"title":"Similar move","tags":["Felipe"],"videos":null,"thumbnail":"/thumbnails/1.gif"}]}`, rr.Body.String())
}
