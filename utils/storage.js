import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (err) {
    console.log(err)
    // saving error
  }
}

export const getData = async (key) => {
  try {
    return await AsyncStorage.getItem(key)
  } catch(err) {
    return null
    console.log('err=', err)
    // error reading value
  }
}