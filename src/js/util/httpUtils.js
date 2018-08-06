import axios from 'axios';
import { getCookie, setCookie } from 'cookieUtils';
import { Message } from 'element-ui'

// 基本设置
axios.withCredentials = true;
axios.defaults.baseURL = 'baiyi.gaodun.com';
axios.defaults.headers.post['Content-type'] = 'application/json; charset=UTF-8';

// config 设置
axios.interceptors.request.use(function(config) {
  let token = getCookie('CRM_TOKEN');
  let GDSID = getCookie(`${prefix}GDSID`);
  if (config.url.indexOf('UserLogin') === -1 ) {
    config.headers.common['Authorization'] = `Bearer ${token}`;
  }
  config.headers.common[`GDSID`] = GDSID;
  return Promise.resolve(config);
}, function (error) {
  return Promise.reject(error);
})

// 成功/失败 的拦截器设置
axios.interceptors.response.use(function (response) {
  // 获取token接口验证不校验，直接返回
  if (response.config.url.indexOf('token') != '-1') {
    return Promise.resolve(response.data);
  }

  // 登录失败
  if (response.data && response.data.status === 100) {
    localStorage.clear();
    location.href = '/#/login';
    location.reload();
    return;
  }

  return Promise.resolve(response.data);
}, function (error) {
  // 获取token接口验证不校验，直接返回
  if (error.config.url.indexOf('token') != '-1') {
    return Promise.resolve(error.data);
  }

  // 登录失败
  if (error.data && error.data.status === 100) {
    localStorage.clear();
    location.href = '/#/login';
    location.reload();
    return;
  }

  return Promise.resolve(error.data);
})

export default class HTTPUtils {
  constructor (options = {}) {
    this.options = options;
  }

  request(options) {
    return axios.request(options);
  }

  get(url, options = {}) {
    return this.request({
      url,
      params: {
        ...options
      },
    });
  }

  post(url, data, options = {}) {
    if (data instanceof Object) {
      data = JSON.stringify(data);
    }
    return this.request({
      methods: 'post',
      url,
      data,
      ...options,
    });
  }
}

const  HTTPUtilsInstance = new HTTPUtils;
export const request = HTTPUtilsInstance.request.bind(HTTPUtilsInstance);
export const get = HTTPUtilsInstance.get.bind(HTTPUtilsInstance);
export const post = HTTPUtilsInstance.post.bind(HTTPUtilsInstance);







