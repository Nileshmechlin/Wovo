module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Other plugins you might have
    [
      'react-native-reanimated/plugin',
      {
        enableDebugging: true,
        strictMode: false,  // Disable strict mode here
      },
    ],
  ],
};
