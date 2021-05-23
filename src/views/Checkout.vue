<template>
  <div class="checkout">
    <Navbar></Navbar>

    <login></login>


    <div class="container mt-5 pt-5">
      <h2 class="text-center p-5">Checkout Page</h2>
      <!-- 訂購商品 -->
      <h3 class="py-4">Deliver Imformations</h3>
      <div class="row">
        <table class="table table-hover">
          <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Tatol</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in this.$store.state.cart" :key="item.id">
            <td>
              <span class="float-left" @click="$store.commit('removeFromCart',item)">X</span>
              <img :src="item.productImage" width="80px" class="align-self-center mr-3" alt="">
            </td>
            <td>{{item.productName}}</td>
            <td>{{item.productPrice | currency('NT', 0) }}</td>
            <td>
              <button class="btn btn-outline-secondary btn-xs mr-2" @click="handleSub(item)">-</button>
              {{item.productQuantity }}
              <button class="btn btn-outline-secondary btn-xs ml-2" @click="handlePlus(item)">+</button>
            </td>
            <td>{{item.productPrice * item.productQuantity | currency('NT', 0) }}</td>
          </tr>
          <tr>
            <td colspan="4"><h5><strong>Total Price</strong></h5></td>
            <td colspan="1"><h5><strong>{{ this.$store.getters.totalPrice | currency('NT', 0) }}</strong></h5></td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- 運送資訊 -->
      <h3 class="py-4">Delivery Information</h3>
      <div class="card-body">
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active pt-3" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div class="row justify-content-center">

              <div class="col-md-6">
                <div class="form-group">
                  <ValidationProvider name="name" rules="required" v-slot="{ errors, classes }">
                    <div :class="classes">
                      <label for="profile_name">Full name</label>
                      <input type="text" v-model="profile.name" placeholder="Full name" class="form-control">
                      <span>{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <ValidationProvider name="phone" rules="required" v-slot="{ errors, classes }">
                    <div :class="classes">
                      <label for="profile_phone">Phone</label>
                      <input type="text"  v-model="profile.phone" placeholder="Phone" class="form-control">
                      <span>{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>
              </div>

              <div class="col-md-4">
                <div class="form-group">
                  <ValidationProvider name="postcode" rules="required" v-slot="{ errors, classes }">
                    <div :class="classes">
                      <label for="profile_postcode">Postcode</label>
                      <input type="text"  v-model="profile.postcode" placeholder="Postcode" class="form-control">
                      <span>{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>
              </div>

              <div class="col-md-8">
                <div class="form-group">
                  <ValidationProvider name="address" rules="required" v-slot="{ errors, classes }">
                    <div :class="classes">
                      <label for="profile_address">Address</label>
                      <input type="text"  v-model="profile.address" placeholder="Address" class="form-control">
                      <span>{{ errors[0] }}</span>
                    </div>
                  </ValidationProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <!-- 結帳按鈕 -->
      <div class="d-flex justify-content-end">
        <button class="btn btn-secondary m-1" @click="backproducts()" data-dismiss="modal">Continue Shopping</button>
        <button class="btn btn-primary m-1" @click="order()">Order</button>
      </div>

    </div>

  </div>
</template>

<script>
import { fb, db} from '../firebase';

export default {
  name: "checkout",
  props: {
    msg: String
  },

  data(){
    return {
      profile: {
        name:null,
        phone:null,
        address:null,
        postcode:null
      }
    }
  },

  firestore(){
    return {
      profiles: db.collection('profiles'),
    }
  },

  methods:{
    handlePlus(item){
      // console.log(item);
      item.productQuantity++;
    },

    handleSub(item){
      // console.log(item);
      if(item.productQuantity>1){
        item.productQuantity--;
      }
    },

    backproducts(){
      this.$router.replace('/products');
    },

    order(){
      if ( this.profile.name && this.profile.phone && this.profile.address && this.profile.postcode ) {
        this.$router.replace('/user/orders');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Ordered successfully',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Please fill out all the delivery information',
          showConfirmButton: false,
          timer: 5000
        });
      }
    }
  },

  created(){
    let user = fb.auth().currentUser;

    db.collection("profiles").doc(user.uid).get().then(doc => {
      this.profile.name = doc.data().name;
      this.profile.phone = doc.data().phone;
      this.profile.address = doc.data().address;
      this.profile.postcode = doc.data().postcode;
    });
  }
}
</script>

<style scoped lang="scss">
//classes透過v-slot引入，並藉由 :class="classes" 動態綁定 className
.invalid {
  color: #EB0600;
}
.invalid input {
  border: 1px #EB0600 solid
}
.valid {
  color: green;
}
.valid input {
  border: 1px solid green
}
</style>
