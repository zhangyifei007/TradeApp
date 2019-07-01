import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationScreenProps } from 'react-navigation';

class Account extends Component<NavigationScreenProps> {
  static navigationOptions = {
    title: 'Account',
    tabBarLabel: 'Account',
    tabBarIcon: () => <Icon name="ios-person" size={32} />,
  };

  gotoLogin = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Goto Login" onPress={this.gotoLogin} />
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
  icon: {
    width: 32,
    height: 32,
  },
});
export default Account;
