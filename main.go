package main

import (
	"log"

	"github.com/jinzhu/configor"
	models "github.com/paws/model"
	"github.com/paws/server"
)

func main() {
	log.Println("Starting Paws service...")

	config := getConfig()
	srv := getServer(config)

	err := srv.Start()
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Exiting...")
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

func getServer(config *models.Config) server.Runner {
	srv, err := server.Create(config)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Accepting requests:")
	return srv
}
