package auth

import (
	"go/data"
	"go/models/dbTable"
	"net/http"

	"github.com/gin-gonic/gin"
)

// 驗證 Request Header
func ValidHandler(ctx *gin.Context) {
	var token = ctx.GetHeader("X-Auth-Token")
	var user dbTable.User
	db := data.ConnectDB()

	// 檢查 header 是否有 Token
	if token == "" {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"Code":    http.StatusUnauthorized,
			"Message": "Token not found",
		})
		return
	}

	// 檢查此 token 是否可查找到 user
	result := db.First(&user, dbTable.User{Token: token})

	if result.RowsAffected == 0 {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"Code":    http.StatusUnauthorized,
			"Message": "Invalid token",
		})
		return
	}

	ctx.Next()
}
