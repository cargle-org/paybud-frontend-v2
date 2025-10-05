import { IDocument } from "./api";

export interface IFile extends IDocument {
  label: string;
  ownerType: "vendor" | "client" | "app" | "other";
  fileName: string;
  mimeType: string;
  url: string;
  folder: string;
  isPublic: boolean;
  size: number;
}
