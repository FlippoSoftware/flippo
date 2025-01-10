import path from 'path';
import { getStoryFile } from '@testplane/storybook';
import type { ConfigInput } from 'testplane';

export default {
  testsPerSession: 40,
  browsers: {
    'chrome/yandex/opera': {
      automationProtocol: 'devtools',
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          binary: '"C:\\Users\\goroc\\AppData\\Local\\Yandex\\YandexBrowser\\Application\\browser.exe"'
        }
      },
      headless: true
    }
  },
  plugins: {
    '@testplane/storybook': {
      autoScreenshots: true,
      // https://github.com/gemini-testing/hermione-storybook
      enabled: true,
      localport: 6006,
      storybookConfigDir: '.storybook'
    }
  },
  screenshotsDir: (test) => {
    const relativeStoryFilePath = getStoryFile(test);
    const relativeStoryFileDirPath = path.dirname(relativeStoryFilePath);

    return path.join(relativeStoryFileDirPath, 'screens', test.id, test.browserId);
  }
} satisfies ConfigInput;
