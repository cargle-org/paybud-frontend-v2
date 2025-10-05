import { createBaseStore } from "@/store/store";
import { IAppNotification, IGetUserNotificationsDto } from "@/types/notification";
import { io, Socket } from "socket.io-client";
class NofificationService {
  private baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/vendor-notifications`;
  private socket: Socket | undefined;

  connect = () => {
    const token = createBaseStore().getState().accessToken;

    this.socket = io(this.baseUrl, {
      auth: {
        token,
      },
      transports: ["websocket"],
    });

    this.socket.on("error", ({ message }) => {
      throw new Error(message);
    });
    this.socket.on("notifications:load", (data: IAppNotification[]) => {
      createBaseStore().getState().setNotifications(data);
    });
    this.socket.on("notifications:popup", (data: IAppNotification) => {
      createBaseStore().getState().setPopupNotification(data);
    });
  };

  getNotifications(payload: IGetUserNotificationsDto) {
    this.socket?.emit("notifications:load", payload);
  }

  removeConnection = () => {
    createBaseStore().getState().clearNotifications();
    this.socket?.disconnect();
  };

  readNotification(payload: { notificationId: string; userId: string }) {
    this.socket?.emit("readNotification", payload);
  }

  deleteNotification(payload: { notificationId: string; userId: string }) {
    this.socket?.emit("deleteNotification", payload);
  }
}

export default new NofificationService();
