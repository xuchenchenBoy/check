
import React from "react";
import { View, StyleSheet, TouchableNativeFeedback,  } from "react-native";
import PageFooter from '../components/common/PageFooter'
import PageHeader from '../components/search/PageHeader'
import CarList from '../components/search/CarList'
import { connect } from 'react-redux'
import * as types from '../constants/actionTypes'
import { getData, storeData } from '../utils/storage'

class Search extends React.Component {
  static navigationOptions = {
    title: '名字',
  };

  constructor(props) {
    super(props);
    this.state = {
      cameraCarNumber: '',
      plateColor: ''
    }
  }

  async componentWillMount() {
    const username = await getData('username')
    const token = await getData('token');
    if (!token) {
      this.props.navigation.replace('login')
    }
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

  render() {
    const { list, loading, } = this.props;
    const { cameraCarNumber, plateColor } = this.state;
    return (
      <View style={{height: '100%'}}>
       <PageHeader 
        loading={loading} 
        carNumber={cameraCarNumber} 
        plateColor={plateColor} 
        goCamera={this.goCamera} 
        handleSearch={this.handleSearch} 
       />
       <CarList list={list} />
       <View style={styles.bottom}>
        <PageFooter goRouter={this.goRouter} routerName="search" />
       </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  }
}))(Search);

