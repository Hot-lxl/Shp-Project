<template>
  <div>
    一共有{{money}} 元
    <h2>不使用sync修饰符</h2>
    <!-- 
        :money:传的就是props
        @update：就是自定义事件
        $evnet:可以接收子组件传过来的数据
     -->
    <Child :money="money" @update="money = $event"  />  
    <h2>使用sync修饰符</h2>
    <!-- .sync: 就是@update:money的简写 -->
    <Child2 :money.sync="money"/>
  </div>
</template>

<script>
import Child from "./Child";
import Child2 from "./Child2";
export default {
  components: {
    Child,
    Child2,
  },
  data() {
    return {
        money:10000
    }
  },
};
</script>

<style>
</style>