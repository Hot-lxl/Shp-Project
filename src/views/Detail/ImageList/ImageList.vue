<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(skuImg, index) in skuImageList"
        :key="skuImg.id"
      >
        <img
          :src="skuImg.imgUrl"
          @click="checkActive(index)"
          :class="{ active: currIndex == index }"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// 引入Swiper
import Swiper from "swiper";
export default {
  name: "ImageList",
  //接收父组件传过来的props数据
  props: ["skuImageList"],
  data() {
    return {
      currIndex: 0,//定义一个属性来接收index
    };
  },
  watch: {
    // 监听父组件传过来的数据改变
    skuImageList: {
      immediate: true, //一开始就监听
      handler() {
        // 将会回调延迟到下次更新DOM循环执行之后，并且数据被修改之后立即执行该回调，等待DOM更新
        this.$nextTick(function () {
          var mySwiper = new Swiper(".swiper-container", {
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 设置一个容器显示数量
            slidesPerView: 3,
            // 设置点击跳转几个
            slidesPerGroup: 1,
          });
        });
      },
    },
  },
  methods: {
    // 点击修改定义的index值
    checkActive(index) {
      this.currIndex = index;
      // 使用全局事件总线把index传给兄弟组件
      this.$bus.$emit("getIndex",index)
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 1;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>