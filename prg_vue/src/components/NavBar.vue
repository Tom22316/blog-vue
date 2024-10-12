<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <router-link class="navbar-brand" :to="{name:'home'}">Myspace</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
                    <li class="nav-item ">
                        <router-link class="nav-link" :to="{name:'home'}">首页</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'userList'}">日志</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto mb-2 mb-lg-0" v-if="!$store.state.user.is_login">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name:'userLogin'}">登录</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name:'register'}">注册</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto mb-2 mb-lg-0" v-else>
                    <li class="nav-item">
                        <router-link class="nav-link"
                            :to="{ name: 'userProfie', params: { userId: $store.state.user.id } }">
                            {{$store.state.user.username }}</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" style="cursor: pointer;" @click="logout">退出</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
// 使用vuex维护数据的函数
import { useStore } from 'vuex';

export default {
    name: 'NavBar',
    setup() {
        const store = useStore();
        // 退出逻辑
        const logout = () => {
            // 调用vuex里面的mutations的函数
            store.commit('logout');
        };

        return {
            logout
        }
    }
}

</script>

<style scoped>
.navbar-nav {
    display: flex;
    justify-content: flex-end;
}
</style>