/**
 * backup-writer.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module backup-writer.ts
 */
import Backup from './backup';

export default interface BackupWriter {
  write: (backup: Backup) => Promise<void>;
}
