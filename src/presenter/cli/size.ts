/**
 * size.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module size.ts
 */
import chalk from 'chalk';
import filesize from 'filesize';
import Backup from '../../backup-definition/backup';
import CliComponent from './cli-component';
import CliDataProvider from './cli-data-provider';
import rfill from './rfill';

const ONE_K = 1024;
const ONE_M = ONE_K * ONE_K;
const ONE_G = ONE_M * ONE_M;

export function formatSize(size: number = 0): string {
  const filled = rfill(filesize(size));
  if (size < ONE_M) {
    return chalk.green(filled);
  }
  if (size > ONE_G) {
    return chalk.red(filled);
  }

  return chalk.yellow(filled);
}

/**
 * Sender a File Size
 * @author edgardleal@gmail.com
 * @since 22.03.21
 */
export default class FileSize implements CliComponent {
  // eslint-disable-next-line no-useless-constructor
  constructor(private dataProvider: CliDataProvider<Backup>) {
  // eslint-disable-next-line no-empty-function
  }

  async render(): Promise<string> {
    const backup = await this.dataProvider.getData();
    return Promise.resolve(formatSize((backup.currenteExecution || { size: 0 }).size));
  }
}
