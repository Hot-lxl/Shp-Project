<template>
  <div>
    <h2>BABA有存款：{{ money }}</h2>
    <button @click="updateMoneyXM(100)">找小米借钱100</button><br />
    <button @click="updateMoneyXH(200)">找小红借钱200</button><br />
    <button @click="updateMoney(300)">找儿女借300</button>
    <br />
    <Son ref="xm" />
    <Daughter ref="xh" />
  </div>
</template>

<script>
import Daughter from "./Daughter";
import Son from "./Son";
export default {
  name: "ChildernParent",
  data() {
    return {
      money: 1000,
    };
  },
  components: {
    Daughter,
    Son,
  },
  methods: {
    // 向小明借钱
    updateMoneyXM(money) {
      // 加上传进来的钱
      this.money += money;
      // 修改小明的钱
      this.$refs.xm.money -= money;
    },
    // 向小红借钱
    updateMoneyXH(money) {
      this.money += money;
      this.$refs.xh.money -= money;
    },
    // 向儿女借钱
    updateMoney(money) {
      // 有两个所有要*2
      this.money += money * 2;
      //  子女减去钱
      //   使用$children：可以获取所有子组件是一个数组
      this.$children.forEach((item) => {
        item.money -= money;
      });
    },
  },
};
</script>

<style>
</style>