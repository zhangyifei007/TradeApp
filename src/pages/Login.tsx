import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Alert, Linking } from 'react-native';
import {
  StackActions,
  NavigationActions,
  SafeAreaView,
  NavigationScreenProps,
} from 'react-navigation';
import { Formik, FormikProps } from 'formik';
import reduxify from '../lib/redux';
import { Text, Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as yup from 'yup';
import Toast from 'react-native-root-toast';
import { px2dp } from '../comm';
// import * as Wechat from 'react-native-wechat';
import { DissKeyBoard } from '../components/DissKeyBoard';
import { FiledInput } from '../components/form/Input';
// Wechat.registerApp('wx92b8b689ee790670')
const schema = yup.object().shape({
  mobile: yup
    .string()
    .required('手机号不能为空')
    .matches(/^1[0-9]{10}$/, '请输入正确的手机号'),
  password: yup.string().required('密码不能为空'),
});
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
  asyncLogin: (params: any) => dispatch.user.asyncLogin(params),
});

type ConnectProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;

type PageOwnProps = {};

type IProps = ConnectProps & PageOwnProps & NavigationScreenProps;

enum LoginField {
  Mobile = 'mobile',
  Password = 'password'
}

const initLoginValues = {
  [LoginField.Mobile]: '',
  [LoginField.Password]: '',
}
@reduxify(mapState, mapDispatch)
class Login extends Component<IProps> {
  static navigationOptions = {
    title: 'Login',
  };

  onLoginCaptcha = () => {
    const { navigation } = this.props;
    navigation.replace('LoginCaptcha');
  };

  onLogin = async (values: any) => {
    const { asyncLogin, navigation } = this.props;
    const code = await asyncLogin(values);
    if (code === 1) {
      navigation.navigate('Main');
    } else {
      Toast.show('2323', {
        position: Toast.positions.CENTER,
      });
    }
  };

  componentDidMount = () => {
    // Linking.canOpenURL('weixin://').then(supported => {
    //   if (supported) {
    //   } else {
    //     Alert.alert('温馨提示', '请先安装微信');
    //   }
    // Wechat.launchMini({
    //   userName: 'wx92b8b689ee790670', // 拉起的小程序的username
    //   miniProgramType: 0, // 拉起小程序的类型. 0-正式版 1-开发版 2-体验版
    //   path: 'pages/index/index' // 拉起小程序页面的可带参路径，不填默认拉起小程序首页
    // });
    // });
  };

  render() {
    return (
      <DissKeyBoard>
        <View style={styles.full}>
          <StatusBar barStyle="light-content" />
          <SafeAreaView style={styles.full}>
            <View style={styles.container}>
              <Text h4>密码登录1</Text>
              <Formik
                initialValues={initLoginValues}
                onSubmit={this.onLogin}
                validationSchema={schema}
                render={(props: FormikProps<any>) => {
                  return (
                    <>
                      <FiledInput
                        name={LoginField.Mobile}
                        inputStyle={styles.input}
                        containerStyle={styles.inputContainer}
                        placeholder="请输入手机号"
                        leftIcon={<Icon name="user" size={24} color="black" />}
                      />
                      <FiledInput
                        name={LoginField.Password}
                        inputStyle={styles.input}
                        containerStyle={styles.inputContainer}
                        placeholder="请输入密码"
                        secureTextEntry={true}
                        leftIcon={<Icon name="key" size={24} color="black" />}
                      />
                      <Button
                        containerStyle={{ alignItems: 'flex-start' }}
                        title="验证码登录"
                        type="clear"
                        onPress={this.onLoginCaptcha}
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
      </DissKeyBoard>
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
