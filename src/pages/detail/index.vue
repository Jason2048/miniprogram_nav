<template>
  <div class="container">
    <div class="panel panel-info">
      <img class="logo" :src="curApp.logo" alt="" mode="aspectFit">
      <div class="right">
        <strong class="fs16 ellipsis name">{{curApp.app_name}}</strong>
        <div class="view-count">人气：{{curApp.view_count}}</div>
        <div class="ellipsis tags">标签：{{curApp.tags}}</div>
      </div>
    </div>
    <div class="line"></div>
    <div class="panel panel-desc">
      <div class="summary">
        <span>作者：{{curApp.author}}</span>
        <span>分类：{{curApp.category_title}}</span>
      </div>
      <div class="summary">
        <span>来源：{{curApp.source}}</span>
        <span>更新：{{curApp.updated_at}}</span>
      </div>

      <div class="line"></div>

      <div class="desc">
        {{curApp.desc}}
      </div>

      <div class="text-center qr-code-pic">
        <img :src="curApp.qr_code_pic" alt="" mode="aspectFit" @tap="showPreviePic()">
        <div class="color-66">微信扫描体验</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      curApp:{}
    }
  },
  methods: {
    init(){
      this.curApp=JSON.parse(wx.getStorageSync('curApp'));

      wx.setNavigationBarTitle({
        title:this.curApp.app_name
      })
      
    },
    showPreviePic(){
      wx.previewImage({
        current: this.curApp.qr_code_pic, 
        urls: [this.curApp.qr_code_pic]
      })

    }
  },
  created () {
  },
  onLoad(){
    this.init();
    // console.log('onLoad')
  },
  onShow(){
    // console.log('onShow')
  },
  onReady(){
    // console.log('onReady')
  }
}
</script>

<style lang="scss" scoped>
  .container{
    padding:0 15px;
  }
  .panel{
    width:100%;
    overflow: hidden;
    box-sizing:border-box;
    padding:20px 0;
  }
  .panel-info{
    .logo{
      width:80px;
      height:80px;
      border-radius:15px;
      float:left;
      margin-right:15px;
    }
    .right{
      overflow: hidden;
    }
    .name{
      width:100%;
    }
    .view-count{}
    .tags{
      width:100%;
    }
  }

  .panel-desc{
    .summary{
      margin-bottom: 20px;

      &:first-child{
        margin-bottom: 10px;
      }

      span{
        display: inline-block;
        width:50%;
      }
    }
    .desc{
      padding-top:10px;
    }
    .qr-code-pic{
      padding-top:20px;
      img{
        width:100%;
        margin-bottom: 20px;
      }
    }
  }


</style>
