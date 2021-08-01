export enum EAction {
  SET_VIDEO = "SET_VIDEO",
  LOAD_VIDEO = "LOAD_VIDEO",
  UPDATE_STATE = "UPDATE_STATE",
  SEEK = "SEEK",
}

export interface IVideoMeta {
  src: string;
  timeStamp: number;
  state: "PLAYING" | "PAUSED";
}

export type ILoadVideoAction = Pick<IVideoMeta, "src" | "timeStamp">;

export type ISetVideoAction = Pick<IVideoMeta, "src">;

export type IUpdateStateAction = Pick<IVideoMeta, "state">;

export type ISeekAction = Pick<IVideoMeta, "timeStamp">;
