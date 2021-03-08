/**
 * index.ts
 * Copyright (C) 2020 Editora Sanar
 *
 * Distributed under terms of the MIT license.
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module index.ts
 */
require('dotenv/config');

import util from 'util';
import path from 'path';
import fs from 'fs';
import debug from 'debug';
import BackupCommand from './src/backup/backup-command';
import S3FileUploader from './src/cloud/aws/S3FileUploader';
import Backup from './src/db/backup';
import DBFactory from './src/db/db-factory';

const pstat = util.promisify(fs.stat);

const logger = debug('backup:main');

async function lastModifiedDate(targetPath: string): Promise<Date> {
  const stat = await pstat(targetPath);
  return stat.mtime;
}

(async () => {
  const dbFactory = new DBFactory();
  const backups: Backup[] = await dbFactory.getBackupFinder().find({});

  for (let i = 0; i < backups.length; i += 1) {
    const backup = backups[i];
    const modified = await lastModifiedDate(path.join(process.env.HOME!, backup.path));

    if (!backup.disabled) {
      if ((!backup.lastBackup || (backup.lastBackup < modified))) {
        logger('Running backup %s ...', backup.name);
        const result = await new BackupCommand(new S3FileUploader()).run(backup);
        await dbFactory.getBackupWriter().write(result);
      } else {
        logger(
          '%s was not modified sinse last backup: %s',
          backup.path,
          backup.lastBackup,
        );
      }
    } else {
      logger('Backup skiped due to disabled status: %s', backup.name);
    }
  }
  logger('Done');
})();
