// 引入发送请求的api
import { reqCartList, reqDeleteCartById, reqUpdateCheckById } from "@/api"
export default {
    actions: {
        // 异步发送请求获取购物车列表
        async getCartList({ commit }) {
            let result = await reqCartList();
            // 判断是否成功
            if (result.code == 200) {
                commit("GETCARTLIST", result.data);
            }
        },
        // 异步删除购物车商品
        async deleteCartGoods({ commit }, skuId) {
            let result = await reqDeleteCartById(skuId)
            // 把成功或者失败的结果返回给客户端（promise）
            if (result.code == 200) {
                return "ok"
            } else {
                // 返回失败的结果
                return Promise.reject(new Error("filled"))
            }
        },

        // 异步切换商品选中状态
        async updateCheckById({ commit }, { skuId, isChecked }) {
            let result = await reqUpdateCheckById(skuId, isChecked);
            // 给客户端一个失败或者成功的结果j
            if (result.code == 200) {
                return "ok"
            } else {
                return Promise.reject(new Error("filled"))
            }
        },
        // 删除选中的所有商品
        deleteCheckCartList({ dispatch, getters }) {
            /* 
            context对象:
            {
                state,      // 等同于 `store.state`，若在模块中则为局部状态
                rootState,  // 等同于 `store.state`，只存在于模块中
                commit,     // 等同于 `store.commit`
                dispatch,   // 等同于 `store.dispatch`
                getters,    // 等同于 `store.getters`
                rootGetters // 等同于 `store.getters`，只存在于模块中
            }
            */
            // 获取购物车全部的产品
            let PromiseAll = [];
            // 既然没有接口获取不到选中的id那么遍历所有商品
            getters.cartList.cartInfoList.forEach(item => {
                // 判断ischeck为1的删除
                let promise = item.isChecked == 1 ? dispatch("deleteCartGoods", item.skuId) : "";
                // 将每个返回的promise实例添加到数组中
                PromiseAll.push(promise);
            })
            // promise.all()把多个promise实例包装成一个新的promise实例
            // 把成功与失败的结果返回给客户端
            return Promise.all(PromiseAll);

        },
        // 全选
        updateAllCartChecked({ dispatch, getters }, isChecked) {
            // 定义一个数组来装所有的商品
            let PromiseAll = [];
            // 遍历所有商品获取到skuid
            getters.cartList.cartInfoList.forEach(item => {
                // 让遍历的商品都跟着全选的isChecked来变化
                let promise = dispatch("updateCheckById", { skuId: item.skuId,isChecked:isChecked });
                // 装入数组
                PromiseAll.push(promise);
            })
            // 把成功或者失败的结果返回
            return Promise.all(PromiseAll)
        }

    },
    mutations: {
        GETCARTLIST(state, data) {
            state.cartList = data;
        }

    },
    state: {
        cartList: []
    },
    getters: {
        // 简化购物车数据
        cartList(state) {
            return state.cartList[0] || {};
        },

    }
}