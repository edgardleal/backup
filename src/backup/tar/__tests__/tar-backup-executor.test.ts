import fs from 'fs';
import util from 'util';
import tmp from 'tmp';
import TarBackupCommand from '../tar-backup-executor';
import Backup from '../../../backup-definition/backup';

const pstat = util.promisify(fs.stat);
/**
 * tar-backup-executor.test.ts
 *
 * @module tar-backup-executor.test.ts
 */
describe('tar-backup-executor', () => {
  let command: TarBackupCommand;
  beforeEach(() => {
    command = new TarBackupCommand();
  });
  describe('createTar', () => {
    it('should create files with the same size', async () => {
      const tmpA = tmp.fileSync();
      const tmpB = tmp.fileSync();

      const backup: Backup = {
        name: 'Test',
        currenteExecution: {
          date: new Date(),
          status: 'success',
        },
        path: __dirname.replace(process.env.HOME!, ''),
      };

      command.setTmpFile(tmpA);
      await command.createTar(backup);

      command.setTmpFile(tmpB);
      await command.createTar(backup);

      const statA = await pstat(tmpA.name);
      const statB = await pstat(tmpB.name);

      tmpA.removeCallback();
      tmpB.removeCallback();

      expect(statA.size).toBe(statB.size);
    });
  });
});
