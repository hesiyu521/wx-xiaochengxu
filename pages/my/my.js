// pages/my/my.js
import Home from './my-model.js'
import Config from './../../util/config.js'
const home = new Home()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false,
    imgHadden:true,
    order: [
        { title: '待付款', imgPath: '../../image/03.png'}, 
        { title: '待发货', imgPath: '../../image/05.png' }, 
        { title: '待收货', imgPath: '../../image/07.png' }, 
      { title: '退款/售后', imgPath: '../../image/09.png' }, 
        ],
    rootPath: Config.rootPath,
    uesrinfo:null,
    selected: [true, false, false, false],
    allAddress:[],
    payment    :[],
    accountPaid:[],
    orderall:[] ,
    topay:true,
    strombestellung:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.refresh()
    let allAddress  = wx.getStorageSync("allAddress")
    let payment     = wx.getStorageSync("non_payment")
    let accountPaid = wx.getStorageSync("accountPaid")
    let orderall    = wx.getStorageSync("orderall")
    this.setData({
      allAddress: allAddress,
      payment: payment ,
      accountPaid: accountPaid,
      orderall: orderall,
      strombestellung: payment,
    })
    if (!this.data.strombestellung) {
      this.setData({
        imgHadden: false
      })
    } else {
      this.setData({
        imgHadden: true
      })
    }
  },
  refresh(){
    let uesrinfo = wx.getStorageSync("userinfo")
    if (uesrinfo){
      this.setData({
        loadingHidden: true,
        uesrinfo: uesrinfo
      })
    }else{
      this.setData({ loadingHidden: false, })
    }
    let value = wx.getStorageSync("history")
    if(value.length<1){
      wx.hideTabBarRedDot({
        index: 2
      })
    }else{
      wx.setTabBarBadge({
        index: 2,
        text: JSON.stringify(value.length)
      })
    }
  
  },
  onGotUserInfo(e) {
    if (e.detail.userInfo) {
      wx.setStorageSync("userinfo", e.detail.userInfo)
      this.setData({
        uesrinfo: e.detail.userInfo
      })
    }
    this.refresh()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  onShow(){
    this.onLoad()
    this.data.selected = [true, false, false, false]
    this.setData({
      strombestellung: this.data.payment,
      selected: this.data.selected,
      topay: true
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }, 
  goAllorder(e){
    wx.navigateTo
      ({
        url: "../../pages/allorder/allorder"
      })
  }, 
  goAddress(e) {
    wx.navigateTo
      ({
        url: "../../pages/address/address"
      })
  },
  selecteds(e){
    switch (Number(e.currentTarget.dataset.index)) {
      case 0 :
        this.data.selected = [true, false, false, false]
        this.setData({
          strombestellung: this.data.payment,
          selected: this.data.selected,
          topay: true
        })
        break;
      case 1:
        this.data.selected = [false, true, false, false]
        this.setData({
          strombestellung: this.data.accountPaid,
          selected: this.data.selected,
          topay: false
        })
        break;
      case 2:
        this.data.selected = [false, false, true, false]
        this.setData({
          selected: this.data.selected,
          topay: false
        })
        break;
      case 3:
        this.data.selected = [false, false, false, true]
        this.setData({
          selected: this.data.selected,
          topay: false
        })
        break;
      default:
        this.setData({
          strombestellung: this.data.payment
        })
    }    

    if (!this.data.strombestellung){
      this.setData({
        imgHadden: false
      })
    } else {
      this.setData({
        imgHadden: true
      })
    }

  },
  toPay(e) {
    console.log(e)
    let req = e.currentTarget.dataset.index
    wx.showModal({
      title: '确认支付',
      content: '请输入密码',
      success: (res) => {
        if (res.confirm) {
          this.data.accountPaid.push(this.data.payment[req])
          for (var i in this.data.orderall){
            if (JSON.stringify(this.data.payment[req]) == JSON.stringify(this.data.orderall[i])){
              this.data.orderall[i].state = "已付款"
            }
          }
          this.data.payment.splice(req, 1)
          this.setData({
            accountPaid: this.data.accountPaid,
            payment: this.data.payment
          })
          wx.setStorageSync("orderall", this.data.orderall)
          wx.setStorageSync("non_payment", this.data.payment)
          wx.setStorageSync("accountPaid", this.data.accountPaid)
          this.onLoad()
        } else {

        }
      }
    })

  },
  clicks(e) {
    let q = e.currentTarget.dataset.index
    let id = this.data.strombestellung[q].recommend._id
    wx.navigateTo
      ({
        url: `../../pages/produce/produce?id=${id}`
      })
  },
})