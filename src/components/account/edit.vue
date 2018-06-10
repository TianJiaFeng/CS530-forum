<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 >Edit<button class="btn btn-default pull-right" v-link="{path: '/content'}">Return</button></h4>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="col-sm-10 col-md-10">
          <div class="row">
            <div class="col-sm-6 col-md-6">
              <div class="form-group" :class="{'has-error':submitFlag&&userName==''}">
                <label>UserName</label>
                <input type="text" class="form-control" required="required" disabled="disabled" v-model="userName">
                <p>Disabled, because I do not want several users have the same userName.</p>
              </div>
            </div>
            <div class="col-sm-6 col-md-6">
              <div class="form-group" :class="{'has-error':submitFlag&&password==''}">
                <label>Password</label>
                <input type="text" class="form-control" required="required" v-model="password">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6 col-md-6">
              <div class="form-group" :class="{'has-error':submitFlag&&email==''}">
                <label>email</label>
                <input type="text" class="form-control" v-model="email" required="required">
              </div>
            </div>
            <div class="form-group col-sm-6 col-md-6" :class="{'has-error':submitFlag&& (correctAnswer=='' || correctAnswer=='0')}">
              <label for="">Current Role</label>
              <select class="form-control" v-model="role">
                <option value="0">Moderator</option>
                <option value="1">User</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-12">
              <div class="form-group">
                <label>Introduction</label>
                <textarea class="form-control" rows="4" v-model="introduce"></textarea>
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
    <div class="panel-footer">
      <button class="btn btn-default" v-link="{path: '/content'}">Cancel</button>
      <button class="btn btn-primary pull-right" @click="save">Save</button>
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
      if(vm.$route.params.userID){
        vm.userID = vm.$route.params.userID
        var url = serverConfig.serverApi+'Administer/detail'
        $.post(url,{id:vm.userID},function(res){
          if(res.code == 0){
            vm.userName = res.data['userName']
            vm.password = res.data['password']  
            vm.email = res.data['email']
            vm.introduce = res.data['introduce']   
            vm.role = res.data['role']-2         
          }
        })
      } else {

      }
    },
    methods: {
      save: function() {
        var vm = this
        vm.submitFlag = true
        if(vm.userName=='' || vm.email=='' || vm.password==''){
          vm.toastMsg = 'Insufficient Info'
          vm.$refs.toast.showToast('danger')
        } else 
        {
          var temprole = parseInt(vm.role)+2
          var url = serverConfig.serverApi+'Administer/save'
          $.post(url,{id:vm.userID,userName:vm.userName,email:vm.email,password:vm.password,role:temprole,introduce:vm.introduce},function(res){
            if(res.code == 0){
              vm.toastMsg = 'Success'
              vm.$refs.toast.showToast('success')
              setTimeout(function() {
                vm.$router.go({path: '/content'})
              }, 2000)
            }
            else{
              vm.toastMsg = res.msg
              vm.$refs.toast.showToast('danger')
            }
          })
        }
      },
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

@keyframes circle {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>