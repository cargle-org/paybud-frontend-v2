import { IResponse } from "@/types/api";
import { ICreateBusinessDTO } from "@/types/business";
import https from "@/utils/https";

class BusinessService {
  private baseUrl = "vendor/business";

  createBusiness = (payload: ICreateBusinessDTO): Promise<IResponse> => {
    return https.post({
      url: `${this.baseUrl}`,
      body: JSON.stringify(payload),
    });
  };
}

export default new BusinessService();
