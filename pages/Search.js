
import React from "react";
import { View, StyleSheet, TouchableNativeFeedback,  } from "react-native";
import PageFooter from '../components/common/PageFooter'
import PageHeader from '../components/search/PageHeader'
import CarList from '../components/search/CarList'
import { connect } from 'react-redux'
import * as types from '../constants/actionTypes'

class Search extends React.Component {
  static navigationOptions = {
    header: null
  }

  handleSearch = (payload) => {
    this.props.handleSearch(payload)
  }

  goRouter = (routeName) => {
    this.props.navigation.replace(routeName)
  }

  render() {
    const { list } = this.props;
    return (
      <View style={{height: '100%'}}>
       <PageHeader handleSearch={this.handleSearch} />
       <CarList list={list} />
       <PageFooter goRouter={this.goRouter} routerName="search" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
  
});

export default connect(({ search }) => ({ ...search }), (dispatch) => ({
  handleSearch(payload) {
    dispatch({
      type: types.SEARCH_GET_PLATE_REQ,
      payload
    })
  }
}))(Search);

