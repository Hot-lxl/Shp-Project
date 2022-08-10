<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派父类||委托 -->
      <div @mouseleave="leaveIndex">
        <h2 class="all" @mouseenter="isGoods">全部商品分类</h2>

        <!-- 过渡  -->
        <transition>
          <!-- 三级联动 -->
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级分类 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
              >
                <!--curr:currentindex==c1.categoryId：当鼠标移入的index==当前的index那么就可以添加一个currclass类  -->
                <h3
                  @mouseenter="chageIndex(index)"
                  :class="{ curr: currentIndex == index }"
                >
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}
                  </a>
                </h3>
                <!-- 二、三级分类 -->
                <!-- js来控制显示与隐藏 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <em>
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}
                          </a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 引入mapState
import { mapState } from "vuex";

// 引入lodash:按需加载
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      // 用于存储用户鼠标上那一个一级分类
      currentIndex: -1,
      // 决定三级分类是否展示
      isShow: true,
    };
  },
  //生命周期钩子
  mounted() {
    // 判断路径为/home才展示商品分类详情
    if (this.$route.path != "/home") {
      this.isShow = false;
    }
  },
  // 计算属性
  computed: {
    // 获取state（服务器）的数据
    ...mapState({
      // 对象的写法:右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立刻执行一次，
      // 注入一个参数state，其实即为大仓库中的数据
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex属性
    // 使用节流来防止业务过多造成卡顿,减轻游览器压力
    chageIndex: throttle(function (value) {
      //value：鼠标移入的下标某一个一级分类元素的索引值
      // 正常情况下（用户慢慢操作）：鼠标移入每个一级分类都会触发事件
      // 非正常情况下（用户操作很快）：鼠标移入每个一级分类只会触发部分事件，业务过多则会造成卡顿现象
      this.currentIndex = value;
    }, 50),
    // 一级分类鼠标移出失去背景颜色+隐藏商品详情
    leaveIndex() {
      this.currentIndex = -1;
      // 判断不为home页离开才隐藏
      if (this.$route.path != "/home") {
        this.isShow = false;
      }
    },

    //路由跳转以及传参（商品id + 商品名字）
    goSearch(event) {
      // 最好的解决方法：编程式导航+事件委派
      // 事件委派了之后需要考虑点击的是否是a标签以及点击的是几级分类
      // 第一个问题：把子节点当中的a标签加上自定义属性，data-categoryName,其余的都是没有的
      //  event.target:获取当前的标签
      let element = event.target;
      // 节点有个属性dataset属性可以获取到自定义属性与属性值
      // categoryname:自定义属性获取的是商品名字，categoryid:商品id
      // console.log(element.dataset);
      let {
        categoryname,
        category1id,
        category2id,
        category3id,
      } = element.dataset;
      // 得到自定义属性值（有说明就是a标签）然后进行判断
      if (categoryname) {
        // 传参的名字（路由地址） + 参数
        let localhost = { name: "search" };
        let query = { categoryname: categoryname };
        //判断是否为一级分类
        if (category1id) {
          // 如果是则把点击的id传给query
          query.category1id = category1id;
          //判断是否为二级分类
        } else if (category2id) {
          query.category2id = category2id;
          //判断是否为三级分类
        } else if (category3id) {
          query.category3id = category3id;
        }
        // 判断：如果路由跳转的时候，带有params参数那就一起传过去
        if (this.$route.params) {
          // 最后把name+参数合并
          localhost.query = query;
          localhost.params = this.$route.params;
          // 使用编程式导航发送query参数
          this.$router.push(localhost);
        }
      }
    },
    // 鼠标移入显示商品详情
    isGoods() {
      // 判断不为home页才显示
      if (this.$route.path != "/home") {
        this.isShow = true;
      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 41px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .curr {
          background-color: pink;
        }
      }
    }
    // 过渡动画样式
    // 过渡开始状态（进入）
    .v-enter {
      height: 0px;
    }
    // 过渡动画结束
    .v-enter-to {
      height: 461px;
    }
    // 定义动画时间，速率
    .v-enter-active {
      transition: all 0.5s linear;
    }

    // .v-leave{
    //   height: 461px;
    // }
    // .v-leave-to{
    //   height: 0px;
    // }
    // .v-leave-active{
    //   transition:  0.5s linear;
    // }
  }
}
</style>