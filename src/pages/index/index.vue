<template>
  <div class="container">
    <block v-for="item in categoryList" :key="item.category_id">
      <div class="group" v-if="item.total>0">
        <div class="fs16 bold text-left title">
          {{item.category_title}}
          <a class="fs12 more" @click="clickMore(item)" v-if="item.total>10">更多</a>
        </div>
        <scroll-view scroll-x style="width: 100%;">
          <ul :style="{'width':104*item.app_list.length+'px'}">
            <li v-for="(item2,index2) in item.app_list" :key="item2.id">
              <img class="logo" :src="item2.logo" alt="" @tap="clickImage(item2)">
              <!-- <a :href="'/pages/detail/main?categoryId='+item.category_id+'&appId='+item2.id" class="fs14 ellipsis app-name">{{item2.app_name}}</a> -->
              <a class="fs14 ellipsis app-name" @click="viewDetail(item2)">{{item2.app_name}}</a>
            </li>
          </ul>
        </scroll-view>
      </div>
      <div class="line-box">
        <div class="line"></div>
      </div>
    </block>

    <div class="my-modal show-qr-code-pic" v-if="isShowPic&&curApp" @tap="closeDialog()">
      <div class="content" @tap.stop>
        <div class="bold ellipsis title">{{curApp.app_name}}</div>
        <img :src="curApp.qr_code_pic" alt="" mode="aspectFit" @tap="showPreviePic()" @load="loadImg()">
        <div class="color-6a">点击图片并长按识别图中的小程序</div>
      </div>
    </div>

  </div>
</template> 

<script>
import categoryList_data from '../../mock/index.js'
export default {
  data () {
    return {
      categoryList:[], 
      appsObj:{},

      isShowPic:false,
      curApp:null

    }
  },
  components: { 
  },

  methods: {
    init(){
      this.categoryList = categoryList_data;

    },
    clickMore(item){
      var pk=''
      if (item.category_id<=4) {
        pk='pkA'
      }else if (item.category_id>4&&item.category_id<=8) {
        pk='pkB'
      }else if (item.category_id>8&&item.category_id<=12) {
        pk='pkC'
      }else{
        pk='pkD'
      }
      wx.navigateTo({
        url:'/pages/'+pk+'/search/main?categoryId='+item.category_id
      })
    },
    viewDetail(item){
      wx.setStorageSync('curApp',JSON.stringify(item));
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

      wx.showLoading()
    },
    loadImg(){
      wx.hideLoading();
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
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()

    this.init();
  },
  onLoad(){

  }
}
</script>

<style lang="scss" scoped>
  .group{
    box-sizing: border-box;
    // background-color:#f7f7f7;
    width:100%;
    margin-bottom: 5px;
    padding:10px 0;

    .title{
      padding:0 10px;
      position:relative;

      .more{
        color:#1AAD16;
        font-weight: normal;
        position: absolute;
        right:10px;
        top:50%;
        transform:translateY(-50%);
      }
    }

    ul{
      padding: 10px 10px 0;
      overflow: hidden;
    }
    ul>li{
      // background-color:#fff;
      font-size:0;
      text-align:center;
      width:88px;
      padding:10px 5px;
      margin:0 3px;
      float:left;

      .logo{
        width:80px;
        height:80px;
        border-radius:15px;
      }
      .app-name{
        width:100%;
        margin-top: 10px;
      }
    }
  }
  .line-box{
    box-sizing:border-box;
    width:100%;
    padding:0 10px;
  }

  .show-qr-code-pic .content{
    img{
      margin-bottom:20px;
    }

  }
</style>
