export interface IDelete {
  url: string;
  body?: any;
}

export interface IPost extends IDelete {
  body?: string | object;
}

export type IPatch = IPost;

export type IPut = IPost;

export interface IGet extends IDelete {
  query?: Record<string, any>;
}
