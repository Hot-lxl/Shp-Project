import { reqUserAddressList, reqUserTradeList } from "@/api";
export default {
    actions: {
        // 异步获取用户的地址信息
        async getUserAddressList({ commit }) {
            let result = await reqUserAddressList();
            if (result.code == 200) {
                commit("GETUSERADDRESSLIST", result.data);
            }
        },
        // 异步获取交易页面的订单信息
        async getUserTradeList({ commit }) {
            let result = await reqUserTradeList();
            if (result.code == 200) {
                commit("GETUSERTRADELIST", result.data);
            }
        }
    },
    mutations: {
        GETUSERADDRESSLIST(state, val) {
            state.userAddressList = val;
        },
        GETUSERTRADELIST(state, val) {
            state.userTradeList = val;
        }
    },
    state: {
        userAddressList: [],//用户地址信息
        userTradeList:{},//订单页面信息

    },
    getters: {

    },
}