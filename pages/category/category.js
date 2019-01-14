import Home from './category-model.js'
import Config from './../../util/config.js'
const home = new Home()
Page({
  data: {
    loadingHidden: true,
    theme: [],
    recommend: [],
    rootPath: Config.rootPath,
    checked:[],
    chickid:0,
    carTotal: Config.carTotal,
    indexs: Config.indexs

  },


  onLoad() {
    this.getlist()
       home.getHomeData((data) => {
      this.setData({
        loadingHidden: false,
        theme: data.themes,
        recommend: data.recommends
      })
    })
  },
  
  clicks(e) {
    let q = e.currentTarget.dataset.index
    let res = e.currentTarget.dataset.check
    let id = res[q]._id
    wx.navigateTo
      ({
        url: `../../pages/produce/produce?id=${id}`
      })
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

  },
  onPullDownRefresh() {
    home.refresh(() => {
      wx.stopPullDownRefresh()
    })

  },
  getlist(e) {
    const value = wx.getStorageSync('history')
    console.log(value)
    if (value.length > 0) {
      Config.carTotal = value.length
      Config.indexs = 2
    }
    if (!value.length) {
      Config.indexs = 5
    }
    wx.setTabBarBadge({
      index: Config.indexs,
      text: JSON.stringify(Config.carTotal)
    })
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.onLoad()
  },
  tabClick(e){
    console.log(this.data)
        this.setData({
          chickid: e.currentTarget.dataset.index,
          // checked:
        })
  }

})









