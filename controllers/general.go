package controllers

import (
	"crypto/rand"
	"encoding/hex"
	"go/data"
	"go/models/dbTable"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type LoginForm struct {
	Email    string
	Password string
}

// POST /general/signup
func SignUp(ctx *gin.Context) {
	var newUser dbTable.User
	db := data.ConnectDB()
	defer db.Close()

	// 檢查是否有照格式
	if ctx.ShouldBindJSON(&newUser) != nil {
		ctx.AbortWithStatusJSON(http.StatusNotImplemented, gin.H{
			"Code":    http.StatusNotImplemented,
			"Message": "API 參數組成錯誤",
		})
		return
	}

	// Hash password
	newUser.Password = GeneratePasswordHash([]byte(newUser.Password))

	err := db.Create(&newUser).Error
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"Code":    http.StatusBadRequest,
			"Message": err,
		})
		return
	}

	// 去除密碼
	newUser.Password = ""

	ctx.JSON(http.StatusOK, gin.H{
		"Code": http.StatusOK,
		"Data": &newUser,
	})
}

// POST /general/login
func Login(ctx *gin.Context) {
	var loginForm LoginForm
	var user dbTable.User

	if ctx.BindJSON(&loginForm) != nil {
		ctx.AbortWithStatusJSON(http.StatusNotImplemented, gin.H{
			"Code":    http.StatusNotImplemented,
			"Message": "API 參數組成錯誤",
		})
		return
	}

	db := data.ConnectDB()
	defer db.Close()

	noMatchEmail := db.First(&user, "email = ?", &loginForm.Email).RecordNotFound()

	// 查找使用者是否存在
	if noMatchEmail {
		ctx.AbortWithStatusJSON(http.StatusNotImplemented, gin.H{
			"Code":    http.StatusNotImplemented,
			"Message": "使用者不存在",
		})
		return
	}

	// 比對 hash 密碼
	if PasswordCompare([]byte(loginForm.Password), []byte(user.Password)) != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"Code":    http.StatusBadRequest,
			"Message": "使用者密碼錯誤",
		})
		return
	}

	// 產生 Token
	token := GenerateToken()
	db.First(&user, "email = ?", &loginForm.Email).Update("token", token)

	// 去除密碼
	user.Password = ""

	// 查找 Characters
	characters := []dbTable.Character{}
	db.Find(&characters, "user_id = ?", &user.ID)
	user.Characters = characters

	ctx.JSON(http.StatusOK, gin.H{
		"Code": http.StatusOK,
		"Data": &user,
	})
}

// GET /general/token-login
func TokenLogin(ctx *gin.Context) {
	var token = ctx.GetHeader("X-Auth-Token")
	var user dbTable.User

	db := data.ConnectDB()
	defer db.Close()

	noMatchToken := db.First(&user, "token = ?", token).RecordNotFound()

	if noMatchToken {
		ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{
			"Code":    http.StatusForbidden,
			"Message": "Invalid token",
		})
		return
	}

	// 去除密碼
	user.Password = ""

	// 查找 Characters
	characters := []dbTable.Character{}
	db.Find(&characters, "user_id = ?", &user.ID)
	user.Characters = characters

	ctx.JSON(http.StatusOK, gin.H{
		"Code": http.StatusOK,
		"Data": &user,
	})
}

// POST /general/reset-password
func ResetPassword(ctx *gin.Context) {
	// TODO:
}

/*
** Functions
 */
// 產生 hash password
func GeneratePasswordHash(password []byte) string {
	// default cost is 10
	hashedPassword, err := bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)

	// If there was an error panic
	if err != nil {
		log.Fatal(err)
	}

	// return stringified password
	return string(hashedPassword)
}

// PasswordCompare handles password hash compare
func PasswordCompare(password []byte, hashedPassword []byte) error {
	err := bcrypt.CompareHashAndPassword(hashedPassword, password)

	return err
}

// Generate Token
func GenerateToken() string {
	b := make([]byte, 24)
	if _, err := rand.Read(b); err != nil {
		return ""
	}
	return hex.EncodeToString(b)
}
