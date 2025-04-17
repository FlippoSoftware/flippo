import { cosmiconfig } from 'cosmiconfig';

const explorer = cosmiconfig('clibuilder.config.json')

export async function resolveConfig() {
  try {
    const result = await explorer.search()
    return result?.config as {
      templatesPath: string
      outputPath: string
    } | null
  } catch (e) {
    console.error('Ошибка загрузки конфигурации:', e)
    return null
  }
}
