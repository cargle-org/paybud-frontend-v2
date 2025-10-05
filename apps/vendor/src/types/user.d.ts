import { IDocument } from "./api";
import { IBusiness } from "./business";
import { IFile } from "./file";

export interface IUser extends IDocument {
  email: string;
  phoneNumber?: string;
  fullName: string;
  isEmailVerified: boolean;
  registrationType: "EMAIL";
  roleName: "owner";
  profile: IProfile;
  business?: IBusiness;
}

export interface IProfile {
  id: string;
  profilePicture?: IFile;
  profilePictureUrl: string;
  profilePictureId: string;
  userName?: string;
  contactEmail: string;
  bio?: string;
  dateOfBirth: Date;
  contactPhoneNumber: string;
  sex: "MALE" | "FEMALE" | "OTHER";
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateUserPayload {
  fullName: string;
  userName: string;
  contactEmail: string;
  contactPhoneNumber: string;
  address?: string;
  dateOfBirth: Date;
  sex: "MALE" | "FEMALE" | "OTHER";
  bio?: string;
  profilePictureId?: string;
}
