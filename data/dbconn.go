package data

import (
	"fmt"
	"go/models/dbTable"
	"log"
	"os"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func ConnectDB() *gorm.DB {
	// Load envirenment
	dialect := os.Getenv("DIALECT")
	host := os.Getenv("HOST")
	dbPort := os.Getenv("DBPORT")
	user := os.Getenv("USER")
	dbName := os.Getenv("NAME")
	password := os.Getenv("PASSWORD")

	// Database connection string
	dbURI := fmt.Sprintf("host=%s user=%s dbname=%s sslmode=disable password=%s port=%s", host, user, dbName, password, dbPort)

	db, err := gorm.Open(dialect, dbURI)
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Connect to Database logicard_duel...")

	return db
}

// Migrate when init
func Migrate() {
	db := ConnectDB()

	tableList := []interface{}{
		&dbTable.User{},
		&dbTable.Character{},
		&dbTable.Battle{},
		&dbTable.PackItem{},
	}

	defer db.Close()

	db.AutoMigrate(tableList...)
}

// Create a admin user
// func CreateInitUser() {
// 	var adminUser api.User
// 	var count int64

// 	db := ConnectDB()
// 	query := db.Where("account=?", "admin").Find(&adminUser)
// 	query.Count(&count)

// 	if count != 0 {
// 		fmt.Println("Admin exist.")
// 	} else {
// 		fmt.Println("No admin user, create one.")
// 		db.Create(&dbTable.User{
// 			UserName: "Admin User", Account: "admin", Password: "admin",
// 		})
// 	}
// 	db.Commit()

// }
