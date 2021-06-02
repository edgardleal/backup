/**
 * s3-file-remover.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal
 * @module s3-file-remover.ts
 */

import nconf from 'nconf';
import { S3 } from 'aws-sdk';
import { DeleteObjectRequest } from 'aws-sdk/clients/s3';
import FileRemover from '../file-remover';
import { ConfigKey } from '../../config';

/**
 * Remove an file from main bucket
 * @author edgardleal@gmail.com
 * @since 01.06.21
 */
export default class S3FileRemover implements FileRemover {
  private s3Instance: S3;

  constructor(s3: S3) {
    this.s3Instance = s3;
  }

  async remove(key: string): Promise<void> {
    const parameter: DeleteObjectRequest = {
      Bucket: nconf.get(ConfigKey.BUCKET),
      Key: key,
    };
    await this.s3Instance
      .deleteObject(parameter).promise();
  }
}
