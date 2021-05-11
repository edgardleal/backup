/**
 * show.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module show.ts
 */

import BackupReader from '../../../db/backup-reader';
import DBFactory from '../../../db/db-factory';
import Out from '../Out';
import Since from '../since';
import { formatSize } from '../size';
import Command from './command';

const Chart = require('cli-chart');
/**
 * Show details for a backup
 * @author edgardleal@gmail.com
 * @since 24.03.21
 */
export default class Show implements Command {
  private reader: BackupReader

  // eslint-disable-next-line no-useless-constructor
  constructor() {
    this.reader = new DBFactory().getBackupReader();
  }

  async run(...args: string[]): Promise<void> {
    Out.info('\n\n\n');
    const marging = '   ';
    const backup = await this.reader.read(args[0]);
    if (!backup) {
      Out.info('Backup [%s] not found', args[0]); // eslint-disable-line
      return;
    }
    const chart = new Chart({
      xlabel: 'days',
      ylabel: 'size',
      direction: 'y',
      width: 40,
      height: 10,
      lmargin: 5,
      step: 2,
    });
    const dataProvider = {
      getData: () => Promise.resolve(backup),
    };
    const lastBackup = await new Since(dataProvider).render();
    Out.info('%sName : %s', marging, backup.name); // eslint-disable-line
    Out.info('%sFreq : %d day(s)', marging, backup.frequency || 1); // eslint-disable-line
    Out.info('%sLast : %s', marging, lastBackup); // eslint-disable-line
    Out.info('%sSize : %s\n', marging, formatSize((backup.currenteExecution || { size: 0 }).size)); // eslint-disable-line

    const executions = (backup!.executions || []);
    let i = Math.max(0, executions.length - 20);
    for (; i < executions.length; i += 1) {
      const execution = backup!.executions![i];
      if (execution.size) {
        chart.addBar(execution.size || 0);
      }
    }
    chart.draw();
  }
}
