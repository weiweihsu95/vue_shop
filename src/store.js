import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//儲存購物車內容:即使重新整理仍然保有之前資料
let cart = window.localStorage.getItem('cart');

export default new Vuex.Store({
    state: {
        //cart有內容的話，將內容從JSON物件轉成String，沒有內容的話回傳空陣列
        cart: cart ? JSON.parse(cart) : [],
    },

    //getters:先行處理函式，功能類似於computed
    getters: {
        totalPrice: state => {
            let total = 0;
            //filter:回傳true的所有元素
            state.cart.filter((item) => {
                total += (item.productPrice * item.productQuantity);
            });

            return total;
        }
    },

    mutations: {
        addToCart(state, item){
            // 判斷購物車內是否有該商品，如果有則增加該商品數量

            // 會回傳true 或 false
            let found = state.cart.find(product => product.productId == item.productId );
            if(found){
                found.productQuantity++;
            }else{
                state.cart.push(item);
            }
            //呼叫saveData()
            this.commit('saveData');
        },

        removeFromCart(state, item){
            let index = state.cart.indexOf(item);
            state.cart.splice(index,1);
            this.commit('saveData');
        },
        // arrayObject.splice(index,howmany,item1,.....,itemX)
        // index 必需。整数，添加/删除項目的位置，使用負數可從陣列結尾處規定位置。
        // howmany 必需。要删除的項目數量。如果設置為0，則不會删除項目。
        // item1, ..., itemX 向陣列添加的新項目

        saveData(state){
            window.localStorage.setItem('cart', JSON.stringify(state.cart));
        },
    },
})
