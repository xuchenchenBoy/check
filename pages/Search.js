
import React from "react";
import { View, StyleSheet, TouchableNativeFeedback, Text, Button } from "react-native";
import PageFooter from '../components/common/PageFooter'
import PageHeader from '../components/search/PageHeader'
import CarList from '../components/search/CarList'
import { connect } from 'react-redux'
import * as types from '../constants/actionTypes'
import { getData, storeData } from '../utils/storage'
import { Flex, Icon } from '@ant-design/react-native'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraCarNumber: '',
      plateColor: '',
      username: ''
    }
  }

  static navigationOptions = {
    header: null
  }
  
  async componentWillMount() {
    const token = await getData('token');
    if (!token) {
      this.props.navigation.replace('login')
    }
    const username = await getData('username');
    this.setState({
      username
    })
  }

  componentWillUnmount() {
    this.props.resetList()
  }

  handleSearch = (payload) => {
    this.props.handleSearch(payload)
  }

  goRouter = (routeName) => {
    this.props.navigation.replace(routeName)
  }

  goCamera = () => {
    this.props.navigation.navigate('cameraHandler', {
      callBack: (number, color) => {
        if (number && color) {
          this.setState({
            cameraCarNumber: number,
            plateColor: color
          }, () => {
            this.props.handleSearch({
              vehicle_type: color,
              plate_number: number,
              state: 'ACCEPTED'
            })
          })
        }
      }
    })
  }

  async logout() {
    await storeData('token', '');
    this.props.navigation.replace('login')
  }

  render() {
    const { list, loading, hadReqList } = this.props;
    const { cameraCarNumber, plateColor, username } = this.state;

    return (
      <View style={{height: '100%'}}>
        <Flex style={styles.header} justify="between">
          <Flex align="center">
            <Icon color="#108EE9" name="environment"></Icon>
            <Text style={styles.username}>{username}</Text>
          </Flex>
          <Text onPress={this.logout.bind(this)} style={styles.logout}>登出</Text>
        </Flex>
       <PageHeader 
        loading={loading} 
        carNumber={cameraCarNumber} 
        plateColor={plateColor} 
        goCamera={this.goCamera} 
        handleSearch={this.handleSearch} 
       />
       <CarList hadReqList={hadReqList} list={list} />
       <View style={styles.bottom}>
        <PageFooter goRouter={this.goRouter} routerName="search" />
       </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingLeft: 22,
    paddingRight: 22,
  },
  username: {
    fontSize: 16
  },
  logout: {
    fontSize: 16
  },
  bottom: {
    position: 'absolute', 
    left: 0, 
    bottom: 0, 
    width: '100%'
  }
});

export default connect(({ search }) => ({ ...search }), (dispatch) => ({
  handleSearch(payload) {
    dispatch({
      type: types.SEARCH_GET_PLATE_REQ,
      payload
    })
  },
  resetList(){
    dispatch({
      type: types.RESET_PLATE_LIST
    })
  }
}))(Search);

