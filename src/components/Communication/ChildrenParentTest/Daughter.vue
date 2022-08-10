<template>
  <div>
    <h2>女儿小红有存款：{{ money }}</h2>
    <button @click="geiMoney(100)">给BABA借：100</button>
  </div>
</template>

<script>
import Mymixin from './MyMixin/mixin'
export default {
  data() {
    return {
      money: "2000",
    };
  },
  // 使用混入
  mixins:[Mymixin]
};
</script>

<style>
</style>