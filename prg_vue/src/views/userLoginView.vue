<template>
    <ContentBase>
        <div class="row justify-content-md-center">
            <div class=" col-3 ">
                <form @submit.prevent="login">
                    <div class=" form-group">
                        <label for="username">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="username">
                    </div>
                    <div class="form-group">
                        <label for="password">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password">
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
import { ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router/index';


export default {
    name: "userLoginView",
    components: {
        ContentBase
    },
    setup() {
        
        const store = useStore();
        let username = ref('');
        let password = ref('');
        let error_massage = ref('');

        const login = () => {
            error_massage.value = "";
           store.dispatch("login",{
            username: username.value,
            password: password.value,
            
            success(){
                router.push({ name: 'userList' });
            },
            error(){
                error_massage.value = "用户名或者密码错误";
            }
           });
        };

        return {
            username,
            password,
            error_massage,
            login,
            store
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