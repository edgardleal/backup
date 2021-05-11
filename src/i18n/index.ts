/**
 * index.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal
 * @module index.ts
 */
import i18next, { TFunction } from 'i18next';
import I18nextCLILanguageDetector from 'i18next-cli-language-detector';

import en from './locales/en';
import pt from './locales/pt';

let t: TFunction = () => '';

export default async function startTranslations(): Promise<TFunction> {
  return new Promise((resolve, reject) => {
    i18next.use(I18nextCLILanguageDetector).init({
      debug: false,
      resources: {
        en: {
          translation: en,
        },
        pt: {
          translation: pt,
        },
      },
    }, (error, translator) => {
      if (error) {
        console.log('Error on translation init: %o', error); // eslint-disable-line
        reject(error);
      } else {
        t = translator;
        resolve(t);
      }
    });
  });
}

export function translate(key: string, defaultValue: string = '???'): string {
  return t(key, defaultValue);
}
