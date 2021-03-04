/**
 * disk-backup-finder.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module disk-backup-finder.ts
 */

import fs from 'fs';
import Backup from '../backup';
import BackupFinder from '../backup-finder';
import BackupReader from '../backup-reader';

function allFiles(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir('./db/', {}, (error: any, files: string[]) => {
      if (error) {
        reject(error);
      } else {
        resolve(files
          .filter((f: string): boolean => f.endsWith('.json'))
          .map((f: string): string => `./db/${f}`));
      }
    });
  });
}

/**
 * Find a list of backups on disk
 * @author edgardleal@gmail.com
 * @since 04.03.21
 */
export default class DiskBackupFinder implements BackupFinder {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private reader: BackupReader,
  // eslint-disable-next-line no-empty-function
  ) {}

  async find(filter: Partial<Backup>): Promise<Backup[]> {
    const list = await allFiles();
    const result: Backup[] = [];

    for (let i = 0; i < list.length; i += 1) {
      const file = list[i];
      const backup = await this.reader.read(file);
      if (backup && (!filter.name || backup.name.indexOf(filter.name))) {
        result.push(backup!);
      }
    }

    return result;
  }
}
