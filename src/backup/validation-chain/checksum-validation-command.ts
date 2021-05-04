/**
 * checksum-validation-command.ts
 * Copyright (C) 2021 
 *
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module checksum-validation-command.ts
 */
import debug from 'debug';
import fs from 'fs';
import util from 'util';

import BackupCommandContext from '../backup-command-context';
import Command from '../command';

const pstat = util.promisify(fs.stat);

/**
 * To activate this log, set the invironment variable DEBUG to value: backup:checksum-validator
 *
 * DEBUG='backup:checksum-validator'
 *
 */
const logger = debug('backup:checksum-validator');

/**
 * Checke if backup can run based on current and previous checksum
 * @author edgardleal@gmail.com
 * @since 15.03.21
 */
export default class ChecksumValidationCommand extends Command<BackupCommandContext> {
  async run(context: BackupCommandContext): Promise<BackupCommandContext> {
    const stat = await pstat(context.currenteExecution.tmpFile!);
    const executions = (context.executions || []);
    const lastExecution = executions[executions.length - 1] || {};
    logger('Comparing: %o !== %o', stat.size, lastExecution.size);
    if (!lastExecution || stat.size !== lastExecution.size) {
      return this.runNext(context);
    }
    logger('This backup will not run due to same checksum as the last');
    return Promise.resolve(context);
  }
}
