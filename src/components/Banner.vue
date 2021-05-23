<template>
  <div class="banner">
    <div class="container h-100">
      <div class="row p-6 h-100 justify-content-center align-items-center">
        <div class="col-sm-12 col-md-5">
          <img src="/img/layout/banner.jpg" alt="" width="300">
        </div>
        <div class="col-sm-12 col-md-5 m-3">
          <h3>Latest News</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quaerat voluptate iusto? Nihil voluptas vitae veritatis magnam reprehenderit, reiciendis ex? Libero quasi natus veniam voluptatum, voluptas exercitationem ratione consectetur et!
          </p>
          <button @click="gonews" class="btn custom-btn btn-outline-primary mr-4">
            More News
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  props: {
    msg: String
  },
  methods:{
    gonews(){
      this.$router.replace('news');
    },
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.banner{
  padding-top: 7rem;
  width: 100%;
  min-height: 500px;
  text-align: left;
  background-color: burlywood;
}
</style>
