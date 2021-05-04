/**
 * run.ts
 * Copyright (C) 2021 
 *
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module run.ts
 */
import debug from 'debug';
import Backup from '../../../backup-definition/backup';
import BackupCommandContext from '../../../backup/backup-command-context';
import BackupFactory from '../../../backup/backup-factory';
import DBFactory from '../../../db/db-factory';

import Command from './command';

const logger = debug('backup:run');
/**
 * Run backup command
 * @author edgardleal@gmail.com
 * @since 23.03.21
 */
export default class Run implements Command {
  // eslint-disable-next-line class-methods-use-this
  async run(): Promise<void> {
    const dbFactory = new DBFactory();
    const backups: Backup[] = await dbFactory.getBackupFinder().find({});

    for (let i = 0; i < backups.length; i += 1) {
      const backup: BackupCommandContext = {
        ...backups[i],
        currenteExecution: {
          date: new Date(),
          status: 'success',
        },
      }

      logger('Running backup %s ...', backup.name);
      const result = await BackupFactory.getBackupCommant().run(backup);
      result.executions = (result.executions || []);
      if (result.currenteExecution.size) {
        result.executions.push(result.currenteExecution);
      } else {
        const index = result.executions.length - 1;
        const lastExecution = result.executions[index];
        if (lastExecution) {
          result.currenteExecution = lastExecution;
        }
      }
      await dbFactory.getBackupWriter().write(result);
    }
    logger('Done');
  }
}
