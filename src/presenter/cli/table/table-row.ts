/**
 * table-row.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module table-row.ts
 */

import Backup from '../../../backup-definition/backup';
import CliComponent from '../cli-component';
import CliDataProvider from '../cli-data-provider';
import rfill from '../rfill';
import Since from '../since';
import FileSize from '../size';

/**
 * Render a table row
 * @author edgardleal@gmail.com
 * @since 22.03.21
 */
export default class TableRow implements CliComponent {
  // eslint-disable-next-line no-useless-constructor
  constructor(private dataProvider: CliDataProvider<Backup>) {
  // eslint-disable-next-line no-empty-function
  }

  async render(): Promise<string> {
    const backup = await this.dataProvider.getData();
    const { name } = backup;
    const date = await (new Since(this.dataProvider)).render();
    const size = await new FileSize(this.dataProvider).render();

    const row = `| ${rfill(name, 10)} | ${date} | ${size} |`;
    return row;
  }
}
