import { resolveConfig } from '../utils/config'
import fs from 'fs-extra'
import path from 'path'
import kleur from 'kleur'

export async function addComponent(name: string) {
  const config = await resolveConfig()
  if (!config) {
    console.log(kleur.red('❌ Конфигурация не найдена. Создайте flippo.config.ts'))
    process.exit(1)
  }

  const templatePath = path.resolve(config.templatesPath, `${name}.tsx`)
  const outputPath = path.resolve(config.outputPath, `${name}.tsx`)

  if (!fs.existsSync(templatePath)) {
    console.log(kleur.red(`❌ Шаблон ${name}.tsx не найден в ${config.templatesPath}`))
    process.exit(1)
  }

  await fs.ensureDir(config.outputPath)
  await fs.copy(templatePath, outputPath)

  console.log(kleur.green(`✅ Компонент ${name} добавлен в ${config.outputPath}`))
}
