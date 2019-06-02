
import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Text } from "react-native";
import { Button, InputItem, List, WhiteSpace, WingBlank, Picker, Icon } from '@ant-design/react-native';

const CustomChildren = props => (
  <TouchableWithoutFeedback style={{alignContent: 'flex-start'}} onPress={props.onPress}>
    <View
      style={{
        height: 36,
        paddingLeft: 0,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'space-around',

      }}
    >
      <Text style={{ paddingRight: 25,  fontSize: 18, color: '#000' }}>{props.children}</Text>
      <Text style={{ textAlign: 'center', fontSize: 16, color: '#999', marginRight: 15 }}>
        {props.extra}
      </Text>
    </View>
  </TouchableWithoutFeedback>
);

class PageHeader extends React.Component {
   constructor(props) {
    super(props);
    
    this.state = {
      data: [{ label: 'huangse', value: 'yellow' }],
      value: ['yellow'],
    };
  }

  render() {
    return (
      <View>
          <List>
          <WhiteSpace size="xl"/>
          <List.Item>
            <Picker
              data={this.state.data}
              cols={1}
              value={this.state.value}
            >
              <CustomChildren>车牌色</CustomChildren>
            </Picker>
          </List.Item>
          <InputItem
            clear
            placeholder="text"
            extra={<Icon name="camera" size="lg" color="#108EE9" />
}
          >
            车牌号
          </InputItem>
        </List>
        <WhiteSpace size="xl"/>
        <WhiteSpace size="xl"/>
        <WhiteSpace size="xl"/>
        <WingBlank>
        <Button type="primary">
            查询
          </Button>
        </WingBlank>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
  
});

export default PageHeader;


