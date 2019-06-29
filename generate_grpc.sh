
# Directory to write generated code to (.js and .d.ts files) 
DIR="./proto"
OUT_DIR="./PawsPWA/src/app/proto"

protoc -I=$DIR pawsgrpc.proto \
  --js_out=import_style=commonjs:$OUT_DIR

protoc -I=$DIR pawsgrpc.proto \
  --js_out=import_style=typescript:$OUT_DIR

protoc \
    -I=$DIR \
    --js_out="import_style=typescript,binary:${OUT_DIR}" \
    --grpc-web_out="import_style=typescript,mode=grpcwebtext:${OUT_DIR}" \
    pawsgrpc.proto