<template>
  <!-- 背景色綁定account.bgcolor -->
  <div class="admin" :style="account.bgcolor" id="body" v-if="account.level == '9'">
    <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
      <a id="show-sidebar" @click="closeMenu" class="btn btn-sm btn-dark" href="#">
        <i class="fas fa-bars"></i>
      </a>
      <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
          <!-- sidebar-brand  -->
          <div class="sidebar-item sidebar-brand">
            <a href="#">VUE SHOP</a>
            <!-- 收合按鈕 -->
            <div id="close-sidebar" @click="closeMenu">
              <i class="fas fa-times"></i>
            </div>
          </div>
          <!-- sidebar-header  -->
          <div class="sidebar-item sidebar-header d-flex flex-nowrap">
            <div class="user-pic" v-if="account.photoUrl !== null">
              <img class="img-responsive img-rounded" :src="this.account.photoUrl" alt="User picture">
            </div>
            <div class="user-info">
              <span class="user-name">User:<strong style="color:yellow">{{account.name}}</strong></span>
              <span class="user-role">{{email}}</span>
              <span class="user-status">
                            <i class="fa fa-circle"></i>
                            <span>Online</span>
                        </span>
            </div>
          </div>
          <!-- sidebar-search
          <div class="sidebar-item sidebar-search">
              <div>
                  <div class="input-group">
                      <input type="text" class="form-control search-menu" placeholder="Search...">
                      <div class="input-group-append">
                          <span class="input-group-text">
                              <i class="fa fa-search" aria-hidden="true"></i>
                          </span>
                      </div>
                  </div>
              </div>
          </div>-->
          <!-- sidebar-menu  -->
          <div class=" sidebar-item sidebar-menu">
            <ul>
              <li class="header-menu">
                <span>MEAU</span>
              </li>
              <li>
                <router-link to="/admin/profile">
                  <i class="fa fa-user"></i>
                  <span>Profile</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/MProducts">
                  <i class="fab fa-amazon"></i>
                  <span>Manage Products</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/overview">
                  <i class="fa fa-chart-line"></i>
                  <span>Overview</span>
                </router-link>
              </li>
              <li>
                <router-link to="/checkout">
                  <i class="fas fa-cart-plus"></i>
                  <span>Checkout</span>
                </router-link>
              </li>
              <li>
                <router-link to="/">
                  <i class="fa fa-home"></i>
                  <span>Home</span>
                </router-link>
              </li>
              <li>
                <a href="#">
                  <i class="fa fa-sign-out-alt"></i>
                  <span class="menu-text" @click="logout()">Logout</span>
                </a>
              </li>
            </ul>
          </div>
          <!-- sidebar-menu  -->
        </div>
      </nav>
      <!-- page-content  -->
      <main class="page-content" :style="account.bgcolor">
        <button class="btn btn-secondary" @click="changebg">Change Background</button>
        <router-view></router-view>
        <!-- Modal -->
        <div class="modal" id="changebg" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Change Background</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>Click color areas to choose background colors.</p>
                <!-- 選取及顯示account.color1及color2內容 -->
                <input class="mr-1" style="cursor: pointer" type="color" name="color1" v-model="account.color1">
                <p class="mr-1">Choose color1:<strong>{{account.color1}}</strong></p>
                <input class="mr-1" style="cursor: pointer" type="color" name="color2" v-model="account.color2">
                <p class="mr-1">Choose color2:<strong>{{account.color2}}</strong></p>
              </div>
              <div class="modal-footer">
                <!-- 依選取account.color1及color2內容，設置背景色/更新資料庫 -->
                <button class="btn btn-primary btn-xs m-1" @click="setGradient()">Set Background</button>
                <button class="btn btn-success btn-xs m-1" @click="updateColor()">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <!-- page-content" -->
    </div>
    <!-- page-wrapper -->
  </div>
</template>


<script>
// @ is an alias to /src
import {fb, db} from '../firebase';

export default {
 name: 'Admin',
  data(){
    return{
      account:{
        name:null,
        photoUrl:null,
        level:null,
        color1:null,
        color2:null,
        bgcolor:null
      },
      email:null,
    }
  },

  firestore(){
    return {
      accounts: db.collection('accounts'),
    }
  },

  methods:{
    closeMenu(){
      $(".page-wrapper").toggleClass("toggled");
    },

    logout(){
      fb.auth().signOut()
          //點選登出之後來到首頁頁面
          .then(() => {
            this.$router.replace('/');
          })
          .catch((err) => {
            console.log(err);
          });
    },

    changebg(){
      $('#changebg').modal('show')
    },

    setGradient() {
      // 依選取的account.color1及color2取得bgcolor
      if(this.account.color1&&this.account.color2!==null){
        this.account.bgcolor =
            "background:linear-gradient(to right, "
            + this.account.color1
            + ", "
            + this.account.color2
            + ")";
        console.log(this.account.bgcolor);
      }else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Please choose colors!',
          showConfirmButton: false,
          timer: 1500
        });
      }
    },

    updateColor(){
      // 更新資料
      let user = fb.auth().currentUser;
      this.$firestore.accounts.doc(user.uid).update(this.account);
      //更新成功通知
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Updated successfully',
        showConfirmButton: false,
        timer: 1500
      });

      $('#changebg').modal('hide')
    },
  },

  created(){
    // 由firebase的Authentication中取得使用者email
    let user = fb.auth().currentUser;
    this.email = user.email;

    // 取得accounts中該user.uid的name、level、color1、color2、bgcolor
    db.collection("accounts").doc(user.uid).get().then(doc => {
      this.account.name = doc.data().name;
      this.account.photoUrl = doc.data().photoUrl;
      this.account.level = doc.data().level;
      this.account.color1 = doc.data().color1;
      this.account.color2 = doc.data().color2;
      this.account.bgcolor = doc.data().bgcolor;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#body {
  // 預設背景顏色，行內樣式style="account.bgcolor"成立時會取代此內部樣式
  background: linear-gradient(to right, #333333 , #cccccc);
}

</style>
