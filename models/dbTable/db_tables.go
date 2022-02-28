package dbTable

import (
	"gorm.io/gorm"
)

// User
type User struct {
	gorm.Model

	Name       string
	Email      string `gorm:"unique"`
	Password   string
	Token      string
	Characters []Character `gorm:"ForeignKey:ID"`
}

// Character
type Character struct {
	gorm.Model

	UserID       int
	Name         string
	Category     int
	Type         int
	HealthRemain int
	PackItems    []PackItem `gorm:"ForeignKey:ID"`
}

// Battle
type Battle struct {
	gorm.Model

	Character1ID int
	Character2ID int
	Status       int
	Round        int
	WinnerID     int
}

// Pack Item
type PackItem struct {
	gorm.Model

	CharacterID int
	ItemType    int
	BattleID    int
}
