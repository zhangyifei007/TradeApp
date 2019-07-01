/*
 * @Author: huangjun
 * @Date: 2018-11-28 11:04:58
 * @Last Modified by: huangjun
 * @Last Modified time: 2018-11-28 16:23:46
 * @flow
 */
import React from 'react';
import { getPersistor } from '@rematch/persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Text } from 'react-native'
import Navigation from './pages/Navigation';
import { Provider } from 'react-redux';
import stores from './models/index';

const onBeforeLift = () => {
  // take some action before the gate lifts
};
const persistor = getPersistor();
const app = () => (
  <Provider store={stores}>
    <PersistGate loading={null} onBeforeLift={onBeforeLift} persistor={persistor}>
      <Navigation />
    </PersistGate>
  </Provider>
);

export default app;
