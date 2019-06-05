import axios from 'axios'
import qs from 'qs'
import { storeData, getData } from './storage'
import { Toast } from '@ant-design/react-native';
import { BASE_URL } from './index'
import NavigationService from './navigationService'

const request = async function({ 
  method = 'GET', 
  url, 
  params = {}, 
  headers,
}) {
  let data = {};
  if (method === 'GET') {
    url += qs.stringify({ ...params, t: Date.now() }, { addQueryPrefix: true });
  } else {
    data = params;
  }
  const storeToken = await getData('token');
  try {
    console.log('storeToken=', storeToken)
    const res = await axios({
      method,
      url,
      data,
      baseURL: BASE_URL,
      headers: {
        ...headers,
        'x-auth-token': storeToken
      }
    })
    console.log('res=', res)
    if (!res) {
      Toast.fail('请求失败')
      return;
    }
    if (res.status === 401) {
      NavigationService.navigate('login');
      Toast.fail('登录失效，请重新登录')
      return;
    }
    const token = res.headers['x-auth-token']
    if (token) {
      await storeData('token', token)
    }
    console.log(res)
    if (res.status === 200) {
      return res.data;
    } else {
      throw Error('请求失败')
    }
  } catch (err) {
    console.log('err=', err)
    if (err.status === 401) {
      NavigationService.navigate('login');
      Toast.fail('登录失效，请重新登录')
      return err;
    }
    console.log('err=', err)
    Toast.fail(err.message || '请求失败')
    return err;
  }
}

const postReq = async function(payload) {
  return await request({ 
    method: 'POST', 
    ...payload, 
  })
}

const getReq = function(payload) {
  return request({ method: 'GET', ...payload })
}

export { postReq, getReq }