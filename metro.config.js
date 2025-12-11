// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);


const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

module.exports = () => {
  // Get the default Metro config for your project
  const config = getDefaultConfig(__dirname);

  // Modify transformer and resolver settings to handle SVG files
  const updatedConfig = mergeConfig(config, {
    transformer: {
      ...config.transformer,
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      ...config.resolver,
      assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...config.resolver.sourceExts, 'svg'],
    },
  });

  // If you need to disable strict mode for Reanimated (optional, not recommended for production)
  updatedConfig.transformer = {
    ...updatedConfig.transformer,
    experimentalImportSupport: true, // Adds support for importing SVG files and other experimental features
  };

  return updatedConfig;
};
