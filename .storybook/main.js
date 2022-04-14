module.exports = {
  framework: '@storybook/react',
  stories: ['../src/stories/**/*.stories.mdx', '../src/stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-jest',
    '@storybook/preset-scss',
    'storybook-dark-mode'
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config) {
    // customize the Vite config here
    return config;
  },
};
