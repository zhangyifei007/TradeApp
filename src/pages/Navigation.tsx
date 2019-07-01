import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, BackHandler, ToastAndroid } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Utils from './Utils';
import AppNavigator, { getCurrentScreen } from '../configs/screens';
import reduxify from '../lib/redux';
const { height, width } = Dimensions.get('window');

@reduxify(
  (state: any) => {
    return {
      toast: state.utils.toast,
    };
  },
  (dispatch: any) => ({
    invalidToken: () => dispatch.utils.invalidToken(),
    showToast: (text: any) => dispatch.todos.showToast(text),
  })
)
class Navigation extends Component<any> {
  lastBackPressed: any;
  navigation: any;

  constructor(props: any) {
    super(props);
    this.lastBackPressed = null;
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle);
  }
  backHandle = () => {
    const currentScreen = getCurrentScreen(this.props.nav);
    if (currentScreen !== 'Home' && currentScreen !== 'Login') {
      this.props.dispatch(NavigationActions.back());
      return true;
    } else if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      // 最近2秒内按过back键，可以退出应用。
      // BackAndroid.exitApp();
      return false;
    }
    this.lastBackPressed = Date.now();
    ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
    return true;
  };
  render() {
    return (
      <View style={styles.bg}>
        <AppNavigator
          ref={v => {
            this.navigation = v;
          }}
        />
        <Utils />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg: {
    flex: 1,
    height,
    width,
    backgroundColor: 'transparent',
  },
});

export default Navigation;
