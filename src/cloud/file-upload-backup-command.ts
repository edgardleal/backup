/**
 * s3-backup-command.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module s3-backup-command.ts
 */

import Command from '../backup/command';
import Backup from '../db/backup';
import FileUploader from './file-uploader';

/**
 * Implements a backup command do send files do aws s3
 *
 * @author edgardleal@gmail.com
 * @since 15.03.21
 */
export default class FileUploadBackupCommand extends Command<Backup> {
  private fileUploader: FileUploader;

  async run(context: Backup): Promise<Backup> {
    return this.runNext(context);
  }

  constructor(fileUploader: FileUploader) {
    super();
    this.fileUploader = fileUploader;
  }
}
