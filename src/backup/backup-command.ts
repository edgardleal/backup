/**
 * backup-command.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module backup-command.ts
 */

import path from 'path';
import tar from 'tar';
import FileUploader from '../cloud/file-uploader';
import Backup, { BackupExecution } from '../db/backup';
import Command from './command';

/**
 * Run a backup command
 * @author edgardleal@gmail.com
 * @since 04.03.21
 */
export default class BackupCommand implements Command<Backup> {
  uploader: FileUploader;

  constructor(uploader: FileUploader) {
    this.uploader = uploader;
  }

  async run(backup: Backup): Promise<Backup> {
    const execution: BackupExecution = {
      date: new Date(),
      status: 'success',
    };

    const result = {
      ...backup,
    };
    const finalPath = path.join(process.env.HOME!, backup.path);
    const ignoreList = backup.ignoreList || [];
    try {
      const stream = tar.c({
        gzip: true,
        filter: (p: string) => {
          if (ignoreList.length === 0) {
            return true;
          }
          for (let i = 0; i < ignoreList.length; i += 1) {
            const pattern = ignoreList[i];
            if (typeof pattern === 'string') {
              return p.indexOf(pattern) === -1;
            }
            return !pattern.test(p);
          }

          return true;
        },
      },
      [finalPath]);

      const uploadResult = await this.uploader.upload({
        body: stream,
        name: `backup/${backup.name}.tgz`,
      });

      execution.time = uploadResult.time;
      execution.size = uploadResult.size;
    } catch (e) {
      console.log('Error: %o', e); // eslint-disable-line
      execution.status = 'error';
    }
    result.executions = (result.executions || []);

    const now = new Date();
    execution.date = now;
    result.lastBackup = now;
    result.executions.push(execution);

    return result;
  }
}
