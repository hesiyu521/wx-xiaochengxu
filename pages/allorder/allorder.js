import Home from './allorder-model.js'
import Config from './../../util/config.js'
const home = new Home()
Page({
  data: {
    loadingHidden: true,
    theme: [],
    recommend: [],
    rootPath: Config.rootPath,
    orderall:[]
  },


  onLoad() {
    let orderall = wx.getStorageSync("orderall")
    if (!orderall){
      this.setData({
        loadingHidden: false
      })
    }else{
      loadingHidden: true
    }
    this.setData({
      orderall: orderall
    })
  },

  onShareAppMessage: function () {

  },
  onPullDownRefresh() {
    home.refresh(() => {
      wx.stopPullDownRefresh()
      this.onLoad()
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.onLoad()
  },
  clicks(e) {
    let q = e.currentTarget.dataset.index
    let id = this.data.orderall[q].recommend._id
    wx.navigateTo
      ({
        url: `../../pages/produce/produce?id=${id}`
      })
  },

})









