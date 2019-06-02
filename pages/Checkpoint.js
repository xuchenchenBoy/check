import React from 'react';
import { Text, View, StyleSheet, } from 'react-native';
import { ListView, WingBlank, WhiteSpace, Flex, Button } from '@ant-design/react-native';
import PageFooter from '../components/common/PageFooter'
import { connect } from 'react-redux'
import * as types from '../constants/actionTypes'
import { getCheckpointStatus, NORMAL_STATUS, CLOSED_STATUS, FAULT_STATUS } from '../constants/index'

class Checkpoint extends React.Component {
  static navigationOptions = {
    header: null
  }

  componentDidMount = () => {
    this.props.getList()
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.list !== nextProps.list) {
      this.listRef.ulv && this.listRef.ulv.updateRows(nextProps.list)
    }
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
      let pageLimit = 100;
      //Generate dummy data
      let rowData = Array.from(
        { length: pageLimit },
        (_, index) => `item -> ${index}`
      );

      //Simulate the end of the list if there is no more data returned from the server
      if (page === 1) {
        rowData = [];
      }

      startFetch(rowData, pageLimit);
    } catch (err) {
      abortFetch(); //manually stop the refresh or pagination if it encounters network error
    }
  };

  openPoint = (gate_num) => {
    this.props.openPoint({ gate_num })
  }

  restorePoint = (gate_num) => {
    this.props.restorePoint({ gate_nums: [gate_num] })
  }

  closePoint = (gate_num) => {
    this.props.closePoint({ gate_nums: [gate_num] })
  }

  renderItem = (item) => {
    const { group_name, status, gate_num } = item;
    const isNormalStatus = NORMAL_STATUS === status;
    const isCloseStatus = CLOSED_STATUS === status;

    return (
      <WingBlank>
        <WhiteSpace />
        <View style={styles.item}>
          <View>
            <Text style={styles.name}>{group_name}</Text>
            <WhiteSpace />
            <Text style={[styles.status, isNormalStatus ? styles.normal_status : null, isCloseStatus ? styles.close_status : null]}>{getCheckpointStatus(status)}</Text>
          </View>
          <Flex justify="end">
            <WingBlank>
              <Button onPress={() => this.openPoint(gate_num)} type="primary">开闸</Button>
            </WingBlank>
            { 
              isCloseStatus || (FAULT_STATUS === status)
                ? (
                    <WingBlank>
                      <Button onPress={() => this.restorePoint(gate_num)} type="ghost">恢复</Button>
                    </WingBlank>
                )
                : null
            }
            {
              isNormalStatus
                ? (
                    <WingBlank>
                      <Button onPress={() => this.closePoint(gate_num)} type="ghost">锁定</Button>
                    </WingBlank>
                )
                : null
            }
          </Flex>
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
            ref={ref => this.listRef = ref}
            renderItem={this.renderItem}
            numColumns={1}
            refreshable={false}
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

export default connect(({ checkpoint }) => ({ ...checkpoint }), (dispatch) => ({
  getList(payload) {
    dispatch({
      type: types.CHECKPOINT_GET_LIST_REQ,
      payload
    })
  },
  openPoint(payload) {
    dispatch({
      type: types.CHECKPOINT_OPEN_REQ,
      payload
    })
  },
  restorePoint(payload) {
    dispatch({
      type: types.CHECKPOINT_RESTORE_REQ,
      payload
    })
  },
  closePoint(payload) {
    dispatch({
      type: types.CHECKPOINT_CLOSE_REQ,
      payload
    })
  },
}))(Checkpoint);

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
  status: {
    fontSize: 16
  },
  normal_status: {
    color: 'green'
  },
  close_status: {
    color: 'red'
  }
})
