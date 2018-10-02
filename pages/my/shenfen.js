const app = getApp();
Page({
  data:{
  },
  onChange : function(e) {
    var type = e.currentTarget.dataset.type;
    app.globalData.user.type = type;
    this.Global.pubsub.emit('refresh');
  },
  onLoad: function(options){
    this.Global = app.Global;
  }
})
