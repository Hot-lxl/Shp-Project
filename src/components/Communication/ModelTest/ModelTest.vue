<template>
  <div>
    <h2>深入v-model</h2>
    <input type="text" v-model="msg" />
    <span>{{ msg }} </span>
    <h2>v-model实现原理（vue2）</h2>
    <!-- 
        原生DOm当中是有一个oninput事件，他经常结合表单元素一起使用，
        当表单内容发生改变的时候就会触发一次回调
        vue2：可以通过value与input事件实现v-model功能
     -->
    <input type="text" :value="msg" @input="msg = $event.target.value" />
    <span>{{ msg }} </span>
    <!-- 
        都放在组件上
        :value到底是什么？则不再是原生DOM而是props，父子组件通信
        @input是什么？不再是原生DOM事件，而是自定义事件
     -->
    <CustomerInput :value="msg" @input="msg = $event" />
    <!-- 简写：就是v-model -->
    <CustomerInput v-model="msg" />
  </div>
</template>

<script>
import CustomerInput from "./CustomInput";
export default {
  name: "ModelTest.vue",
  data() {
    return {
      msg: "深入了解v-model",
    };
  },
  components: {
    CustomerInput,
  },
};
</script>

<style>
</style>