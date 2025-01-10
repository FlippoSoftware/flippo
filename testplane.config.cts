import type { ConfigInput } from 'testplane';

export default {
  baseUrl: 'http://localhost',
  browsers: {
    'chrome/yandex/opera': {
      automationProtocol: 'devtools',
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          binary: 'C:\\Users\\goroc\\AppData\\Local\\Yandex\\YandexBrowser\\Application\\browser.exe'
        }
      },
      headless: true
    }
  },
  gridUrl: 'http://localhost:4444/wd/hub',
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
  resetCursor: false,
  sets: {
    desktop: {
      browsers: ['chrome/yandex/opera'],
      files: ['**/tests/*.testplane.(t|j)s', '**/tests/*.testplane.(t|j)sx']
    }
  },
  testTimeout: 90000
} satisfies ConfigInput;
