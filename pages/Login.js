
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, InputItem, List, WhiteSpace, WingBlank, Toast } from '@ant-design/react-native';
import { connect } from 'react-redux'
import * as types from '../constants/actionTypes'
import { storeData, getData } from '../utils/storage'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  async componentWillMount() {
    const token = await getData('token');
    console.log('token=', token)
    if (token) {
      this.props.navigation.replace('search')
    }
  }

  static navigationOptions = {
    title: '登录',
  };

  submit = () => {
    const { username, password } = this.state;
    if (!username || !password) {
      Toast.info('用户名和密码不能为空')
    } else {
      this.props.login({
        password,
        username,
        remember_me: 1
      })
    }
  }

  render() {
    const { username, password, } = this.state;

    return (
       <View>
        <List>
          <WhiteSpace size="xl"/>
          <InputItem
            clear
            placeholder="请输入"
            value={username}
            onChange={value => {
              this.setState({
                username: value
              });
            }}
          >
            用户名
          </InputItem>
        
          <InputItem
            clear
            type="password"
            placeholder="请输入"
            value={password}
            onChange={value => {
              this.setState({
                password: value
              });
            }}
          >
            密码
          </InputItem>
        </List>
        <WhiteSpace size="xl"/>
        <WhiteSpace size="xl"/>
        <WhiteSpace size="xl"/>
        <WingBlank>
          <Button onPress={this.submit} type="primary">
            登录
          </Button>
        </WingBlank>
       </View>    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  login: {
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10
  },
  
});

export default connect(({ }) => ({}), (dispatch) => ({
  login(payload) {
    dispatch({
      type: types.LOGIN_SUBMIT_REQUEST,
      payload
    })
  }
}))(Login);

