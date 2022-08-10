<template>
  <div>
    <!-- 商品分类导航 -->
    <TypeNav />
    <!--list-content-->
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 面包屑 带x的结构 -->
          <ul class="fl sui-tag">
            <!-- 商品分类的面包屑  -->
            <li class="with-x" v-if="searchParams.categoryname">
              {{ searchParams.categoryname
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键词的面包屑 -->
            <li class="with-x" v-if="searchParams.keyWord">
              {{ searchParams.keyWord }}<i @click="removekeyWord">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 商品属性的面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttrs(index)">×</i>
            </li>
          </ul>
        </div>
        <!--selector 子组件-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />
        <!--details 综合+价格 -->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li
                  :class="{ active: isOne }"
                  @click.prevent="changeOrder('1')"
                >
                  <a href="#"
                    >综合
                    <span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-UP': isAsc, 'icon-DOWN': isDesc }"
                    ></span>
                  </a>
                </li>
                <li
                  :class="{ active: isTwo }"
                  @click.prevent="changeOrder('2')"
                >
                  <a href="#"
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-UP': isAsc, 'icon-DOWN': isDesc }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 使用params传参把id传给detail组件 -->
                    <router-link :to="`/detail/${goods.id}`">
                      <img  v-lazy="goods.defaultImg"  />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }} .00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html">{{ goods.title }} </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
        <!--hotsale 热卖商品-->
        <!-- <div class="clearfix hot-sale">
          <h4 class="title">热卖商品</h4>
          <div class="hot-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_01.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
// 引入子组件
import SearchSelector from "./SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      // 用来存储客户点击的数据
      searchParams: {
        //产品相应的一二三级分类 id
        category1id: "",
        category2id: "",
        category3id: "",
        //产品的名字
        categoryname: "",
        //搜索的关键字
        keyWord: "",
        //排序:初始状态应该是综合且降序
        order: "1:desc",
        //第几页
        pageNo: 1,
        //每一页展示条数
        pageSize: 6,
        //平台属性的操作
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  //页面挂载之前执行、
  beforeMount() {
    // object.assing:es6新增语法合并对象
    let result = Object.assign(
      this.searchParams,
      this.$route.query,
      this.$route.params
    );
  },

  // 页面挂载完执行一次
  mounted() {
    // 调用一次发送请求
    this.getDate();
  },
  computed: {
    // 获取商品列表
    ...mapGetters(["goodsList"]),
    // 综合
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    // 价格
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    // 计算order的asc升
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    // desc 降
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
    // 获取total 多少条数据
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
  },
  methods: {
    // 因为要每次搜索都发送请求所有单独封装一下
    getDate() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 点击删除对应的商品名字
    removeCategoryName() {
      // 把对应的商品名字清空
      this.searchParams.categoryname = undefined;
      // 需要吧对应的categoryid也需要清除
      this.searchParams.category1id = undefined;
      this.searchParams.category2id = undefined;
      this.searchParams.category3id = undefined;
      // 重新发送请求商品回到默认界面
      this.getDate();
      // 判断是否有params参数如果有就带上
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    // 点击删除对应的关键词面包屑
    removekeyWord() {
      // 先删除关键词面包屑
      this.searchParams.keyWord = undefined;
      // 重新发送请求商品重置
      this.getDate();
      // 并且删除输入框中的数据
      this.$bus.$emit("clearInput");
      // 并且地址栏也需要清除关键词,有的参数就不用删除
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    // 自定义事件回调来接收子组件的数据
    trademarkInfo(trademark) {
      // 把数据赋值给searchParam中的tradmark 样式(品牌: "ID:品牌名称")
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      //发送请求获取对应的数据
      this.getDate();
    },
    // 点击删除对应的品牌标签
    removeTrademark() {
      // 先清空品牌的数据
      this.searchParams.trademark = undefined;
      // 然后重新发送请求重置商品
      this.getDate();
    },
    // 自定义事件回调接收子组件传过来的数据
    attrInfo(attrs, attrValue) {
      // 整理数据拼接好格式然后再传给searchParams的props
      // 商品属性的数组: ["属性ID:属性值:属性名"]
      let prop = `${attrs.attrId}:${attrValue}:${attrs.attrName}`;
      // 判断prop是否存在，如果不存在那么就直接添加
      if (this.searchParams.props.indexOf(prop) == -1) {
        // 添加到数组末尾
        this.searchParams.props.push(prop);
      }
      // 根据得到的数据发送请求
      this.getDate();
    },
    // 点击删除对应的商品属性的面包屑
    removeAttrs(index) {
      // 删除prop数组中指定的数据
      this.searchParams.props.splice(index, 1);
      // 重新发送请求
      this.getDate();
    },
    // 排序操作
    changeOrder(flage) {
      // flage形参：接收用户传进来的标识 1代表的是综合 2代表的是价格
      // 先获取最开始的order
      let originOrder = this.searchParams.order;
      //拆分获取数据
      // 1:2
      let originFlag = originOrder.split(":")[0];
      // desc：asc
      let originSotr = originOrder.split(":")[1];
      // 创建一个新的order
      let newOrder = "";
      // 判断点击的标识和默认的是否一样
      if (flage == originFlag) {
        // 如果一样那么就改变排序的方式
        newOrder = `${originFlag}:${originSotr == "desc" ? "asc" : "desc"}`;
      } else {
        // 不一样说明点击的是其他的然后默认降序desc
        newOrder = `${flage}:${"desc"}`;
      }
      // 将新的Order的值赋值给order
      this.searchParams.order = newOrder;
      // 重新发送请求
      this.getDate();
    },

    // 自定义事件接收子组件传进来的数据（第几页）
    getPageNo(pageNo) {
      // 整理得到的数据
      this.searchParams.pageNo = pageNo;
      // 然后发送数据
      this.getDate();
    },
  },
  // 数据监听，监听组件实例身上的属性值变化
  watch: {
    // 可以监听路由的变化，如果发生变化则再次发送请求
    $route(newValue, odlValue) {
      // 当监听到数据的改变那么就把改变后的参数发送到服务器
      // object.assing:es6新增语法合并对象
      let result = Object.assign(
        this.searchParams,
        this.$route.query,
        this.$route.params
      );
      // 发送请求
      this.getDate();
      // 清空上一次请求的id(把清空变成undefined就不会传给服务器减少压力)
      this.searchParams.category1id = undefined;
      this.searchParams.category2id = undefined;
      this.searchParams.category3id = undefined;
    },
  },
};
</script>

<style scoped lang="less">
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;
      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .goods-list {
        margin: 20px 0;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;
            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                a {
                  color: #666;
                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }
              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: 5px;
                  }
                }
              }
              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                a {
                  color: #333;
                  text-decoration: none;
                }
              }
              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }
              .operate {
                padding: 12px 15px;
                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }
                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;
                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }
                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;
                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;
        .sui-pagination {
          margin: 18px 0;
          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;
            li {
              line-height: 18px;
              display: inline-block;
              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }
              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }
              &.prev {
                a {
                  background-color: #fafafa;
                }
              }
              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }
              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }
              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }
          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;
      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }
      .hot-list {
        padding: 15px;
        ul {
          display: flex;
          li {
            width: 25%;
            height: 100%;
            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }
              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }
              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }
              .price {
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>