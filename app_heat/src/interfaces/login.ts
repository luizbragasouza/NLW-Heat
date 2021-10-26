import { IUserMessageResponse } from "./messages";

export interface IAuthResponse {
  token: string;
  user: IUserMessageResponse;
}

export interface IAuthContextData {
  user: IUserMessageResponse | null;
  signInUrl: string;
  signOut: () => void;
}
