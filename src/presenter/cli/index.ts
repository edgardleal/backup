/**
 * index.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module index.ts
 */

import Backup from '../../backup-definition/backup';
import Presenter from '../presenter';
import CliDataProvider from './cli-data-provider';
import rfill from './rfill';
import TableRow from './table/table-row';

/**
 * Show backups data on terminal
 * @author edgardleal@gmail.com
 * @since 09.03.21
 */
export default class CliPresenter implements Presenter {
  // eslint-disable-next-line class-methods-use-this
  async show(backups: Backup[]) {
    const header = `+-${rfill('', 10, '-')}-+-${rfill('', 20, '-')}-+-${rfill('', 10, '-')}-+`;
    const titles = `| ${rfill('Backup')} | ${rfill('Last run', 20)} | ${rfill('Size', 10)} |`;
    console.log(header); // eslint-disable-line
    console.log(titles); // eslint-disable-line
    console.log(header); // eslint-disable-line
    for (let i = 0; i < backups.length; i += 1) {
      const backup = backups[i];
      const provider: CliDataProvider<Backup> = {
        getData() {
          return Promise.resolve(backup);
        },
      }
      const row = await new TableRow(provider).render();
      console.log('%s', row); // eslint-disable-line
    }
    console.log(header); // eslint-disable-line
  }
}
