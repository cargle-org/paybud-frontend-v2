import { IUser } from "./user";
import { IWallet } from "./wallet";

export interface IBusiness extends IDocument {
  name: string;

  owner?: IUser;

  profile: IBusinessProfile;

  businessEmail: string;

  businessPhone: string;

  users: IUser[];

  wallets: IWallet[];

  isVerified: boolean;

  KYC: {
    type: "nin" | "bvn" | "passport" | "driver_license";
    value: string;
    status: "pending" | "verified" | "rejected";
  };
}

export interface IBusinessProfile extends IDocument {
  business: IBusiness;

  logoId: string;

  logo?: File;

  description?: string;

  address?: string;

  contactPhoneNumber?: string;

  contactEmail?: string;
}

export interface ICreateBusinessDTO {
  userId: string;

  name: string;

  businessEmail: string;

  businessPhone: string;

  description?: string;

  address?: string;

  contactPhoneNumber?: string;

  contactEmail: string;

  businessAccountName: string;

  businessAccountNumber: string;

  businessBankCode: string;

  businessBVN: string;

  logoId?: string;
}

export interface IBanks {
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string | null;
  pay_with_bank: boolean;
  active: boolean;
  is_deleted: boolean;
  country: string;
  currency: string;
  type: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}
