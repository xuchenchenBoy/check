

import Login from './Login'
import { createStackNavigator, createAppContainer } from "react-navigation";
import Search from './Search'

const AppNavigator = createStackNavigator({
  search: {
    screen: Search
  },
  login: {
    screen: Login
  },
}, {
  headerMode: 'none'
});

export default createAppContainer(AppNavigator);