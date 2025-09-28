import { IDocument } from "./api";

export interface IUser extends IDocument {
  email: string;
  fullName: string;
  isEmailVerified: boolean;
  registrationType: "EMAIL";
  roleName: "owner";
  profile: IProfile;
}

export interface IProfile {
  id: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
}
