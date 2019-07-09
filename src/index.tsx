import React from 'react';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import Navigation from './pages/Navigation';
import { Provider } from 'react-redux';
import stores from './store/index';
import CodePush, { CodePushOptions } from 'react-native-code-push';
import { ThemeProvider } from 'react-native-elements';
import { ElementTheme } from './comm/ElementThem';

const onBeforeLift = () => {
  // take some action before the gate lifts
};
const persistor = getPersistor();

const codePushOptions: CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  updateDialog: {
    title: '新版本来了',
    appendReleaseDescription: true,
    descriptionPrefix: '修复一些bug',
  },
};
@CodePush(codePushOptions)
export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={ElementTheme}>
        <Provider store={stores}>
          <PersistGate loading={null} onBeforeLift={onBeforeLift} persistor={persistor}>
            <Navigation />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    );
  }
}
