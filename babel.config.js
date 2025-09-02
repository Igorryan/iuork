module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@storage': './src/storage',
          '@utils': './src/utils',
          '@theme': './src/theme',
          '@functions': './src/functions',
          '@interfaces': './src/interfaces',
          '@hooks': './src/hooks',
          '@config': './src/config',
          '@api': './src/api',
        },
      }],
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
        allowUndefined: false,
        safe: false,
      }],
      'react-native-reanimated/plugin',
    ],
  };
};
