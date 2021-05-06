/**
 * disk-backup-reader.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module disk-backup-reader.ts
 */

import fs from 'fs';
import Backup from '../backup';
import BackupReader from '../backup-reader';
import { resolvePath } from './disk-manager';

/**
 * Read backup information from disk
 * @author edgardleal@gmail.com
 * @since 04.03.21
 */
export default class DiskBackupReader implements BackupReader {
  // eslint-disable-next-line class-methods-use-this
  read(name: string): Promise<Backup | null> {
    let fileName = resolvePath(name);
    if (!fs.existsSync(fileName)) {
      fileName = resolvePath(`/db/${name}.json`);
    }
    if (!fs.existsSync(fileName)) {
      return Promise.resolve(null);
    }

    const content = fs.readFileSync(fileName);
    const result = JSON.parse(content.toString());
    return Promise.resolve(result);
  }
}
