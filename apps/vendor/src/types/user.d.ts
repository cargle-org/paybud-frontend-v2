import { IDocument } from "./api";
import { IBusiness } from "./business";

export interface IUser extends IDocument {
  email: string;
  fullName: string;
  isEmailVerified: boolean;
  registrationType: "EMAIL";
  roleName: "owner";
  profile: IProfile;
  business?: IBusiness;
}

export interface IProfile {
  id: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateUserDto {
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  dateOfBirth: Date;
  sex: "MALE" | "FEMALE" | "OTHER";
  bio?: string;
  profilePictureId?: string;
}
