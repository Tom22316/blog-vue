<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <router-link class="navbar-brand" style="color: #5a5aab;" :to="{ name: 'home' }">猫头鹰博客网</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="detailed-features">
                <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'userList' }">博客</router-link>
                    </li>
                </ul>
            </div>
            <div class="collapse navbar-collapse">

                <ul class="navbar-nav ml-auto mb-2 mb-lg-0" v-if="!$store.state.user.is_login">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'userLogin' }">登录</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'register' }">注册</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto mb-2 mb-lg-0" v-else>
                    <li class="nav-item">
                        <router-link class="nav-link"
                            :to="{ name: 'userProfie', params: { userId: $store.state.user.id } }">
                            {{ $store.state.user.username }}</router-link>
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

<style lang="less" scoped>
.navbar-nav {
    display: flex;
    justify-content: flex-end;
}

.navbar-collapse {
    display: flex;
    flex-basis: auto;
    flex-direction: row-reverse;
}
</style>