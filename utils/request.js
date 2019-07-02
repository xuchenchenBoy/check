import axios from 'axios'
import qs from 'qs'
import { storeData, getData } from './storage'
import { Toast } from '@ant-design/react-native';
import { BASE_URL } from './index'
import NavigationService from './navigationService'

var instance = axios.create({
  baseURL: BASE_URL,
  responseType: 'json', // default
  validateStatus: async status => { 
    if (status === 401) {
      Toast.fail('登录失效，请重新登录')
      await storeData('token', undefined)
      NavigationService.navigate('login');
      return false;
    }
    return status === 200 
  },
});

instance.interceptors.request.use(
  async config => {
    const token = await getData('token')
    console.log('token==', token)
    if (token) {  
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 响应拦截
instance.interceptors.response.use(async (res = {}) => {
  console.log('res=', res)
  const token = res.headers['x-auth-token']
  if (token) {
    await storeData('token', token)
  }
  let data = res.data;
  if (data && data.response) {
    data = data.response;
  }
  if (data.error_code) {
    return Promise.reject(data);
  } else {
    return Promise.resolve(data);
  }
}, (err) => {
  console.log('err=', err)
  return Promise.reject(new Error('系统错误'));
});

// instance.interceptors.response.use(
//   async response => {
//     console.log('response', response)
//     // const token = response.headers['x-auth-token']
//     // if (token) {
//     //   await storeData('token', token)
//     // }
//     // if (response.data.error_code) {
//     //   throw new Error(response)
//     //   //return Promise.reject(response.data) 
//     // }
//     return response;
//   },
//   async error => {
//     console.log('err=', error)
//     if (error.response) {
//       // switch (error.response.status) {
//       //     case 401: {
//       //       Toast.fail('登录失效，请重新登录')
//       //       await storeData('token', undefined)
//       //       NavigationService.navigate('login');
//       //       return;
//       //     };
//       //     default: {}
//       // }
//       // if (error.response.data && error.response.data.error_massage) {
//       //   Toast.fail(error.response.data.error_massage || '请求失败')
//       //   return;
//       // }
//     }
//     Toast.fail('请求失败')
//     throw new Error(error)
//     // return Promise.reject(error) 
//   }
// );

const postReq = async function(payload) {
  const { url, params } = payload;
  return await instance.post(url, params)
}

const getReq = async function(payload) {
  const { url, params } = payload;
  return await instance.get(url, { params: { ...params, t: Date.now() } })
}

export { postReq, getReq }