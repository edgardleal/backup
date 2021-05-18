/**
 * pt.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal
 * @module pt.ts
 */

export default {
  translation: {
    undefined: '[Valor não definido]',
    help: {
      show: 'exibe detalhes sobre um backup',
      show_name: 'O nome do backup',
    },
    check: {
      help: 'Este comando é um Alias para o Comando Backup',
    },
    run: {
      running_to: 'Executando a verificação para {{ total }} backups...',
      help: 'Verifica todos os backups, caso preciso, executa o backup',
      running: 'Executando o backup {{name}}...',
      finished: 'Bakups finalizados',
    },
    size: 'Tamanho',
    backup: 'Backup',
    last_run: 'Ult. Execução',
  },
};
