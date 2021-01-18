<template>
  <div id="app">

    <!--button @click="showModal">모달창열기</button-->
    <transition name="투명도">
      <div class="container white-bg" v-if="모달창열렸니 == true">
        <div class="row">
          <div class="col-row-md-6">
            <img :src="원룸들[몇번째눌렀니].image" alt="" />
          </div>
          <div class="col-row-md-6 mt-4">
            <h4>{{원룸들[몇번째눌렀니].title}}</h4>
            <p>상품가격 : {{원룸들[몇번째눌렀니].price}}</p>
            <p><input type="range" v-model="몇개월" class="form-control-range" min="1" max="12"></p>
            <p>선택한 개월 수 : {{몇개월}}</p>
            <p>총액 : {{ Math.round(원룸들[몇번째눌렀니].price / 몇개월) }}</p>
            <button>주문하기</button>
            <button @click="showModal">닫기</button>
          </div>
        </div>
      </div>
    </transition>

    <div class="container">
      <div class="row">
        <div class="col-md-2">
          <ul>
            <li @click="sortPrice">가격순정렬</li>
            <li @click="sortString">가나다순정렬</li>
            <li @click="sortReset">다시원래대로</li>
          </ul>
        </div>
        <div class="col-md-10">
          <div class="row">
            <!-- 
              <Card v-for="원룸 in 원룸들" :key="원룸.title" :원룸="원룸" /> 
              1. {{데이터이름}}
              :속성명="데이터이름"
              v-for="작명 in 데이터" :key=""
              component
              - vue 파일 만들고 html 담기
              - import하고 등록 후 사용
              부모 컴포넌트에서 자식 컴포넌트로 데이터 전송 할 때 props
              - 보내고 등록하고 갖다쓰기
              데이터를 변경하면 데이터외 관련된 html들은 자동으로 재렌더링된다.
            -->
            <CardList @click.native="showModal(i)" v-for="(원룸,i) in 원룸들" :key="i" :원룸="원룸들[i]" />
            <!-- onclik.native -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Data from './assets/data.js';
import Card from './components/Card.vue';

export default {
  name: 'App',
  data(){
    return {
      몇개월 : 0,
      몇번째눌렀니 : 1,
      모달창열렸니 : false,
      원룸들 : Data,
      원룸들복사 : [...Data]
    }
  },
  components: {
    CardList : Card
  },
  methods : {
    sortPrice(){
      this.원룸들.sort(function(a,b){
        return a.price - b.price
      });
    },
    sortString(){
      this.원룸들.sort(function(a,b){
        return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
      });
    },
    sortReset(){
      this.원룸들 = [...this.원룸들복사]
    },
    showModal(a){
      this.몇번째눌렀니 = a;
      this.모달창열렸니 = !this.모달창열렸니;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
.col-md-2 ul li {text-align:left;cursor:pointer;}
.white-bg {position:fixed;width:100%;max-width:100% !important;height:100%;background:#fff;z-index:5;padding:0 !important;}

.투명도-enter {opacity:0;}
.투명도-enter-to {opacity:1;}
.투명도-enter-active {transition: all 0.5s;}

.투명도-leave {opacity:1;transform:translateY(0)}
.투명도-leave-to {transform:translateY(100%)}
.투명도-leave-active {transition: all 0.5s;}
</style>
