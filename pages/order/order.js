import Home from './order-model.js'
import Config from './../../util/config.js'
const home = new Home()
Page({
  data: {
    loadingHidden: true,
    loadingaddress:false,
    theme: [],
    recommend: [],
    rootPath: Config.rootPath,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    chooseAddress:null,
    allAddress:[],
    allmoney:0,
    newbill:[],
    checknum:[],
    allorder:[],
    accountPaids:[],
    non_payment:[]
  },


  onLoad(options) {
    console.log(options)
    
    if (options.item !== "1" ){
      this.onlycommodity(options)
    }else{
      this.getNum()
    }
    const address = wx.getStorageSync("address")
    if (address) {
      this.setData({
        loadingaddress: true,
        chooseAddress: address
      })
    }

  },

  Toaddress(e){
    wx.chooseAddress({
      success: (res) => {
        for (var i in this.data.newbill) {
          this.data.newbill[i].address = res
        }
        wx.setStorageSync("history", this.data.newbill)
        const allAddress = wx.getStorageSync("allAddress")
        let req = allAddress.indexOf(JSON.stringify(res))
        if (req == -1){
          this.data.allAddress.push(JSON.stringify(res))
        }
        wx.setStorageSync("allAddress", this.data.allAddress)

        this.setData({
          loadingaddress: true,
          chooseAddress: res
        })
        wx.setStorageSync("address", res)
      }
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
  getNum(e){
    let newarr=[]
    var time = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    let date =new Date
    const value = wx.getStorageSync("history")
    for (var i in value){
      value[i].numbering = date.getTime()+value[i].recommend._id
      value[i].time = time
    }
    wx.setStorageSync("history", value)
    const historynum = wx.getStorageSync("historynum")
    const checknum = wx.getStorageSync("checknum")
    const allmoney = wx.getStorageSync("allmoney")
    checknum.map((index, elem)=> {
      value[elem].number = historynum[elem]
      if (index === true) {
        newarr.push(value[elem])
        }   
        this.setData({
        newbill: newarr,
        allmoney: allmoney
      })
   })
    console.log(newarr)
  },
  clicks(e) {
    let q = e.currentTarget.dataset.index
    let id = this.data.newbill[q].recommend._id
    wx.navigateTo
      ({
        url: `../../pages/produce/produce?id=${id}`
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // this.onLoad()
  },
  onlycommodity(e){
    console.log(e)
    var time = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    let date = new Date
    let vbs= []
    vbs.push(JSON.parse(e.item))

    const value = wx.getStorageSync("history")
    vbs[0].numbering = date.getTime() + vbs[0].recommend._id
    vbs[0].time = time
    this.setData({
      newbill: vbs,
      allmoney: vbs[0].number * vbs[0].recommend.pice
    })
    wx.setStorageSync("history", vbs)
    wx.setStorageSync("checknum",[true])
  }, 
  toPay(e){
    wx.showModal({
      title: '确认支付',
      content: '请输入密码',
      success: (res) => {
        if (res.confirm) {
          const value = wx.getStorageSync("history")
          const checknum = wx.getStorageSync("checknum")
          checknum.map((index, elem) => {
            if (index === true) {
              value.splice(elem, 1)
              wx.setStorageSync('history', value)   
            }
          })  

          let accountPaid = wx.getStorageSync("accountPaid")
          if (!accountPaid) {
            accountPaid = []
          }
          let accountPaids = accountPaid.concat(this.data.newbill)
          wx.setStorageSync("accountPaid", accountPaids) 
          this.allroder("已付款")
          wx.switchTab({
            url: '../../pages/my/my',
          })

        } else {
        
          const value = wx.getStorageSync("history")
          const checknum = wx.getStorageSync("checknum")
          checknum.map((index, elem) => {
            if (index === true) {
              value.splice(elem, 1)
              wx.setStorageSync('history', value)
            }
          })

          let payment = wx.getStorageSync("non_payment")
          if (!payment) {
            payment = []
          }
          let non_payment = payment.concat(this.data.newbill)
          wx.setStorageSync("non_payment", non_payment) 

          this.allroder("未付款")
          wx.switchTab({
            url: '../../pages/my/my',
          })
        }
      }
    })

  },
  allroder(e){
      let orderalls = wx.getStorageSync("orderall")
    if (!orderalls){
      orderalls=[]
    } 
    for (var i = 0; i < this.data.newbill.length;i++){
      this.data.newbill[i].state = e
    }
    let allorder = orderalls.concat(this.data.newbill)
    wx.setStorageSync("orderall", allorder) 
  }

})







