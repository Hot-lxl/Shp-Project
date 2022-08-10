<template>
  <div><span>每次花100元</span>
  <button @click="$emit('update',money-100)" >点击减少100</button>
    现在还剩{{money}}元
  </div>
</template>

<script>
export default {
  props:["money"]
};
</script>

<style>
</style>