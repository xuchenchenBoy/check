
import React from "react";
import { View, StyleSheet, TouchableNativeFeedback,  } from "react-native";
import PageFooter from '../components/common/PageFooter'
import PageHeader from '../components/search/PageHeader'

class Search extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={{height: '100%'}}>
       <PageHeader />
       <PageFooter routerName="search" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
  
});

export default Search;

