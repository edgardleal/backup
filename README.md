# Cloudbackup

This project aims to help you to make backups of your project ( directories )
to AWS S3.

## Instalation

```shell
npm i -g cloud-backup
```

## Commands

`cloud-backup add --name test --frequency 2 /path/to/my/dir`

> will include /path/to/my/dir with the name test to make a backup on each 2 days

`cloud-backup --help`

> show all commands and it's parameters

`cloud-backup list`

> show all tracked projects and it's status

`cloud-backup check`

> check all tracked directories if shoud run a backup now, if yes, will run the backup

## 🛡️ License

This project is licensed under the MIT License - see the [`LICENSE`](LICENSE) file for details.

## 🙌 Support

This project needs a 🌟 from you
My projects are fueled by coffees ☕, get one for me!

<a href="https://www.buymeacoffee.com/edgardleal" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="70" ></a>
