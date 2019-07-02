import storage from 'redux-persist/es/storage';
import { init } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';
import createRematchPersist from '@rematch/persist';
import { createLogger } from 'redux-logger';
import utilsMiddleware from './utilsMiddleware';
import * as models from '../models';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;
const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});
const persistPlugin = createRematchPersist({
  storage: storage,
  throttle: 5000,
  version: 1,
});
const loading = createLoadingPlugin({});
const store = init({
  models,
  redux: {
    middlewares: [logger, utilsMiddleware],
  },
  plugins: [loading, persistPlugin],
});

export default store;
