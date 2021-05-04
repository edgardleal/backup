/**
 * list.ts
 * Copyright (C) 2021 
 *
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module list.ts
 */

import CliPresenter from '..';
import Backup from '../../../backup-definition/backup';
import DBFactory from '../../../db/db-factory';
import Command from './command';

/**
 * List all backups in current database
 * @author edgardleal@gmail.com
 * @since 23.03.21
 */
export default class List implements Command {
  // eslint-disable-next-line class-methods-use-this
  async run(): Promise<void> {
    const dbFactory = new DBFactory();
    const backups: Backup[] = await dbFactory.getBackupFinder().find({});
    const presenter = new CliPresenter();
    presenter.show(backups);
  }
}
