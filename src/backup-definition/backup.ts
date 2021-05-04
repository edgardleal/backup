/**
 * backup.ts
 * Copyright (C) 2021 
 *
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module backup.ts
 */

export interface File {
  path: string;
  size: number;
  mtime: Date;
}

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
  fileList: File[],
  frequency: number;
  name: string;
  disabled?: boolean;
  path: string;
  ignoreList?: (string | RegExp)[];
  lastBackup?: Date;
  executions?: BackupExecution[];
}
