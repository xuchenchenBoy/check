/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Provider } from 'react-redux';
import createStore from './store/createStore'
import sagas from './sagas'
import PageRoot from './pages'

const store = createStore();
store.runSaga(sagas);


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <PageRoot />
      </Provider>
    );
  }
}


