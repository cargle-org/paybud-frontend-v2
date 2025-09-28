interface IDocument {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IResponse<D = null> {
  data?: D;
  status: boolean;
  message: string;
}
