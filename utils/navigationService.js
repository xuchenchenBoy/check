import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  console.log('StackActions=', StackActions)
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function replaceRouter(routeName, params) {
  console.log('replaceRouter=', routeName)
  _navigator.dispatch(
    StackActions.replace({
      routeName,
      params,
    })
  );
}

function resetRouter(routeName, params) {
  console.log('reset')
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
    })
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  replaceRouter,
  resetRouter
};