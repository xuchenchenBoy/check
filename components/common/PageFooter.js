import React from 'react';
import { Text, View } from 'react-native';
import { Icon, SearchBar, TabBar } from '@ant-design/react-native';
import NavigationService from '../../utils/navigationService'
import { NavigationActions } from 'react-navigation';

export default class PageFooter extends React.Component {
  onChangeTab(tabName) {
    if (tabName !== this.props.routerName) {
      // NavigationService.navigate(tabName)
      this.props.goRouter(tabName)
    }
  }

  render() {
    const { routerName } = this.props;

    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        styles={{ tabs: { height: 65}, barItemTitle: {fontSize: 15, }}}
        barTintColor="#f5f5f5"
      >
        <TabBar.Item
          title="查询"
          icon={<Icon size={26} name="search" />}
          selected={routerName === 'search'}
          onPress={() => this.onChangeTab('search')}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon size={26} name="scan" />}
          title="扫码"
          selected={routerName === 'qrScan'}
          onPress={() => this.onChangeTab('qrScan')}
        >
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon size={26} name="stop" />}
          title="卡口控制"
          tabBarTextStyle={{fontSize: 40}}
          selected={routerName === 'checkpoint'}
          onPress={() => this.onChangeTab('checkpoint')}
        >
        </TabBar.Item>
      </TabBar>
    );
  }
}

