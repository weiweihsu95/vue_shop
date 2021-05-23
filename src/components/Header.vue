<template>
  <div class="header">
    <div class="container h-100">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-sm-12 col-md-6">
          <div class="header-content">
            <h1 class="header-title">
              Cafe Shop
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos numquam tempora, iure delectus totam minus quam aperiam ratione dolores magni voluptates ut necessitatibus odio ipsum fuga, voluptas ab praesentium nihil?
            </p>
            <div class="header-btn mt-3">
              <button @click="goabout" class="btn custom-btn btn-info mr-4">
                About
              </button>
              <button @click="goproducts" class="btn custom-btn btn-outline-secondary">
                Products
              </button>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-5 m-3">
          <div class="graphic">
            <img src="/img/layout/header.jpg" alt="" width="400">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    msg: String
  },
  methods:{
    goabout(){
      this.$router.replace('about');
    },
    goproducts(){
      this.$router.replace('products');
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header{
  padding-top: 7rem;
  width: 100%;
  min-height: 500px;
  text-align: left;
  background-color:darkgoldenrod;
}
</style>
