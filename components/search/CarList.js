import React from 'react'
import { Text, View, StyleSheet, } from 'react-native';
import { ListView, WingBlank, WhiteSpace, Flex, Button } from '@ant-design/react-native';
import { PLATE_COLORS } from '../../constants/index'
import { formatTime } from '../../utils/index'

export default class CardList extends React.Component {
  goDetail = () => {
    this.props.goDetail()
  }

  render() {
    const { list = [] } = this.props;

    return (
      <View>
        {
          list.map(i => {
            const { plate_number, route, vehicle_type, start_time, end_time } = i;
            const vehicle = PLATE_COLORS.find(i => i.value === vehicle_type) || {};
            
            return (
              <WingBlank key={`${plate_number}_${vehicle_type}`}>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <View style={styles.item}>
                  <View>
                    <Text style={styles.name}>{vehicle.label} | {plate_number}</Text>
                    <Text style={styles.name}>{route}</Text>
                    <Text style={styles.name}>
                      {formatTime(new Date(start_time))}
                      &nbsp; 至 &nbsp;
                      {formatTime(new Date(end_time))}
                    </Text>
                    <WhiteSpace />
                  </View>
                  <Flex justify="end">
                    <WingBlank>
                      <Button onPress={() => this.goDetail()} type="primary">查看</Button>
                    </WingBlank>
                  </Flex>
                </View>
                <WhiteSpace />
              </WingBlank>
            )
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 5,
    padding: 15, 
    borderStyle: 'solid', 
    borderWidth: 1, 
    borderColor: 'rgb(221, 221, 221)',
  },
  name: {
    fontSize: 18,
  },
})