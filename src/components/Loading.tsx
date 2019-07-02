import React from 'react';
import Spinner, { SpinnerProps } from 'react-native-loading-spinner-overlay';

interface Props extends SpinnerProps {}

const Loading = (props: Props) => (
  <Spinner {...props} textContent={'请求中...'} textStyle={{ color: '#FFF' }} />
);

export default Loading;
