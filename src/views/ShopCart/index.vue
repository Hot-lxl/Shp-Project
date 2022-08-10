<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @click="updateChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum"> {{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartGoods(cart.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isChecked && cartInfoList.length > 0"
          @change="updateAllCartChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteCheckCartList">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//引入lodash：按需加载
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getDate();
  },
  computed: {
    ...mapGetters(["cartList"]),
    // 计算出购物车数据来
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 计算出产品总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    // 判断底部的复选框是否勾选（全部产品都选中，才勾选）
    isChecked() {
      // every():用于检测所有数组元素都是否符合指定条件(最简单)
      // 全都为1则选中true|| false
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
  methods: {
    // 封装一下发送请求的函数（复用）
    getDate() {
      this.$store.dispatch("getCartList");
    },
    // 点击修改数量
    handler: throttle(async function (type, disNum, cart) {
      // type:区分点击的是谁
      // disNum: +(变化量1) -(变化量-1) input最终的个数（并不是变化量）
      // skuid：商品id
      // 定义一个数量
      let sum = 0;
      // 使用switch来进行判断选择
      switch (type) {
        case "add":
          sum = disNum;
          break;
        case "minus":
          // 判断数量必须大于1才能够-1
          sum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // 判断输入的数量为NaN和为负数
          if (isNaN(disNum) || disNum < 1) {
            // 那么数量就加0
            sum = 0;
          } else {
            // 否则就是输入的数量减去原来的数量得到要加的数量（不能有小数）
            sum = parseInt(disNum) - cart.skuNum;
          }
          break;
      }
      try {
        // 重新把数量添加到服务器
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: sum,
        });
        // 从新更新购物车
        this.getDate();
      } catch (error) {
        // 错误
        console.log(error.message);
      }
    }, 600),

    // 点击删除购物车商品
    async deleteCartGoods(skuId) {
      if (window.confirm("确定要删除吗？")) {
        // 接收服务器返回成功与失败的结果promise
        try {
          // 发送action
          await this.$store.dispatch("deleteCartGoods", skuId);
          // 更新购物车
          this.getDate();
        } catch (error) {
          // 失败则返回失败的结果
          alert(error.message);
        }
      }
    },
    // 点击切换商品选中状态
    async updateChecked(cart, event) {
      // event.target.checked返回的是布尔值所以要变为0|1
      let checked = event.target.checked ? 1 : 0;
      try {
        // 发送ation请求
        await this.$store.dispatch("updateCheckById", {
          skuId: cart.skuId,
          isChecked: checked,
        });
        // 更新购物车
        this.getDate();
      } catch (error) {
        alert(error.message);
      }
    },
    // 点击删除选中的全部商品
    async deleteCheckCartList() {
      if (window.confirm("确定要删除吗？")) {
        try {
          // 发送action
          await this.$store.dispatch("deleteCheckCartList");
          // 更新购物车
          this.getDate();
        } catch (error) {
          alert(error.message);
        }
      }
    },
    // 全选 选择全部商品
    async updateAllCartChecked(event) {
      // event.target.checked返回的是布尔值所以要变为0|1
      let isChecked = event.target.checked ? "1" : "0";
      try {
        // 发送action
        await this.$store.dispatch("updateAllCartChecked", isChecked);
        //  更新购物车
        this.getDate();
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>