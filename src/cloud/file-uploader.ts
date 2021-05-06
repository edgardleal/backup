/**
 * file-uploader.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module file-uploader.ts
 */

export interface UploadRequest {
  body: Buffer | any;
  name: string;
}

export interface UploadResult {
  size?: number;
  time?: number;
}

export default interface FileUploader {
  upload: (req: UploadRequest) => Promise<UploadResult>;
}
