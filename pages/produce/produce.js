import Home from './produce-model.js'
import Config from './../../util/config.js'
const home = new Home()
let nums=1
Page({
  data: {
    loadingHidden: true,
    array:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    recommend:[],
    pitch:false,
    color: "#b3b3b3",
    carTotal:0,
    num: nums,
    rootPath: Config.rootPath,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    index: 0,
    chickid:0,
    chickidsize:0,
    orderInfo:{},
    history:[],
    upload:{}
  },
  onLoad(options) {
    let ress = []
    let  arr =[]
    home.getHomeData((data) => {
      console.log(data)
      let recommendsId
      if (Number(options.id)>100){
        for (var i in data.themes) {
          for (var j = 0; j < data.themes[i].product.length; j++) {
            if (data.themes[i].product[j]._id == Number(options.id)) {
              ress.push(data.themes[i].product[j])
              break
            }
          }     
        }       
      }else{
         recommendsId = data.recommends
        for (var i = 0; i < recommendsId.length; i++) {
          if (recommendsId[i]._id == Number(options.id)) {
            ress.push(recommendsId[i])
            break
          }
        }
      }
      this.setData({
          loadingHidden: false,
          recommend: ress[0]
      })
      
      })
    this.getlist(options)

  },
 
  onShareAppMessage: function () {

  },
  onPullDownRefresh() {
    home.refresh(() => {
      wx.stopPullDownRefresh()
    })
  },
  add(event){
    nums++
    this.setData({
      num: nums
    })
  },
  minus(e){
   
    if(nums<2){
      nums==0
      this.setData({
        num: nums
      })
    }else{
      nums--
    this.setData({
      num: nums
    })
    }
  },
  chooseFlower: function (res) {
    for (var i in this.data.recommend.particulars.color){
      let scolor = this.data.recommend.particulars.color[i]
      if (scolor == res._relatedInfo.anchorRelatedText){
        this.setData({
          chickid: i
        }) 
      }
    }
  }, 
  chooseSize: function (res, ) {
    for (var i in this.data.recommend.particulars.size) {
      let Size = this.data.recommend.particulars.size[i]
      if (Size == res._relatedInfo.anchorRelatedText) {
        this.setData({
          chickidsize: i
        })
      }
    }
  }, 

  bindPickerChange(e) {
    this.setData({
      index: e.detail.value,
      num: Number(e.detail.value) + 1
    })
  },

  addCar(e){
    // OrderInfo
    let all = this.data.num + this.data.carTotal
    console.log(this.data)
    let chickidsizes = Number(this.data.chickidsize)
    let chickids = Number(this.data.chickid)
    let colors = this.data.recommend.particulars.color[chickids]
    let sizes = this.data.recommend.particulars.size[chickidsizes]
    let numbers = this.data.num
    let recommends = this.data.recommend

    this.setData({
      carTotal: all,
      orderInfo:{
        size: sizes,
        color: colors,
        number: numbers,
        colornum: chickids,
        sizenum: chickidsizes,
        allnums: all,
        recommend: recommends
         }
    })
    this.save()
  }, 
  goShopeCar(e) {
    let id = home.getDateSete(e, "id")
    wx.switchTab
      ({
        url: "../../pages/shopcar/shopcar"
      })
  },



  save(e) {
    console.log('开始保存')
    const value = wx.getStorageSync('history')
    
    let historys
    let arr =[]
    let reg = false
    if (!value){
      historys=[]
      historys.push(this.data.orderInfo)
    }else{
          historys = value
          historys.map((item)=>{
            if (item.recommend._id === this.data.orderInfo.recommend._id){
             item.number += this.data.orderInfo.number
             reg = true
            }
            
          })
          if(!reg){
            historys.push(this.data.orderInfo)
          }
        }
    console.log(historys)


      this.setData({
        history: historys,
        carTotal:historys.length
      })
    wx.setStorageSync('history', historys)
  },

  getlist(e) {
  const value = wx.getStorageSync('history')
    console.log(value)
    let car=0
    
    this.setData({
      carTotal: value.length,
      history: value
    })

    for (var i in value){
      if(value[i].recommend._id == Number(e.id)){   
        this.setData({
          upload: value[i],
        })
        if (this.data.upload == true) {
          let chickid = this.data.upload.colornum
          let chickidsize = this.data.upload.sizenum
          let num = this.data.num
          let carTotal = this.data.upload.allnums
          this.setData({
            chickid: chickid,
            chickidsize: chickidsize,
            num: num,
          })
        }
      }
    }
  } 

})









