package header

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func Nocache(c *gin.Context) {
	c.Header("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate, value")
	c.Header("Expires", "Thu, 01 Jan 1970 00:00:00 GMT")
	c.Header("Last-Modified", time.Now().UTC().Format(http.TimeFormat))
	c.Next()
}

func Secure(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
}
