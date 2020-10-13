/**
 * @Description: axios的封装
 * @author: forguo
 * @date: 2020/8/27
 */

import axios from 'axios';
import {Modal, Toast} from "antd-mobile";

Toast.config({duration: 3.5, mask: false});
const alert = Modal.alert;

// 错误码
const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '请求错误。',
    401: '用户没有权限（用户名或密码错误）。',
    403: '拒绝访问。',
    404: '请求地址出错。',
    406: '请求的格式不可得。',
    408: '请求超时。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器内部错误。',
    502: '网关错误。',
    503: '服务不可用。',
    504: '网关超时。',
    505: 'HTTP版本不受支持。',
};

const request = axios.create({
    timeout: 10000
});

// 拦截器
request.interceptors.request.use(config => {
    return config;
}, err => {
    return Promise.reject(err);
});

request.interceptors.response.use(res => {
    const {data, status} = res;
    if (status !== 200) {
        Toast.info(codeMessage[status] || data.message || '当前访问人数过多，请稍后再试');
        return Promise.reject(codeMessage[status] || data.message || '当前访问人数过多，请稍后再试');
    }
    if (data.code !== 200) {
        Toast.info(data.message);
        return Promise.reject(data);
    }
    return Promise.resolve(data);
}, error => {
    console.log(JSON.stringify(error));
    alert('提示', error.message || '当前访问人数过多，请稍后再试', [
        {text: '我知道了'},
    ]);
    return Promise.reject(error.message || new Error('当前访问人数过多，请稍后再试'));
});

export default request;
