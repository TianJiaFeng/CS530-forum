<template>
  <div>
  	<top></top>
    <bar></bar>
    <div class="content">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Top from 'components/common/Header'
import Bar from 'components/common/Bar'

export default {
  name: 'main',
  components: {
    Bar,
    Top,
  }
}
</script>