FROM golang:1.12.6-alpine AS build

# Build args
ENV PROJECT_SRC=/github.com/kiakeshmiri/paws/server

# Install tools required to build the project
# We will need to run `docker build --no-cache .` to update those dependencies
RUN apk add --no-cache git


# Copy all project and build it
# This layer will be rebuilt when ever a file has changed in the project directory
COPY ./server ${PROJECT_SRC}

WORKDIR ${PROJECT_SRC}

RUN go build -o grpcserver

ENTRYPOINT ["./grpcserver"]