/**
 * backup.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module backup.ts
 */
export interface BackupExecution {
  tmpFile?: string;
  checksum?: string;
  date: Date;
  time?: number;
  files?: number;
  size?: number;
  status: 'error' | 'success';
}

export default interface Backup {
  currenteExecution: BackupExecution;
  frequency?: string;
  name: string;
  disabled?: boolean;
  path: string;
  ignoreList?: (string | RegExp)[];
  lastBackup?: Date;
  executions?: BackupExecution[];
}
