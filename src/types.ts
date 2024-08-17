import store from "./store";

export type GlobalStateType = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;

export interface Ifile {
  0?: File,
  name: string,
  size: number,
  baseImg:  ArrayBuffer | string
}


export interface Ichanges {
  title: string;
  value: string;
}

export interface IFormData {
  name: string;
  email: string;
  age: string;
  password: string;
  confrimPassword: string;
  gender: string;
  acceptTerms: string;
  avatar: File | FileList;
  datalist: string;
  country?: string;
}

export interface InitialState {
  uncontrolledForm: IFormData | null,
  controlledForm: IFormData | null,
  changedKeysControlled: Ichanges[],
  changedKeys: Ichanges[],
  countryList: string[],
  uploadedFile: string,    
  uploadedFileControlled: string,
}

export interface IFormInputs {
  name: string;
  age: number;
  email: string;
  password: string;
  confrimPassword: string;
  gender: string;
  acceptTerms: string;
  datalist: string;
  avatar?: FileList; 
}
/* export interface IFormControlledDta {
  name: string;
  email: string;
  password: string;
  confrimPassword: string;
  gender: string;
  acceptTerms: string;
  avatar: {
    size: number;
    name: string;
    baseImg: string;
  };
  datalist: string;
}
export interface IFormData {
  [key: string]: string | Ifile | File | undefined;
  acceptTerms?: string;
  avatar?: Ifile | File;
} */