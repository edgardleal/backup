/**
 * command.ts
 * Copyright (C) 2021 Sanar
 *
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module command.ts
 */

export default abstract class Command<T = any> {
  private nextCommand: Command<T>;

  set next(value: Command<T>) {
    this.nextCommand = value;
  }

  async runNext(context: T): Promise<T> {
    if (this.nextCommand) {
      return this.nextCommand.run(context);
    }
    return context;
  }

  abstract run(context: T): Promise<T>;
}
