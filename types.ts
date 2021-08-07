export enum EAction {
  SET_VIDEO = "SET_VIDEO",
  LOAD_VIDEO = "LOAD_VIDEO",
  UPDATE_STATE = "UPDATE_STATE",
  SEEK = "SEEK",

  PERSON_JOINED = "PERSON_JOINED",
}

export interface IVideoMeta {
  src: string;
  captions: string;
  timeStamp: number;
  state: "PLAYING" | "PAUSED";
}

export type ILoadVideoAction = IVideoMeta;

export type ISetVideoAction = Pick<IVideoMeta, "src" | "captions">;

export type IUpdateStateAction = Pick<IVideoMeta, "state">;

export type ISeekAction = Pick<IVideoMeta, "timeStamp">;
