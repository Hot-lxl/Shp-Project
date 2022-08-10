import { setToken, getToken, removeToken } from "@/utils/token";
import { reqGetCode, reqUserRegiset, reqUserLogin, reqUserInfo, reqUserLogOut } from "@/api"
export default {
    actions: {
        // 异步获取验证码
        async getCode({ commit }, phone) {
            let result = await reqGetCode(phone);
            // 成功则把验证码传给客户端，正常情况下不用传，客户手机上看验证码
            if (result.code == 200) {
                commit("GETCODE", result.data);
                return "ok"
            } else {
                return Promise.reject(new Error("获取验证码失败"))
            }
        },
        //异步注册账号
        async userRegister({ commit }, user) {
            let result = await reqUserRegiset(user);
            //把注册成功或者失败的结果返回给客户端
            if (result.code == 200) {
                return "ok"
            } else {
                return Promise.reject(new Error("注册失败"))
            }
        },
        // 异步的登录账号服务器返回一个token
        async userLogin({ commit }, user) {
            let result = await reqUserLogin(user);
            // 返回成功与失败的结果通知客户端 
            if (result.code == 200) {
                // 把得到的token存入创库
                commit("USERLOGIN", result.data.token)
                // 把得到的token持久存储（本地）
                setToken(result.data.token)
                return "ok";
            } else {
                return Promise.reject(new Error("fail"))
            }
        },
        // 异步获取用户登录信息
        async userInfo({ commit }) {
            let result = await reqUserInfo();
            if (result.code == 200) {
                commit("USERINFO", result.data);
                return "ok";
            }else{
                return Promise.reject(new Error("toke已过期"))
            }
        },
        // 异步发送请求退出登录(清除所有用户信息)
        async userLogOut({ commit }) {
            let result = await reqUserLogOut();
            // 成功就交给Mutations然后修改state
            if (result.code == 200) {
                commit("USERLOGOUT");
            }
        }
    },
    mutations: {
        // 操作state
        GETCODE(state, code) {
            state.code = code
        },
        USERLOGIN(state, token) {
            state.token = token;
        },
        USERINFO(state, userInfo) {
            state.userInfo = userInfo;
        },
        USERLOGOUT(state){
            // 清除仓库的token
            state.token = "";
            // 清除用户信息
            state.userInfo = {};
            // 清除游览器本地存储的token
            removeToken();
        }

    },
    state: {
        // 仓库中的数据不会永久存储（一刷新就没了）
        code: "",//验证码
        token: getToken(),//令牌（标识）
        userInfo: {},//用户登录信息  
    },
    getters: {

    }
}