/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { registerBackgroundHandler } from './src/services/callManager';
import { registerNotificationCategories } from './src/services/notificationService';

registerBackgroundHandler();
registerNotificationCategories();

AppRegistry.registerComponent(appName, () => App);
