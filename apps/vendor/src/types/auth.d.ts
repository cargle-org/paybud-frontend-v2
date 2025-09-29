import { IUser } from "./user";

export interface ILoginPayLoad {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface IOAuthLoginPayLoad {
  token: string;
}

export interface IRegisterPayLoad {
  email: string;
  password: string;
  fullName: string;
  roleName?: string;
}

export interface ILoginResponse {
  accessToken: string;
  user: IUser;
}
