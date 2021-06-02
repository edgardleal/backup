/**
 * en.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal
 * @module en.ts
 */

export default {
  translation: {
    db: {
      not_found: 'Backup not found [{{ name }}]!',
    },
    config: {
      invalid_name: 'Invalid Name!',
      inquire_bucket: 'What is the AWS S3 Bucket name?',
    },
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
    disable: {
      done: 'The Backup [{{ name }}] was disabled.',
      help: 'Disable a Backup',
    },
    enable: {
      done: 'The Backup [{{ name }}] was enabled.',
      help: 'Enable a backup',
    },
    remove: {
      help: 'Remove a Backup from local database and from cloud',
      warning: 'This command is disabled due to hight risk. You should remove it yourself',
    },
    size: 'Size',
    backup: 'Backup',
    last_run: 'Last Run',
  },
};
