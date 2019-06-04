
// import React from 'react'
// import { View } from 'react-native'

// export default class CameraHandler extends React.Component {

//   static navigationOptions = {
//     title: '拍照',
//   };

//   render() {
//     return (
//       <View ></View>
//     )
//   }
// }

import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';
 
export default class CameraHandler extends Component {
  static navigationOptions = {
    title: '拍照',
  };

  //构造函数
  constructor(props) {
      super(props);
      this.state = {
            cameraType: "back"
      };
  }
 
  //渲染
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          >
          <Text style={styles.button} onPress={this.takePicture.bind(this)}>[拍照]</Text>
        </Camera>
      </View>
    );
  }
 
  //拍摄照片
  takePicture() {
    // this.camera.capture()
    //   .then(function(data){
    //     alert("拍照成功！图片保存地址：\n"+data.path)
    //   })
    //   .catch(err => console.error(err));
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  toolBar: {
    width: 200,
    margin: 40,
    backgroundColor: '#000000',
    justifyContent: 'space-between',
 
  },
  button: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  }
});
