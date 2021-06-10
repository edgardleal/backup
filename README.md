# cloud-backup

![npm](https://img.shields.io/npm/v/cloud-backup.svg) ![license](https://img.shields.io/npm/l/cloud-backup.svg) ![github-issues](https://img.shields.io/github/issues/edgardleal/backup.svg)  ![Circle CI build status](https://circleci.com/gh/edgardleal/backup.svg?style=svg)

This project aims to help you to make backups of your project ( directories )

![nodei.co](https://nodei.co/npm/cloud-backup.png?downloads=true&downloadRank=true&stars=true)

![travis-status](https://img.shields.io/travis/edgardleal/backup.svg)
![stars](https://img.shields.io/github/stars/edgardleal/backup.svg)
![forks](https://img.shields.io/github/forks/edgardleal/backup.svg)

![forks](https://img.shields.io/github/forks/edgardleal/backup.svg)

![](https://david-dm.org/edgardleal/backup/status.svg)
![](https://david-dm.org/edgardleal/backup/dev-status.svg)

## Features

1. Compact and upload a folder/file to AWS S3 cloud
2. Keep a history of every backup made
3. CLI interface to check backup status

## Next Steps

* [ ] email report
* [ ] backup retention and configuration option

## Install

`npm install --save -g cloud-backup`

## Scripts

 - **npm run test** : `jest`
 - **npm run readme** : `node ./node_modules/.bin/node-readme`
 - **npm run lint** : `eslint  './**/*.ts'`

## Commands

`cloud-backup add --name test --frequency 2 /path/to/my/dir`

> will include /path/to/my/dir with the name test to make a backup on each 2 days

`cloud-backup --help`

> show all commands and it's parameters

`cloud-backup list`

> show all tracked projects and it's status

`cloud-backup check`

> check all tracked directories if shoud run a backup now, if yes, will run the backup

## Contributing

Contributions welcome; Please submit all pull requests against the master branch. If your pull request contains JavaScript patches or features, you should include relevant unit tests. Please check the [Contributing Guidelines](contributng.md) for more details. Thanks!

## Author

Edgard Leal <edgardleal@gmail.com> http://github.com/edgardleal

## 🙌 Support

This project needs a 🌟 from you
My projects are fueled by coffees ☕, get one for me!

<a href="https://www.buymeacoffee.com/edgardleal" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="70" ></a>

## License

 - **MIT** : http://opensource.org/licenses/MIT

