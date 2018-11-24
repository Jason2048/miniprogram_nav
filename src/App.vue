<script>
export default {
  created () {
    // // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs) 

    // console.log('app created and cache logs by setStorageSync')
  },
  onLaunch(){
  	console.log('onLaunch');

  },
  onShow(){


  }
}
</script>

<style lang="scss" src="./app.scss"></style>
<style lang="scss" scoped>
</style>
