/**
 * index.ts
 * Copyright (C) 2020
 *
 * Distributed under terms of the MIT license.
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module index.ts
 */
require('dotenv/config');

import yargs, { Arguments, Argv } from 'yargs';
import List from './src/presenter/cli/command/list';
import Run from './src/presenter/cli/command/run';
import Show from './src/presenter/cli/command/show';
import setupTranslation, { translate as t } from './src/i18n';
import Out from './src/presenter/cli/Out';

const { hideBin } = require('yargs/helpers');

(async () => {
  const translator = await setupTranslation();
  Out.setTranslator(translator);
  // eslint-disable-next-line no-unused-expressions
  const { argv } = yargs(hideBin(process.argv))
    .command(
      'show',
      t('help.show'),
      (builder: Argv) => {
        builder.positional('name', {
          description: t('help.show_name'),
        })
      },
      async (args: Arguments) => new Show().run(args._[1] as string),
    )
    .command('list', 'list all backups', (yargsP: any) => {
      yargsP
        .positional('sort', {
          describe: 'fild used to sort data',
          default: 'lastBackup',
        })
    }, async () => new List().run())
    .command('backup', t('run.help'), () => new Run().run())
    .command('check', t('check.help'), () => new Run().run())
    .option('verbose', {
      alias: 'v',
      type: 'boolean',
      description: 'Run with verbose logging',
    });
  Out.setVerbose(argv.verbose);
})();
