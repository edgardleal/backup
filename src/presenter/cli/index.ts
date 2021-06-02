/**
 * index.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module index.ts
 */

import chalk from 'chalk';
import Backup from '../../backup-definition/backup';
import { translate as t } from '../../i18n';
import Presenter from '../presenter';
import CliDataProvider from './cli-data-provider';
import Since from './since';
import FileSize from './size';

const Table = require('cli-table');

function parseName(backup: Backup): string {
  if (backup.disabled) {
    return chalk.strikethrough(backup.name);
  }
  return backup.name;
}

/**
 * Show backups data on terminal
 * @author edgardleal@gmail.com
 * @since 09.03.21
 */
export default class CliPresenter implements Presenter {
  // eslint-disable-next-line class-methods-use-this
  async show(backups: Backup[]) {
    const table = new Table({
      head: [
        t('backup', '???') || 'xxx',
        t('last_run', '???') || 'xxx',
        t('size', '???') || 'xxx',
      ],
    });

    for (let i = 0; i < backups.length; i += 1) {
      const backup = backups[i];
      const promisedBackup = Promise.resolve(backup);
      const dataProvider: CliDataProvider = {
        getData: () => promisedBackup,
      }
      const date = await (new Since(dataProvider)).render();
      const size = await new FileSize(dataProvider).render();

      table.push([parseName(backup), date, size]);
    }
    console.log('%s', table.toString()); // eslint-disable-line
  }
}
