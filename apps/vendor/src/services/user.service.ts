import { IResponse } from "@/types/api";
import { IUser } from "@/types/user";
import https from "@/utils/https";

class UserService {
  async getLoggedInUser(): Promise<IResponse<IUser>> {
    const baseUrl = "vendor/user";
    return await https.get({
      url: `/${baseUrl}/me`,
    });
  }
}

export default new UserService();
