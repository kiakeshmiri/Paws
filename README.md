# Paws PWA

This demo explains how to develop a Progressive Web App consuming grpc services.

It's based on grpc-web on backend exposing CRUD services using golang and mongodb. All the components of this demo are located in docker container and are managed by docker compose.

By using grpc and protobuf the size of transferred data will be 20 times smaller and almost 10 times faster (based on my own benchmarks) compared to traditional REST.

## Server(less) backend:

gRPC backend is written in go (golang). The code is located under server folder. Dependencies are handled by go modules and it used standard mongodb driver to communicate to database and exposes services through google grpc and protobuf.

Proto is defines in server/pawsgrpc/paws_grpc.proto as following:


```

syntax = "proto3";

package paws.grpc;

import "google/protobuf/timestamp.proto";

service Paws {
  rpc CreateDiary (Diary) returns (ResultCode) {}

  rpc FetchAllDiaries (FetchParam) returns (DiaryList) {}
}

message Diary {
  string id = 1;
	string image = 2;
	string note = 3;
	google.protobuf.Timestamp date = 4;
}

// The response message containing the greetings
message DiaryList {
  repeated Diary diaries = 1;
}

message FetchParam {

}

message ResultCode {
    int32 code = 1;
}

```

For now there are only 2 simple calls (CreateDiary and FetchAllDiaries). In future we will use streaming and bidirectional communication.

### Database Access Layer:

Database access logic is defined under server/database folder. handler.go defines an interface and exposes database methods. mongo.go is mongodb implemetation if the interface. It simple implement data access methods to the pawsDB database.

excerpts from mongo.go:

```
import (
	"errors"
	"fmt"

	models "github.com/kiakeshmiri/paws/server/model"
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

...
...
// FetchAllDiaries -
func (db *MongoHandler) FetchAllDiaries() ([]models.Diary, error) {
	session := db.getSession()
	defer session.Close()

	diaries := []models.Diary{}
	err := session.DB("pawsDB").C("diary").Find(nil).All(&diaries)

	return diaries, err

}
```
### Model

model/model.go contains the definition of the original database schema and object model plus config mode definition. we can break it to multiple files / structs when application grow. Keep in mind that until this layer our application is agnostic to proto and grpc so we won't be able to use the generated classes through protoc in database layer but we can map them later.

### gRPC

server/pawsgrpc/paws_grpc.pb.go is go generated file through protoc. Basically the file has been generated by running following command:

```
protoc -I=$DIR paws_grpc.proto \
  --go_out=plugins=grpc:server/pawsgrpc
```

In server/pawsgrpc/grpc.go we convert grpc calls to database calls and map grpc objects to database objects :

```
func (srv *Runner) mapDiaries(diaries ...models.Diary) []*Diary {
	grpcDiaries := []*Diary{}
	for _, diary := range diaries {

		grpcDiaries = append(grpcDiaries, &Diary{
			Id:    diary.ID.Hex(),
			Date:  diary.DiaryDate,
			Image: diary.Image,
			Note:  diary.Note,
		})
	}
	return grpcDiaries
}
```
 
The rest of the server code is pretty straightforward. in main.go and runner.go we create config object and pass it grpc server and run the server.

If you decide to run the containers individually, you have to handle mongodb either on your machine or on a seperate container and handle networking yourself, docker-compose handles all of that for you.

### Angular Web Application
PawsPWA is a pretty simple angular application. It simply calls the gRPC services sending and receiving data on top http2 in binary format. protobuf handles data marshaling and gRPC handles data transfer on the network. Envoy proxy converts http1 calls to http2. Other proxy servers can be used as replacement of envoy but I just used envoy to be consistent with google gRPC web.

PawsPWA is also using service worker. It means that it can be converted to a desktop or mobile app just like a MAGIC.

Service worker will be acticated in production mode. It basically installs pawspwa application assets on client and adds logic for bacground sync. I have not used sync-manager feature and mannualy handle going offline and back online. The main reason is to avoid relying on sync-manager feature since it's not supported by all browsers yet.

PawsPWA stored data (diaries) in indexeddb abd fetches them back if device is offline so it generally will be available even if device is offline.

In order to run application in development mode run the following commands in PawsPWA directory:

- npm install
- ng serve

Then navigate to http://localhost:4200. Keep in mind that application won't act as a progressive web application in development mode.

In order to run application in production mode simply compile and execute httpserver (source located at paws/httpserver/main.go) or install node http_server inside Public folder.  

PawsPWA/httpserver, can simply run by using following command in the PawsPWA folder:

```
- cd paws/PawsPWA
- npm run build
- cd ../httpserver
- go build
- ./httpserver
```
It looks for public folder located at root which should have been generated through "npm run build".

Now simply navigate to http://localhost:9190 and browse the application.

### Running the gRPC Backend server in docker
This runs the gRPC backend server, written in golang, and listens on port 9090.
```
$ docker build -t paws/server \
  -f paws/server/Dockerfile .
$ docker run -d -p 9090:9090 --name pawsserver paws/server
```
### Running the Envoy proxy in docker
This step runs the Envoy proxy, and listens on port 8080. Any gRPC-Web browser requests will be forwarded to port 9090.
```
$ docker build -t paws/envoy \
  -f paws/envoy/Dockerfile .
$ docker run -d -p 8080:8080 --link pawsserver:pawsserver paws/envoy
```
### Running the httpserver in docker
This runs the http web server, written in golang, and listens on port 9190.
```
$ docker build -t paws/httpserver \
  -f paws/httpserver/Dockerfile .
$ docker run -d -p 9190:9190
```
### Running all containers using docker compose
It's recommended that skip invoking containers individually and use docker-compose unless you want to test each container individually. In that case please study docker-compose.yml first.
```
$ docker-compose up
```

