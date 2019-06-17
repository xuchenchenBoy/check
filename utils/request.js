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
      Toast.fail('登录失效，请重新登录')
      await storeData('token', undefined)
      NavigationService.navigate('login');
      return;
    }
    const token = res.headers['x-auth-token']
    if (token) {
      await storeData('token', token)
    }
    if (res.status === 200) {
      return res.data;
    } else {
      throw Error('请求失败')
    }
  } catch (err) {
    if (err && typeof err === 'string' && (err.indexOf('401') !== -1)) {
      Toast.fail('登录失效，请重新登录')
      await storeData('token', '')
      NavigationService.navigate('login');
      throw Error('请求失败')
    }
    Toast.fail(err.message || '请求失败')
    throw Error('请求失败')
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