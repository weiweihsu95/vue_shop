<template>
  <div class="add-to-cart">
    <button class="btn btn-primary" @click="addToCart"> Add to Cart </button>
  </div>
</template>

<script>
export default {
  name: 'add-to-cart',
  props: {
    name: String,
    price: String,
    image: String,
    pId: String,
  },

  data(){
    return {
      item :{
        productName: this.name,
        productPrice: this.price,
        productImage: this.image,
        productId: this.pId,
        productQuantity: 1,
      }
    }
  },

  methods:{
    addToCart(){
      $('#miniCart').modal('show');
      // store.js中對應mutations的功能名稱，及傳送過去的資料
      this.$store.commit('addToCart', this.item)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
