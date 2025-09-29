import { IResponse } from "@/types/api";
import { ILoginPayLoad, ILoginResponse, IRegisterPayLoad } from "@/types/auth";
import { IUser } from "@/types/user";
import https from "@/utils/https";

class AuthService {
  private baseUrl = "vendor/auth";
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

  register = async (payload: IRegisterPayLoad): Promise<IResponse<IUser>> => {
    return await https.post({
      url: `${this.baseUrl}/register`,
      body: JSON.stringify(payload),
    });
  };

  getVerifyEmail = async (email: string): Promise<IResponse> => {
    return await https.get({
      url: `${this.baseUrl}/verify-email-token`,
      query: { email },
    });
  };

  verifyEmail = async ({ token, email }: { token: string; email: string }): Promise<IResponse> => {
    return await https.post({
      url: `${this.baseUrl}/verify-email`,
      body: JSON.stringify({ token, email }),
    });
  };

  forgotPassword = async (email: string): Promise<IResponse> => {
    return await https.get({
      url: `${this.baseUrl}/forgot-password`,
      query: { email },
    });
  };

  resetPassword = async (payload: { token: string; password: string }): Promise<IResponse> => {
    return await https.post({
      url: `${this.baseUrl}/reset-password`,
      body: JSON.stringify(payload),
    });
  };

  logout = async (userId: string): Promise<IResponse> => {
    return await https.delete({
      url: `${this.baseUrl}/logout/${userId}`,
    });
  };

  refreshToken = async (): Promise<IResponse> => {
    return await https.get({
      url: `${this.baseUrl}/refresh-token`,
    });
  };
}

export default new AuthService();
