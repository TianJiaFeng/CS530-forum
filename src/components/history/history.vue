<template>
  <div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 >History</h4>
      </div>
      <div class="panel-body">
        <ul class="nav nav-tabs mb15" role="tablist">
          <li role="presentation" :class="{'active': selectTab==1}"><a href="#post" aria-controls="post" role="tab" data-toggle="tab" @click="changeTab(1)">Posts</a></li>
          <li role="presentation" :class="{'active': selectTab==2}"><a href="#comment" aria-controls="comment" role="tab" data-toggle="tab" @click="changeTab(2)">Comments</a></li>
        </ul>
        <div class="loading-content">
          <div class="tab-content hide-content">
            <div role="tabpanel" class="tab-pane" :class="{'active': selectTab==1}" id="post">
              <div class="row tab-content-height">
                <div class="col-md-12">
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead>
                        <th width="60%">Post</th>
                        <th width="20%">Comments</th>
                        <th width="10%">Last reply</th>
                        <th width="10%">Submitt at</th>
                      </thead>
                      <tbody>
                        <tr v-for="(index,member) of postTableData">
                          <td><a href="#" @click="gotoPost(member)">{{member.title}}</font></a></td>
                          <td>{{member.comments}}</td>
                          <td>{{member.created}}</td>
                          <td>{{member.updated}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <pagination :action="postPage" :page.sync="postpage" :total-page.sync="posttotalPage"></pagination>
                </div>
              </div>
            </div>

            <div role="tabpanel" class="tab-pane" :class="{'active': selectTab==2}" id="comment">
              <div class="row tab-content-height">
                <div class="col-md-12">
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead>
                        <th width="50%">Post</th>
                        <th width="15%">Author</th>
                        <th width="15%">Reply Time</th>
                        <th width="10%">Like</th>
                      </thead>
                      <tbody>
                        <tr v-for="(key,object) of commentTableData">
                          <td><a href="#" @click="gotoComment(object)">{{object.title}}</font></a></td>
                          <td>{{object.author}}</td>
                          <td>{{object.created}}</td>
                          <td>{{object.num}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <pagination :action="commentPage" :page.sync="commentpage" :total-page.sync="commenttotalPage"></pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel-footer">
        
      </div>
    </div>
  </div>
  <toast :autoclose="true" :text="toastMsg" v-ref:toast id="addUserAlert"></toast>
</template>

<script>
  import toast from 'components/common/Alert'
  import serverConfig from 'assets/js/serverConfig.js'
  import Pagination from 'components/common/Pagination'
  export default {
    name: 'edit',
    components: {
      toast,
      serverConfig,
      Pagination,
    },
    data() {
      return {
        toastMsg:'',
        selectTab: 1,
        postpage: 1,
        posttotalPage: 1,
        postTableData: [],
        commentpage: 1,
        commenttotalPage: 1,
        commentTableData: [],
      }
    },
    created:function(){
      var vm = this
      var arr = document.cookie.split(";")
      vm.userName = arr[0]
      vm.postPage()
      vm.commentPage()
      vm.changeTab(1)
    },
    methods: {
      changeTab: function(tab) {
        var vm = this
        vm.selectTab = tab

      },
      postPage: function() {
        var vm = this
        var url = serverConfig.serverApi+'Post/getHistoryPost'
        $.post(url,{userName:vm.userName,page:vm.postpage},function(res){
          if(res.code == 0){
            vm.postTableData = res.data 
            vm.posttotalPage = res.totalPage   
          }
        })
      },
      gotoPost: function(member) {
        var vm = this
        window.location.href= serverConfig.urlConfig+'post.html#!/detail/'+member.id
      },
      commentPage: function() {
        var vm = this
        var url = serverConfig.serverApi+'Post/getHistoryComment'
        $.post(url,{userName:vm.userName,page:vm.commentpage},function(res){
          if(res.code == 0){
            vm.commentTableData = res.data 
            vm.commenttotalPage = res.totalPage   
          }
        })
      },
      gotoComment: function(member) {
        var vm = this
        window.location.href= serverConfig.urlConfig+'post.html#!/detail/'+member.postID
      },
    }
  }
</script>