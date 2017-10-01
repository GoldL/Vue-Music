<template>
  <scroll class="suggest" :data="result" :pullup="pullup" @scrollEnd="searchMore" :beforeScroll="beforeScroll" @beforeScroll="listScroll" ref="suggest">
    <ul class="suggest-list">
      <li @click="selectItem(item)" v-for="item in result" class="suggest-item">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p v-html="getDisplayName(item)" class="text"></p>
        </div>
      </li>
      <loading v-show="loadingFlag" title=""></loading>
    </ul>
    <div v-show="!loadingFlag && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import NoResult from 'base/no-result/no-result'
import Singer from 'common/js/Singer'
import { search } from 'api/search'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/Song'
import { mapMutations, mapActions } from 'vuex'

const TYPE_SINGER = 'singer'
const perpage = 20

export default {
  components: {
    Scroll,
    Loading,
    NoResult
  },
  props: {
    showSinger: {
      type: Boolean,
      default: true
    },
    query: {
      type: String,
      defalut: ''
    }
  },
  data() {
    return {
      page: 1,
      hasMore: true,
      loadingFlag: true,
      beforeScroll: true,
      pullup: true,
      result: []
    }
  },
  watch: {
    query(newQuery) {
      this.search(newQuery)
    }
  },
  methods: {
    refresh() {
      this.$refs.suggest.refresh()
    },
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
      this.$emit('select', item)
    },
    search() {
      this.page = 1
      this.hasMore = true
      this.loadingFlag = true
      this.$refs.suggest.scrollTo(0, 0)
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (ERR_OK === res.code) {
          this.loadingFlag = false
          this.result = this._genResult(res.data)
          this._checkMore(res.data)
        }
      })
    },
    // 加载更多
    searchMore() {
      if (!this.hasMore) {
        return
      }
      this.page++
      this.loadingFlag = true
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (ERR_OK === res.code) {
          this.loadingFlag = false
          this.result = this.result.concat(this._genResult(res.data))
          this._checkMore(res.data)
        }
      })
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    },
    listScroll() {
      this.$emit('listScroll')
    },
    _checkMore(data) {
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
        this.hasMore = false
      }
    },
    _genResult(data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } })
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list))
      }
      return ret
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .suggest
    height 100%
    overflow hidden
    .suggest-list
      padding 0 30px
      .suggest-item
        display flex
        align-items center
        padding-bottom 20px
        .icon
          flex 0 0 30px
          width 30px
          [class^='icon-']
           font-size 14px
           color $color-text-d
        .name
          flex 1
          font-size $font-size-medium
          color $color-text-d
          overflow hidden
          .text
            no-wrap()
    .no-result-wrapper
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>
