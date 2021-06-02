/**
 * pt.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal
 * @module pt.ts
 */

export default {
  translation: {
    db: {
      not_found: 'Backup não encontrado [{{ name }}]!',
    },
    config: {
      invalid_name: 'Nome invalido!',
      inquire_bucket: 'Qual o bucket utilizado para os backups?',
    },
    undefined: '[Valor não definido]',
    add: {
      success: '[{{ name }}] adicionado com sucesso',
      help: 'Adiciona uma pasta no controle de backups',
      name: 'Nome pelo qual este backup será identificado',
      frequency: 'Frenquencia em dias para a execução desta copia de segurança',
      error: {
        exists: 'O backup {{ name }} ja existe.',
      },
    },
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
    disable: {
      done: 'O Backup [{{ name }}] foi desativado.',
      help: 'Desabilita um Backup',
    },
    enable: {
      done: 'O Backup [{{ name }}] foi ativado com sucesso.',
      help: 'Habilita um Backup',
    },
    remove: {
      help: 'Remove um Backup do banco de dados local e da nuvem',
      warning: 'Esta opção esta desabilitada por ser de alto risco. Voce pricisa fazer isso manualmente',
    },
    size: 'Tamanho',
    backup: 'Backup',
    last_run: 'Ult. Execução',
  },
};
