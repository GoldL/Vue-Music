<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!--播放器全局组件-->
    <player></player>
  </div>
</template>

<script>
import MHeader from 'components/my-header/my-header'
import Player from 'components/player/player'
import Tab from 'components/tab/tab'
export default {
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import '~common/stylus/variable'

</style>
