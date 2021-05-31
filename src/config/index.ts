/**
 * index.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal
 * @module index.ts
 */
import nconf from 'nconf';
import inquirer from 'inquirer';
import path from 'path';
import os from 'os';
import { translate } from '../i18n';

export enum ConfigKey {
  BUCKET = 'BUCKET'
}

function validateBucketName(name: string) {
  if (!name) {
    throw new Error(translate('config.invalid_name'));
  }
  return true;
}

function loadConfig() {
  return new Promise((resolve, reject) => {
    nconf.load((error?: Error) => {
      if (error) {
        reject(error);
      } else {
        resolve(null);
      }
    });
  });
}

function saveConfig() {
  return new Promise((resolve, reject) => {
    nconf.save((error?: Error) => {
      if (error) {
        reject(error);
      } else {
        resolve(null);
      }
    });
  });
}

async function checkConfig() {
  if (!nconf.get(ConfigKey.BUCKET)) {
    const response = await inquirer.prompt([
      {
        name: 'bucket',
        message: translate('config.inquire_bucket'),
        validate: validateBucketName,
      },
    ]);
    nconf.set(ConfigKey.BUCKET, response.bucket);
    await saveConfig();
    await loadConfig();
  }
}

export default async function setupConfig() {
  const configDir = `${path.join(os.homedir(), '.backup')}`;
  const configFile = path.join(configDir, 'config.json');
  nconf.argv().env().file('default', configFile);
  try {
    await checkConfig();
  } catch (e) {
    console.log('Error: %o', e); // eslint-disable-line
  }
}
