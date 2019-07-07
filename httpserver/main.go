package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/jinzhu/configor"
	models "github.com/kiakeshmiri/paws/httpserver/model"
)

func main() {

	config := getConfig()
	startHTTPServer(config)
}

func getConfig() *models.Config {
	config := new(models.Config)
	err := configor.Load(config, "config.yml")
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Configuration:", *config)
	return config
}

func startHTTPServer(config *models.Config) {
	folder := config.Httpserver.Folder
	port := config.Httpserver.Port
	if folder != "" && port > 0 {
		fs := http.FileServer(http.Dir(folder))
		http.Handle("/", fs)

		log.Println("Listening...")

		http.ListenAndServe(fmt.Sprintf(":%v", port), nil)
	}
}
