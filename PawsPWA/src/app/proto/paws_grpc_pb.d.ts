import * as jspb from "google-protobuf"

export class Diary extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getImage(): string;
  setImage(value: string): void;

  getNote(): string;
  setNote(value: string): void;

  getDate(): string;
  setDate(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Diary.AsObject;
  static toObject(includeInstance: boolean, msg: Diary): Diary.AsObject;
  static serializeBinaryToWriter(message: Diary, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Diary;
  static deserializeBinaryFromReader(message: Diary, reader: jspb.BinaryReader): Diary;
}

export namespace Diary {
  export type AsObject = {
    id: string,
    image: string,
    note: string,
    date: string,
  }
}

export class DiaryList extends jspb.Message {
  getDiariesList(): Array<Diary>;
  setDiariesList(value: Array<Diary>): void;
  clearDiariesList(): void;
  addDiaries(value?: Diary, index?: number): Diary;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DiaryList.AsObject;
  static toObject(includeInstance: boolean, msg: DiaryList): DiaryList.AsObject;
  static serializeBinaryToWriter(message: DiaryList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DiaryList;
  static deserializeBinaryFromReader(message: DiaryList, reader: jspb.BinaryReader): DiaryList;
}

export namespace DiaryList {
  export type AsObject = {
    diariesList: Array<Diary.AsObject>,
  }
}

export class FetchParam extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FetchParam.AsObject;
  static toObject(includeInstance: boolean, msg: FetchParam): FetchParam.AsObject;
  static serializeBinaryToWriter(message: FetchParam, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FetchParam;
  static deserializeBinaryFromReader(message: FetchParam, reader: jspb.BinaryReader): FetchParam;
}

export namespace FetchParam {
  export type AsObject = {
  }
}

export class ResultCode extends jspb.Message {
  getCode(): number;
  setCode(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResultCode.AsObject;
  static toObject(includeInstance: boolean, msg: ResultCode): ResultCode.AsObject;
  static serializeBinaryToWriter(message: ResultCode, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResultCode;
  static deserializeBinaryFromReader(message: ResultCode, reader: jspb.BinaryReader): ResultCode;
}

export namespace ResultCode {
  export type AsObject = {
    code: number,
  }
}

