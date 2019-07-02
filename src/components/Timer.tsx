import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-elements';

interface Props {
  initalTime?: number;
  title?: string;
  timeCount: (time: number) => void;
}

export const Timer = (props: Props) => {
  let { initalTime = 60, timeCount, title = '获取验证码' } = props;
  const [countDowning, setCountDowning] = useState(false);
  const [buttonTitle, setButtonTitle] = useState(title);
  let intervalRef: any = null;
  const onClick = () => {
    if (countDowning) {
      return;
    }
    intervalRef = setInterval(() => {
      setCountDowning(true);
      initalTime = initalTime - 1;
      if (initalTime === 0) {
        setCountDowning(false);
        setButtonTitle('重新获取');
        clearInterval(intervalRef);
      } else {
        setButtonTitle(`${initalTime}`);
        timeCount(initalTime);
      }
    }, 1000);
  };

  return (
    <Button type="clear" disabled={countDowning} title={buttonTitle} onPress={onClick}></Button>
  );
};
