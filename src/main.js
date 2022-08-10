import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router';
Vue.config.productionTip = false
//引入TypeNav组件（商品多级菜单）
import TypeNav from '@/components/TypeNav';
// 引入Carousel组件(轮播图)
import Carousel from '@/components/Carousel';
// 引入Pagination组件（分页）
import Pagination from '@/components/Pagination';
// 把三级联动组件注册为全局组件
Vue.component(TypeNav.name, TypeNav);
// 把Carousel组件(轮播图)注册为全局组件
Vue.component(Carousel.name, Carousel)
// 分页
Vue.component(Pagination.name, Pagination);
// 引入store
import store from '@/store';
// 引入mockServe.js文件让它执行一次，因为没有暴露所以不需要from
import "@/mock/mockServer";
// 因为swiper的css样式需要复用所以使用全局引入
import "swiper/css/swiper.css";
// 统一引入接口api文件夹里面的全部请求函数
import * as API from '@/api'
// 按需引入element-ui
import { MessageBox,Button } from "element-ui";
//注册插件
// Vue.use(Pagination)
// 注册插件在VUe原型上(另外一种写法)h
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.use(Button);

// 引入vue-lazyload（懒加载）
import VueLazyload from 'vue-lazyload';
//  引入默认图片、
import mor from "@/assets/1.jpeg"
Vue.use(VueLazyload, {
  // 懒加载默认加载图片（传参给自定义插件）
  loading: mor
})
// 自定义插件
// import MyPlugins from './plugins/plugins';
// Vue.use(MyPlugins,{
//   name:"upper"
// })

// 引入Veevalidate
import "@/plugins/validate";

new Vue({
  render: h => h(App),
  // 注册全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    // 注册到vue原型上这样所有组件都拥有了
    Vue.prototype.$API = API;
  },

  // 注册路由：一般写法就是kv（router小写）
  // 注册路由信息：当这里写router的时候那么所有的组件身上都会有，$route,$router属性
  router,
  //注册store，这样每个组件中都会用$store属性了
  store,
}).$mount('#app') //挂载相当于el

