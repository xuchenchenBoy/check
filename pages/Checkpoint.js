import React from 'react';
import { Text, View, StyleSheet, } from 'react-native';
import { ListView, WingBlank, WhiteSpace,} from '@ant-design/react-native';
import PageFooter from '../components/common/PageFooter'

export default class Checkpoint extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    layout: 'list',
  };

  onFetch = async (
    page = 1,
    startFetch,
    abortFetch
  ) => {
    try {
      let pageLimit = 30;
      //Generate dummy data
      let rowData = Array.from(
        { length: pageLimit },
        (_, index) => `item -> ${index}`
      );

      //Simulate the end of the list if there is no more data returned from the server
      if (page === 2) {
        rowData = [];
      }

      startFetch(rowData, pageLimit);
    } catch (err) {
      abortFetch(); //manually stop the refresh or pagination if it encounters network error
    }
  };

  renderItem = (item) => {
    return (
      <WingBlank>
        <WhiteSpace />
        <View style={styles.item}>
          <Text>{item}</Text>
        </View>
        <WhiteSpace />
      </WingBlank>
    );
  };

  render() {
    return (
      <View style={{height: '100%'}}>
        <View style={{ height: '100%' }}>
          <ListView
            header={() => <WhiteSpace size="lg" />}
            onFetch={this.onFetch}
            keyExtractor={(item, index) =>
              `${this.state.layout} - ${item} - ${index}`
            }
            renderItem={this.renderItem}
            numColumns={1}
          />
          <WhiteSpace />
        </View>
        <View style={{ position: 'absolute', left: 0, bottom: 0, width: '100%' }}>
          <PageFooter routerName="checkpoint" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 5,
    padding: 15, 
    borderStyle: 'solid', 
    borderWidth: 1, 
    borderColor: 'rgb(221, 221, 221)',
  }
})
