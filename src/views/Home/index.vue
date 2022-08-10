<template>
  <div>
    <!-- 三级联动组件;已经在全局注册了所以不需要再注册了 -->
    <TypeNav />
    <!-- 列表（轮播图） -->
    <ListContainer />
    <!-- 今日推荐 -->
    <Recommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!-- 楼层 -->
    <Floor v-for="floors in floorsList" :key="floors.id" :list="floors" />
    <!-- 商标 -->
    <Brand />
  </div>
</template>

<script>
// 引入mapState
import { mapState } from "vuex";
// 引入其他组件
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";

export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  // 页面挂载完向服务器发送请求
  mounted() {
    //向mock发送请求获取楼层图数据
    this.$store.dispatch("getFloorsList");
   
  },
  computed: {
    // 获取服务器（state）返回的数据floorsList
    ...mapState({
      floorsList: (state) => state.home.floorsList,
    }),
  },
};
</script>

<style>
</style>