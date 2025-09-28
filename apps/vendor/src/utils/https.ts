/* eslint-disable no-param-reassign */
import axios from "axios";
import QueryString from "query-string";
import { createBaseStore } from "@/store/store";
import { IDelete, IGet, IPatch, IPost, IPut } from "@/types/https";

class HttpFacade {
  private http;
  private isRefreshing = false;
  private failedQueue: Array<{ resolve: Function; reject: Function }> = [];

  constructor() {
    this.http = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
      headers: { "content-type": "application/json" },
    });

    this.http.interceptors.request.use(
      (config) => {
        const token = createBaseStore().getState().accessToken;
        if (token) config.headers!.Authorization = "Bearer " + token;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // // Response interceptor to handle token refresh
    // this.http.interceptors.response.use(
    //   (response) => response,
    //   async (error) => {
    //     const originalRequest = error.config;

    //     if (error.response?.status === 401 && !originalRequest._retry) {
    //       if (this.isRefreshing) {
    //         // If we're already refreshing, queue this request
    //         return new Promise((resolve, reject) => {
    //           this.failedQueue.push({ resolve, reject });
    //         })
    //           .then((token) => {
    //             originalRequest.headers.Authorization = "Bearer " + token;
    //             return this.http(originalRequest);
    //           })
    //           .catch((err) => Promise.reject(err));
    //       }

    //       originalRequest._retry = true;
    //       this.isRefreshing = true;

    //       try {
    //         const store = createBaseStore().getState();
    //         const refreshToken = sessionStorage.getItem("refreshToken") || store.refreshToken;

    //         if (!refreshToken) {
    //           throw new Error("No refresh token available");
    //         }

    //         // Call your refresh token endpoint
    //         const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`, {
    //           refreshToken,
    //         });

    //         const { accessToken, refreshToken: newRefreshToken } = response.data;

    //         // Update tokens in store
    //         createBaseStore().setState({
    //           accessToken,
    //           refreshToken: newRefreshToken,
    //         });

    //         // Process all queued requests
    //         this.processQueue(null, accessToken);

    //         // Retry the original request
    //         originalRequest.headers.Authorization = "Bearer " + accessToken;
    //         return this.http(originalRequest);
    //       } catch (refreshError) {
    //         this.processQueue(refreshError, null);

    //         // Clear tokens and redirect to login
    //         createBaseStore().setState({
    //           accessToken: null,
    //           refreshToken: null,
    //         });

    //         // Redirect to login page
    //         if (typeof window !== "undefined") {
    //           window.location.href = "/auth/login";
    //         }

    //         return Promise.reject(refreshError);
    //       } finally {
    //         this.isRefreshing = false;
    //       }
    //     }

    //     return Promise.reject(error);
    //   }
    // );
  }

  private processQueue(error: any, token: string | null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });

    this.failedQueue = [];
  }

  post = async ({ url, body }: IPost) => {
    const response = await this.http.post(url, body);
    return response.data;
  };

  patch = async ({ url, body }: IPatch) => {
    const response = await this.http.patch(url, body);
    return response.data;
  };

  get = async ({ url, query = {} }: IGet) => {
    const queryString = `?${QueryString.stringify(query)}`;
    const response = await this.http.get(`${url + queryString}`);
    return response.data;
  };

  delete = async ({ url }: IDelete) => {
    const response = await this.http.delete(url);
    return response.data;
  };

  put = async ({ url, body }: IPut) => {
    const response = await this.http.put(url, body);
    return response.data;
  };
}

export default new HttpFacade();
