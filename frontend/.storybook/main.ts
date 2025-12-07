import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    addons: [
        '@storybook/addon-onboarding',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@storybook/addon-interactions',
        'storybook-react-i18next'
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {}
    },
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    typescript: {
    // Disable react-docgen to avoid errors with namespace exports and ObjectMethod patterns
        reactDocgen: false
    }
};
export default config;
