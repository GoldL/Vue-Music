<template>
  <scroll :data="data" :probe-type="probeType" :listen-scroll="listenScroll" : class="listview" ref="listview">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item">
            <img v-lazy="item.avatar" class="avatar" width="50" height="50">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

export default {
  components: {
    Scroll,
    Loading
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1,
      probeType: 3,
      listenScroll: true
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'

  .listview
    position relative
    width 100%
    height 100%
    overflow hidden
    background $color-backgroud
    .list-group
      padding-bottom 30px
      .list-group-title
        height 30px
        line-height 30px
        padding-left 20px
        font-size $font-size-small
        color $color-text-l
        background $color-highlight-background
      .list-group-item
        display flex
        align-items center
        padding 20px 0 0 30px
        .avatar
          width 50px
          height 50px
          border-radius 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
