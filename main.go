package main

import (
	"go/controllers"
	"go/data"
	"go/middleware/auth"
	"go/middleware/header"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	g := gin.New()
	g.Use(gin.Logger())

	data.Migrate()

	// Middlewares
	g.Use(header.Nocache)
	g.Use(header.Secure)

	// 404 Handler
	g.NoRoute(func(c *gin.Context) {
		c.String(http.StatusNotFound, "The incorrect API route.")
	})

	// Setting routes
	general := g.Group("/general")
	{
		general.POST("/signup", controllers.SignUp)
		general.POST("/login", controllers.Login)
		general.GET("/token-login", controllers.TokenLogin)
		general.POST("/reset-password", controllers.ResetPassword)
	}

	user := g.Group("/user")
	user.Use(auth.ValidHandler)
	{
		user.GET("/logout", controllers.LogOut)
		user.POST("/create-character", controllers.CreateCharacter)
		user.GET("/info", controllers.UserInfo)
	}

	character := g.Group("/character")
	character.Use(auth.ValidHandler)
	{
		character.GET("/info", controllers.CharacterInfo)
	}

	battle := g.Group("/battle")
	battle.Use(auth.ValidHandler)
	{
		battle.POST("/create-battle", controllers.CreateBattle)
		battle.POST("/duel", controllers.Duel)
		battle.POST("/booty", controllers.Booty)
	}

	g.Run(":7777")
}
