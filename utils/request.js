import axios from 'axios'
import qs from 'qs'

const request = async function({ 
  method = 'GET', 
  url, 
  params = {}, 
  headers,
}) {
  let data = {};
  if (method === 'GET') {
    url += qs.stringify(params)
  } else {
    data = params;
  }

  try {
    const res = await axios({
      method,
      url,
      data,
      baseURL: '',
      headers
    })
    return res.data;
  } catch (err) {
    return err;
  }
}

const postReq = async function(payload) {
  return await request({ 
    method: 'POST', 
    ...payload, 
    headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

const getReq = function(payload) {
  return request({ method: 'GET', ...payload })
}

export { postReq, getReq }