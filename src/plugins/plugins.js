// vue插件对外暴露的一定是对象 
const MyPlugins = {};
// 并且带install方法  
// Vue:Vue对象  options：注册插件传进来的参数
MyPlugins.install = function (Vue, options) {
    // Vue.prototype.$bus:任何组件都可以使用（全局原型）
    // Vue.directive:全局定义指令
    // Vue.component:全局注册
    // Vue.filter:全局过滤
    // Vue.mixin:全局混入
    
    // binding:绑定的数据 
    // binding.mofine:修饰符
    Vue.directive("big", (element,binding) => {
        console.log(binding);
        element.innerHTML  = options.name;
    })


}
export default MyPlugins