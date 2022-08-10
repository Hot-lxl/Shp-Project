// 当前这个模块：用来把API进行统一管理
import requests from './Ajax';
import MockAjax from './MockAjax'
// 三级联动接口 
// /api/product/getBaseCategoryList get 无参数

// 向外暴露一个函数，只要调用这个函数，就向服务器发送请求
export const reqCategoryList = () => requests({ method: "get", url: "/product/getBaseCategoryList" })

// 获取banners（home轮播图数据）
export const reqBannerList = () => MockAjax({ method: "get", url: "/banners" })
// 获取floors轮播图数据
export const reqFloorsList = () => MockAjax({ method: "get", url: "/floors" })
// 获取搜索模块的数据： 地址/api/list  请求方式post 参数：需要带参数
// 这个接口需要外部传参，因为要根据参数来查找到对应的数据（至少是一个空对象）
export const reqSearchList = (params) => requests({ url: "/list", method: "post", data: params });

// 获取商品详情接口 /api/item/{ skuId } 参数：商品id     get请求  
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: "get" });

// 添加到购物车(对已有物品进行数量改动) /api/cart/addToCart/{ skuId }/{ skuNum } post
export const reqAddOrCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" })
// 获取购物车列表 地址：/api/cart/cartList get 
export const reqCartList = () => requests({ url: "/cart/cartList", method: "get" })
// 删除购物车商品 地址：/api/cart/deleteCart/{skuId} 请求方式：delete
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" })
// 切换购物车商品选中的状态 URL：/cart/checkCart/{skuID}/{isChecked} method:get
export const reqUpdateCheckById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" })
// 获取手机验证码 url:/api/user/passport/sendCode/{phone} methd:get
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: "get" })
// 注册用户 url:/api/user/passport/register method:post 传一个对象：命名data
export const reqUserRegiset = (data) => requests({ url: "/user/passport/register", data, method: "post" })
// 登录账户 url:/api/user/passport/login method:post  传一个对象：命名data
export const reqUserLogin = (data) => requests({ url: "/user/passport/login", data, method: "post" })
// 获取用户的登录信息[需要带着用户的token才能向服务器要用户信息（使用请求头携带）] url:user/passport/auth/getUserInfo  method:get 
export const reqUserInfo = () => requests({ url: "user/passport/auth/getUserInfo", method: "get" })
// 退出登录 /user/passport/logout get
export const reqUserLogOut = () => requests({ url: "/user/passport/logout", method: "get" })
// 获取用户登录之后的地址信息 url:/api/user/userAddress/auth/findUserAddressList get
export const reqUserAddressList = () => requests({ url: "/user/userAddress/auth/findUserAddressList", method: "get" })
// 获取订单交易页面信息 /api/order/auth/trade  get
export const reqUserTradeList = () => requests({ url: "/order/auth/trade", method: "get" })
// 提交订单 url：/api/order/auth/submitOrder?tradeNo={tradeNo} method：psot
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: "post" })
// 获取订单支付信息 url:/api/payment/weixin/createNative/{orderId} method:get
export const reqGetOrderPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get" })
//查询支付订单状态 url:/api/payment/weixin/queryPayStatus/{orderId} method:get
export const rqeOrderPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" })
// 获取订单列表信息 url:/api/order/auth/{page}/{limit} method:"get"
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: "get" })

