/**
 * run.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module run.ts
 */
import Backup from '../../../backup-definition/backup';
import BackupCommandContext from '../../../backup/backup-command-context';
import BackupFactory from '../../../backup/backup-factory';
import DBFactory from '../../../db/db-factory';
import Out from '../Out';

import Command from './command';

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

    Out.d('run.running_to', { total: backups.length });
    for (let i = 0; i < backups.length; i += 1) {
      const backup: BackupCommandContext = {
        ...backups[i],
        currenteExecution: {
          date: new Date(),
          status: 'success',
        },
      }

      Out.t('run.running', backup);
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
    Out.t('run.finished');
  }
}
