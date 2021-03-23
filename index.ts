/**
 * index.ts
 * Copyright (C) 2020 Editora Sanar
 *
 * Distributed under terms of the MIT license.
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module index.ts
 */
require('dotenv/config');

import yargs from 'yargs';
import List from './src/presenter/cli/command/list';
import Run from './src/presenter/cli/command/run';

const { hideBin } = require('yargs/helpers');

(async () => {
  // eslint-disable-next-line no-unused-expressions
  yargs(hideBin(process.argv))
    .command('list', 'list all backups', (yargsP: any) => {
      yargsP
        .positional('sort', {
          describe: 'fild used to sort data',
          default: 'lastBackup',
        })
    }, async () => new List().run())
    .command('backup', 'Execute all backups', () => new Run().run())
    .option('verbose', {
      alias: 'v',
      type: 'boolean',
      description: 'Run with verbose logging',
    })
    .argv;
})();
