<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 >Account</h4>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="col-sm-10 col-md-10">
          <div class="row">
            <div class="col-sm-6 col-md-6">
              <div class="form-group">
                <label>UserName:</label>
                <div>{{userName}}</div>
              </div>
            </div>
            <div class="col-sm-6 col-md-6">
              <div class="form-group">
                <label>Password:</label>
                <div>{{password}}</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6 col-md-6">
              <div class="form-group">
                <label>email:</label>
                <div>{{email}}</div>
              </div>
            </div>
            <div class="form-group col-sm-6 col-md-6">
              <label for="">Current Role:</label>
              <div>{{role}}</div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-12">
              <div class="form-group">
                <label>Introduction:</label>
                <div>{{introduce}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-2 col-md-2">
          <label></label>
          <div class="avatar-box">
            <div class="image-outer">
              <img src="/assets/images/default.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-footer" align="right">
      <button class="btn btn-default btn-primary" v-link="{name:'edit', params: {userID: userID}}"}">Edit</button>
    </div>
  </div>
  <toast :autoclose="true" :text="toastMsg" v-ref:toast id="addUserAlert"></toast>
</template>

<script>
  import toast from 'components/common/Alert'
  export default {
    name: 'edit',
    components: {toast},
    data() {
      return {
        toastMsg:'',
        userID: '',
        submitFlag: false,
        userName: '',
        password: '',
        email: '',
        introduce: '',
        role: 0,
      }
    },
    created:function(){
      var vm = this
      var arr = document.cookie.split(";")
      vm.userName = arr[0]
      var url = serverConfig.serverApi+'Administer/getByuserName'
      $.post(url,{userName:vm.userName},function(res){
        if(res.code == 0){
          vm.userID = res.data['id']
          vm.userName = res.data['userName']
          vm.password = res.data['password']
          vm.email = res.data['email']
          vm.introduce = res.data['introduce'] 
          if(res.data['role'] == 3){
            vm.role = 'user'
          } else {
            vm.role = 'moderator'
          }
        }
      })
    },
    methods: {
    }
  }
</script>

<style scoped>

.avatar-box {
  width: 180px;
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  box-sizing: content-box;
  margin: 0 auto;
  background-color: #fff;
}

.avatar-box .image-outer {
  width: 180px;
  height: 180px;
  /*display: table-cell;*/
  margin-bottom: 15px;
  vertical-align: middle;
}

.avatar-box img {
  width: inherit;
}

.lh180 {
  line-height: 180px;
}

.f60 {
  font-size: 60px !important;
}

.btn img {
  height: 20px;
  width: auto;
  margin: 0;
  animation: circle 1s infinite linear;
}
</style>