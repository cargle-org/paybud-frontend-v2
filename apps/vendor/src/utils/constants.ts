export enum RegistrationTypeEnum {
  EMAIL = "EMAIL",
  GOOGLE = "GOOGLE",
  FACEBOOK = "FACEBOOK",
  TWITTER = "TWITTER",
  GITHUB = "GITHUB",
}

export enum WalletTransactionStatusEnum {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  REVERSED = "REVERSED",
  EXPIRED = "EXPIRED",
}

export enum WalletTransactionActionEnum {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}

export enum WalletTransactionTypeEnum {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
  TRANSFER = "TRANSFER",
  PURCHASE = "PURCHASE",
}

export enum WalletStatusEnum {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  CLOSED = "CLOSED",
}

export enum WalletCurrencyEnum {
  // USD = 'USD',
  // EUR = 'EUR',
  // GBP = 'GBP',
  NGN = "NGN",
  // GHS = 'GHS',
  // ZAR = 'ZAR',
  // KES = 'KES',
  // UGX = 'UGX',
  // TZS = 'TZS',
  // RWF = 'RWF',
}

export const MAX_FILE_SIZE = 5; // 5MB
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
