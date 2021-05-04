/**
 * backup-timer-command.ts
 * Copyright (C) 2021 
 *
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module backup-timer-command.ts
 */

import BackupCommandContext from '../backup-command-context';
import Command from '../command';

/**
 * Register the execution time foa a backup execution
 * @author edgardleal@gmail.com
 * @since 15.03.21
 */
export default class BackupTimerCommand extends Command<BackupCommandContext> {
  // eslint-disable-next-line class-methods-use-this
  run(context: BackupCommandContext): Promise<BackupCommandContext> {
    const finish = new Date();
    const started = context.currenteExecution.date;
    context.currenteExecution.time = finish.getTime() - started.getTime();
    context.currenteExecution.date = finish;
    context.lastBackup = finish;

    return Promise.resolve(context);
  }
}
