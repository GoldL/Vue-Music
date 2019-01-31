var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var port = process.env.PORT || config.build.port

var app = express()

var apiRouter = express.Router()
apiRouter.get('/getDiscList', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(err => {
    console.log(err)
  })
})

apiRouter.get('/getSongList', function (req, res) {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/n/yqq/playlist',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then(response => {
    var ret = response.data
    if (typeof ret === 'string') {
      // var reg = /^\w+\(({[^()]+})\)$/
      // var matches = ret.match(reg)
      // if (matches) {
      //   ret = JSON.parse(matches[1])
      // }
      res.json(ret)
    }
  }).catch(err => {
    console.log(err)
  })
})

apiRouter.get('/search', function (req, res) {
  var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/n/yqq/playlist',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then(response => {
    var ret = response.data
    if (typeof ret === 'string') {
      // var reg = /^\w+\(({[^()]+})\)$/
      // var matches = ret.match(reg)
      // if (matches) {
      //   ret = JSON.parse(matches[1])
      // }
      res.json(ret)
    }
  }).catch(err => {
    console.log(err)
  })
})

apiRouter.get('/lyric', function (req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    if (typeof ret === 'string') {
      // var reg = /^\w+\(({[^()]+})\)$/
      // var matches = ret.match(reg)
      // if (matches) {
      //   ret = JSON.parse(matches[1])
      // }
      res.json(ret)
    }
  }).catch((e) => {
    console.log(e)
  })
})

app.use('/api', apiRouter)

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
