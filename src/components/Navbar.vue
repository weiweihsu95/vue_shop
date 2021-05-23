<template>
  <div class="navbar">
    <nav class="navbar custom-nav fixed-top navbar-expand-lg navbar-light bg-light">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/products" class="nav-link">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/news" class="nav-link">News</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/stores" class="nav-link">Stores</router-link>
          </li>
          <li class="nav-item" >
            <a class="nav-link" @click="gomenber"><span>Member-Center</span></a>
          </li>
          <!-- level為9才可看到admin連結 -->
          <li class="nav-item" v-if="level == '9'">
            <a class="nav-link" @click="goadmin"><span>Admin-Center</span></a>
          </li>
        </ul>

        <form class="form-inline my-2 my-lg-0">
          <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> -->
          <span class="user-name mr-5" v-show="isLogin == 'yes'">Welcome <strong>{{name}}</strong></span>
          <a class="btn btn-outline-success my-2 my-sm-0" type="submit" data-toggle="modal" data-target="#login" v-show="isLogin == 'no'">Login/Register</a>
          <a class="btn btn-outline-success my-2 my-sm-0" @click="logout()" v-show="isLogin == 'yes'">Log out</a>
          <a class="btn border-0 mx-2 my-2 my-sm-0" data-toggle="modal" data-target="#miniCart">
            <i class="fas fa-cart-plus"></i>
          </a>
        </form>

      </div>
    </nav>
  </div>
</template>

<script>
import {fb, db} from '../firebase';

export default {
  name: 'Navbar',
  props: {
    msg: String
  },
  data(){
    return{
      name:null,
      level:null,
      isLogin:'no',
    }
  },
  methods:{
    gomenber(){
      let user = fb.auth().currentUser;
      if (user !== null) {
        this.$router.replace('user');
      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Please Login or Register!',
          showConfirmButton: false,
          timer: 2000
        });
      }
    },
    goadmin(){
      let user = fb.auth().currentUser;
      if (user !== null) {
        this.$router.replace('admin');
      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Please Login or Register!',
          showConfirmButton: false,
          timer: 2000
        });
      }
    },
    logout(){
      fb.auth().signOut()
          //點選登出之後來到首頁頁面
          .then(() => {
            Swal.fire({
              position: 'top-end',
              icon: 'info',
              title: 'you are already logged out',
              showConfirmButton: false,
              timer: 1500
            });
          })
          .catch((err) => {
            console.log(err);
          });
    },
  },
  created(){
    // 由firebase的Authentication中取得使用者email
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isLogin = 'yes';
        //取得accounts中該user.uid的name、level
        db.collection("accounts").doc(user.uid).get().then(doc => {
          this.name = doc.data().name;
          this.level = doc.data().level;
        });
      }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@media (min-width: 992px) {
  .navbar.custom-nav{
    padding-top:16px;
    padding-bottom:16px;
    background-color: #7DA79D !important;
  }
}
</style>
