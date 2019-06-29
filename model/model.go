package model

import (
	"gopkg.in/mgo.v2/bson"
)

// Config ...
type Config struct {
	Server struct {
		Type string
		Host string `env:"SERVER_HOST"`
		Port uint   `env:"SERVER_PORT"`
	}
	Database struct {
		Type string
		Host string `env:"DB_HOST"`
		Port uint   `env:"DB_PORT"`
	}
}

// Todo ...
type Todo struct {
	ID       bson.ObjectId `bson:"_id"`
	Title    string        `bson:"title"`
	Tag      string        `bson:"tag"`
	Priority int32         `bson:"priority"`
}

// Diary ...
type Diary struct {
	ID    bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Image string        `json:"image"`
	Note  string        `json:"note"`
	Date  string        `json:"date"`
}
