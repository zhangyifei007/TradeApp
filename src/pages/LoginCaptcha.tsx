import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Alert } from 'react-native';
import { SafeAreaView, NavigationScreenProps } from 'react-navigation';
import reduxify from '../lib/redux';
import { Text, Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as yup from 'yup';
import Toast from 'react-native-root-toast';
import { Timer } from '../components/Timer';
// import VerifyCode from '../components/CaptchInput';
import { px2dp } from '../comm';
import { Formik, FormikProps } from 'formik';
import { FiledInput } from '../components/form/Input';

enum LoginCaptchaField {
  Mobile = 'mobile',
  Captcha = 'captcha',
}

const initLoginValues = {
  [LoginCaptchaField.Mobile]: '',
  [LoginCaptchaField.Captcha]: '',
};

const schema = yup.object().shape({
  [LoginCaptchaField.Mobile]: yup
    .string()
    .required('手机号不能为空')
    .matches(/^1[0-9]{10}$/, '请输入正确的手机号'),
  [LoginCaptchaField.Captcha]: yup
    .string()
    .max(4, '验证码最大长度不能超过四位')
    .matches(/^[0-9]{4}$/)
    .required('验证码不能为空'),
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

type IProps = ConnectProps & PageOwnProps & NavigationScreenProps;
@reduxify(mapState, mapDispatch)
class Login extends Component<IProps> {
  static navigationOptions = {
    title: 'Login',
  };

  onBackLogin = () => {
    const { navigation } = this.props;
    navigation.replace('Login');
  };

  onLogin = async (values: any) => {
    const { asyncLogin, navigation } = this.props;
    const code = await asyncLogin(values);

    if (code === 1) {
      navigation.navigate('Main');
    } else {
      Toast.show('', {
        position: Toast.positions.CENTER,
      });
    }
  };

  render() {
    return (
      <View style={styles.full}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.full}>
          <View style={styles.container}>
            <Text h4>验证码登录</Text>
            <Formik
              initialValues={initLoginValues}
              onSubmit={this.onLogin}
              validationSchema={schema}
              render={(props: FormikProps<any>) => {
                return (
                  <>
                    <FiledInput
                      name={LoginCaptchaField.Mobile}
                      inputStyle={styles.input}
                      containerStyle={styles.inputContainer}
                      placeholder="请输入手机号"
                      leftIcon={<Icon name="user" size={24} color="black" />}
                      rightIcon={<Timer timeCount={console.log} />}
                    />
                    <FiledInput
                      name={LoginCaptchaField.Captcha}
                      inputStyle={styles.input}
                      containerStyle={styles.inputContainer}
                      placeholder="请输入验证码"
                      leftIcon={<Icon name="user" size={24} color="black" />}
                    />
                    {/* <VerifyCode onChangeText={console.log} verifyCodeLength={4} /> */}
                    <Button
                      containerStyle={{ alignItems: 'flex-start' }}
                      title="用户名密码登录"
                      type="clear"
                      onPress={this.onBackLogin}
                    />
                    <Button
                      title="登录"
                      containerStyle={styles.loginButton}
                      onPress={props.handleSubmit as any}
                    />
                  </>
                );
              }}
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
