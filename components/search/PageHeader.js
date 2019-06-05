
import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Text } from "react-native";
import { Button, InputItem, List, WhiteSpace, WingBlank, Picker, Icon, Toast } from '@ant-design/react-native';
import { PLATE_COLORS } from '../../constants/index'

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
      value: ['yellow'],
      inputVal: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.carNumber !== nextProps.carNumber) {
      const matchItem = PLATE_COLORS.find(i => i.value === nextProps.plateColor);
      let colorVal = []
      if (matchItem) {
        colorVal = [nextProps.plateColor]
      }
      this.setState({
        value: colorVal,
        inputVal: nextProps.carNumber
      }, () => {
        this.handleSearch()
      })
    }
  }

  changePlateColor = (value) => {
    this.setState({
      value
    })
  }

  handleSearch = () => {
    const { value, inputVal } = this.state;
    if (!inputVal.trim()) {
      Toast.info('请输入车牌号')
      return
    }
    this.props.handleSearch({
      vehicle_type: value[0],
      plate_number: inputVal,
      state: 'ACCEPTED'
    })
  }

  onChangeInput = (inputVal) => {
    this.setState({
      inputVal
    })
  }

  goCamera = () => {
    this.props.goCamera()
  }

  render() {
    const { inputVal, value } = this.state;
    return (
      <View>
          <List>
          <WhiteSpace size="xl"/>
          <List.Item>
            <Picker
              data={PLATE_COLORS}
              cols={1}
              value={value}
              itemStyle={{padding: 20}}
              onChange={this.changePlateColor}
            >
              <CustomChildren>车牌色</CustomChildren>
            </Picker>
          </List.Item>
          <InputItem
            value={inputVal}
            clear
            style={styles.plate}
            placeholder="请输入"
            onChange={this.onChangeInput}
            extra={<Icon onPress={this.goCamera} name="camera" size="lg" color="#108EE9" />}
          >
            车牌号
          </InputItem>
        </List>
        <WhiteSpace size="xl"/>
        <WhiteSpace size="xl"/>
        <WhiteSpace size="xl"/>
        <WingBlank>
        <Button onPress={this.handleSearch} type="primary">
            查询
        </Button>
        </WingBlank>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selectedPlate: {
    color: '#000'
  },
  plate: {
    color: '#999', 
    fontSize: 15
  }
});

export default PageHeader;


