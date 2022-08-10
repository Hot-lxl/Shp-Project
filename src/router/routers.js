// 路由懒加载
/* 
component: () => import('@/pages/Search')
1. import(modulePath): 动态import引入模块, 被引入的模块会被单独打包
2. 组件配置的是一个函数, 函数中通过import动态加载模块并返回, 
    初始时函数不会执行, 第一次访问对应的路由才会执行, 也就是说只有一次请求对应的路由路径才会请求加载单独打包的js
作用: 用于提高首次的加载速度
*/

//配置路由
export default [

    {
        path: "/communication",
        component: () => import("@/components/Communication/Communication"),
        meta: { Show: true },//路由元信息,show：判断是否显示与隐藏
        // 二级路由组件
        children: [
            {
                path: "event",
                component: () => import("@/components/Communication/EventTest/EventTest"),
            },
            {
                path: "model",
                component: () => import("@/components/Communication/ModelTest/ModelTest"),
            },
            {
                path: "sync",
                component: () => import("@/components/Communication/SyncTest/SyncTest"),
            },
            {
                path: "attrs-listeners",
                component: () => import("@/components/Communication/AttrsListenersTest"),
            },
            {
                path: "children-parent",
                component: () => import("@/components/Communication/ChildrenParentTest"),
            },
            {
                path: "scope-slot",
                component: () => import("@/components/Communication/ScopeSlotTest"),
            },
           
            
        ]
        


    },
    {
        path: "/center",
        component: () => import("@/views/Center"),
        meta: { Show: true },//路由元信息,show：判断是否显示与隐藏
        // 二级路由组件
        children: [
            {
                path: "myorder",
                component: () => import("@/views/Center/MyOrder"),
            },
            {
                path: "grouporder",
                component: () => import("@/views/Center/GroupOrder"),
            },
            // 重定向到myorder,因为一开始要展示
            {
                path: "/center",
                redirect: "/center/myorder"
            }
        ]


    },
    {
        path: "/paysuccess",
        component: () => import("@/views/PaySuccess"),
        meta: { Show: true },//路由元信息,show：判断是否显示与隐藏
        beforeEnter: (to, from, next) => {
            // 只有从pay路由来的才放行
            if (from.path == "/pay") {
                next();
            } else {
                next(false);
            }
        }

    },
    {
        path: "/pay",
        component: () => import("@/views/Pay"),
        meta: { Show: true },//路由元信息,show：判断是否显示与隐藏
        beforeEnter: (to, from, next) => {
            // 只有从trade路由来的才放行
            if (from.path == "/trade") {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        name: "home",
        path: "/home",
        // 路由懒加载，提升性能更加高效
        component: () => import("@/views/Home"),
        meta: { Show: true },//路由元信息,show：判断是否显示与隐藏
    },
    {
        name: "login",
        path: "/login",
        component: () => import("@/views/Login"),
        meta: { Show: false },
    },
    {
        name: "register",
        path: "/register",
        component: () => import("@/views/Register"),
        meta: { Show: false },
    },
    {
        name: "search",
        // 如何指定params参数可传可不传? 加个问号就可以实现三元表达式
        path: "/search/:keyWord?",
        component: () => import("@/views/Search"),
        meta: { Show: true },
        // 路由组件能不能传递props数据?
        // props对象写法
        // props:{a:1,b:2}
        // 布尔值的写法
        // props:true,//把params的参数以props的形式传入

        // 函数写法:可以把params参数和query参数通过props形式传递给路由组件
        props({ params, query }) {
            return { keyWord: params.keyWord, kv: query.kv }
        }

    },
    {
        name: "detail",
        path: "/detail/:skuId",
        component: () => import("@/views/Detail"),
        meta: { Show: true },

    },
    {
        name: "addcartsuccess",
        path: "/addcartsuccess",
        component: () => import("@/views/AddCartSuccess"),
        meta: { Show: true },
    },
    {
        name: "shopCart",
        path: "/shopcart",
        component: () => import("@/views/ShopCart"),
        meta: { Show: true },
    },
    {
        name: "trade",
        path: "/trade",
        component: () => import("@/views/Trade"),
        meta: { Show: true },
        // 路由独享组件,只管理当前路由
        beforeEnter: (to, from, next) => {
            // 判断只有重shopCart（购物车过来的才会放行）
            if (from.path == "/shopcart") {
                next();//放行
            } else {
                // 其他地方不放行
                next(false);
            }
        }
    },



    // 重定向，在项目跑起来的时候，访问/,立马让他重定向到首页
    {
        path: "*",
        redirect: "/home"
    }
]