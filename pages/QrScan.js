
import React from "react";
import { View, StyleSheet, TouchableNativeFeedback, Text  } from "react-native";
import PageFooter from '../components/common/PageFooter'
import Container from '../components/qrScan/Container'

class QrScan extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={styles.container}>
        <Container />
        <View style={styles.bottom}>
          <PageFooter routerName="qrScan" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  bottom: {
    position: 'absolute', 
    left: 0, 
    bottom: 0, 
    width: '100%'
  }
});

export default QrScan;

