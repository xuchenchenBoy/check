import React from 'react'
import { View } from 'react-native'
import { Button, InputItem, List, WingBlank, WhiteSpace, Toast } from '@ant-design/react-native';
import { postReq } from '../utils/request'

export default class ModifyPassword extends React.PureComponent {
  static navigationOptions = {
    title: '修改密码',
  };

  constructor(props) {
    super(props)
    this.state = {
      oldPassword: '',
      newPassword: '',
      reNewPassword: ''
    }
  }

  async submit() {
    const { oldPassword, newPassword, reNewPassword } = this.state;

    if (!oldPassword || !newPassword || !reNewPassword) {
      Toast.fail('请输入密码', 1, () => {}, false);
      return;
    }
    if (newPassword !== reNewPassword) {
      Toast.fail('两次密码输入不一致', 1, () => {}, false);
      return;
    }

    try {
      await postReq({ url: '/v1.0/auth/accountv2', params: {
        password: newPassword,
        old_password: oldPassword,
        re_password: reNewPassword
      }})
      Toast.success('修改成功', 1, () => {}, false)
      this.props.navigation.goBack();
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <View>
        <List>
          <InputItem
            clear
            type="password"
            value={this.state.oldPassword}
            onChange={value => {
              this.setState({
                oldPassword: value,
              });
            }}
            placeholder="请输入原密码"
          >
            原密码
          </InputItem>
          <InputItem
           clear
           type="password"
           value={this.state.newPassword}
           onChange={value => {
             this.setState({
              newPassword: value,
             });
           }}
           placeholder="请输入新密码"
          >
            新密码
          </InputItem>
          <InputItem
            clear
            type="password"
            value={this.state.reNewPassword}
            onChange={value => {
              this.setState({
                reNewPassword: value,
              });
            }}
            placeholder="请再次输入新密码"
          >
            新密码
          </InputItem>
        </List>
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WingBlank>
          <Button
            onPress={this.submit.bind(this)}
            type="primary"
          >
            提交
          </Button>
        </WingBlank>
      </View>
    )
  }
}