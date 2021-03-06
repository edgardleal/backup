/**
 * rm.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal
 * @module rm.ts
 */

import BackupReader from '../../../db/backup-reader';
import BackupWriter from '../../../db/backup-writer';
import DBFactory from '../../../db/db-factory';
import Out from '../Out';
import Command from './command';

/**
 * Remove a backup data and remote entries
 * @author edgardleal@gmail.com
 * @since 18.05.21
 */
export default class RM implements Command {
  private reader: BackupReader;

  private writer: BackupWriter;

  constructor() {
    this.reader = new DBFactory().getBackupReader();
    this.writer = new DBFactory().getBackupWriter();
  }

  // eslint-disable-next-line class-methods-use-this
  async run(...args: string[]): Promise<void> { // eslint-disable-line
    const name = args[0];
    const backup = await this.reader.read(name);
    if (!backup) {
      Out.t('db.not_found', { name: args[0] }); // eslint-disable-line
      return;
    }
    Out.t('remove.warning');
  }
}
