<template>
    <div>
        <h4>상세페이지입니다.</h4>
        <p>{{포스트들[$route.params.id].title}}</p>
        <p></p>
    </div>
</template>

<script>
export default {
    name : 'detail',
    props : {
        포스트들 : Array,
    }
}
</script>

<style>

</style>