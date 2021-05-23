<style>
.h1{
  align-content: center;
  align-items: center;
  text-align: center;
}
</style>
<template>

  <div class="order">
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Order Page</h3>
            <p>Welcome <strong>{{account.name}}</strong>, you order is here !!!</p>
          </div>
          <div class="col-md-6">
            <img src="/img/layout/order.jpg" alt="" class="img-fluid">
          </div>
        </div>
      </div>
      <div class="h1" id="h1_center">
      <h1>YOUR ORDER</h1>

      </div>
    </div>
  </div>

</template>

<script>
import {db} from '../firebase';

export default {
  name: 'products',
  props: {
    msg: String
  },
  data() {
    return {
      products: [],
      product: {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: []
      }
    },
        {
          name: null,
          profile: {
            name: null,
            phone: null,
            address: null,
            postcode: null
          },
          account: {
            name: null,
            photoUrl: null,
            level: '1',
            color1: null,
            color2: null,
            bgcolor: null
          },

        }
  },
  methods: {
    // 得到第一張圖片資料
    getImage(images) {
      return images[0];
    },
    firestore() {
      return {
        accounts: db.collection('accounts'),
        profiles: db.collection('profiles'),
        products: db.collection('products'),

      }
    },

    created() {
      let user = fb.auth().currentUser;
      //取得accounts及profiles中該user.uid的資料
      db.collection("accounts").doc(user.uid).get().then(doc => {
        this.account.name = doc.data().name;
        this.account.photoUrl = doc.data().photoUrl;
        this.account.level = doc.data().level;
        this.account.color1 = doc.data().color1;
        this.account.color2 = doc.data().color2;
        this.account.bgcolor = doc.data().bgcolor;
      });

      db.collection("profiles").doc(user.uid).get().then(doc => {
        this.profile.name = doc.data().name;
        this.profile.phone = doc.data().phone;
        this.profile.address = doc.data().address;
        this.profile.postcode = doc.data().postcode;
      });
      db.collection("products").doc(user.uid).get().then(doc => {
        this.product.images = doc.data().images;
        this.product.name = doc.data().name;
        this.product.price = doc.data().price;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
