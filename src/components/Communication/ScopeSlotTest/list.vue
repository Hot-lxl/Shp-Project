<template>
  <div>
    <ul>
      <li v-for="(item) in todos" :key="item.id">
        <!-- 作用域插槽 -->
        <!-- 决定不了结构 -->
        <slot :todos="item" > </slot>
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