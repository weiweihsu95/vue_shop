<template>
  <div class="products-list" id="products">
    <div class="container">
      <h1 class="text-center p-5">Our New Products</h1>
      <div class="row text-center">

        <div class="col-sm-6 col-md-4 product mb-3" v-for="product in products">
          <div class="card product-item">

            <carousel :perPage="1"> <!-- 每個商品區塊一次出現一張圖  -->
              <slide v-for="(image, index) in product.images">
                <img :src="image" class="card-img-top" alt="..." width="250px">
              </slide>
            </carousel>
            <div class="card-body">
              <!-- 同一行，平均分配間距
              <div class="d-flex justify-content-between">-->
              <div>
                <h5 class="card-title" style="font-size:18px">{{ product.name }}</h5>
                <!-- <p class="card-text" v-html="product.description"></p> -->
                <h5 class="card-priceS">{{ product.price | currency('NT', 0) }}</h5>
              </div>

              <!-- 綁定product資料傳到AddToCart.vue -->
              <add-to-cart
                  :name="product.name"
                  :price="product.price"
                  :image="getImage(product.images)"
                  :p-id="product.id">
              </add-to-cart>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {db} from '../firebase';
export default {
  name: "ProductList",
  props: {
    msg: String
  },
  data(){
    return {
      products: [],
    }
  },

  methods:{
    // 得到第一張圖片資料
    getImage(images){
      return images[0];
    }
  },

  firestore(){
    return {
      products: db.collection('products'),
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.products-list{
  margin-top: 7rem;
  background-color: #ABB6D3;
  padding-bottom: 3rem;
  min-height:800px;
}

.product-item{
  min-height: 120px;
}
</style>
