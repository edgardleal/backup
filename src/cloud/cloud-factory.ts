/**
 * cloud-factory.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module cloud-factory.ts
 */

import S3FileRemover from './aws/s3-file-remover';
import getS3Instance from './aws/s3-instance';
import FileRemover from './file-remover';

/**
 * Create classes instances related to cloud storage
 * @author edgardleal@gmail.com
 * @since 15.03.21
 */
export default class CloudFactory {
  fileRemover: FileRemover;

  getFileRemover(): FileRemover {
    if (!this.fileRemover) {
      this.fileRemover = new S3FileRemover(getS3Instance());
    }
    return this.fileRemover;
  }
}
