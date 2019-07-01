import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import {
  StackActions,
  NavigationActions,
  SafeAreaView,
  NavigationScreenProps,
} from 'react-navigation';
import reduxify from '../lib/redux';
import { Text, Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Main' })],
});

const mapState = (state: any) => {
  return {
    user: state.user,
    fetching: state.loading.effects.user.asyncLogin,
  };
};
const mapDispatch = (dispatch: any) => ({
  asyncLogin: (name: string, password: string) => dispatch.user.asyncLogin(name, password),
});

type ConnectProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

type PageOwnProps = {};
type PageState = {};

type IProps = ConnectProps & PageOwnProps & NavigationScreenProps;

@reduxify(mapState, mapDispatch)
class Login extends Component<IProps> {
  static navigationOptions = {
    title: 'Login',
  };

  onLogin = async () => {
    const { asyncLogin } = this.props
    const code = await asyncLogin('zhangyifei', 'ssdsf');
    if (code === 1) {
      this.props.navigation.navigate('Main');
    }
  };

  render() {
    return (
      <View style={styles.full}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.full}>
          <View style={styles.container}>
            <Text h4>密码登录</Text>
            <Input
              inputStyle={styles.input}
              containerStyle={styles.inputContainer}
              placeholder="请输入用户名"
              leftIcon={<Icon name="user" size={24} color="black" />}
              // onChangeText={name => userStore.changeLoginParams({name})}
            />
            <Input
              inputStyle={styles.input}
              containerStyle={styles.inputContainer}
              placeholder="请输入密码"
              secureTextEntry={true}
              leftIcon={<Icon name="key" size={24} color="black" />}
              // onChangeText={password => userStore.changeLoginParams({password})}
            />
            <Button containerStyle={{ alignItems: 'flex-start' }} title="验证码登录" type="clear" />
            <Button title="登录" containerStyle={styles.loginButton} onPress={this.onLogin} />
          </View>
          <View />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 64,
    paddingLeft: 32,
    paddingRight: 32,
  },
  input: {
    marginLeft: 12,
  },
  inputContainer: {
    marginTop: 32,
  },
  loginButton: {
    marginTop: 32,
  },
  captchaButton: {
    fontSize: 14,
    marginTop: 10,
  },
});
export default Login;
