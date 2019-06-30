package main
import (
	"fmt"

	models "github.com/paws/server/model"
	"github.com/paws/server/pawsgrpc"
)

// Runner ...
type Runner interface {
	Start() error
}

// Create ...
func Create(config *models.Config) (Runner, error) {
	var srv Runner
	var err error

	switch config.Server.Type {
	case "grpc":
		srv, err = pawsgrpc.NewRunner(config)
	default:
		err = fmt.Errorf("Server type %v is not supported", config.Server.Type)
	}

	return srv, err
}
