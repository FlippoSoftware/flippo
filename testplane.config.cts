import type { ConfigInput } from 'testplane';

import { setupBrowser } from '@testing-library/webdriverio';

export default {
  baseUrl: 'http://127.0.0.1',
  browsers: {
    chrome: {
      automationProtocol: 'devtools',
      desiredCapabilities: {
        browserName: 'chrome',
        browserVersion: '134',
        'goog:chromeOptions': {
          args: ['--no-sandbox']
        }
      },
      headless: true
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        browserVersion: '137',
        'moz:firefoxOptions': {
          args: ['--no-sandbox']
        }
      }
    }
  },
  gridUrl: 'local',
  httpTimeout: 60000,
  pageLoadTimeout: 0,
  plugins: {
    '@testplane/test-filter': {
      // https://github.com/gemini-testing/testplane-test-filter
      enabled: true,
      inputFile: 'testplane-filter.json'
    },
    '@testplane/url-decorator': {
      // https://github.com/gemini-testing/testplane-url-decorator
      enabled: true,
      url: {
        query: {}
      }
    },
    'html-reporter/testplane': {
      defaultView: 'all',
      diffMode: '3-up-scaled',
      // https://github.com/gemini-testing/html-reporter
      enabled: true,
      path: 'testplane-report'
    }
  },
  // eslint-disable-next-line no-undef
  prepareBrowser(browser: WebdriverIO.Browser) {
    // @ts-expect-error: type error in the library
    setupBrowser(browser);
  },
  resetCursor: false,
  sets: {
    desktop: {
      browsers: ['chrome'],
      files: ['**/tests/*.testplane.(t|j)s', '**/tests/*.testplane.(t|j)sx']
    }
  },
  system: {
    fileExtensions: ['.ts', '.tsx']
  },
  testTimeout: 90000
} satisfies ConfigInput;
