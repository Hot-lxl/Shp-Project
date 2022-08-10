<template>
  <div style="background:#ccc; height:80px">
    <h2>event2组件</h2>
    <button @click="$emit('click','自定义事件click')">click</button> <br>
    <button @click="$emit('xx','自定义事件xxx')">xxx</button>
  </div>
</template>

