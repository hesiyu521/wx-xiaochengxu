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
    carTotal: 0,
    indexs: 2

  },


  onLoad() {
    this.getlist()
    wx.setTabBarBadge({
      index: this.data.indexs,
      text: JSON.stringify(this.data.carTotal)
    })
       home.getHomeData((data) => {
         console.log(data.themes)
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
    wx.setTabBarBadge({
      index: this.data.indexs,
      text: JSON.stringify(this.data.carTotal)
    })
  },
  getlist(e) {
    const value = wx.getStorageSync('history')
    if (value) {
      this.setData({
        carTotal: value.length,

      })
    } else {
      this.setData({
        carTotal: car,
        indexs: 5
      })
    }

    
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









