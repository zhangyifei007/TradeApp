import {
  createStackNavigator,
  createBottomTabNavigator,
  TabBarBottom,
  createAppContainer,
} from 'react-navigation';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Account from '../pages/Account';
import Detail from '../pages/Detail';
import Auth from '../pages/Auth';
import LoginCaptcha from '../pages/LoginCaptcha';

const HomeNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
    },
    Account: { screen: Account },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
  }
);
HomeNavigator.navigationOptions = ({ navigation }: any) => {
  let title;
  const focusedRouteName = navigation.state.routes[navigation.state.index].routeName;
  if (focusedRouteName === 'Home') {
    // of course in this case it's the same, but do whatever you want here
    title = 'Home';
  } else if (focusedRouteName === 'Account') {
    title = 'Account';
  }

  return {
    title,
  };
};

const MainNavigator = createStackNavigator({
  HomeNavigator: { screen: HomeNavigator },
  Detail: { screen: Detail },
});

const AppNavigator = createStackNavigator(
  {
    Main: { screen: MainNavigator },
    Login: { screen: Login },
    LoginCaptcha: { screen: LoginCaptcha },
    Auth: { screen: Auth },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    initialRouteName: 'Auth',
  }
);

export function getCurrentScreen(navigationState: any): any {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentScreen(route);
  }
  return route.routeName;
}

export function routerReducer(state: any, action: any = {}) {
  return AppNavigator.router.getStateForAction(action, state);
}

export default createAppContainer(AppNavigator);
