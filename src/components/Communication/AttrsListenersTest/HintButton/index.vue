<template>
  <div>
    <a :title="$attrs.title">
      <!-- 绑定$attrs不能用：只能用v-bind指令  绑定所有就拥有了所有属性-->
      <!-- 绑定自定义事件$listeners不能用@，只能用v-on，可以得到自定义事件 -->
      <el-button v-bind="$attrs" v-on="$listeners">按钮</el-button>
    </a>
  </div>
</template>

<script>
export default {
  //   props: ["title"],
  mounted() {
    // $attrs:是组件实例对象的一个属性，它可以接收所有的props数据
    // 但是如果子组件用了props接收数据，而那个数据再$attrs中则不会显示获取不到
    //    console.log(this.$attrs);
    // 
    // console.log(this.$listeners);
  },
};
</script>

<style>
</style>