/**
 * presenter.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module presenter.ts
 */
import Backup from '../db/backup';

export default interface Presenter {
  show: (backups: Backup[]) => void;
}
