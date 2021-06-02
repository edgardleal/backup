/**
 * file-remover.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal
 * @module file-remover.ts
 */
export default interface FileRemover {
  remove: (key: string) => Promise<void>;
}
