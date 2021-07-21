const axios = require('axios')
const qs = require('qs')
const querystring = require('querystring');
let cookie = ""
const instance = axios.create({
    baseURL: 'http://192.168.66.173:6981',
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'},
      // `transformRequest` 允许在向服务器发送前，修改请求数据
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    transformRequest: [function (data, headers) {
      // 对 data 进行任意转换处理
      data = qs.stringify(data)
      return data
    }],
  
    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data) {
        // console.log('transformResponse',data,JSON.parse(data));
        data = JSON.parse(data)
      // 对 data 进行任意转换处理
      return data;
    }],
    responseType: 'json',
    responseEncoding: 'utf8', // default
    withCredentials: true
})
instance.interceptors.request.use(config => {
    // cookie?config.headers['Cookie']=cookie:''
    config.headers['Cookie']=cookie //node中无法自动携带cookie  暂时写死
    return config
}, error => {
   return Promise.reject(error)
})
instance.interceptors.response.use((response) => {
  // // 对响应数据做点什么
  if(response.config.url == '/api/v1/sys/userLogin'){ 
    cookie = response.headers['set-cookie'][0].split(";")[0]   
  }
  if(response.config.url == '/api/v1/sys/userLogout'){
    cookie=""
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

module.exports =  instance