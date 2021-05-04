/**
 * enabled-backup-validation-commant.ts
 * Copyright (C) 2021 
 *
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module enabled-backup-validation-commant.ts
 */
import debug from 'debug';

import BackupCommandContext from '../backup-command-context';
import Command from '../command';

/**
 * To activate this log, set the invironment variable DEBUG to value: backup:disabled-validator
 *
 * DEBUG='backup:disabled-validator'
 *
 */
const logger = debug('backup:disabled-validator');

/**
 * Check if a backup can be executed based on its disabled field
 * @author edgardleal@gmail.com
 * @since 15.03.21
 */
export default class EnabledBackupValidationCommant extends Command<BackupCommandContext> {
  run(context: BackupCommandContext): Promise<BackupCommandContext> {
    if (context && !context.disabled) {
      return this.runNext(context);
    }
    logger('%s will not run due to disabled status', (context || { name: 'null' }).name);
    return Promise.resolve(context);
  }
}
