/**
 * index.ts
 * Copyright (C) 2020 Editora Sanar
 *
 * Distributed under terms of the MIT license.
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module index.ts
 */
require('dotenv/config');

import debug from 'debug';
import BackupCommand from './src/backup/backup-command';
import S3FileUploader from './src/cloud/aws/S3FileUploader';
import Backup from './src/db/backup';
import DBFactory from './src/db/db-factory';

const logger = debug('backup:main');

(async () => {
  const dbFactory = new DBFactory();
  const backups: Backup[] = await dbFactory.getBackupFinder().find({});

  for (let i = 0; i < backups.length; i += 1) {
    const backup = backups[i];
    if (!backup.disabled) {
      logger('Running backup %s ...', backup.name);
      const result = await new BackupCommand(new S3FileUploader()).run(backup);
      await dbFactory.getBackupWriter().write(result);
    } else {
      logger('Backup skiped due to disabled status: %s', backup.name);
    }
  }
  logger('Done');
})();
