// 引入
import Vue from "vue";
//第一步：引入相关 VeeValidate
import VeeValidate from "vee-validate";
// 引入中文 message
import zh_CN from 'vee-validate/dist/locale/zh_CN'
// 注册插件
Vue.use(VeeValidate);

// 第二：提示信息
VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,//提示都为中文
        is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
    },
    attributes: { // 给校验的 field 属性名映射中文名称
        phone: '手机号',
        code: '验证码',
        password: '密码',
        password2: '确认密码',
        isChecked: '协议'
    }
})

//自定义校验规则
//定义协议必须打勾同意
VeeValidate.Validator.extend('isChecked', {
    validate: value => {
        return value
    },
    getMessage: field => field + '必须同意'
})