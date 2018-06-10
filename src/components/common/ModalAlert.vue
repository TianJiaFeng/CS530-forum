<template>
	<div :id="id" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
	        <h4>{{ title }}</h4>
	      </div>
	      <div class="modal-body">
	        {{{ text }}}
	      </div>
	      <div class="modal-footer">
	        <button class="btn btn-primary" data-dismiss="modal" aria-hidden="true" @click="click">Confirm</button>
	        <button class="btn" data-dismiss="modal" aria-hidden="true" @click="cancel">Cancel</button>
	      </div>
	    </div>
	    <!-- /.modal-content -->
	  </div>
	  <!-- /.modal -->
	</div>
</template>

<script>
	export default {
		props: [ 'id', 'title', 'text', 'method', 'cancelMethod'],
		methods: {
			click: function() {
				this.method()
			},
      cancel: function() {
        if(typeof this.cancelMethod == 'function') {
          this.cancelMethod()
        }
      }
		}
	}
</script>