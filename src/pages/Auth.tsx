import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { load } from '../lib/storage';
import { NavigationScreenProps } from 'react-navigation';

export default class Auth extends React.Component<NavigationScreenProps> {
  constructor(props: NavigationScreenProps) {
    super(props);
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    const userToken = await load('token');
    this.props.navigation.navigate(userToken ? 'Main' : 'Login');
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
