/**
 * since.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module since.ts
 */

import chalk from 'chalk';
import Backup from '../../db/backup';
import CliComponent from './cli-component';
import CliDataProvider from './cli-data-provider';
import rfill from './rfill';

const since = require('since-time-ago');

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

function colorizeLastBackup(date: Date): string {
  const days = Math.round((new Date().getTime() - date.getTime()) / ONE_DAY);
  const text = since(date);
  const filled = rfill(text, 20);
  if (days < 2) {
    return chalk.green(filled);
  }
  if (days < 7) {
    return chalk.yellow(filled);
  }
  return chalk.red(filled);
}

/**
 * Sender a since Date.
 * EX.: 1 day ago
 * @author edgardleal@gmail.com
 * @since 22.03.21
 */
export default class Since implements CliComponent {
  // eslint-disable-next-line no-useless-constructor
  constructor(private dataProvider: CliDataProvider<Backup>) {
  // eslint-disable-next-line no-empty-function
  }

  async render(): Promise<string> {
    const { lastBackup } = await this.dataProvider.getData();
    return colorizeLastBackup(new Date(lastBackup!));
  }
}
