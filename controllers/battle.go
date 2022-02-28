package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// POST /battle/create-battle
func CreateBattle(ctx *gin.Context) {

	ctx.JSON(http.StatusOK, gin.H{
		"Code":    http.StatusOK,
		"Success": true,
		"Data":    "battle",
	})
}

// POST /battle/duel
func Duel(ctx *gin.Context) {

	ctx.JSON(http.StatusOK, gin.H{
		"Code":    http.StatusOK,
		"Success": true,
		"Data":    "battle",
	})
}

// POST /battle/booty
func Booty(ctx *gin.Context) {

	ctx.JSON(http.StatusOK, gin.H{
		"Code":    http.StatusOK,
		"Success": true,
		"Data":    "battle",
	})
}
