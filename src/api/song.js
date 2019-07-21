import {
  commonParams
} from './config'
import jsonp from 'common/js/jsonp'
import axios from 'axios'

export function getLyric(id) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    musicid: id,
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
    jsonpCallback: 'jsonp1',
    songtype: 0,
    nobase64: 1
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    let result = res.data.substring(7, res.data.length - 1)
    result = JSON.parse(result)
    return Promise.resolve(result)
  })
}

export function getSongVkey(songmid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const data = Object.assign({}, {
    cid: 205361747,
    uin: 6742,
    guid: 105597218,
    songmid: songmid,
    filename: `C400${songmid}.m4a`
  })

  return jsonp(url, data)
}
