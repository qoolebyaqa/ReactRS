import store from "./store";

export type GlobalStateType = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;

export interface Ifile {
  name: string,
  size: number,
  baseImg:  ArrayBuffer | string
}

export interface IFormData {
  [key: string]: string | Ifile | File | undefined;
  acceptTerms?: string;
  avatar?: Ifile | File;
}