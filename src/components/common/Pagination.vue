<template>
  <nav>
    <ul class="pager">
      <span>{{ page }}/{{ totalPage }}</span>
      <li class="previous" v-if="page==1"><a role="button" class="disabled">&larr; Last Page</a></li>
      <li class="previous" v-else><a role="button" @click="previousPage">&larr; Last Page</a></li>
      <li class="next" v-if="page==totalPage"><a role="button" class="disabled">Next Page &rarr;</a></li>
      <li class="next" v-else><a role="button" @click="nextPage">Next Page &rarr;</a></li>
    </ul>
  </nav>
</template>

<script>
  export default {
    props: ['action', 'page', 'total-page'],
    methods: {
      previousPage: function() {
        var vm = this
        this.page--
        this.action()
      },
      nextPage: function() {
        this.page++
        this.action()
      }
    }
  }
</script>
<style scoped>
.pager>span {
  display: inline-block;
  line-height: 32px;
}
</style>
