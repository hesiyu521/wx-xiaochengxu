//基类文件
import Config from './config.js'
class Base {
  constructor(){
    this.baseUrl=Config.baseUrl
  }
  axios(method,url,data){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: this.baseUrl+url,
        data: data || '',
        method: method ||'get',
        success: function(res) {
          if (res.statusCode==200){
            if(res.data.err===0){
              resolve(res.data)
            }
          }else{
            reject(res)
          }
        },
        fail (err){
          reject(reject)
        },
      })
   
    })
  }

  getDateSete(event,key){
    return event.currentTarget.dataset[key]
  }
}
export default Base