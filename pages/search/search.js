Page({
  data:{
    keyword:'',
    newList:[],
    historyArr:[]
  },
  onLoad(){
    let lasthistoryArr=wx.getStorageSync('historyArr')
    if(lasthistoryArr){
      this.setData({ historyArr:lasthistoryArr})
    }
    let chace=wx.getStorageSync('allList')
    if(!chace){
      wx.request({
        url: 'https://www.easy-mock.com/mock/5c335cb80be8d31904699b31/example/getHomeData',
        success(res) {
          wx.setStorageSync('allList', res.data.data.recommends)
          console.log('商品总数据：', res.data.data.recommends)
        }
      })
    }
    
  },
  //获取输入value值
  confirm(){
    this.search()
  },
  input(e){
    this.setData({keyword:e.detail.value})
  },
  //通过value值搜索
  search: function (data) {
    let key = this.data.keyword||(data.type==='tap'?'':data)
    if (!key){
      wx.showToast({
        title: '请输入搜索内容',
        icon:'none'
      })
    }else{
      console.log('用户输入的关键词：',key)
      let allList=wx.getStorageSync('allList')
      let arr = [];//临时数组 用于存放匹配到的数据
      for (let i in allList) {
        if (allList[i].describe.indexOf(key) >= 0) {//查找
          arr.push(allList[i])
        }
      }
      if (arr.length == 0) {
        wx.showToast({
          title: '未找到该商品',
          icon:'none'
        })
      } else {
        this.setData({
          newsList: arr//在页面显示找到的数据
        })
        wx.setStorageSync('newList', arr)
        wx.navigateTo({
          url: '../../pages/searchResult/searchResult',
        })
        console.log('搜索到的数据：', this.data.newsList)
        this.onLoad()
        let keywordArr=wx.getStorageSync('historyArr')
        if(!(keywordArr.indexOf(key)+1)){         
          this.data.historyArr.push(key)
          wx.setStorageSync('historyArr', this.data.historyArr)
        }
        
      }
    }
  },
  //清除历史
  clearHistory(){
    wx.showModal({
      title: '清空历史',
      content: '确认清空搜索历史吗？',
      success:(res)=>{
        if (res.confirm) {
          wx.setStorageSync('historyArr', [])
          this.onLoad()
        }
      }
    })
  },


  
  //点击历史
  tapHistory(e){
    this.setData({keyword:''})
    this.search(e.currentTarget.dataset.keyword)
  }
})