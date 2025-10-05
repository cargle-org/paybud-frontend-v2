import { createBaseStore } from "@/store/store";
import { IResponse } from "@/types/api";
import { IFile } from "@/types/file";

class FileService {
  baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/vendor/file`;

  uploadFile(payload: { setProgress?: (progress: number) => void; file: File; folder?: string; label: string }): Promise<IResponse<IFile>> {
    const { folder = "", file, label, setProgress } = payload;
    const fmData = new FormData();
    fmData.append("folder", folder);
    fmData.append("file", file);
    fmData.append("label", label);

    const token = createBaseStore().getState().accessToken;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", function (event) {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setProgress?.(Math.ceil(percentComplete));
        }
      });

      xhr.onload = function () {
        resolve(JSON.parse(xhr.response));
      };

      // Handle network errors
      xhr.onerror = function () {
        reject("Network error during upload");
      };
      xhr.open("POST", this.baseUrl, true);
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      xhr.send(fmData);
    });
  }
}

export default new FileService();
