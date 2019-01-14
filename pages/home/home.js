import Home from './home-model.js'
import Config from './../../util/config.js'
const home =new Home()
Page({
  data: {
    loadingHidden:true,
    theme:[],
    recommend:[],
    rootPath: Config.rootPath,
    imgUrls: [
      'http://hesiyu.gz01.bdysite.com/img/banner.png',
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3605681691,1909496126&fm=26&gp=0.jpg',
      'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2482361642,3018547587&fm=26&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1897429761,1662255361&fm=26&gp=0.jpg'

    ],

    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    carTotal: 0,
    indexs: 2

  },
  

  onLoad() {
    this.getlist()
   wx.setTabBarBadge({ 
       index: this.data.indexs,
      text: JSON.stringify(this.data.carTotal)
    })
    home.getHomeData((data)=>{
      this.setData({
          loadingHidden: false ,
          theme: data.themes,
          recommend:data.recommends
        })
    })
  },
  Tolist(e) {
    let id = home.getDateSete(e, "id")
    wx.navigateTo
      ({
        url: `../../pages/index/index?id=${id}`
      })
  },
  clicks(e) {
    let id = home.getDateSete(e,"id")
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
  onPullDownRefresh(){
    home.refresh(()=>{
      wx.stopPullDownRefresh()
    })
    wx.setTabBarBadge({
      index: this.data.indexs,
      text: JSON.stringify(this.data.carTotal)
    })
  },
  getlist(e) {
    const value = wx.getStorageSync('history')
    let car =[] 
    console.log(value)
    if (value.length>0) {
      this.setData({
        carTotal: value.length,
      })
    } else {
      this.setData({
        carTotal: car,
        indexs: 5
      })
    }
  } ,
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    this.onLoad() 
  },

})









