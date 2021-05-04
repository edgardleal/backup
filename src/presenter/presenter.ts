/**
 * presenter.ts
 * Copyright (C) 2021 
 *
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module presenter.ts
 */
import Backup from '../db/backup';

export default interface Presenter {
  show: (backups: Backup[]) => void;
}
