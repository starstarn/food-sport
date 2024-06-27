import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state() {
        return {
            loginStatus: '用户已经登录',     // this.$store.state.localStorage  使用
            count: 0
        }
    },
    getters:{
        //相当于计算属性
        len(state) {
            return state.loginStatus.length
        }  //this.$store.getters.len

    },
    mutations:{
        //修改数据   同步
        changeCount(state, num) {
            state.count += num;
            console.log('mutations执行了')
        }    //this.$store.commit('changeCount', 1) 使用
    },
    actions:{
        //异步
        delayChangeCount(store, num) {
            store.commit('changeCount',num);   
        }   //this.$store.dispatch('delayChangeCount', 10)  使用
    },
    modules:{
        a: {
            state:{},
            getters:{},
        }
    }
})