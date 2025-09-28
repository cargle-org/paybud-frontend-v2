export type notificationTypes = "success" | "error" | "info" | "warning";

export interface IToastContext {
  getToast: () => JSX.Element;
  openToast: (data: IToastPayload) => void;
}

export interface IToastData {
  id: string;
  type: notificationTypes;
  message: string;
  description?: string;
}

export interface INotification {
  type: notificationTypes;
  message?: string;
  description?: string;
  child?: React.ReactNode;
}

export interface IToastPayload {
  type: notificationTypes;
  message: string;
  description?: string;
}
