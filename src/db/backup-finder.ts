/**
 * backup-finder.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module backup-finder.ts
 */
import Backup from './backup';

export default interface BackupFinder {
  find: (filter: Partial<Backup>) => Promise<Backup[]>;
}
