<template>
  <!-- 我的订单 -->
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <!-- 每一笔订单 -->
      <div class="orders">
        <table
          class="order-item"
          v-for="order in MyOrder.records"
          :key="order.id"
        >
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle"
                  >{{ order.createTime }}　订单编号：{{ order.outTradeNo }}
                  <span class="pull-right delete"
                    ><img src="../images/delete.png" /></span
                ></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(orderDetail, index) in order.orderDetailList"
              :key="orderDetail.id"
            >
              <!-- 商品列表 -->
              <td width="60%">
                <div class="typographic">
                  <img
                    :src="orderDetail.imgUrl"
                    style="width: 100px; height: 100px"
                  />
                  <a href="#" class="block-text">{{ orderDetail.skuName }}</a>
                  <span>x{{ orderDetail.skuNum }} </span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>
              <!-- 名字 rowspan：合并表格-->
              <!--  v-if="index == 0" : 只显示index==0的 -->
              <td
                :rowspan="order.orderDetailList.length"
                v-if="index == 0"
                width="8%"
                class="center"
              >
                {{ order.consignee }}
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                v-if="index == 0"
                width="13%"
                class="center"
              >
                <ul class="unstyled">
                  <li>总金额¥{{ order.totalAmount }}.00</li>
                  <li>在线支付</li>
                </ul>
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                v-if="index == 0"
                width="8%"
                class="center"
              >
                <a href="#" class="btn">{{ order.orderStatusName }} </a>
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                v-if="index == 0"
                width="13%"
                class="center"
              >
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 分页器 -->
      <Pagination
        :pageNo="page"
        :pageSize="limit"
        :total="MyOrder.total"
        :continues="5"
        @getPageNo="getPageNo"
      />

      <!-- 使用elementui框架 -->
      <!-- <el-pagination
        background
        layout="prev, pager, next"
        :total="MyOrder.total"
        :page-size="limit"
        :pager-count="7"
        :current-page="page"
        @current-change="getPageNo"
      >
      </el-pagination> -->
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike02.png" />
          </div>
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//
export default {
  name: "MyOrder",
  data() {
    return {
      // 初始化一些必要的数据
      page: 1, //第几页默认1
      limit: 3, //每页几条数据
      MyOrder: {}, //存储获得的订单数据
    };
  },
  mounted() {
    //页面加载获取订单列表
    this.getDate();
  },
  methods: {
    //获取订单列表因为每次切换页面都会重新获取订单信息所以需要多次调用
    async getDate() {
      // 解构得到page，limit
      let { page, limit } = this;
      // 向服务器发送异步请求获取数据
      let result = await this.$API.reqMyOrderList(page, limit);
      // 判断是否成功
      if (result.code == 200) {
        // 赋值给MyOrder
        this.MyOrder = result.data;
      }
    },
    // 自定义事件来修改当前第几页
    getPageNo(page) {
      // 修改存储的当前页
      this.page = page;
      // 发送请求获取当前页面订单列表
      this.getDate();
    },
  },
};
</script>

<style>
</style>