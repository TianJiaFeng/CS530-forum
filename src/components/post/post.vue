<template>
  <div class="nav-container">
    <nav class="navbar navbar-default" role="navigation" style="margin-bottom: 0;">
      <div class="container-fluid">
        <div class="navbar-header navbar-right">
          <div class="navbar-brand">
            <font color="black">Hello</font>
            <a href="http://localhost:8000/account.html"><font color="black"><i class="fa fa-user"></i> {{userName}}!</font></a>
            <a href="http://localhost:8000/login.html"><i class="fa fa-share"></i>Sign out</a>
          </div>
        </div>
      </div>
    </nav>
  </div>
  <p></p>
  
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <div class="panel">

        <div class="panel-heading title">
          <h4 >Forum</h4>
        </div>

        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <th v-if="role==3" width="70%">Post</th>
              <th v-else width="60%">Post</th>
              <th width="10%">Author</th>
              <th width="10%">Comments</th>
              <th width="10%">Last reply</th>
              <th v-if="role==2" width="10%">Operation</th>
            </thead>
            <tbody>
              <tr v-for="(index,member) of tableData">
                <td><a v-link="{name:'detail', params: {postID: member.id}}"><font color="black">{{member.title}}</font></a></td>
                <td>{{member.author}}</td>
                <td>{{member.comments}}</td>
                <td>{{member.updated}}</td>
                <td v-if="role==2">
                  <a href="#" @click="deleteConfirm(member)"><i class="fa fa-trash"></i>Delete</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="panel-footer title">
          <pagination :action="goPage" :page.sync="page" :total-page.sync="totalPage"></pagination>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel">
          <div class="panel-body title">
            <div class="form-group">
              <label>Title:</label>
              <input type="text" class="form-control" name="password" v-model="title" type="text" autofocus>
            </div>
            <div class="summernote"></div>
            <p></p>
            <div align="right">
              <button type="button" class="btn btn-primary" @click="submit">Submit</button>
            </div>  
          </div>
        </div>
      </div>
    </div>

  <modal title="Notice" text="Confirm to delete?" id="deleteModal" :confirm-action="delete"></modal>
  <alert :autoclose="true" :text="alertMsg" v-ref:pretoast id="pretoast"></alert>
</template>

<script>
import alert from 'components/common/Alert'
import serverConfig from 'assets/js/serverConfig.js'
import Pagination from 'components/common/Pagination'
import Modal from 'components/common/Modal'

export default {
  name: 'list',
  components: {
    alert,
    serverConfig,
    Pagination,
    Modal,
  },
  data() {
    return {
      alertMsg: '',
      userName: '',
      role: 3,
      tableData: [],
      page: 1,
      totalPage: 1,
      temMember: '',
      title: '',
    }
  },
  methods:{
    confirm:function(){
      var vm = this
      window.location.href='http://localhost:8000/exam.html'
    },
    goPage: function() {
      var vm = this
      var url = serverConfig.serverApi+'Post/page'
      $.post(url,{userName:vm.userName,page:vm.page},function(res){
        if(res.code == 0){
          vm.tableData = res.data 
          vm.totalPage = res.totalPage   
        }
      })
    },
    deleteConfirm: function(row) {
      var vm = this
      vm.temMember = row
      $('#deleteModal').modal('show')
    },
    delete: function() {
      var vm = this
      var url = serverConfig.serverApi+'Post/delete'
      $.post(url,{id:vm.temMember.id},function(res){
        if(res.code == 0){
          vm.alertMsg = 'Success'
          vm.$refs.pretoast.showToast('success')
          vm.tableData.$remove(vm.temMember)
        }
        else{
          vm.alertMsg = 'Failed to Delete'
          vm.$refs.pretoast.showToast('danger')
        }
      })
      $('#deleteModal').modal('hide')
    },
    submit: function(){
      var vm = this
      var content = tinymce.activeEditor.getContent();
      if(vm.title=='' || content==''){
        vm.alertMsg = 'Insufficient Info'
        vm.$refs.pretoast.showToast('danger')
      } else {
        var url = serverConfig.serverApi+'Post/addPost'
        $.post(url,{title:vm.title,content:content,author:vm.userName},function(res){
          if(res.code == 0){
            vm.alertMsg = 'Success'
            vm.$refs.pretoast.showToast('success')
            setTimeout(function() {
              window.location.href= serverConfig.urlConfig+'post.html'
            }, 2000)
          }
          else{
            vm.alertMsg = res.data
            vm.$refs.pretoast.showToast('danger')
          }
        })
      } 
    }
  },
  ready: function(){
    var vm = this
    var arr = document.cookie.split(";")
    vm.userName = arr[0]
    var url = serverConfig.serverApi+'Administer/getByuserName'
    $.post(url,{userName:vm.userName},function(res){
      if(res.code == 0){
        vm.id = res.data['id'] 
        vm.role = res.data['role']   
      }
    })
    tinymce.init({
      selector: '.summernote',
      height: '200px',
      theme: 'modern',
    });

    vm.goPage()    
  },
}
</script>

<style>
.navbar-default {
  background-color: rgba(0, 191, 255, .1);
  border-color: #87CEEB;
}

table {
  background-color: rgb(255, 255, 255);
}

.title {
  background-color: rgba(0, 191, 255, .1);
}
</style>
