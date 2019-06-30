/**
 * @fileoverview gRPC-Web generated client stub for pawsgrpc
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import {
  Diary,
  DiaryList,
  FetchParam,
  ResultCode} from './paws_grpc_pb';

export class PawsClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoCreateDiary = new grpcWeb.AbstractClientBase.MethodInfo(
    ResultCode,
    (request: Diary) => {
      return request.serializeBinary();
    },
    ResultCode.deserializeBinary
  );

  createDiary(
    request: Diary,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: ResultCode) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/pawsgrpc.Paws/CreateDiary',
      request,
      metadata || {},
      this.methodInfoCreateDiary,
      callback);
  }

  methodInfoFetchAllDiaries = new grpcWeb.AbstractClientBase.MethodInfo(
    DiaryList,
    (request: FetchParam) => {
      return request.serializeBinary();
    },
    DiaryList.deserializeBinary
  );

  fetchAllDiaries(
    request: FetchParam,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: DiaryList) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/pawsgrpc.Paws/FetchAllDiaries',
      request,
      metadata || {},
      this.methodInfoFetchAllDiaries,
      callback);
  }

}

