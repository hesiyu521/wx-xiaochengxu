import Base from '../../util/base.js'
class Home extends Base {
  constructor() {
    super()
  }
  getHomeData(callBack) {
    let homeData = wx.getStorageSync("produce")
    if (!homeData) {
      this.axios('get', '/getHomeData')
        .then((res) => {
          wx.setStorageSync('produce', res.data)
          callBack(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      let home = wx.getStorageSync('produce')
      callBack(home)
    }

  }

  refresh(cb) {
    this.axios('get', '/getHomeData')
      .then((res) => {
        wx.setStorageSync('produce', res.data)
        cb()
      })
      .catch((err) => {
        console.log(err)
        cb()
      })
  }




}

export default Home