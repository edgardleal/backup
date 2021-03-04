/**
 * s3-instance.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module s3-instance.ts
 */

import { S3 } from 'aws-sdk';

let s3: S3;

export default function getS3Instance(): S3 {
  if (!s3) {
    s3 = new S3({
      region: 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }
  return s3;
}
