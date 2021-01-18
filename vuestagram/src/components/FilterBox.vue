<template>
    <div v-on:click="FilterClick" :class=" `filter-item ${필터들}` " :style="`background-image:url(' ${업로드이미지} ')`">
        <slot>
            
        </slot>
    </div>
</template>

<script>
import EventBus from './../bus.js';

export default {
    props : {
        업로드이미지 : String,
        필터들 : String,
    },
    methods: {
        FilterClick(){
            EventBus.$emit('select-filter', this.필터들);
        }
    }
}
</script>

<style>
.filter-item {
width: 100px;
height: 100px;
margin: 10px 10px 10px auto;
padding: 8px;
display: inline-block;
color : white;
background-size: cover !important;
background-position : center;
}
</style>