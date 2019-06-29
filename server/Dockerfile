FROM golang:1.12.6-alpine AS build

# Build args
ENV PROJECT_SRC=/go/src/github.com/paws

# Gopkg.toml and Gopkg.lock lists project dependencies
# These layers will only be re-built when Gopkg files are updated
WORKDIR ${PROJECT_SRC}


# Copy all project and build it
# This layer will be rebuilt when ever a file has changed in the project directory
COPY . ${PROJECT_SRC}/
RUN go build -o /project/server

# Copy config file to output directory
COPY ./config.yml /project/

# This results in a small single layer image
FROM alpine:latest

# Move output directory from the previous build to the new one
COPY --from=build /project /project

WORKDIR /project
ENTRYPOINT ["./server"]