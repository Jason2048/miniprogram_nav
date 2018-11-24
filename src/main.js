import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'


const app = new Vue(App) 
app.$mount() 


var globalData={}
Vue.prototype.globalData = Object.assign(getApp().globalData,globalData)

