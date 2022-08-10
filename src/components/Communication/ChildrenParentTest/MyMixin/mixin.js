export default {
    // 混入可以把一些重复用到的方法进行封装
    methods: {
        geiMoney(money) {
            // 修改自己的money
            this.money -= money;
            // $parent：可以得到父组件
            this.$parent.money += money;
        },
    },
}