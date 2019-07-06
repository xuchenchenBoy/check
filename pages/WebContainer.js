import React from 'react'
import { WebView } from 'react-native-webview';
import { View, Text } from 'react-native'

export default class WebContainer extends React.Component {
  static navigationOptions = {
    title: '电子通行证',
  };

  render() {
    const { navigation } = this.props;
    const url = navigation.getParam('url');

    return (
      <WebView 
      startInLoadingState={true} 
      renderLoading={() => <View style={{position: 'absolute', width: '100%', left: 0, top: '30%', textAlign: 'center'}}><Text style={{textAlign: 'center', fontSize: 16}}>数据加载中...</Text></View>} 
      source={{ uri: url }} 
      />
    )
  }
}