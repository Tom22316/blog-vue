<template>
    <ContentBase>
        <div class="row justify-content-md-center">
            <div class=" col-3 ">
                
                <form @submit.prevent="register">
                    <div class=" form-group">
                        <label for="username">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="username">
                    </div>
                    <div class="form-group">
                        <label for="password">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password">
                    </div>
                    <div class="form-group">
                        <label for="password_confirm">确认密码</label>
                        <input v-model="password_confirm" type="password" class="form-control" id="password_confirm">
                    </div>
                    <div class="error-massage">{{ error_massage }}</div>
                    <button type="submit" class="btn btn-primary">登录</button>
                </form>
            </div>
        </div>
    </ContentBase>
</template>

<script>
import ContentBase from '../components/ContentBase';
// 响应式变量
import { ref } from 'vue';
// 使用vuex,维护数据更新
import { useStore } from 'vuex';
import router from '@/router';
import $ from 'jquery';

export default {
    name: "RegisterView",
    components: {
        ContentBase
    },
    setup() {

        // 使用vuex需要定义对象
        const store = useStore();
        let username = ref('');
        let password = ref('');
        let password_confirm = ref('');
        let error_massage = ref('');

        // 写一个提交事件
        const register = () => {
            // 登录之前先清空错误信息
            error_massage.value = "";
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/user/",
                type: "post",
                data: {
                    username: username.value,
                    password: password.value,
                    password_confirm: password_confirm.value
                },
                success(resp) {
                    if (resp.result === 'success') {
                        store.dispatch("login", {
                            username: username.value,
                            password: password.value,
                            // 如果成功
                            success() {
                                // 页面跳转
                                router.push({ name: 'userList' });
                            },
                            error() {
                                error_massage.value = "系统异常，请稍后重试";
                            }
                        });
                    } else {
                        error_massage.value = resp.result;
                    }
                }
            });
            console.log(username.value, password.value, password_confirm.value);
        };

        return {
            username,
            password,
            error_massage,
            register,
            store,
            password_confirm
        }
    }
}
</script>


<style scoped>
button {
    margin-top: 10px;
    width: 100%;
}

.error-massage {
    color: red;
}
</style>