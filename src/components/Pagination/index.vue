<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="changePageNo(pageNo - 1)">
      上一页
    </button>

    <button
      v-if="startNum > 1"
      @click="changePageNo(1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>

    <button v-if="startNum > 2">···</button>
    <!-- 中 -->
    <!-- 遍历开始到结束的页码，所以page必须大于或者等于开始的页面然后显示出来的则为5个 -->
    <button
      v-for="page in endNum"
      :key="page"
      v-show="page >= startNum"
      @click="changePageNo(page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <!-- 下 -->
    <button v-if="endNum < totalPage - 1">···</button>
    <button
      v-if="endNum < totalPage"
      @click="changePageNo(totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="changePageNo(pageNo + 1)">
      下一页
    </button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // 当前页--每页数量--总数量--连续页码数
  props: ["pageNo", "pageSize", "total", "continues"],
  data() {
    return {
      // 保存自己当前的页码
      mcPage: this.pageNo,
    };
  },
  computed: {
    // 计算出一共有多少页
    totalPage() {
      // 总页码数
      // 依赖数据:
      //   总数量: total
      //   每页数量: pageSize
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续页面的起始数字和结束数字{连续页面的数字都是 奇数：5|7 好看}
    // 注意:
    //       start的最小值为1
    //       end的最大值为totalPage
    //       start与end之间的最大差值为continues-1
    startNumAndEndNum() {
      // 解构赋值获取props中的数据
      const { pageNo, totalPage, continues } = this;
      // 定义开始和结束的变量
      let start = 0;
      let end = 0;
      // console.log(continues, this.totalPage);
      // 判断会出现的情况
      // 必须大于totalPage否则第一totalPage为NaN会出错

      if (continues > totalPage) {
        // 不正常的情况下页面比连续页面少
        start = 1;
        end = totalPage;
      } else {
        //正常情况下连续页面会小于总页面5
        // 向下取整
        start = pageNo - Math.floor(continues / 2);
        end = pageNo + parseInt(continues / 2);
        // 判断当前页不能小于1否则连续页面显示会出错
        if (start < 1) {
          // 如果小于那么就变为1
          start = 1;
          // 最后一页则和连续的页数相等
          end = continues;
        }
        // 处理连续页面超出总页数的问题
        if (end > totalPage) {
          // 结束页则为，最后一页
          end = totalPage;
          //计算出开始的页面
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
    //计算出start是多少
    startNum() {
      return this.startNumAndEndNum.start;
    },
    // end
    endNum() {
      return this.startNumAndEndNum.end;
    },
  },
  methods: {
    // 获取用户点击的页面然后自定义事件传给父组件
    changePageNo(page) {
      this.$emit("getPageNo", page);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>