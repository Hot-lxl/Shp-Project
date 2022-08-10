<template>
  <div>
    <h2>儿子小明有存款：{{ money }}</h2>
    <button @click="geiMoney(200)">给BABA借：200</button>
  </div>
</template>

<script>
import Mymixin from "./MyMixin/mixin";
export default {
  data() {
    return {
      money: "3000",
    };
  },
  // 使用混入
  mixins: [Mymixin],
};
</script>

<style>
</style>