/**
 * S3FileUploader.ts
 * Copyright (C) 2021 
 *
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module S3FileUploader.ts
 */
import debug from 'debug';
import { S3 } from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import FileUploader, { UploadRequest, UploadResult } from '../file-uploader';
import getS3Instance from './s3-instance';

/**
 * To activate this log, run this code on browser console:
 *
 * localStorage.debug = 'backup:s3';
 *
 */
const logger = debug('backup:s3');

// create a new progress bar instance and use shades_classic theme

// start the progress bar with a total value of 200 and start value of 0
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

    // eslint-disable-next-line class-methods-use-this
    progress({ loaded, total }: ManagedUpload.Progress) {
      logger('%d from %d', loaded, total);
    }

    async upload(req: UploadRequest): Promise<UploadResult> {
      const result = {
        size: 0,
        time: 0,
      };
      const start = Date.now();
      const upload = this.s3.upload({
        Bucket: this.bucketName,
        Body: req.body,
        Key: req.name,
        StorageClass: 'STANDARD_IA',
      });

      upload.on('httpUploadProgress', this.progress.bind(this));

      const response = await upload.promise();

      logger('Key %s uploaded', response.Key);
      result.time = Date.now() - start;

      const head = await this.s3.headObject({
        Bucket: this.bucketName,
        Key: response.Key,
      }).promise();

      result.size = head.ContentLength || 0;
      return result;
    }
}
