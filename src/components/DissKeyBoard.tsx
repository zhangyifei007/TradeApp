import React, { Component } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';

export class DissKeyBoard extends Component<any> {
  render() {
    return (
      <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => Keyboard.dismiss()}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}
