<template>
  <div>
    <Header></Header>
    <!-- 显示 路由组件出口的地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.Show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  data() {
    return {
      msg:"abc"
    }
  },
  components: {
    Header,
    Footer,
  },
  mounted() {
    //当组件挂载完毕之后，向服务器发送请求获取商品分类（因为这里才会发送一次）
    this.$store.dispatch("getCategoryList");
  },
};
</script>

