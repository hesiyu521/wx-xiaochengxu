import Home from './address-model.js'
import Config from './../../util/config.js'
const home = new Home()
Page({
  data: {
    loadingHidden: true,
    theme: [],
    recommend: [],
    rootPath: Config.rootPath,
    allAddress:[],
    allAdd:[]
  },


  onLoad() {
    let allAddress = wx.getStorageSync("allAddress")
    let arry=[]
    for (var i in allAddress){
      arry.push(JSON.parse(allAddress[i]))
    }
    this.setData({
      allAdd: arry
    })

  },
  Toaddress(e) {
    wx.chooseAddress({
      success: (res) => {
        let allAddress = wx.getStorageSync("allAddress")

        if (!allAddress) {
          allAddress = []
        }
        let req = allAddress.indexOf(JSON.stringify(res))
        if (req == -1) {
          allAddress.push(JSON.stringify(res))
        console.log(allAddress)
        wx.setStorageSync("allAddress",allAddress)
        }

        let arry = []
        for (var i in allAddress) {
          arry.push(JSON.parse(allAddress[i]))
        }
        this.setData({
          allAdd: arry
        })
      }
        
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
      this.onLoad()
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },

})









