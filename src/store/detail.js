// 引入发送请求的api
import { reqGoodsInfo, reqAddOrCart } from "@/api"
// 引入uuid的js
import {getUUID} from '@/utils/uuid_token'
export default {
    // 响应用户的一些操作
    actions: {
        // 异步获取指定skuId的商品详情
        async getDetailInfo({ commit }, skuId) {
            let result = await reqGoodsInfo(skuId);
            // 判断是否成功
            if (result.code == 200) {
                commit("GETDETAILINFO", result.data);
            }
        },
        // 异步把商品添加到购物车||修改某一个产品的个数
        async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
            // 这里只会返回成功不会返回数据，我们把商品数据存在服务上
            // 因为客户端需要一个成功或者失败的结果，所以把服务器返回的结果以promise（结果返回给客户端）
            let result = await reqAddOrCart(skuId,skuNum);
            if(result.code == 200){
                return "ok";
            }else{
                return Promise.reject(new Error("filled"));
            }
        }
    },
    // 用于修改state
    mutations: {
        // 接收到商品详情信息
        GETDETAILINFO(state, detailInfo) {
            state.detailInfo = detailInfo;
        }
    },
    // 存放数据
    state: {
        // 商品详情
        detailInfo: {},
        //游客临时身份
        uuid_token:getUUID()
        
    },
    // 用于简化数据
    getters: {
        //获取三级分类商品分类数据
        categoryView(state) {
            // 为了防止还未请求到服务器数据为空（则为undefault）页面出现错误， 可以让返回一个空对象才不会出错
            return state.detailInfo.categoryView || {};
        },
        // 获取商品的详情信息
        skuInfo(state) {
            const skuInfo = state.detailInfo.skuInfo;
            return skuInfo ? skuInfo : {};
        },
        //产品售卖属性的简化
        spuSaleAttrList(state) {
            return state.detailInfo.spuSaleAttrList || [];
        },

    }
}