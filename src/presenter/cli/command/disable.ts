/**
 * disable.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal
 * @module disable.ts
 */
import BackupReader from '../../../db/backup-reader';
import BackupWriter from '../../../db/backup-writer';
import DBFactory from '../../../db/db-factory';
import Out from '../Out';
import Command from './command';

/**
 * Enable a backup that is disabled
 * @author edgardleal@gmail.com
 * @since 01.06.21
 */
export default class Disable implements Command {
  private reader: BackupReader;

  private writer: BackupWriter;

  constructor() {
    this.reader = new DBFactory().getBackupReader();
    this.writer = new DBFactory().getBackupWriter();
  }

  async run(...args: string[]): Promise<void> {
    Out.info('\n\n\n');
    const backup = await this.reader.read(args[0]);
    if (!backup) {
      Out.t('db.not_found', { name: args[0] }); // eslint-disable-line
      return;
    }
    if (!backup.disabled) {
      backup.disabled = true;
      await this.writer.write(backup);
      Out.t('disable.done', { name: args[0] }); // eslint-disable-line
    }
  }
}
