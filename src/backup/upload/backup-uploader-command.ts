/**
 * s3-backup-uploader-command.ts
 * Copyright (C) 2021 
 *
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module s3-backup-uploader-command.ts
 */

import fs from 'fs';
import FileUploader from '../../cloud/file-uploader';
import BackupCommandContext from '../backup-command-context';
import Command from '../command';

/**
 * Send a backup file to aws s3
 * @author edgardleal@gmail.com
 * @since 15.03.21
 */
export default class BackupUploaderCommand extends Command<BackupCommandContext> {
  private uploader: FileUploader;

  constructor(uploader: FileUploader) {
    super();
    this.uploader = uploader;
  }

  async run(context: BackupCommandContext): Promise<BackupCommandContext> {
    const stream = fs.createReadStream(context.currenteExecution.tmpFile!);
    const uploadResult = await this.uploader.upload({
      body: stream,
      name: `backup/${context.name}.tgz`,
    });
    context.currenteExecution.time = uploadResult.time;

    return this.runNext(context);
  }
}
