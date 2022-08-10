<template>
  <div>
    <ul>
      <li v-for="(item, index) in todos" :key="item.id">
        <!-- 作用域插槽 -->
        <!-- 决定不了结构 -->
        <slot :todos="item" :index="index"> </slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: { todos: Array },
};
</script>

<style>
</style>