package controllers

import (
	"go/data"
	"go/models/dbTable"
	"net/http"

	"github.com/gin-gonic/gin"
)

type CharacterInfoRequestBody struct {
	ID int
}

// POST /character/info
func CharacterInfo(ctx *gin.Context) {
	var requestBody CharacterInfoRequestBody
	var character dbTable.Character

	if ctx.ShouldBindJSON(&requestBody) != nil {
		ctx.AbortWithStatusJSON(http.StatusNotImplemented, gin.H{
			"Code":    http.StatusNotImplemented,
			"Message": "API 參數組成錯誤",
		})
		return
	}

	db := data.ConnectDB()
	defer db.Close()

	db.First(&character, "id = ?", requestBody.ID)

	// 查找 items
	items := []dbTable.PackItem{}
	db.Find(&items, "character_id = ?", character.ID)
	character.PackItems = items

	ctx.JSON(http.StatusOK, gin.H{
		"Code": http.StatusOK,
		"Data": &character,
	})
}
