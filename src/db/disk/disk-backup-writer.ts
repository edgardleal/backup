/**
 * disk-backup-writer.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module disk-backup-writer.ts
 */
import fs from 'fs';
import Backup from '../backup';
import BackupWriter from '../backup-writer';
import { mkdir, resolvePath } from './disk-manager';

/**
 * Write backup information on disk
 *
 * @author edgardleal@gmail.com
 * @since 04.03.21
 */
export default class DiskBackupWriter implements BackupWriter {
  // eslint-disable-next-line class-methods-use-this
  async write(backup: Backup): Promise<void> {
    await mkdir('/db');
    const content = JSON.stringify(backup, null, 2);
    fs.writeFileSync(
      resolvePath(`/db/${backup.name}.json`),
      content,
      {
        encoding: 'utf8',
      },
    );
  }
}
