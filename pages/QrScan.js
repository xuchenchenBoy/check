
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

  constructor(props) {
    super(props)
    this.scaning = false;
    this.scanner = null;
  }

  async onReadScan(e) {
    if (this.scaning) {
      return;
    }
    this.scaning = true;
    const { reactivate } = this.props;
    if (reactivate && e.data) {
      await this.props.checkEncrypt({
        encrypt_data: e.data
      })
    }
    setTimeout(() => {
      this.scaning = false;
      this.scanner.reactivate()
    }, 2000);
  }

  goRouter = (routeName) => {
    this.props.navigation.replace(routeName)
  }

  render() {
    return (
      <View style={styles.container}>
         <QRCodeScanner
          ref={ref => this.scanRef = ref}
          onRead={this.onReadScan.bind(this)}
          cameraStyle={{height: '100%'}}
          ref={(node) => { this.scanner = node }}
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

