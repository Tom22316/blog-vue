<template>
    <ContentBase>
        <div class="row">
            <div class="col-3">
                <userProfieInfo @follow="follow" @unfollow="unfollow" :user="user" />
                <userProfieWrite v-if="is_me" @post_a_post="post_a_post" />
            </div>
            <div class="col-9">
                <userProfiePosts :user="user" :posts="posts" @delete_a_post="delete_a_post" />
            </div>
        </div>
    </ContentBase>
</template>

<script>
import ContentBase from '../components/ContentBase';
import userProfieInfo from '../components/userProfieInfo';
import userProfiePosts from '@/components/userProfiePosts.vue';
import userProfieWrite from '@/components/userProfieWrite.vue'

import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import $ from 'jquery';
import { useStore } from 'vuex';

import { computed } from 'vue';


export default {
    name: "userProfieView",
    components: {
        ContentBase,
        userProfieInfo,
        userProfiePosts,
        userProfieWrite
    },
    setup() {

        const store = useStore();

        const route = useRoute();
        const userId = parseInt(route.params.userId);
        const user = reactive({});
        const posts = reactive({});

        // 获取某一个用户的信息
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
            type: "get",
            data: {
                user_id: userId,
            },
            headers: {
                'Authorization': "Bearer " + store.state.user.access,
            },

            success(resp) {
                user.id = resp.id;
                user.username = resp.username;
                user.photo = resp.photo;
                user.followerCount = resp.followerCount;
                user.is_followed = resp.is_followed;
            }
        });
        // 获取某一个用户的所有帖子
        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/myspace/post/",
            type: "get",
            data: {
                user_id: userId,
            },  
            headers: {
                'Authorization': "Bearer " + store.state.user.access,
            },
            success(resp) {
                posts.count = resp.length;
                posts.posts = resp;
            }
        });
        
        const follow = () => {
            if (user.is_followed) return;
            user.is_followed = true;
            user.followerCount++;
        };

        const unfollow = () => {
            if (!user.is_followed) return;
            user.is_followed = false;
            user.followerCount--;
        };

        const post_a_post = content => {
            posts.count++;
            posts.posts.unshift({
                id: posts.id,
                userId: 1,
                content: content,
            });
        };

        const delete_a_post = post_id => {
            // 过滤
            posts.posts = posts.posts.filter(post => post.id !== post_id)
            posts.count = posts.posts.length;
        }

        const is_me = computed(() => userId === store.state.user.id);

        return {
            user: user,
            follow,
            unfollow,
            posts,
            post_a_post,
            route,
            userId,
            is_me,
            delete_a_post
        }
    }
}
</script>


<style scoped></style>