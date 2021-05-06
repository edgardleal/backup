/**
 * frequency-validation.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module frequency-validation.ts
 */

import BackupCommandContext from '../backup-command-context';
import Command from '../command';

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

/**
 * Check a frequency of a backup to decide if it can continue or not
 * @author edgardleal@gmail.com
 * @since 07.04.21
 */
export default class FrequencyValidation extends Command<BackupCommandContext> {
  // eslint-disable-next-line class-methods-use-this
  async run(context: BackupCommandContext): Promise<BackupCommandContext> {
    const diff = new Date().getTime() - (context.lastBackup || new Date(0)).getTime();
    if (diff > ((context.frequency || 1) * ONE_DAY)) {
      return this.runNext(context);
    }
    return Promise.resolve(context);
  }
}
