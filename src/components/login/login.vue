<template>
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-md-offset-4">
          <div class="login-panel panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title" align="center">Sign in</h3>
            </div>
            <div class="panel-body">
              <form role="form">
              <fieldset>
              <div class="form-group">
                <label>userName:</label>
                <input class="form-control" placeholder="please input your userName" name="userName" v-model="userName" type="text" autofocus>
              </div>
              <div class="form-group">
                <label>Password:</label>
                <input type="password" class="form-control" placeholder="please input your password" name="password" v-model="password" type="text" autofocus>
              </div>
              <div align="right">
                <p><a @click="newAccount()">do not have an account?</a></p>
              </div>
              <a class="btn btn-lg btn-success btn-block" @click="submit">Sign in</a>
              </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  <div class="modal fade" id="newAccount">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
          <h4 class="modal-title">New Account</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6 col-md-6">
              <div class="form-group" :class="{'has-error':submitFlag&&newUserName==''}">
                <label>UserName<span class="asterisk">*</span></label>
                <input type="text" class="form-control" required="required" v-model="newUserName">
              </div>
            </div>
            <div class="col-sm-6 col-md-6">
              <div class="form-group" :class="{'has-error':submitFlag&&email==''}">
                <label>email<span class="asterisk">*</span></label>
                <input type="text" class="form-control" v-model="email" required="required">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6 col-md-6">
              <div class="form-group" :class="{'has-error':(submitFlag&&newPassword=='')||confirm}">
                <label>Password<span class="asterisk">*</span></label>
                <input type="text" class="form-control" required="required" v-model="newPassword">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6 col-md-6">
              <div class="form-group" :class="{'has-error':(submitFlag&&confirmPassword=='')||confirm}">
                <label>Confirm Password<span class="asterisk">*</span></label>
                <input type="text" class="form-control" required="required" v-model="confirmPassword">
              </div>
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
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" @click="save">Confirm</button>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->

  <alert :autoclose="true" :text="alertMsg" v-ref:pretoast id="pretoast"></alert>
</template>

<script>
import alert from 'components/common/Alert'
import serverConfig from 'assets/js/serverConfig.js'

export default {
  name: 'list',
  components: {
    alert,
    serverConfig,
  },
  data() {
    return {
      alertMsg: '',
      userName: '',
      password: '',
      newUserName: '',
      newPassword: '',
      confirmPassword: '',
      email: '',
      introduce: '',
      submitFlag: false,
      confirm: false,
    }
  },
  methods:{
    submit:function(){
      var vm = this
      if(vm.userName == '' || vm.password == ''){
        vm.alertMsg = "Please input your userName and password"
        vm.$refs.pretoast.showToast('danger')
        return
      }
      var url = serverConfig.serverApi+'Administer/verify'
      $.post(url,{userName:vm.userName, password:vm.password},function(result){
          if(result.code == 0){
            //delete original cookie
            var keys = document.cookie.match(/[^ =;]+(?=\=)/g);  
            if(keys) {  
                for(var i = keys.length; i--;)  
                    document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()  
            }
            if(result.data[0].role == "1"){
              window.location.href= serverConfig.urlConfig+'user.html'
            } else {
              document.cookie=vm.userName;  //set cookie
              window.location.href= serverConfig.urlConfig+'post.html'
            }
          } else {
            vm.alertMsg = result.msg
            vm.$refs.pretoast.showToast('danger')
          }
      })
    },
    newAccount: function() {
      var vm = this
      $('#newAccount').modal('show')
    },
    save: function() {
      var vm = this
      vm.submitFlag = true
      vm.confirm = false
      if(vm.newPassword != vm.confirmPassword){
        vm.confirm = true
        vm.alertMsg = 'Inconsistent Password'
        vm.$refs.pretoast.showToast('danger')
      } else if(vm.newUserName=='' || vm.email=='' || vm.newPassword=='')
      {
        vm.alertMsg = 'Insufficient Info'
        vm.$refs.pretoast.showToast('danger')
      } else 
      {
        var temprole = parseInt(vm.role)+2
        var url = serverConfig.serverApi+'Administer/save'
        $.post(url,{userName:vm.newUserName,email:vm.email,password:vm.newPassword,role:3,introduce:vm.introduce},function(res){
          if(res.code == 0){
            vm.alertMsg = 'Success'
            vm.$refs.pretoast.showToast('success')
            setTimeout(function() {
              $('#newAccount').modal('hide')
            }, 2000)
          }
          else{
            vm.alertMsg = res.msg
            vm.$refs.pretoast.showToast('danger')
          }
        })
      }
    }
  },
  created: function(){
    var vm = this
  },
}
</script>
