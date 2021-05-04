/**
 * backup-factory.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module backup-factory.ts
 */

import S3FileUploader from '../cloud/aws/S3FileUploader';
import BackupCommandContext from './backup-command-context';
import Command from './command';
import FrequencyValidation from './frequency-validation/frequency-validation';
import TarBackupCommand from './tar/tar-backup-executor';
import BackupTimerCommand from './timer/backup-timer-command';
import BackupUploaderCommand from './upload/backup-uploader-command';
import ChecksumValidationCommand from './validation-chain/checksum-validation-command';
import EnabledBackupValidationCommant from './validation-chain/enabled-backup-validation-commant';

/**
 * Create classes instances related do backup execution chain
 * @author edgardleal@gmail.com
 * @since 15.03.21
 */
export default class BackupFactory {
  protected static getUploader() {
    const result = new BackupUploaderCommand(new S3FileUploader());
    result.next = new BackupTimerCommand();
    return result;
  }

  protected static getCheckSumVaildator() {
    const result = new ChecksumValidationCommand();
    result.next = BackupFactory.getUploader();
    return result;
  }

  protected static getTarCommant() {
    const tar = new TarBackupCommand();
    tar.next = BackupFactory.getCheckSumVaildator();
    return tar;
  }

  protected static getFrequencyValidation(): Command<BackupCommandContext> {
    const frequencyValidator = new FrequencyValidation();
    frequencyValidator.next = BackupFactory.getTarCommant();
    return frequencyValidator;
  }

  static getBackupCommant() {
    const result = new EnabledBackupValidationCommant();
    result.next = BackupFactory.getFrequencyValidation();
    return result;
  }
}
