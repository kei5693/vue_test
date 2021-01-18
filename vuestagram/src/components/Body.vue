<template>
<div class="body">
    <!-- 커스텀 이벤트로 자식에서 부모로 데이터 전달
        $emit('보너스',10000)       //이벤트명, 데이터
    -->
    <!--button type="button" v-on:click="$emit('보너스', 10000)">버튼</button-->

    <div v-if="step == 0">  
        <Post :포스팅들="포스팅들[i]" v-for="(작명, i) in 포스팅들" :key="i" />
    </div>

    <div v-if="step == 1">  
        <div :class=" `upload-image ${선택한필터}`" :style="`background:url(' ${업로드이미지} ')`"></div>
        <div class="filters">
            <FilterBox 
                :필터들="필터들[i]"
                v-for="(필터, i) in 필터들" :key="i"
                :업로드이미지="업로드이미지">
                <p>{{필터들[i]}}</p>
            </FilterBox>
            <!-- 
                axios 라이브러리 설치(호환성)
                fetch API(최신 브라우저 기능)
            -->
        </div>
    </div>

    <div v-if="step == 2">  
        <div class="upload-image"></div>
        <div class="write">
            <!-- v-on:input 타이핑 할 때 마다 실행 -->
            <textarea v-on:input="$emit('글입력', $event.target.value)" class="write-box">write!</textarea>
        </div>
    </div>


</div>
</template>

<script>
import Post from './Post.vue'
import FilterBox from './FilterBox.vue'
import EventBus from './../bus.js';

export default {
    data(){
        return {
            선택한필터 : '',
            필터들 : [ "normal", "clarendon", "gingham", "moon", "lark", "reyes", "juno", "slumber", "aden", "perpetua", "mayfair", "rise", "hudson", "valencia", "xpro2", "willow", "lofi", "inkwell", "nashville"]
        }
    },
    props : {
        포스팅들 : Array,
        step : Number,
        업로드이미지 : String,
    },
    mounted() {
        EventBus.$on('select-filter', (받은자료) => {
        this.선택한필터 = 받은자료;
        });
    },
    components: {
        Post : Post,
        FilterBox : FilterBox
    }
}
</script>

<style>
.upload-image{width: 100%;height: 450px;background: cornflowerblue;background-size : cover;}
.filters{overflow-x:scroll;white-space: nowrap;}
.filter-1 {width: 100px;height: 100px;background-color: cornflowerblue;margin: 10px 10px 10px auto;padding: 8px;display: inline-block;color : white;background-size: cover;}
.filters::-webkit-scrollbar {height: 5px;}
.filters::-webkit-scrollbar-track {background: #f1f1f1; }
.filters::-webkit-scrollbar-thumb {background: #888; border-radius: 5px;}
.filters::-webkit-scrollbar-thumb:hover {background: #555;}
.write-box {border: none;width: 90%;height: 100px;padding: 15px;margin: auto;display: block;outline: none;}
</style>
