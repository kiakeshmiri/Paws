# Directory to write generated code to (.js and .d.ts files) 
DIR="proto/"
OUT_DIR="./PawsPWA/src/app/proto"

# Go Server code generation:
protoc -I=$DIR paws_grpc.proto \
  --go_out=plugins=grpc:server/pawsgrpc

protoc -I=$DIR paws_grpc.proto \
  --js_out=import_style=commonjs:$OUT_DIR

protoc -I=$DIR paws_grpc.proto \
  --js_out=import_style=typescript:$OUT_DIR

protoc paws_grpc.proto \
    -I=$DIR \
    --js_out="import_style=typescript,binary:${OUT_DIR}" \
    --grpc-web_out="import_style=typescript,mode=grpcwebtext:${OUT_DIR}" \
    
