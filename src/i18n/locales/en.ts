/**
 * en.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal
 * @module en.ts
 */

export default {
  translation: {
    undefined: '[Undefined]',
    add: {
      success: '[{{ name }}] registered.',
      help: 'Include a directory do be tracked',
      name: 'The name used to identify this backup',
      frequency: 'Numbers of day to do each backup',
      error: {
        exists: 'The backup {{ name }} already exists.',
      },
    },
    help: {
      show: 'show details about an backup',
      show_name: 'The backup name',
    },
    check: {
      help: 'This command is an alias to backup command',
    },
    run: {
      running_to: 'Running {{ total }} backups...',
      help: 'Check if has any backup to run today, if has, run it',
      running: 'Running backup {{name}}...',
      finished: 'Done',
    },
    size: 'Size',
    backup: 'Backup',
    last_run: 'Last Run',
  },
};
