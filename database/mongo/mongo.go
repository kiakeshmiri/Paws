package mongo

import (
	"errors"
	"fmt"

	models "github.com/paws/model"
	"gopkg.in/mgo.v2"
)

// MongoHandler ...
type MongoHandler struct {
	*mgo.Session
}

// NewHandler ...
func NewHandler(config *models.Config) (*MongoHandler, error) {
	session, err := mgo.Dial(fmt.Sprintf("mongodb://%v:%v", config.Database.Host, config.Database.Port))
	handler := &MongoHandler{
		Session: session,
	}
	return handler, err
}

// CreateDiary - Creates a new Diary object
func (db *MongoHandler) CreateDiary(diary models.Diary) (err error) {

	session := db.getSession()
	defer session.Close()

	if len(diary.Note) == 0 {
		return errors.New("invalid note")
	}

	if err = session.DB("paws").C("diary").Insert(diary); err != nil {
		return
	}
	return err
}

// FetchAllDiaries -
func (db *MongoHandler) FetchAllDiaries() ([]models.Diary, error) {
	session := db.getSession()
	defer session.Close()

	diaries := []models.Diary{}
	err := session.DB("pawsDB").C("diary").Find(nil).All(&diaries)

	return diaries, err

}

func (db *MongoHandler) getSession() *mgo.Session {
	return db.Session.Copy()
}
