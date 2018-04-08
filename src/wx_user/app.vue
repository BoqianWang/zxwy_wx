
<template id="">
  <div class="">
      <router-view></router-view>
    <!-- // 这是目前用的比较多的方式 -->
    <!-- <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view> -->
  </div>
</template>
