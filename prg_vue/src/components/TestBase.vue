<template>
    <div style="border:1px solid red">
        <!-- 接收父组件的元素 -->
        <div class="container">
            <div class="top">
                <slot> </slot>
            </div>

        </div>

    </div>
</template>

<script>

export default {
    name: "TestBase"
}
</script>

<style scoped>
.container {
    margin-top: 20px;
}

.top {
    display: flex;
    justify-content: center;
    align-content: center;
}
</style>