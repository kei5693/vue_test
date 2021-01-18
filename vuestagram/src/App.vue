<template>
  <div id="app">
    <div class="header">
      <ul v-on:click="step--" v-if="step > 0" class="header-button-left"><li>Cancel</li></ul>
      <ul v-on:click="step++" v-if="step == 1" class="header-button-right"><li>Next</li></ul>
      <ul v-on:click="publish" v-if="step == 2" class="header-button-right"><li>발행</li></ul>

      <img src="./assets/logo.png" class="logo">
    </div>

    <h4>{{$store.state.이름}}</h4>
    <h4>{{$store.getters.나이꺼내기}}</h4>
    <!--button v-on:click=" $store.state.name = 'Park' ">버튼</button-->
    <button v-on:click=" $store.commit('이름바꾸기', '김씨') ">버튼</button>
    <button v-on:click=" $store.commit('나이먹기') ">나이먹기</button>

    <!-- :전송할이름="전송할데이터"
      - 커스컴 이벤트 형식 여기서 $event는 전달받은 데이터
      v-on:보너스="입력한글 = $event"
    -->
    <!--{{입력한글}} v-on:보너스="입력한글 = $event" -->
    <Body v-on:글입력="입력한글 = $event" :포스팅들="포스팅들" :step="step" :업로드이미지="업로드이미지" />

    <button v-on:click="showMore">더보기</button>

    <div class="footer">
      <ul class="footer-button-plus">
        <li><input v-on:change="upload" type="file" id="file" class="inputfile" >
            <label for="file" class="input-plus">+</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Body from './components/Body.vue'
import Postdata from './assets/postdata.js' // .js 생략 가능
import EventBus from './bus.js';
import axios from 'axios';   // 라이브러리


export default {
  name: 'App',
  data(){
    return {
      step : 0,
      포스팅들 : Postdata,
      업로드이미지 : '',
      입력한글 : '',
    }
  },
  mounted() {
    EventBus.$on('select-filter', (받은자료) => {
      this.선택한필터 = 받은자료;
    });
  },
  components: {
    Body : Body
  },
  methods: {
    showMore(){
      axios.get('https://yogoho210.github.io/postdata2.json')
      .then( (a)=>{
        console.log(a);
        this.포스팅들.push(a.data);
      } )
      .catch( ()=>{ console.log('에러발생') } )
    },
    publish(){
      this.step = 0;

      var 오브젝트 = {
        name: "내이름",
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.업로드이미지,
        likes: 36,
        date: 'May 15',
        liked: false,
        caption: this.입력한글,
        filter: this.선택한필터,
      }
      this.포스팅들.unshift(오브젝트);
      console.log(오브젝트, this.포스팅들);
    },
    upload(e){
      // 다음 페이지로 변경
      this.step = 1;
      // 업로드 한 이미지를 body.vue의 div로 전달
      let file = e.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = e => {
        console.log(e.target.result)
        this.업로드이미지 = e.target.result;
      }
    }
  }
}
</script>

<style>
#app {font-family: Avenir, Helvetica, Arial, sans-serif;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;text-align: center;color: #2c3e50;margin-top: 60px;}
#app {box-sizing: border-box;font-family: 'consolas';margin-top: 60px;width: 100%;max-width: 460px;margin: auto;position: relative;border-right: 1px solid #eee;border-left: 1px solid #eee;}
.footer{width: 100%;position: sticky;bottom: 0;padding-bottom: 10px;background-color: white;}
.footer-button-plus {width: 80px;margin: auto;text-align: center;cursor: pointer;font-size: 24px;padding-top: 12px;}
.sample-box{width: 100%;height: 600px;background-color: bisque;}
.inputfile {display: none;}
.input-plus {cursor: pointer}
body {margin: 0;}
ul{padding: 5px;list-style-type: none;}
.logo {width:22px;margin: auto;display: block;position: absolute;left: 0;right: 0;top: 13px;}
.header {width: 100%;height: 40px;background-color: white;padding-bottom: 8px;position: sticky;top: 0;}
.header-button-left {color: skyblue;float: left;width: 50px;padding-left: 20px;cursor: pointer;margin-top: 10px;}
.header-button-right {color: skyblue;float: right;width: 50px;cursor: pointer;margin-top: 10px;}
</style>
