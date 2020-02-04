import axios from 'axios';
import qs from 'qs';
var instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '' : '/api',
    timeout: 20000,
    method: 'post',
    // headers: {
    //     "Cache-Control": "",
    //     'Content-Type': "application/x-www-form-urlencoded",
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
    //     'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    //     // 'x-authentication-token': localStorage.XMDADMINTOKEN == undefined ? '' : localStorage.XMDADMINTOKEN,
    //     "Connection": "keep-alive"
    // },
    responseEncoding: 'utf8',//解码响应数据编码格式
    transformRequest: [function (data, headers) {//拦截发送数据
        // headers.post={
        //     "Content-Type": "application/x-www-form-urlencoded;charset:UTF8"
        // }
        return qs.stringify(data);//当以x-www-form-urlencoded 格式post数据的时候，需要使用qs.stringify来转换data的格式
    }],
});
export default instance;