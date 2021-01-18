import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);



export let store = new Vuex.Store({
    state : {
        이름 : 'John',
        나이 : '30',
    },
    getters : {
        // 데이터 깨내는 법(함수),  retun이 필수
        나이꺼내기(state){
            return state.나이
        }
    },
    mutations: {
        // 데이터 수정하는 법(함수)
        이름바꾸기(state, 데이터){
            state.이름 = 데이터
        },
        나이먹기(state){
            state.나이++
        }
    },
    actions : {
        // ajax 하는곳
        /*
        데이터가져와(context){
            axios.get('')
                .then( ()=>{
                    context.commit('이름바꾸기')
            })
        }
        */
    }
})