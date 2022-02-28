package controllers

import (
	"go/data"
	"go/models/dbTable"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GET /user/logout
func LogOut(ctx *gin.Context) {
	var user dbTable.User
	var token = ctx.GetHeader("X-Auth-Token")
	db := data.ConnectDB()
	defer db.Close()
	db.First(&user, "token = ?", token).Update("token", "")

	ctx.JSON(http.StatusOK, gin.H{
		"Code": http.StatusOK,
		"Data": "ok",
	})
}

// POST /user/create-character
func CreateCharacter(ctx *gin.Context) {
	var user dbTable.User
	var newCharacter dbTable.Character

	db := data.ConnectDB()
	defer db.Close()

	if ctx.ShouldBindJSON(&newCharacter) != nil {
		ctx.AbortWithStatusJSON(http.StatusNotImplemented, gin.H{
			"Code":    http.StatusNotImplemented,
			"Message": "API 參數組成錯誤",
		})
		return
	}

	err := db.Create(&newCharacter).Error
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"Code":    http.StatusBadRequest,
			"Message": err,
		})
		return
	}

	db.First(&newCharacter, "user_id = ?", &user.ID)

	ctx.JSON(http.StatusOK, gin.H{
		"Code": http.StatusOK,
		"Data": &newCharacter,
	})
}

// GET /user/info
func UserInfo(ctx *gin.Context) {
	var token = ctx.GetHeader("X-Auth-Token")
	var user dbTable.User

	db := data.ConnectDB()
	defer db.Close()

	db.First(&user, "token = ?", token)

	// 查找 Characters
	characters := []dbTable.Character{}
	db.Find(&characters, "user_id = ?", &user.ID)
	user.Characters = characters

	// 找到每個 Character 的 pack items
	for _, character := range characters {
		items := []dbTable.PackItem{}
		db.Find(&items, "character_id = ?", character.ID)
		character.PackItems = items
	}

	// 去除密碼
	user.Password = ""

	ctx.JSON(http.StatusOK, gin.H{
		"Code": http.StatusOK,
		"Data": &user,
	})
}
