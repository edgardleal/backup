/**
 * run.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module run.ts
 */
import i18next from 'i18next';
import Backup from '../../../backup-definition/backup';
import BackupCommandContext from '../../../backup/backup-command-context';
import BackupFactory from '../../../backup/backup-factory';
import DBFactory from '../../../db/db-factory';

import Command from './command';

const Listr = require('listr');

async function executeBackup(backupParameter: Backup, dbFactory: DBFactory) {
  const backup: BackupCommandContext = {
    ...backupParameter,
    currenteExecution: {
      date: new Date(),
      status: 'success',
    },
  }

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
  return result;
}

function createBackupTask(dbFactory: DBFactory) {
  return (backup: Backup) => ({
    title: backup.name || i18next.t('undefined'),
    enabled: () => !backup.disabled,
    task: async (_: any, task: any) => {
      const result = await executeBackup(backup, dbFactory);
      if (result.currenteExecution.size) {
        task.skip();
      }
    },
  });
}

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

    const taskList = backups.map(createBackupTask(dbFactory));
    const tasks = new Listr(taskList);

    await tasks.run();
  }
}
