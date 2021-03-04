/**
 * S3FileUploader.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module S3FileUploader.ts
 */
import { S3 } from 'aws-sdk';
import FileUploader, { UploadRequest } from '../file-uploader';
import getS3Instance from './s3-instance';

/**
 * Upload a file buffer to aws s3
 * @author edgardleal@gmail.com
 * @since 04.03.21
 */
export default class S3FileUploader implements FileUploader {
    private s3: S3;

    private bucketName: string;

    constructor() {
      this.s3 = getS3Instance();
      this.bucketName = process.env.BUCKET!;
    }

    upload(req: UploadRequest): Promise<void> {
      return new Promise((resolve, reject) => {
        this.s3.upload({
          Bucket: this.bucketName,
          Body: req.body,
          Key: req.name,
        }, {}, (error?: Error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    }
}
