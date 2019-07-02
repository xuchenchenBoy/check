

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
import { Portal, Toast } from '@ant-design/react-native'

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
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> 识别 </Text>
          </TouchableOpacity>
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
        Portal.remove(key)
      } catch (err) {
        Portal.remove(key)
      } finally {
        this.setState({
          loading: false
        })
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
