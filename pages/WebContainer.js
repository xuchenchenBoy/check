import React from 'react'
import { WebView } from 'react-native-webview';

export default class WebContainer extends React.Component {
  static navigationOptions = {
    title: '电子通行证',
  };

  render() {
    const { navigation } = this.props;
    const url = navigation.getParam('url');

    return (
      <WebView source={{ uri: url }} />
    )
  }
}