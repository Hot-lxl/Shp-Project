<template>
  <div>
    <h2>效果一：显示TODO列表时，已完成的TODO为绿色</h2>
    <!-- 
        把数据传给子组件
     -->
    <List :todos="todos">
      <!--设置子组件的外观与结构 (子组件决定不了)-->
      <!-- {}:es6解构方式得到对象 -->
      <template slot-scope="{ todos }">
        <span :style="{ color: todos.isComplete == true ? 'green' : 'red' }">
          {{ todos.text }}</span
        >
      </template>
    </List>
    <h2>效果二：显示TODO列表时，带序号，TODO的颜色为蓝绿配色</h2>
    <!-- 数据传给子组件 -->
    <List1 :todos="todos">
      <template slot-scope="{ todos, index }">
        <span :style="{color:todos.isComplete==true?'green':'blue'}" >{{ index }}--- {{ todos.text }} </span>
      </template>
    </List1>
  </div>
</template>

<script>
import List from "./list";
import List1 from "./list1";
export default {
  name: "ScopeSlotTest",
  data() {
    return {
      todos: [
        { id: 1, text: "AAA", isComplete: false },
        { id: 2, text: "BBB", isComplete: true },
        { id: 3, text: "CCC", isComplete: false },
        { id: 4, text: "DDD", isComplete: true },
      ],
    };
  },
  components: {
    List,
    List1,
  },
};
</script>

<style>
</style>