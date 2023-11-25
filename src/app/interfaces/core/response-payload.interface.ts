export interface ResponsePayload {
  success: boolean;
  data?: any;
  count?: number;
  message?: string;
}

export interface ImageUploadResponse {
  name: string;
  size: number;
  url: string;
}

