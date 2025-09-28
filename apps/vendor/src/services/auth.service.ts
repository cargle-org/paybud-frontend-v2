import { IResponse } from "@/types/api";
import { ILoginPayLoad, ILoginResponse } from "@/types/auth";
import https from "@/utils/https";

class AuthService {
  baseUrl = "vendor/auth";
  login = async (payload: ILoginPayLoad): Promise<IResponse<ILoginResponse>> => {
    return await https.post({
      url: `${this.baseUrl}/login`,
      body: JSON.stringify(payload),
    });
  };

  googleLogin = async (token: string): Promise<IResponse<ILoginResponse>> => {
    return await https.post({
      url: `${this.baseUrl}/google-login`,
      body: JSON.stringify({ token }),
    });
  };

  facebookLogin = async (token: string): Promise<IResponse<ILoginResponse>> => {
    return await https.post({
      url: `${this.baseUrl}/facebook-login`,
      body: JSON.stringify({ token }),
    });
  };
}

export default new AuthService();
