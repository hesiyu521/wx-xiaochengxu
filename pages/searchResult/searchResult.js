// pages/index/index.js
import Home from './searchResult-model.js'
import Config from './../../util/config.js'
const home = new Home()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenName: false,
    newList: [],
    commod: [],
    loadingHidden: true,
    rootPath: Config.rootPath,
  },
  onLoad: function (options) {
    this.setData({
      newList: wx.getStorageSync("newList")
    })
    if (this.data.newList.length % 2 !== 0) {
      this.setData({
        newList: this.data.newList.slice(0, this.data.newList.length)
      })
       
    } else {
      this.setData({
        newList: wx.getStorageSync("newList")
      })
    }
    
  },

  onPullDownRefresh() {
    home.refresh(() => {
      wx.stopPullDownRefresh()
    })
  },
  onShareAppMessage: function () {

  },
  clicks(e) {
    let id = home.getDateSete(e, "id")

    wx.navigateTo
      ({
        url: `../../pages/produce/produce?id=${id}`
      })
  },



})


