import { Command } from 'commander';
import kleur from 'kleur';
import { addComponent } from './commands/add';

const program = new Command();

program
  .name('clibuilder')
  .description('Flippo CLI — генератор компонентов и утилит')
  .version('0.1.0');

program
  .command('add')
  .argument('<name>', 'Имя компонента')
  .description('Добавить компонент из шаблона')
  .action((name) => {
    addComponent(name);
  });

program.parse();
