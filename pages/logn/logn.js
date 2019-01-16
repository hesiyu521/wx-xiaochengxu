import Home from './logn-model.js'
import Config from './../../util/config.js'
const home = new Home()
Page({
  data: {
    loadingHidden: true,
    theme: [],
    recommend: [],
    rootPath: Config.rootPath,

  },

  onLoad() {
    let value = wx.getStorageSync("userinfo")
    console.log(value)
    if(value){
      wx.switchTab({
        url: '../../pages/home/home',
      })
    }
  },
  
  onGotUserInfo(e) {
    if (e.detail.userInfo){
      wx.setStorageSync("userinfo", e.detail.userInfo)
      wx.switchTab({
        url: '../../pages/home/home',
      })
    }
  },
  
   
})









