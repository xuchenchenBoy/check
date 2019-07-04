import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { storeData, getData } from '../utils/storage'

export default class Startup extends React.PureComponent {
  static navigationOptions = {
    header: null
  }

   componentDidMount() {
    setTimeout(async () => {
      const token = await getData('token');
      if (token) {
        this.props.navigation.replace('search')
      } else {
        this.props.navigation.replace('login')
      }
    }, 1000)
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.content}>电子通行证审批系统(EPPS)手持终端机</Text>
        <Text style={styles.bottom}>郑州汤尼智能科技</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    height: '100%'
  },
  content: {
    position: 'absolute', 
    left: 0, 
    top: '35%', 
    width: '100%',
    color: '#333',
    textAlign: 'center',
    fontSize: 24,
  },
  bottom: {
    position: 'absolute', 
    left: 0, 
    bottom: 25, 
    width: '100%',
    color: '#999',
    textAlign: 'center',
  }
});