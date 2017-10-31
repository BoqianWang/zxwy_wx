<template>
  <div>
    <router-view></router-view>
    <tabbar></tabbar>
  </div>
</template>

<script>
  import tabbar from '../../components/tabbar/tabbar'
  export default{
    name : 'index',
    components:{
      tabbar
    }
  }
</script>
