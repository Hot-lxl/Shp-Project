<template>
  <div class="swiper-container" id="floor1Swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="lists in list" :key="lists.id">
        <img :src="lists.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入Swiper
import Swiper from "swiper";
// 封装轮播图（全局组件）
export default {
  name: "Carousel",
  //接收父组件传过来的数据
  props: ["list"],
  watch: {
    // 监听list的改变
    list: {
      immediate: true, //一上来就立即执行监听，因为list是父组件传过来的数据都是获取完毕了所以不会监视，需要一开始就监听
      // 如果能进到handler那么说明已经被修改了（从服务器获取到了数据）
      handler() {
        // 但是这个函数执行完了：只能保证bannersList数据已经有了并且被修改了，不能保证页面v-for执行完了
        // $nextTick：在修改数据之后立即使用它，但是不会执行里面的代码，而是等待DOM的更新完成， 将回调延迟到下一次DOM更新 循环结束之后，
        this.$nextTick(function () {
          // swiper实例给样式添加动态效果
          var mySwiper = new Swiper(".swiper-container", {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              // 指定点可以点击跳转
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>