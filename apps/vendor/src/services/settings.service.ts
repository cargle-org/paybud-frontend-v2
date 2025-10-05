import { IResponse } from "@/types/api";
import { IBanks } from "@/types/business";
import https from "@/utils/https";

class SettingsService {
  private baseUrl = "settings";
  fetchBanks = async (): Promise<IResponse<IBanks[]>> => {
    return await https.get({
      url: `${this.baseUrl}/banks`,
    });
  };
}

export default new SettingsService();
