/**
 * command.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module command.ts
 */
export default interface Command {
  run: (...args: string[]) => Promise<void>;
}
