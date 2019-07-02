import React, { PureComponent } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import _ from 'lodash';
import { px2dp, Theme } from '../comm';

interface Props {
  onChangeText: (text: string) => void;
  verifyCodeLength: number;
}

interface State {
  verifyCode: string;
}

// 验证码组件
class VerifyCode extends PureComponent<Props> {
  textInput: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      verifyCode: '',
    };
    this.onTouchInput = this.onTouchInput.bind(this);
  }

  state: Readonly<State> = {
    verifyCode: '',
  };

  onTouchInput() {
    const isFocused = this.textInput.isFocused();
    if (!isFocused) {
      this.textInput.focus();
    }
  }

  renderVerifyCode(value: any) {
    const { verifyCodeLength } = this.props;
    const paddedValue = _.padEnd(value, verifyCodeLength, ' ');
    const valueArray = paddedValue.split('');
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this.onTouchInput}
        style={styles.verifyTextContainer}
      >
        {valueArray.map((digit, index) => (
          <View key={index} style={digit === ' ' ? styles.textInputItem : styles.textInputItemIn}>
            <Text style={styles.verifyText}>{digit}</Text>
          </View>
        ))}
      </TouchableOpacity>
    );
  }

  render() {
    const { verifyCode } = this.state;
    const { onChangeText, verifyCodeLength } = this.props;
    return (
      <View style={styles.verifyContainer}>
        {this.renderVerifyCode(verifyCode)}
        <TextInput
          ref={ref => {
            this.textInput = ref;
          }}
          underlineColorAndroid="transparent"
          caretHidden
          style={styles.textInput}
          autoFocus={true}
          keyboardType={'numeric'}
          maxLength={verifyCodeLength}
          onChangeText={text => {
            const reg = /^[0-9]*$/;
            if (reg.test(text)) {
              this.setState({ verifyCode: text });
              onChangeText(text);
            }
          }}
          value={verifyCode}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // textInput样式
  textInput: {
    height: Theme.isIOS ? 0 : px2dp(1),
    width: Theme.screenWidth,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  // 验证码输入框总容器
  verifyContainer: {
    width: Theme.screenWidth,
    height: px2dp(50),
  },
  // 验证码带下划线输入格
  textInputItem: {
    width: px2dp(40),
    borderBottomWidth: px2dp(1),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#86939e',
  },
  textInputItemIn: {
    width: px2dp(40),
    borderBottomWidth: px2dp(1),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#86939e',
  },
  // 输入验证码样式
  verifyText: {
    fontSize: px2dp(24),
    color: '#86939e',
  },
  // 验证码文本框容器
  verifyTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Theme.screenWidth - px2dp(64),
    height: px2dp(50),
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default VerifyCode;
