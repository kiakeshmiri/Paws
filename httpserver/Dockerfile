FROM golang:1.12.6-alpine

# Build args
ENV PROJECT_SRC=/github.com/kiakeshmiri/paws/httpserver

RUN apk add --no-cache git

# Copy all project and build it
# This layer will be rebuilt when ever a file has changed in the project directory
COPY ./httpserver ${PROJECT_SRC}

WORKDIR ${PROJECT_SRC}

RUN go build


ENTRYPOINT ["./httpserver"]

# This container exposes port 8080 to the outside world
EXPOSE 9190
