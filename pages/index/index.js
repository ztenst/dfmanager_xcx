import Global from '../../utils/global';
const app = getApp()
Page({
  data:{
    isLoad : false
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Global.loadFontFace();
    this.Global.getUser().then(obj=>{
      if(obj.id){
        this.refresh();
      }else{
        this.Global.WxService.redirectTo('/pages/login/reg');
      }
    })
    //this.Global.pubsub.on('refresh',this.refresh);
    this.Global.getConfig().then(obj=>{
      wx.setNavigationBarTitle({
        title : obj.sitename1
      })
    })
  },
  refresh : function() {
    this.Global.getUser().then(obj=>{
      this.Global.Api.index({
        uid : obj.id,
        user_type : obj.type
      }).then(obj=>{
        obj.isLoad = true;
        this.setData(obj);
      })
    })
  },
  onShow : function() {
    //this.refresh();
  },
  onLink : function(e) {
    var url = e.currentTarget.dataset.item.url;
    this.Global.WxService.navigateTo(url);
  }
})