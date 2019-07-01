import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

class Detail extends Component<NavigationScreenProps> {
  static navigationOptions = {
    title: 'Detail',
  };

  gotoDetail = () => {
    this.props.navigation.push('Detail');
  };

  goBack = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Goto Detail" onPress={this.gotoDetail} />
        <Button title="Go Back" onPress={this.goBack} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Detail;
