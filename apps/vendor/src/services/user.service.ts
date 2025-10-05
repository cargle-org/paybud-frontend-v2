import { IResponse } from "@/types/api";
import { IFile } from "@/types/file";
import { IUpdateUserPayload, IUser } from "@/types/user";
import https from "@/utils/https";

class UserService {
  private baseUrl = "vendor/user";

  async getLoggedInUser(): Promise<IResponse<IUser>> {
    return await https.get({
      url: `vendor/user/me`,
    });
  }

  async updateUserProfile(id: string, payload: IUpdateUserPayload): Promise<IResponse<IUser>> {
    return await https.patch({
      url: `/${this.baseUrl}/${id}/profile`,
      body: JSON.stringify(payload),
    });
  }
}

export default new UserService();
