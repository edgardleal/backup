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
import yargs from 'yargs';
import DBFactory from './src/db/db-factory';
import CliPresenter from './src/presenter/cli';
import BackupFactory from './src/backup/backup-factory';
import BackupCommandContext from './src/backup/backup-command-context';
import Backup from './src/backup-definition/backup';

const logger = debug('backup:main');

const { hideBin } = require('yargs/helpers')

async function run() {
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
    result.executions.push(result.currenteExecution);
    await dbFactory.getBackupWriter().write(result);
  }
  logger('Done');
}

(async () => {
  // eslint-disable-next-line no-unused-expressions
  yargs(hideBin(process.argv))
    .command('list', 'list all backups', (yargsP: any) => {
      yargsP
        .positional('sort', {
          describe: 'fild used to sort data',
          default: 'lastBackup',
        })
    }, async () => {
      const dbFactory = new DBFactory();
      const backups: Backup[] = await dbFactory.getBackupFinder().find({});
      const presenter = new CliPresenter();
      presenter.show(backups);
    })
    .command('backup', 'Execute all backups', run)
    .option('verbose', {
      alias: 'v',
      type: 'boolean',
      description: 'Run with verbose logging',
    })
    .argv;
})();
