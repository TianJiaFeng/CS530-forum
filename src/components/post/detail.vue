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
          <h4>Post:  {{tableData.title}}<button class="btn btn-default pull-right" v-link="{path: '/post'}">Back</button></h4>
        </div>
        <div class="comments">
          <div class="row">
            <div class="col-md-3">
              <div class="avatar-box">
                <img src="/assets/images/default.png" alt="">
              </div>
              <div align="center">{{tableData.author}}</div>
            </div>
            <div class="col-md-9">
              {{{tableData.content}}}
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-md-offset-3" align="right">
              {{tableData.created}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <div class="panel">
        <div class="panel-heading title">
          <h4 >Comments:</h4>
        </div>
        <div v-if="tableData.comments!=null">
          <div class="comments" v-for="(index,member) of tableData.comments">
            <div class="row">
              <div class="col-md-3">
                <div class="avatar-box">
                  <img src="/assets/images/default.png" alt="">
                </div>
                <div align="center">{{member.author}}</div>
              </div>
              <div class="col-md-9">
                {{{member.content}}}
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 col-md-offset-3" align="right">
                {{member.created}}
              </div>
              <div class="col-md-3" align="right">
                <i class="fa fa-lightbulb-o"></i>{{member.num}}
                <a role="button" @click="like(member,1)"><i class="fa fa-thumbs-o-up"></i>Like</a>
                <a role="button" @click="like(member,2)"><i class="fa fa-thumbs-o-down"></i>Dislike</a>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="comments" >
            <div class="row">
              <div class="col-md-10 col-md-offset-1">
                <p></p>
                <p>
                  No Comments Yet
                </p>
                <p></p>
              </div>
            </div>
          </div>
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
            <div class="summernote"></div>
            <p></p>
            <div align="right">
              <button type="button" class="btn btn-primary" @click="submit">Submit</button>
            </div>  
          </div>
        </div>
      </div>
    </div>

  <alert :autoclose="true" :text="alertMsg" v-ref:pretoast id="pretoast"></alert>
</template>

<script>
import alert from 'components/common/Alert'
import serverConfig from 'assets/js/serverConfig.js'
import Pagination from 'components/common/Pagination'

export default {
  name: 'list',
  components: {
    alert,
    serverConfig,
    Pagination,
  },
  data() {
    return {
      alertMsg: '',
      postID: '',
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
    goPage: function() {
      var vm = this
      var url = serverConfig.serverApi+'Post/detail'
      $.post(url,{id:vm.postID,page:vm.page},function(res){
        if(res.code == 0){
          vm.tableData = res.data
          vm.totalPage = res.totalPage     
        }
      })
    },
    submit: function(){
      var vm = this
      var content = tinymce.activeEditor.getContent();
      if(content==''){
        vm.alertMsg = 'Insufficient Info'
        vm.$refs.pretoast.showToast('danger')
      } else {
        var url = serverConfig.serverApi+'Post/addComment'
        var commentsNumber = parseInt(vm.tableData.commentsNumber)+1
        $.post(url,{postID:vm.postID,content:content,author:vm.userName,commentsNumber:commentsNumber},function(res){
          if(res.code == 0){
            vm.alertMsg = 'Success'
            vm.$refs.pretoast.showToast('success')
            setTimeout(function() {
              window.location.reload()
            }, 2000)
          }
          else{
            vm.alertMsg = res.data
            vm.$refs.pretoast.showToast('danger')
          }
        })
      } 
    },
    like: function(member,type) {
      var vm = this
      if(type == 1){
        member.like = parseInt(member.like)+1
      } else {
        member.dislike = parseInt(member.dislike)+1
      }
      member.num = parseInt(member.like)-parseInt(member.dislike)
      var url = serverConfig.serverApi+'Post/like'
      $.post(url,{commentID:member.id,like:member.like,dislike:member.dislike},function(res){
      })
    }
  },
  ready: function(){
    var vm = this
    vm.postID = vm.$route.params.postID
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

.avatar-box {
  width: 100px;
  border: 1px solid #ccc;
  /*padding: 10px;*/
  text-align: center;
  box-sizing: content-box;
  margin: 0 auto;
  background-color: #fff;
}

.avatar-box img {
  width: inherit;
}

.comments {
  padding: 5px;
  border: 1px solid #ccc;
}

.title {
  background-color: rgba(0, 191, 255, .1);
}
</style>