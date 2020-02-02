import axios from 'axios';
import qs from 'qs';

var instance = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 20000,
    method: 'post',
    // headers: {'Accept-Charset': 'gbk,utf-8;q=0.8'},
    responseEncoding:'utf8',//解码响应数据编码格式
    transformRequest: [function (data, headers) {//拦截发送数据
        // headers.post={
        //     "Content-Type": "application/x-www-form-urlencoded;charset:UTF8"
        // }
        return qs.stringify(data);//当以x-www-form-urlencoded 格式post数据的时候，需要使用qs.stringify来转换data的格式
    }],
});
export default instance;