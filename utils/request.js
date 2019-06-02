import axios from 'axios'
import qs from 'qs'
import { storeData, getData } from './storage'
import { Toast } from '@ant-design/react-native';

const request = async function({ 
  method = 'GET', 
  url, 
  params = {}, 
  headers,
}) {
  let data = {};
  if (method === 'GET') {
    url += qs.stringify(params, { addQueryPrefix: true })
  } else {
    data = params;
  }
  const storeToken = await getData('token');
  try {
    const res = await axios({
      method,
      url,
      data,
      baseURL: 'https://test.tony-traffic.com',
      headers: {
        ...headers,
        'x-auth-token': storeToken
      }
    })
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