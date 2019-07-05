package database

import (
	"fmt"

	"github.com/kiakeshmiri/paws/server/database/mongo"
	models "github.com/kiakeshmiri/paws/server/model"
)

// Handler ...
type Handler interface {
	CreateDiary(models.Diary) error
	FetchAllDiaries() ([]models.Diary, error)
}

// Create ...
func Create(config *models.Config) (Handler, error) {
	var db Handler
	var err error

	switch config.Database.Type {
	case "mongo":
		db, err = mongo.NewHandler(config)
	default:
		err = fmt.Errorf("Database type %v is not supported", config.Database.Type)
	}

	return db, err
}
