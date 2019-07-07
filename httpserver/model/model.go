package model

// Config ...
type Config struct {
	Httpserver struct {
		Folder string `env:"SERVER_FOLDER"`
		Port   uint `env:"SERVER_PORT"`
	}
}
