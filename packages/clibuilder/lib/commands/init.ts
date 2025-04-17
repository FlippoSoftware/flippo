import { Command } from 'commander';
import z from 'zod';

const initOptionsSchema = z.object({

});

export const init = new Command()
  .name('init')
  .description('Creates clibuilder.config.{ts,js} and cpgenerator.config.{ts,js} files.');
