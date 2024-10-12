import $ from "jquery";
// 解析jwt中的access
import { jwtDecode } from "jwt-decode";

const ModuleUser = {
    // 这样维护之后所有组件都可以访问到这些数据
    state: {
        id: "",
        username: "",
       photo: "",
       followerCount: 0,
       access: "",
       refresh: "",
       is_login: false,
    },
    getters: {
    },
    // 主要谢同步函数
    mutations: {
        // 更新数据
        updataUser(state,user) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.followerCount = user.followerCount;
            state.access = user.access;
            state.refresh = user.refresh;
            state.is_login = user.is_login;
        },
        // 更新jwt的access
        updateAccess(state,access) {
            state.access = access;
        },
        // 退出事件
        logout(state) {
            state.id = "";
            state.username = "";
            state.photo = "";
            state.followerCount = "";
            state.access = "";
            state.refresh = "";
            state.is_login = false;
        }
    },
    actions: {
        login(context, data) {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/api/token/",
                type: "post",
                data: {
                    username: data.username,
                    password: data.password
                },
                success(resp) {
                    const {access,refresh} = resp;
                    //  解码access
                    const access_obj = jwtDecode(access);
                    // console.log(access_obj,refresh);

                    // 用一个周期函数每间隔五分钟获取一次jwt，防止出现边界情况每间隔4.5分钟访问一次
                    setInterval(() => {
                        $.ajax({
                            url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
                            type: "post",
                            data: {
                                refresh,
                            },
                            success(resp) {
                                context.commit('updateAccess', resp.access);
                            }
                        })
                    },4.5 * 60 * 1000);

                    $.ajax({
                        url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
                        type: "get",
                        data: {
                            user_id: access_obj.user_id,
                        },
                        // 授权
                        headers: {
                            'Authorization': "Bearer " + access,
                        },

                        success(resp) {
                            // 调用mutations里面的更新函数
                           context.commit('updataUser',{
                            // 解构resp
                            ...resp,
                            access: access,
                            refresh: refresh,
                            is_login: true
                           });
                        data.success();
                        },
                    })
                },
                error() {
                    data.error();
                }   
            });
        },
       
    },
    modules: {
    }
};

export default ModuleUser;