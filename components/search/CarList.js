import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { ListView, WingBlank, WhiteSpace, Flex, Button } from '@ant-design/react-native';
import { PLATE_COLORS, } from '../../constants/index'
import { formatTime, BASE_URL } from '../../utils/index'
import NavigationService from '../../utils/navigationService'

export default class CardList extends React.Component {
  goDetail = (item) => {
    const { id, plate_number, permit_number, phone } = item;
    NavigationService.navigate('webContainer', {
      url: `${BASE_URL}/index.html#/permit?id=${id}&plate_number=${ plate_number }&permit_number=${ permit_number }&phone=${phone}`
    })
  }

  render() {
    const { list = [] } = this.props;

    return (
      <ScrollView>
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
                      <Button onPress={() => this.goDetail(i)} type="primary">查看</Button>
                    </WingBlank>
                  </Flex>
                </View>
                <WhiteSpace />
              </WingBlank>
            )
          })
        }
        { list.length 
          ? null 
          : <View>
              <WhiteSpace size="lg" />
              <WhiteSpace size="lg" />
              <WhiteSpace size="lg" />
              <Text style={{textAlign: 'center'}}>暂无数据</Text>
            </View>
        }
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
      </ScrollView>
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