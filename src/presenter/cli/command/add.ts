/**
 * add.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal
 * @module add.ts
 */

import Backup from '../../../backup-definition/backup';
import DBFactory from '../../../db/db-factory';
import Out from '../Out';
import Command from './command';

/**
 * Include a new directory to be tracked
 * @author edgardleal@gmail.com
 * @since 18.05.21
 */
export default class ADD implements Command {
  // eslint-disable-next-line class-methods-use-this
  async run(...args: string[]): Promise<void> { // eslint-disable-line
    const dbFactory = new DBFactory();
    const backup: Backup = {
      currenteExecution: {
        date: new Date(),
        status: 'created',
      },
      path: args[0],
      name: args[1],
      frequency: parseInt(args[2] || '1', 10),
      fileList: [],
    };
    const exists = await dbFactory.getBackupFinder().find(backup);
    if (exists) {
      Out.t('add.error.exists', backup);
    } else {
      await dbFactory.getBackupWriter().write(backup);
      Out.t('add.success', backup);
    }
  }
}
