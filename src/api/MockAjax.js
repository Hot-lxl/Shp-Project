// 专门请求mock接口的axios封装
import axios from 'axios';
// 引入nprogress进度条
import nprogress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css'
// 1.利用axios对象的方法create，创建一个axios实例
// 2.request就是axios，只不过需要自己配置一下
const mockAjax = axios.create({
    // 配置对象
    // 基础路径、发送请求的时候api会出现在路径中
    baseURL: "/mock",
    // 设置超时时间
    timeout: 5000,
});
// 请求拦截器：在发送请求之前可以检测到，可以在发送之前做一些事情
mockAjax.interceptors.request.use((config) => {
    // 进度条开始
    nprogress.start();
    // config:配置对象，对象路面有一个属性很重要，headers请求头
    return config;
});
// 响应拦截器：在服务器响应数据之后，可以对响应结果做一些处理
mockAjax.interceptors.response.use((res) => {
    // 进度条结束
    nprogress.done();
    // 成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些处理
    return res.data;
}, (error) => {
    // 响应失败的回调函数：终止promise链
    return Promise.reject(new Error("终止"))
})

// 重新暴露axios
export default mockAjax;
