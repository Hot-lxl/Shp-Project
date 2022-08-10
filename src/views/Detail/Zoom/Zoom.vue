<template>
  <div class="spec-preview">
    <!-- 默认显示的大图片 -->
    <img :src="imgObj.imgUrl" />
    <!-- 整个大盒子 -->
    <div class="event" ref="events" @mousemove="moveImages"></div>
    <!-- 超大图 -->
    <div class="big">
      <img :src="imgObj.imgUrl" ref="bigImg" />
    </div>
    <!-- 遮屋罩子 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      currIndex: 0, ////定义一个属性来接收index
    };
  },
  computed: {
    // 简化一下传过来的数据以及对数据进行处理避免出现undefined
    imgObj() {
      return this.skuImageList[this.currIndex] || {};
    },
    // 获得mask的宽度
    eventWidth() {
      // 得到遮罩的宽度并保存，因为高度一样所以可以复用
      // maskWidth是一个不变的值所以存在vm中
      return this.$refs.events.clientWidth / 2;
    },
  },
  mounted() {
    //全局事件总线接收数据
    this.$bus.$on("getIndex", (index) => {
      // 把得到的index赋值给定义的currindex
      this.currIndex = index;
    });
  },
  methods: {
    // 移动图片显示大图片
    moveImages(event) {
      // event大盒子
      const events = this.$refs.events;
      // mask
      const mask = this.$refs.mask;
      // 得到enevt的宽度
      const eventWidth = this.eventWidth;

      //鼠标出现的位置
      let left = event.offsetX - eventWidth / 2;
      let top = event.offsetY - eventWidth / 2;
      // 判断不能超出界限
      if (left <= 0) {
        left = 0;
      } else if (left >= eventWidth) {
        left = eventWidth;
      }
      // 判断top
      if (top <= 0) {
        top = 0;
      } else if (top >= eventWidth) {
        top = eventWidth;
      }
      // 修改mask的left和top
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      // 修改大图片的left和top
      const bigImg = this.$refs.bigImg;
      bigImg.style.left = -2 * left + "px";
      bigImg.style.top = -2 * top + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>