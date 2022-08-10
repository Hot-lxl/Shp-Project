<template>
  <div>
    <h2>自定义hover提示按钮</h2>
    <!-- <el-button type="primary" icon="el-icon-plus">提示按钮</el-button> -->
    <!-- 当用户点击我们封装的按钮时，需要向hintButton组件传递对应的参数（props）（el-button进行二次封装） -->
    <!--  -->
    <HintButton type="primary" icon="el-icon-plus" title="按钮" @click="handler"/>
  </div>
</template>

<script>
import HintButton from "./HintButton";
export default {
  name: "attrsListeners",
  components: {
    HintButton,
  },
  methods: {
    handler(){
        alert(666);
    }
  },
};
</script>

<style>
</style>