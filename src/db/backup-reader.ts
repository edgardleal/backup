/**
 * backup-reader.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module backup-reader.ts
 */
import Backup from './backup';

export default interface BackupReader {
  read: (name: string) => Promise<Backup | null>;
}
