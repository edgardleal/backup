/**
 * Out.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal
 * @module Out.ts
 */
import i18next, { TFunction } from 'i18next';

export default {
  verbose: false,
  // eslint-disable-next-line no-console
  debug: console.log.bind(console),
  // eslint-disable-next-line no-console
  info: console.log.bind(console),
  translator: i18next.t,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  t(key: string, map: { [key: string]: any } = {}) {
    if (this.translator) {
      this.info(this.translator(key, map));
    } else {
      this.info(key);
    }
  },
  setTranslator(func: TFunction) {
    this.translator = func;
  },
  setVerbose(value: boolean = true) {
    this.verbose = value;
    if (value) {
      // eslint-disable-next-line no-console
      this.debug = console.log.bind(console);
    } else {
      this.debug = (() => {}) as any;
    }
  },
};
