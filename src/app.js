//app.js

import Resource from './resource/resource.js'

App({
  onLaunch: function () {
    // console.log('xsfddsfxx')
    Resource('https://gateway.beautifulreading.com/dev/durotan/onLogin/{code}').get({code: 'adfadsffdsdsfa'}).then((response) => {
      console.log('success')
      console.log(response)
    }, (err) => {
      console.log('erro')
      console.log(err)
    })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})