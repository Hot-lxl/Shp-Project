// 引入mockjs模块
import Mock from "mockjs";
// 把JSON数据格式引入进来【json文件没有对外暴露但是可以引入】
// webpack默认对外暴露的：图片、json数据格式
import banners from './banners.json';
import floors from './floors.json'

// 使用mock方法：第一个参数请求地址，第二个参数：请求数据
Mock.mock("/mock/banners", { code: 200, data: banners }); //模拟首页轮播图数据
Mock.mock("/mock/floors", { code: 200, data: floors }) //模拟楼层数据
