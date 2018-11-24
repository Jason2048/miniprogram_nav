<template>
  <div class="container">
    <div class="group">
      <scroll-view style="width: 100%;">
        <ul>
          <li v-for="item in appList" :key="item.id">
            <img class="logo" :src="item.logo" alt="" @tap="clickImage(item)">
            <a class="fs14 ellipsis app-name" @click="viewDetail(item)">{{item.app_name}}</a>
          </li>
        </ul>
      </scroll-view>
    </div>

    <div class="my-modal show-qr-code-pic" v-if="isShowPic&&curApp" @tap="closeDialog()">
      <div class="content" @tap.stop>
        <div class="bold ellipsis title">{{curApp.app_name}}</div>
        <img :src="curApp.qr_code_pic" alt="" mode="aspectFit" @tap="showPreviePic()">
        <div class="color-6a">点击图片并长按识别图中的小程序</div>
      </div>
    </div>

  </div>
</template>

<script>

import data1 from '../../../mock/more/1.js'
import data2 from '../../../mock/more/2.js'
import data3 from '../../../mock/more/3.js'
import data4 from '../../../mock/more/4.js'
export default {
  data () {
    return {
      categoryId:null,
      categoryObj:{},
      appList:[], 

      isShowPic:false,
      curApp:null

    }
  },
  components: { 
  },

  methods: {
    init(){
      let self=this;
      console.log(this.categoryId);

      let categoryList=[data1,data2,data3,data4]
      this.categoryObj = categoryList[this.categoryId-1]

      wx.setNavigationBarTitle({
        title:this.categoryObj.category_title
      })
      this.appList = this.categoryObj.app_list;

    },
    viewDetail(item){
      wx.setStorageSync('curApp',JSON.stringify(item))
      wx.navigateTo({
        url:'/pages/detail/main'
      })
    },
    closeDialog(){
      this.curApp=null;
      this.isShowPic=false;
    },
    clickImage(item){
      this.curApp=item;
      this.isShowPic=true;
    },
    showPreviePic(){
      wx.previewImage({
        current: this.curApp.qr_code_pic, 
        urls: [this.curApp.qr_code_pic]
      })

      this.closeDialog();

    }
  },

  created () {
  },
  onLoad(query){
    this.categoryId=query.categoryId;
    this.init();
  }
}
</script>

<style lang="scss" scoped>
  .group{
    box-sizing: border-box;
    width:100%;
    margin-bottom: 5px;
    padding:10px 0;

    ul{
      padding: 5px;
      overflow: hidden;
    }
    ul>li{
      box-sizing: border-box;
      font-size:0;
      text-align:center;
      width:25%;
      padding:10px 5px;
      float:left;

      .logo{
        width:70px;
        height:70px;
        border-radius:15px;
      }
      .app-name{
        width:100%;
        margin-top: 10px;
      }
    }
  }

  .show-qr-code-pic .content{
    img{
      margin-bottom:20px;
    }

  }
</style>
