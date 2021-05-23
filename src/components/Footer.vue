<template>
  <div class="footer">
    <div class="container h-100">
      <div class="row p-5 h-100 justify-content-center align-items-center">
        <div class="col-sm-12 col-md-7">
          <h3>Find Us</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quaerat voluptate iusto? Nihil voluptas vitae veritatis magnam reprehenderit, reiciendis ex? Libero quasi natus veniam voluptatum, voluptas exercitationem ratione consectetur et!
          </p>
          <button @click="gostores" class="btn custom-btn btn-outline-primary mr-4">
            Stores Information
          </button>
        </div>
        <div class="col-sm-12 col-md-4 m-3">
          <img src="/img/layout/footer.jpg" alt="" width="300">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    msg: String
  },
  methods:{
    gostores(){
      this.$router.replace('stores');
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer{
  padding-top: 7rem;
  width: 100%;
  min-height: 500px;
  text-align: left;
  color: #ffffff;
  background-color:darkslategray;
}
</style>
