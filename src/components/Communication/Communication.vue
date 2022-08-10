<template>
  <div class="com">
    <h2>组件间通信高级</h2>
    <router-link to="/communication/event">event深入</router-link>&nbsp;&nbsp;
    <router-link to="/communication/model">v-model深入</router-link>&nbsp;&nbsp;
    <router-link to="/communication/sync">属性修饰符sync</router-link
    >&nbsp;&nbsp;
    <router-link to="/communication/attrs-listeners"
      >$attrs与$listeners</router-link
    >&nbsp;&nbsp;
    <router-link to="/communication/children-parent"
      >$children与$parent</router-link
    >&nbsp;&nbsp;
    <router-link to="/communication/scope-slot"
      >作用域插槽scope-slot</router-link
    >&nbsp;&nbsp;
    <br />
    <br />
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.com {
  margin: 10px;
  a {
    font-size: 16px;
    margin-right: 10px;
    // &：同级
    //router-link-active:表示激活时选中的状态
    &.router-link-active {
      color: red;
    }
  }
}
</style>