import React from 'react';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import Navigation from './pages/Navigation';
import { Provider } from 'react-redux';
import stores from './store/index';
import { ThemeProvider } from 'react-native-elements';
import { ElementTheme } from './comm/ElementThem';

const onBeforeLift = () => {
  // take some action before the gate lifts
};
const persistor = getPersistor();
const app = () => (
  <ThemeProvider theme={ElementTheme}>
    <Provider store={stores}>
      <PersistGate loading={null} onBeforeLift={onBeforeLift} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  </ThemeProvider>
);

export default app;
