/* 注册路由组件的地方 */

// 引入Vue
import Vue from 'vue';
// 引入vue-router
import VueRouter from 'vue-router';
// 引入配置的路由
import routers from './routers'
// 引入仓库
import store from '@/store';
// 使用插件
Vue.use(VueRouter);
//先把VueRouter的push方法浅拷贝一份
let orginPush = VueRouter.prototype.push;
let orginReplace = VueRouter.prototype.replace;
// 重写push|replace
// 第一个参数：告诉push方法到哪里去（地址跳转）
// 第二个参数：成功回调
// 第三个参数：失败回调
// call和apply区别
// 相同点：都可以调用函数一次，可以篡改函数的上下文一次
// 不同点：call和apply传递参数的时候不同，call传递的参数用逗号隔开，apply则是传递的数组

// push
VueRouter.prototype.push = function (localhost, resolve, reject) {
    // 当有成功回调和失败回调传入的时候执行
    if (resolve && reject) {
        orginPush.call(this, localhost, resolve, reject);
    } else {
        orginPush.call(this, localhost, () => { }, () => { })
    }
}
// replace
VueRouter.prototype.replace = function (localhost, resolve, reject) {
    // 判断是否有成功回调和失败回调传入
    if (resolve && reject) {
        orginReplace.call(this, localhost, resolve, reject);
    } else {
        orginReplace.call(this, localhost, () => { }, () => { })
    }
}


// 创建并暴露路由VueRouter实例
let router = new VueRouter({
    // 路由配置
    routes:routers
});
// 配置全局守卫:前置（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
    // to:去哪里的路径
    // from:从哪里去
    // next： next()放行    next({path:"/"}) 跳转到指定路径 next(false): 退回原来的位置
    // 得到user仓库
    let user = store.state.user;
    // 获取本地存储的token判断是否存在
    // 如果存在则登录了
    if (user.token) {
        // 登录之后则不能跳转登录界面
        if (to.path == "/login" || to.path == "/register") {
            //不放行
            next(false);
        } else {
            // 判断登录成功是否有用户信息(其他页面)
            if (user.userInfo.name) {
                //有就可以放行
                next();
            } else {
                try {
                    // 没有就重新发送请求获取用户信息并且token没有过期
                    // 访问其他界面则根据token重新获取用户登录信息
                    await store.dispatch("userInfo")
                    // 其他路径可以放行
                    next();
                } catch (error) {
                    // 假如token过期了那么就清除用户的信息清除token
                    store.dispatch("userLogOut");
                    // 然后重新跳转到登录界面
                    next("/login");
                }
            }
        }
    } else {
        // 没有登录:不能去交易页面、不能去支付相关【pay|paysuccess】、不能去个人中心
        let toPath = to.path; //去的路径

        // ==-1说明没有找到 ！==就是找到了
        if (toPath.indexOf("/trade") !== -1 || toPath.indexOf("/pay") !== -1 || toPath.indexOf("/center") !== -1) {
            //不放行并且要登录,把未登录的时候想要去的地址保存在地址栏中（query存储）
            next("/login?redirect=" + toPath);
            alert("请先登录");
        } else {
            // 其他都可以放行
            next();
        }

    }

})
// 暴露
export default router;