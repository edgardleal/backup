/**
 * file-uploader.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module file-uploader.ts
 */

export interface UploadRequest {
  body: Buffer | any;
  name: string;
}
export default interface FileUploader {
  upload: (req: UploadRequest) => Promise<void>;
}
