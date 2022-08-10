//引入发送AIP接口
import { reqSearchList } from "@/api";
// 向外暴露所写的
export default {
    // 模块化编程+命名空间
    // namespaced: true,
    // action:处理action响应用户的操作，可以写自己的业务逻辑，也可以处理异步向服务器发送请求
    actions: {
        // 异步获取搜索的商品库
        // params={}：如果不传参数那么就默认空对象
        async getSearchList({ commit }, params = {}) {
            let result = await reqSearchList(params);
            // 判断为200则为成功
            if (result.code == 200) {
                commit("GETSEARCHLIST", result.data)
            }
        }
    },
    // mutations:用于修改state的唯一手段
    mutations: {
        GETSEARCHLIST(state, data) {
            // data.total = 36;
            state.searchList = data;
        }
    },
    // state:用于存储数据的地方
    state: {
        // 所有商品
        searchList: {},
    },
    // getters：用来计算属性(需要return)，简化仓库中的数据
    getters: {
        // 商品列表
        goodsList(state) {
            // 为了保证如果没有数据也不会报错（unfidef）
            return state.searchList.goodsList || [];
        },
        // 商品属性
        attrsList(state) {
            return state.searchList.attrsList || [];
        },
        // 商品品牌
        trademarkList(state) {
            return state.searchList.trademarkList || [];
        },
        // 总条数
        total(state){
            return state.total || undefined;
        }
    },
}