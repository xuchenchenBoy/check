
import React from "react";
import { View, StyleSheet, TouchableNativeFeedback, Text  } from "react-native";
import PageFooter from '../components/common/PageFooter'
import Container from '../components/qrScan/Container'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { connect } from 'react-redux'
import * as types from '../constants/actionTypes'

class QrScan extends React.Component {
  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    console.log('did')
    this.scanRef.reactivate()
  }

  onReadScan(e) {
    console.log('e=', e.data)
    e.data && this.props.checkEncrypt({
      encrypt_data: e.data
    })
  }

  goRouter = (routeName) => {
    this.props.navigation.replace(routeName)
  }

  render() {
    const { reactivate } = this.props;
    console.log('reactivate=', reactivate)
    return (
      <View style={styles.container}>
        <QRCodeScanner
          ref={ref => this.scanRef = ref}
          onRead={this.onReadScan.bind(this)}
          reactivate={reactivate}
        />
        <Container />
        <View style={styles.bottom}>
          <PageFooter goRouter={this.goRouter} routerName="qrScan" />
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

export default connect(({ qrScan }) => ({ ...qrScan }), (dispatch) => ({
  checkEncrypt(payload) {
    dispatch({
      type: types.QRSCAN_CHECK_ENCRYPT_REQ,
      payload
    })
  }
}))(QrScan);

