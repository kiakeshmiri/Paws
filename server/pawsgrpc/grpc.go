package pawsgrpc

import (
	context "context"
	"errors"
	"fmt"
	"log"
	"net"
	"time"

	timestamp "github.com/golang/protobuf/ptypes/timestamp"
	"github.com/paws/server/database"
	models "github.com/paws/server/model"
	"google.golang.org/grpc"
	"gopkg.in/mgo.v2/bson"
)

// Runner ...
type Runner struct {
	Config   *models.Config
	Database database.Handler
}

// NewRunner ...
func NewRunner(config *models.Config) (*Runner, error) {
	db, err := database.Create(config)
	runner := &Runner{
		Config:   config,
		Database: db,
	}
	return runner, err
}

// Start ...
func (srv *Runner) Start() error {
	listener, err := net.Listen("tcp", fmt.Sprintf("%v:%v", srv.Config.Server.Host, srv.Config.Server.Port))
	if err != nil {
		return err
	}

	opts := []grpc.ServerOption{}
	server := grpc.NewServer(opts...)

	RegisterPawsServer(server, srv)

	err = server.Serve(listener)

	return err
}

// FetchAllDiaries ...
func (srv *Runner) FetchAllDiaries(ctx context.Context, req *FetchParam) (*DiaryList, error) {
	diaries, err := srv.Database.FetchAllDiaries()
	if err != nil {
		// Log error but don't stop the server
		log.Println(err)

		return nil, err
	}

	res := &DiaryList{
		Diaries: srv.mapDiaries(diaries...),
	}

	log.Println(req.String(), ":", res)
	return res, err
}

// CreateDiary - Creates a new Diary object
func (srv *Runner) CreateDiary(ctx context.Context, diary *Diary) (*ResultCode, error) {
	dbdiary := &models.Diary{
		ID:    bson.NewObjectId(),
		Image: diary.GetImage(),
		Note:  diary.GetNote(),
		Date:  diary.GetDate().String(),
	}

	if len(diary.Note) == 0 {
		return nil, errors.New("invalid note")
	}

	err := srv.Database.CreateDiary(*dbdiary)
	return nil, err

}

func (srv *Runner) mapDiaries(diaries ...models.Diary) []*Diary {
	grpcDiaries := []*Diary{}
	for _, diary := range diaries {
		time, _ := time.Parse(time.RFC3339, diary.Date)

		s := int64(time.Second())     // from 'int'
		n := int32(time.Nanosecond()) // from 'int'

		ts := &timestamp.Timestamp{Seconds: s, Nanos: n}

		grpcDiaries = append(grpcDiaries, &Diary{
			Id:    diary.ID.Hex(),
			Date:  ts,
			Image: diary.Image,
			Note:  diary.Note,
		})
	}
	return grpcDiaries
}
