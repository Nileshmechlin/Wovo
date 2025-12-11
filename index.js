/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import AppRoutes from './src/routes/Approutes';
if (__DEV__) {
    require("./ReacttotronConfig");
  }
  // Configure Reanimated Logger
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Change to false if you want to disable strict mode
});
AppRegistry.registerComponent(appName, () => AppRoutes);
