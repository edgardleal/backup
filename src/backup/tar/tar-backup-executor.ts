/**
 * tar-backup-executor.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module tar-backup-executor.ts
 */
import debug from 'debug';

import util from 'util';
import checksum from 'checksum';
import fs from 'fs';
import path from 'path';
import tmp from 'tmp';
import tar from 'tar';

import Command from '../command';
import BackupCommandContext from '../backup-command-context';
import { File } from '../../backup-definition/backup';

const pstat = util.promisify(fs.stat);

/**
 * To activate this log, set the invironment variable DEBUG to value: backup:tar
 *
 * DEBUG='backup:tar'
 *
 */
const logger = debug('backup:tar');

/**
 * Compact backup files using tar command
 * @author edgardleal@gmail.com
 * @since 15.03.21
 */
export default class TarBackupCommand extends Command<BackupCommandContext> {
  private tmpFile: tmp.FileResult;

  setTmpFile(file: tmp.FileResult) {
    this.tmpFile = file;
  }

  async createTar(backup: BackupCommandContext): Promise<void> {
    let totalFiles = 0;
    const ignoreList = backup.ignoreList || [];
    const finalPath = path.join(process.env.HOME!, backup.path);
    const fileList: File[] = [];

    return new Promise((resolve) => {
      const stream = tar.c({
        gzip: {
          level: 9,
        },
        filter: (p: string) => {
          let shouldInclude = true;
          if (ignoreList.length !== 0) {
            for (let i = 0; i < ignoreList.length; i += 1) {
              const pattern = ignoreList[i];
              if (typeof pattern === 'string') {
                shouldInclude &&= p.indexOf(pattern) === -1;
              } else {
                shouldInclude &&= !pattern.test(p);
              }
            }
          }

          if (shouldInclude) {
            totalFiles += 1;
            fileList.push({
              path: p,
              size: 0,
              mtime: 0,
            });
          }

          return shouldInclude;
        },
      },
      [finalPath]);

      stream.pipe(fs.createWriteStream(this.tmpFile.name));
      stream.on('end', () => {
        // eslint-disable-next-line no-param-reassign
        backup.fileList = fileList;
        logger('Data writed to tmp file');
        // eslint-disable-next-line no-param-reassign
        backup.currenteExecution.files = totalFiles;
        // eslint-disable-next-line no-param-reassign
        backup.currenteExecution.checksum = checksum(this.tmpFile.name);

        resolve();
      });
    });
  }

  async run(context: BackupCommandContext): Promise<BackupCommandContext> {
    this.tmpFile = tmp.fileSync();
    logger('TMP file created at: %s', this.tmpFile.name);
    context.currenteExecution.tmpFile = this.tmpFile.name;

    try {
      await this.createTar(context);
      const stat = await pstat(context.currenteExecution.tmpFile);
      context.currenteExecution.size = stat.size;
      logger('%s, size: %d', context.currenteExecution.tmpFile, stat.size);
      context.currenteExecution.checksum = checksum(this.tmpFile.name);
      const result = await this.runNext(context);
      return result;
    } finally {
      this.tmpFile.removeCallback();
    }
  }
}
