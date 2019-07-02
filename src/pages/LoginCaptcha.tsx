import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Alert } from 'react-native';
import { SafeAreaView, NavigationScreenProps } from 'react-navigation';
import reduxify from '../lib/redux';
import { Text, Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as yup from 'yup';
import Toast from 'react-native-root-toast';
import { Timer } from '../components/Timer';
import VerifyCode from '../components/CaptchInput';
import { px2dp } from '../comm';

const schema = yup.object().shape({
  mobile: yup
    .string()
    .required('手机号不能为空')
    .matches(/^1[0-9]{10}$/, '请输入正确的手机号'),
  password: yup.string().required('密码不能为空'),
});

const mapState = (state: any) => {
  return {
    user: state.user,
    fetching: state.loading.effects.user.asyncLogin,
  };
};
const mapDispatch = (dispatch: any) => ({
  asyncLogin: (params: any) => dispatch.user.asyncLogin(params),
});

type ConnectProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

type PageOwnProps = {};
type PageState = {
  mobile: string;
  password: string;
};

type IProps = ConnectProps & PageOwnProps & PageState & NavigationScreenProps;

@reduxify(mapState, mapDispatch)
class Login extends Component<IProps> {
  static navigationOptions = {
    title: 'Login',
  };

  state: Readonly<PageState> = {
    mobile: '',
    password: '',
  };

  onLogin = async () => {
    const { asyncLogin, navigation } = this.props;
    const { mobile, password } = this.state;

    schema
      .validate({ mobile, password })
      .then(async () => {
        const code = await asyncLogin({ mobile, password });
        if (code === 1) {
          navigation.navigate('Main');
        }
      })
      .catch(error => {
        console.log(error);
        Toast.show(error.message, {
          position: Toast.positions.CENTER,
        });
      });
  };

  render() {
    const { mobile, password } = this.state;
    return (
      <View style={styles.full}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.full}>
          <View style={styles.container}>
            <Text h4>密码登录</Text>
            <Input
              inputStyle={styles.input}
              containerStyle={styles.inputContainer}
              placeholder="请输入手机号"
              leftIcon={<Icon name="user" size={24} color="black" />}
              rightIcon={
                <Timer
                  timeCount={console.log}
                />
              }
              onChangeText={mobile => this.setState({ mobile })}
            />
            <VerifyCode onChangeText={console.log} verifyCodeLength={4} />
            <Button
              containerStyle={{ alignItems: 'flex-start' }}
              title="用户名密码登录"
              type="clear"
            />
            <Button
              title="登录"
              disabled={!mobile && !password}
              containerStyle={styles.loginButton}
              onPress={this.onLogin}
            />
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
    paddingTop: px2dp(64),
    paddingLeft: px2dp(32),
    paddingRight: px2dp(32),
  },
  input: {
    marginLeft: px2dp(12),
  },
  inputContainer: {
    marginTop: px2dp(32),
  },
  loginButton: {
    marginTop: px2dp(32),
  },
  captchaButton: {
    fontSize: px2dp(14),
    marginTop: px2dp(10),
  },
});
export default Login;
