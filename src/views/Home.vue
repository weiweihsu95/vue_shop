<template>
  <div class="home">
    <Navbar></Navbar>

    <login></login>

    <Header></Header>

    <Banner></Banner>

    <ProductList></ProductList>

    <Footer></Footer>

    <mini-cart></mini-cart>

  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Banner from "@/components/Banner.vue";
import ProductList from "@/components/ProductList.vue";
import Login from "@/components/Login.vue";

export default {
  name: 'Home',
  components: {
    Header,Footer,Banner,ProductList,Login
  }
}
</script>
