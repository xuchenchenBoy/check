
import React from "react";
import { View, StyleSheet, TouchableNativeFeedback,  } from "react-native";
import PageFooter from '../components/common/PageFooter'
import PageHeader from '../components/search/PageHeader'
import CarList from '../components/search/CarList'
import { connect } from 'react-redux'
import * as types from '../constants/actionTypes'
import { getData } from '../utils/storage'

class Search extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      cameraCarNumber: '',
      plateColor: ''
    }
  }

  async componentWillMount() {
    const token = await getData('token');
    console.log('token=', token)
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
          })
        }
      }
    })
  }

  render() {
    const { list } = this.props;
    const { carNumber, plateColor } = this.state;

    return (
      <View style={{height: '100%'}}>
       <PageHeader carNumber={carNumber} plateColor={plateColor} goCamera={this.goCamera} handleSearch={this.handleSearch} />
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

