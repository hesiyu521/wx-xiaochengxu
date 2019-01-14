// pages/index/index.js
import Home from './index-modle.js'
import Config from './../../util/config.js'
const home = new Home()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenName:false,
    recommend:[],
    commod:[],
    loadingHidden: true,
    rootPath: Config.rootPath,
  },
  onLoad: function (options) {
    let recommendss
    let arr=[]
    home.getIndexData((data) => {
      let datalist=data.themes
      for (var i = 0; i < datalist.length;i++){
        if (datalist[i]._id == Number(options.id)){
          arr.push(datalist[i])
          break
        }
      }

      if (arr[0].product.length%2!==0 ){
        recommendss = arr[0].product.slice(0, arr[0].product.length -1)
      }else{
        recommendss = arr[0].product
      }
      
      if (recommendss.length == 0){
        this.setData({
          loadingHidden: false,
          recommend: recommendss,
          hiddenName: false,
        })
      }else{
        this.setData({
          loadingHidden: false,
          recommend: recommendss,
          hiddenName: true,
        })
      }
        
    }) 
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


