# Paws PWA

This demo explains how to develop a Progressive Web App consuming grpc services.

It's based on grpc-web on backend exposing CRUD services using golang and mongodb. All the components of this demo are located in docker container and are managed by docker compose.

By using grpc and protobuf the size of transfered data will be 20 times smaller and almost 10 times faster (based on my own benchmarks) compared to traditional REST. 

# Server(less) backend:

GRPC nackend is written in go (golang). The code is located under server folder. Dependencies are handled by go modules and it used standard mongodb driver to communicate to database and exposes servies through google grpc and protobuf.

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