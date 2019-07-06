

import React, { PureComponent } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { postReq } from '../utils/request'
import { Portal, Toast, Button } from '@ant-design/react-native'

export default class CameraHandler extends PureComponent {
  static navigationOptions = {
    title: '拍照识别',
  };

  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  render() {
    const { loading } = this.state;

    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          androidCameraPermissionOptions={{
            title: '申请调用摄像头权限',
            message: '需要同意来进行拍照识别',
            buttonPositive: '同意'
          }}
          captureAudio={false}
        /> 
        <View style={{ position: 'absolute', width: '90%', height: '100%', left: '5%', top: '30%' }}>
          <View style={{ height: 2, width: '100%', backgroundColor: '#37b44a' }} />
          <View style={{ height: 150, width: 2, backgroundColor: '#37b44a' }} />
        </View>
        <View style={{ position: 'absolute', width: '100%', right: '5%', top: '30%', transform: [{rotate: '180deg'}] }}>
          <View style={{ height: 2, width: '90%', backgroundColor: '#37b44a' }} />
          <View style={{ height: 150, width: 2, backgroundColor: '#37b44a' }} />
        </View>
        <View style={{ flex: 0, padding: 15, flexDirection: 'row', justifyContent: 'center' }}>
        <Button disabled={loading} onPress={this.takePicture.bind(this)} loading={loading}>{loading ? '识别中...' : '识别' }</Button>
        </View>
      </View>
    );
  }

  takePicture = async() => {
    const { loading } = this.state;
    if (loading) return;
    if (this.camera) {
      this.setState({
        loading: true
      })
      const key = Toast.loading('识别中')
      const options = { quality: 0.1, base64: true, };
      const data = await this.camera.takePictureAsync(options);
      const { base64 } = data;
      try {
        const data = await postReq({ url: '/v1.0/management/ocr', params: {
          photo: base64,
          mark: "plate"
        }})
        if (data.error_code) {
          Toast.fail(data.error_massage)
          Portal.remove(key)
          return
        }
        const result = data.words_result || [];
        const { number, color } = result[0] || {};
        this.props.navigation.state.params.callBack(number, color);
        this.props.navigation.goBack();
      } catch (err) {
        console.log(err)
      } finally {
        setTimeout(() => {
          Portal.remove(key)
          this.setState({
            loading: false
          })
        }, 2000)
      }
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
