import Base from '../../util/base.js'
class Home extends Base {
  constructor() {
    super()
  }
  getIndexData(callBack) {
    let homeData = wx.getStorageSync("home")
    if (!homeData) {
      this.axios('get', '/getHomeData')
        .then((res) => {
          wx.setStorageSync('index', res.data)
          callBack(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      let home = wx.getStorageSync('home')
      callBack(home)
    }

  }

  refresh(cb) {
    this.axios('get', '/getHomeData')
      .then((res) => {
        wx.setStorageSync('home', res.data)
        cb()
      })
      .catch((err) => {
        console.log(err)
        cb()
      })
  }
}

export default Home