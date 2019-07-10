

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
        <View style={{ position: 'absolute', width: '100%', height: '100%', left: '20%', top: '35%' }}>
          <View style={{ height: 2, width: '60%', backgroundColor: '#22ff00' }} />
          <View style={{ height: 80, width: 2, backgroundColor: '#22ff00' }} />
        </View>
        <View style={{ position: 'absolute', width: '100%', right: '20%', top: '35%', transform: [{rotate: '180deg'}] }}>
          <View style={{ height: 2, width: '60%', backgroundColor: '#22ff00' }} />
          <View style={{ height: 80, width: 2, backgroundColor: '#22ff00' }} />
        </View>
        <View style={{ position: 'absolute', width: '100%', height: '100%', left: '0%', top: '55%' }}><Text style={{textAlign: 'center', fontSize: 18, color: '#fff'}}>请将车牌对准方框内进行扫描</Text></View>
        <View style={{ flex: 0, padding: 15, flexDirection: 'row', justifyContent: 'center' }}>
        <Button disabled={loading} onPress={this.takePicture.bind(this)} >{loading ? '识别中...' : '识别' }</Button>
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
      const key = Toast.loading('识别中', 0, () => {}, false)
      const options = { quality: 1, base64: false, };
      const data = await this.camera.takePictureAsync(options);
      const { uri } = data;
      try {
        const body = new FormData();
        const name = Date.now() + '_image.jpg'
        let file = {
          uri,
          name,
          type: 'image/jpg'
        };
        body.append('photo', file);
        body.append('mark', 'plate');
        const data = await postReq({ url: '/v1.0/management/ocr', params: body })
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
          Portal.remove(key)
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
