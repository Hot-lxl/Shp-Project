// 引入uuid
import { v4 as uuidv4 } from 'uuid';
// 要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
    // 先从游览器获取uuid标识
    let uuid_token = sessionStorage.getItem("UUIDTOKEN");
    // 如果没有获取到那么就创建
    if(!uuid_token){
        // 创建(单列只用一次)
        uuid_token = uuidv4();
        // 存入游览器
        sessionStorage.setItem("UUIDTOKEN",uuid_token)
    }
    // 函数要返回结果
    return uuid_token;
}
