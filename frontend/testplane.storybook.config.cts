import type { ConfigInput } from 'testplane';
import path from 'node:path';
import { getStoryFile } from '@testplane/storybook';

export default {
  baseUrl: 'http://127.0.0.1',
  testsPerSession: 40,
  browsers: {
    chrome: {
      automationProtocol: 'devtools',
      desiredCapabilities: {
        'browserName': 'chrome',
        'browserVersion': '134',
        'goog:chromeOptions': {
          args: ['--no-sandbox']
        }
      },
      headless: true
    },
    firefox: {
      desiredCapabilities: {
        'browserName': 'firefox',
        'browserVersion': '137',
        'moz:firefoxOptions': {
          args: ['--no-sandbox']
        }
      }
    }
  },
  gridUrl: 'local',
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
