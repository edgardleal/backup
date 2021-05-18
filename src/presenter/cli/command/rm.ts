/**
 * rm.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal
 * @module rm.ts
 */

import Out from '../Out';
import Command from './command';

/**
 * Remove a backup data and remote entries
 * @author edgardleal@gmail.com
 * @since 18.05.21
 */
export default class RM implements Command {
  // eslint-disable-next-line class-methods-use-this
  async run(..._: string[]): Promise<void> { // eslint-disable-line
    Out.info('Done');
  }
}
