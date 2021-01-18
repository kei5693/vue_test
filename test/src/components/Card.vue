<template>
    <div class="col-md-6">
        <img :alt="원룸.caption" :src="원룸.image">
        <h4>{{원룸.title}}.</h4>
        <p>월 {{원룸.price}} 원</p>
    </div>
</template>

<script>
export default {
    props : {
        원룸 : Object
    }
}
</script>

<style scoped>
img {width:100%;}
</style>