
import React from 'react'
import { StatusBar } from 'react-native'
import Login from './Login'
import { createStackNavigator, createAppContainer } from "react-navigation";
import Search from './Search'
import Checkpoint from './Checkpoint'
import QrScan from './QrScan'
import Startup from './Startup'
import CameraHandler from './CameraHandler'
import WebContainer from './WebContainer'
import ModifyPassword from './ModifyPassword'
import { Button, Provider, Toast } from '@ant-design/react-native';
import NavigationService from '../utils/navigationService'
import { getData } from '../utils/storage'

const AppNavigator = createStackNavigator({
  startup: {
    screen: Startup
  },
  login: {
    screen: Login
  },
  search: {
    screen: Search
  },
  checkpoint: {
    screen: Checkpoint
  },
  qrScan: {
    screen: QrScan
  },
  webContainer: {
    screen: WebContainer
  },
  cameraHandler: {
    screen: CameraHandler
  },
  modifyPassword: {
    screen: ModifyPassword
  }
}, {
  initialRouteName: 'startup'
});

const NavCom = createAppContainer(AppNavigator);

class PageRoot extends React.Component {
  render() {
    return (
      <Provider>
        <StatusBar 
          backgroundColor="rgb(245, 245, 245)" 
          barStyle="dark-content" 
        />
        <NavCom ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}/>
      </Provider>
    )
  }
}

export default PageRoot;

