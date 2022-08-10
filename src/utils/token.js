// 封装一个存储token到本地的方法
export const setToken = (token) => {
    localStorage.setItem("TOKEN", token);
}
// 获得token
export const getToken = () => {
    // 需要返回值
    return localStorage.getItem("TOKEN")
}
// 删除本地存储的token
export const removeToken= ()=>{
    localStorage.removeItem("TOKEN")
}