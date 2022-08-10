<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- 原生DOM绑定系统事件 -->
    <button @click="handler">原生DOM绑定系统事件</button>
    <!-- 自定义事件变为原生dom（没有标识$emit） 
      @click.native,可以把自定义事件变为原生DOM事件
      原生DOMclick事件，其实就是给子组件的根节点绑定点击事件---事件委派
    -->
    <Event1 @click.native="handler1" />
    <!-- 给原生DOM绑定自定义事件（没有任何意义） -->
    <button @xxx="handler2">原生DOM绑定自定义事件</button>
    <!-- 组件标签--点击事件写在组件上就是自定义事件  -->
    <Event2 @click="handler3" @xx="handler3" />
  </div>
</template>

<script>
import Event1 from "./Event1";
import Event2 from "./Event2";
export default {
  name: "EventTest",
  components: {
    Event1,
    Event2,
  },
  methods: {
    handler() {
      console.log("handler被调用了");
    },
    handler1() {
      console.log("handler1被调用了");
    },
    handler2() {
      console.log("handler2被调用了");
    },
    handler3(params) {
      console.log("handler3被调用了",params);
    },
  },
};
</script>

<style>
</style>