<template>
  <div class="panel panel-default">
    <div class="panel-heading"><h4>User List</h4></div>
    <div class="panel-body">
      <div class="panel panel-default">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th v-for="head of theads">{{ head }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="member of user">
                <td>{{ member.userName }}</td>
                <td>{{ member.email }}</td>
                <td>{{ member.password }}</td>
                <td>{{ role[member.role-1] }}</td>
                <td>
                  <a href="#" v-link="{name:'edit', params: {userID: member.id}}"><i class="fa fa-pencil"></i>Edit</a>
                  <a href="#" @click="deleteConfirm(member)"><i class="fa fa-trash"></i>Delete</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <pagination :action="goPage" :page.sync="page" :total-page.sync="totalPage"></pagination>
    </div>
    <modal title="Notice" text="Confirm to delete?" id="deleteModal" :confirm-action="delete"></modal>
  </div>

  <toast :autoclose="true" :text="toastMsg" v-ref:toast id="delUserAlert"></toast>

</template>
<script>

  import Pagination from 'components/common/Pagination'
  import Modal from 'components/common/Modal'
  import toast from 'components/common/Alert'
  export default {
    name: 'list',
    components: { Pagination, Modal,toast },
    data() {
      return {
        page: 1,
        totalPage: 1,
        theads: ['userName', 'email', 'password', 'role', 'Operation'],
        user: [],
        role: ['administrator','moderator', 'user'],
        toastMsg:'',
        temMember: [],
      }
    },
    methods: {
      goPage: function() {
        var vm = this
        var url = serverConfig.serverApi+'Administer/page'

        $.post(url,{page:vm.page,limit:20},function(res){
          if(res.code == 0){
            vm.user = res.data
            vm.totalPage = res.totalPage
          } else {
            vm.user = ''
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
        var url = serverConfig.serverApi+'Administer/deleteUser'
        $.post(url,{id:vm.temMember.id},function(res){
          if(res.code == 0){
            vm.toastMsg = 'Successfully Deleted'
            vm.$refs.toast.showToast('success')
            vm.user.$remove(vm.temMember)
          }
          else{
            vm.toastMsg = 'Failed to Delete'
            vm.$refs.toast.showToast('danger')
          }
        })
        $('#deleteModal').modal('hide')
      },
      edit: function(row) {
        var vm = this
        console.log(row)
      }
    },
    created: function() {
      var vm = this
      vm.goPage()
    },
  }
</script>
