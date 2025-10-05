import { IAppNotification } from "@/types/notification";
import { StateCreator } from "zustand";

export interface INotificationSlice {
  notifications?: IAppNotification[];
  setNotifications: (notifications: IAppNotification[]) => void;
  clearNotifications: () => void;
  popupNotification?: IAppNotification;
  setPopupNotification: (notification: IAppNotification) => void;
}

export const createNotificationSlice: StateCreator<INotificationSlice, [], [], INotificationSlice> = (set, get) => ({
  setNotifications: (notifications) => set((state) => ({ notifications, ...state })),
  clearNotifications: () => set((state) => ({ notifications: undefined, popupNotification: undefined })),
  setPopupNotification: (notification) => set((state) => ({ popupNotification: notification, ...state })),
});
