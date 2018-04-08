<template>
  <div>
    <router-view></router-view>
    <tabbar></tabbar>
  </div>
</template>

<script>
  import tabbar from '../../components/tabbar/biztabbar'
  export default{
    name : 'index',
    components:{
      tabbar
    }
  }
</script>
