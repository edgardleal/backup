/**
 * command.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module command.ts
 */
export default interface Command {
  run: (...args: string[]) => Promise<void>;
}
