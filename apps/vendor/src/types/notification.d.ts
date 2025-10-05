import { IDocument } from "./api";

export interface IAppNotification extends IDocument {
  userId: string;
  message: string;
  action: string;
  type: "warning" | "error" | "info" | "success";
  isRead: boolean;
  popup: boolean;
  data?: any;
}

export class IGetUserNotificationsDto {
  userId: string;

  isRead?: boolean;

  limit?: number;

  cursor?: Date;
}
