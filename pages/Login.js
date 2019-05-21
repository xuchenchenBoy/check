
import React from "react";
import { View, StyleSheet } from "react-native";
import { Container, Text, Header, Left, Body, Right, Button, Icon, Title, Content, Form, Item, Input,  Label, } from 'native-base';

class Login extends React.Component {
 
  render() {
    return (
      <Container>
        <Header noLeft>
         <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>登录</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={styles.container}>
          <Form>
            <Item fixedLabel>
              <Label>用户名</Label>
              <Input placeholder="请输入用户名" />
            </Item>
            <Item fixedLabel last>
              <Label>密码</Label>
              <Input secureTextEntry={true} placeholder="请输入密码" />
            </Item>
          </Form>
          <View style={styles.login}>
            <Button block>
              <Text>登录</Text>
            </Button>
          </View>
        </Content>
      </Container>
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

export default Login;

