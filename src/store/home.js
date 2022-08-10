//引入发送AIP接口
import { reqCategoryList, reqBannerList,reqFloorsList } from "@/api";
// 向外暴露所有的
export default {
    // 模块化编程+命名空间 
    // 如果开启了那么用户操作那边就必须要写对应的名字
    // namespaced: true,
    // action:处理action响应用户的操作，可以写自己的业务逻辑，也可以处理异步向服务器发送请求
    actions: {
        // 异步通过API里面的接口函数调用，向服务器发送请求， 得到数据（商品分类）
        async getCategoryList({ commit }) {//{commit}：解构赋值
            //这里使用async和await等待服务器返回结果了才输出（才会执行后面的代码）
            const result = await reqCategoryList();
            // 判断code为200说明成功
            if (result.code == 200) {
                commit("CATEGORYLIST", result.data)
            }
        },
        // 异步通过API向mock发送请求获取数据（轮播图）
        async getBannersList({ commit }) {
            // 返回的结果是一个promise对象所以需要使用async和await才能得到数据
            const result = await reqBannerList();

            // 得到数据进行判断
            if (result.code == 200) {
                commit("BANNERSLIST", result.data);
            }
        },
        // 异步通过API向mock发送请求获取数据（楼层轮播图）
        async getFloorsList({commit}){
            let result = await reqFloorsList();
            // 判断成功200
            if(result.code == 200){
                commit("FLOORSLIST",result.data)
            }
        }
    },
    // mutations:用于修改state的唯一手段
    mutations: {
        CATEGORYLIST(state, data) {
            // 截取并删除
            data.splice(data.length - 1)
            // console.log(data);
            state.categoryList = data;
        },
        // 轮播图数据
        BANNERSLIST(state, data) {
            state.bannersList = data;
        },
        //楼层数据
        FLOORSLIST(state,data){
            state.floorsList = data;
        }

    },
    // state:用于存储数据的地方
    state: {
        //商品分类数据
        categoryList: [],
        // 轮播图数据
        bannersList: [],
        // 楼层数据
        floorsList:[],
    },
    // getters：用来计算属性
    getters: {},
}