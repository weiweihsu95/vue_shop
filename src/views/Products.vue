<template>
  <div class="products" id="products">
    <Navbar></Navbar>

    <login></login>

    <div class="container">
      <h1 class="text-center p-5">Our Products</h1>
      <div class="row text-center">

        <div class="col-sm-6 col-md-4 product mb-3" v-for="product in products">
          <div class="card product-item">

            <carousel :perPage="1"> <!-- 每個商品區塊一次出現一張圖  -->
              <slide v-for="(image, index) in product.images">
                <img :src="image" class="card-img-top" alt="..." width="250px">
              </slide>
            </carousel>
            <div class="card-body">
              <div>
                <h5 class="card-title" style="font-size:18px">{{ product.name }}</h5>
                <button class="btn btn-light" @click="SeeMore(product)"> See more ... </button>
                <!-- <p class="card-text" v-html="product.description"></p> -->

              </div>
              <div class="d-flex justify-content-center align-items-center mt-2">
                <h5 class="card-priceS mt-2">{{ product.price | currency('NT', 0) }}</h5>

                <!-- 綁定product資料傳到AddToCart.vue -->
                <add-to-cart class="ml-2"
                             :image="getImage(product.images)"
                             :name="product.name"
                             :price="product.price"
                             :p-id="product.id">
                </add-to-cart>

              </div>
            </div>
          </div>
        </div>

        <!-- Modal Start-->
        <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">

              <!-- modal-header -->
              <div class="modal-header">
                <h5 class="modal-title" id="editLabel">Product Detail</h5>
              </div>

              <!-- modal-body -->
              <div class="modal-body">

                <carousel :perPage="1"> <!-- 每個商品區塊一次出現一張圖  -->
                  <slide v-for="(image, index) in this.product.images">
                    <img :src="image" alt="..." width="250px">
                  </slide>
                </carousel>
                <div class="card-body">
                  <div class="d-flex justify-content-center align-items-center m-2">
                    <div class="m-2" v-for="(tag, index) in this.product.tags">
                      <h3 class="card-text">{{tag}}</h3>
                    </div>
                  </div>
                  <div>
                    <h2 class="card-title">{{ this.product.name }}</h2>
                    <p class="card-text" v-html="this.product.description"></p>
                  </div>
                  <div class="d-flex justify-content-center align-items-center mt-2">
                    <h3 class="card-priceS mt-2">{{ this.product.price | currency('NT', 0) }}</h3>
                  </div>
                </div>
              </div>

              <!-- modal-footer -->
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>

            </div>
          </div>
        </div>
        <!-- Modal End-->



      </div>
    </div>

    <mini-cart></mini-cart>
  </div>
</template>

<script>
import {db} from '../firebase';
export default {
  name: "products",
  props: {
    msg: String
  },
  data(){
    return {
      products: [],
      product: {
        name:null,
        description:null,
        price:null,
        tags:[],
        images:[]
      },
    }
  },

  methods:{
    // 得到第一張圖片資料
    getImage(images){
      return images[0];
    },

    SeeMore(product){
      this.product = product;
      $('#product').modal('show');
    },
  },

  firestore(){
    return {
      products: db.collection('products'),
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.products{
  margin-top: 7rem;
  background: #f2f2f2;
  padding-bottom: 3rem;
}

.product-item{
  min-height: 120px;
}
</style>
