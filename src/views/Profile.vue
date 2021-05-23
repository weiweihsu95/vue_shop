<template>
  <div class="profile">
    <div class="container">

      <div class="intro h-100 ">
        <div class="row align-items-center">
          <div class="col-md-8 ml-3">
            <h3>Profile settings</h3>
            <p>Welcome <strong>{{account.name}}</strong>, you can change your profile settings here</p>
          </div>
          <div class="col-md-3 mb-3">
            <img src="/img/layout/profile.png" width="100" alt="" class="img-fluid">
          </div>
        </div>
      </div>

      <div class="profile-content">
        <div class="card">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="true">Profile</a>
              </li>

              <li class="nav-item">
                <a class="nav-link"  id="account-tab" data-toggle="tab" href="#account" role="tab" aria-controls="account" aria-selected="false">Account settings</a>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active pt-3" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div class="row justify-content-center">

                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text" v-model="profile.name" placeholder="Full name" class="form-control">
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text"  v-model="profile.phone" placeholder="Phone" class="form-control">
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="form-group">
                      <input type="text"  v-model="profile.postcode" placeholder="Postcode" class="form-control">
                    </div>
                  </div>

                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text"  v-model="profile.address" placeholder="Address" class="form-control">
                    </div>
                  </div>

                  <div class="col-md-6" >
                    <div class="form-group">
                      <input type="submit" @click="updateProfile" value="Save Changes" class="btn btn-primary w-100">
                    </div>
                  </div>

                </div>
              </div>

              <div class="tab-pane fade pt-3" id="account" role="tabpanel" aria-labelledby="account-tab">
                <div class="container">
                  <div class="row">

                    <div class="col-md-12">
                      <div class="alert alert-info">
                        Please use the Reset password email button for reseting the password. The form doens't work currently
                      </div>
                    </div>

                    <div class="col-md-8">
                      <div class="form-group">
                        <label for="account_name">Add/Modify User name</label>
                        <input type="text"  v-model="account.name" placeholder="User name" class="form-control">
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="account_image">Account Images</label>
                        <input type="file" @change="uploadImage" class="form-control" >
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="form-group">
                        <input type="submit" @click="updateAccount" value="Save Changes" class="btn btn-primary w-100">
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="form-group">
                        <input type="button" @click="resetPassword" value="Reset password" class="btn btn-success w-100">
                      </div>
                    </div>

                    <!-- 圖片顯示區 -->
                    <div class="col-md-3 ml-2">
                      <div class="form-group">
                        <!-- :src，綁定src=photoUrl內容(圖片路徑) -->
                        <img :src="this.account.photoUrl" alt="" width="80px">
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>


  </div>
</template>

<script>
import { fb, db} from '../firebase';

export default {
  name: "profile",
  props: {
    msg: String
  },

  data(){
    return {
      name:null,
      profile: {
        name:null,
        phone:null,
        address:null,
        postcode:null
      },
      account:{
        name:null,
        photoUrl:null,
        level:'1',
        color1:null,
        color2:null,
        bgcolor:null
      }
    }
  },

  firestore(){
    return {
      accounts: db.collection('accounts'),
      profiles: db.collection('profiles'),
    }
  },

  methods:{
    updateAccount(){
      let user = fb.auth().currentUser;
      // console.log(user.uid);
      this.$firestore.accounts.doc(user.uid).set(this.account);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Updated successfully',
        showConfirmButton: false,
        timer: 1500
      });
    },

    updateProfile(){
      let user = fb.auth().currentUser;
      // console.log(user.uid);
      this.$firestore.profiles.doc(user.uid).set(this.profile);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Updated successfully',
        showConfirmButton: false,
        timer: 1500
      });
    },

    resetPassword(){
      const auth = fb.auth();
      // console.log(auth.currentUser);

      auth.sendPasswordResetEmail(auth.currentUser.email).then(() =>  {
        // 更新成功通知
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Email sent successfully',
          showConfirmButton: false,
          timer: 1500
        });
      }).catch((error) =>  {
        console.log(error);
      });
    },

    uploadImage(e){
      // 如果有收到資料
      if(e.target.files[0]){
        //console.log(e.target.files[0]);

        let file = e.target.files[0];
        //指定上傳路徑:以file.name的名稱存到storage的accounts資料夾
        //給一隨機數字後可上傳相同檔名之圖片
        var storageRef = fb.storage().ref('accounts/'+ file.name + '_'  + Math.random());
        //上傳圖檔
        let uploadTask = storageRef.put(file);

        //即時更新
        uploadTask.on('state_changed', (snapshot) => {

        }, (error) => {
          // Handle unsuccessful uploads
        }, () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            // console.log('File available at', downloadURL); downloadURL為路徑
            this.account.photoUrl= downloadURL;
            // this.account.photoUrl.push(downloadURL); push->多檔，存成陣列
          });
        });
      }},
  },
  created(){
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
