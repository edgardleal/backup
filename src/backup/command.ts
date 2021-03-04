/**
 * command.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module command.ts
 */
import Backup from '../db/backup';

export default interface Command<T = any> {
  run: (backup: Backup) => Promise<T>;
}
