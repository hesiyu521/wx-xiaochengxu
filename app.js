App({
  
  onLaunch(options) {
    // Do something initial when launch.
    console.log("app初始化完成")
  },
  onShow(options) {
    // Do something when show.
    console.log("回到前台")
  },
  onHide() {
    // Do something when hide.
    console.log("回到后台")
  },
  onError(msg) {
    // console.log(msg)
  },
  globalData: 'I am global data'

})
