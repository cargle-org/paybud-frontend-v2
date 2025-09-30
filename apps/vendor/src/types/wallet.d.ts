import { WalletCurrencyEnum, WalletTransactionActionEnum, WalletTransactionStatusEnum } from "@/utils/constants";
import { IDocument } from "./api";
import { IBusiness } from "./business";

export interface IWallet extends IDocument {
  business: IBusiness;

  balance: number;

  vbaAccounts: IWalletVba[];

  transactions: IWalletTransaction[];

  status: WalletStatusEnum;

  currency: WalletCurrencyEnum;
}

export interface IWalletVba extends IDocument {
  wallet?: IWallet;

  vbaId: string;

  accountNumber: string;

  bankName: string;

  bankCode: string;

  accountName: string;

  isDefault: boolean;

  active: boolean;

  currency: string;
}

export interface IWalletTransaction extends IDocument {
  wallet?: IWallet;

  amount: number;

  action: WalletTransactionActionEnum;

  type: WalletTransactionTypeEnum;

  reference: string;

  description: string;

  status: WalletTransactionStatusEnum;

  metadata: any;
}
