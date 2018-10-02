const app = getApp();
Page({
  data:{
    
  },
  onLoad: function(options){
    this.Global = app.Global;
    this.Api = this.Global.Api;
    this.Global.getUser().then(obj=>{
      this.Api.getSaleList({
        sid : options.id
      }).then(obj=>{
        this.setData({
          isLoad : true
        })
        if(obj.length){
          this.setData({
            range : obj,
            key : 0
          });
        }
      });
    })
  },
  change : function(e) {
    var value = +(e.detail.value);
    var range = this.data.range;
    this.setData({
      selectname : range[value]['name'],
      key : range[value]['id']
    });
  },
  goDetail : function(id) {
    this.Global.WxService.navigateTo('/pages/anchang/order?id=' + this.options.id);
  },
  goConfirm : function() {
    if(!this.data.key){
      this.Global.showErrorMsg('请选择案场销售');
    }else{
      this.Api.setAnSale({
        uid : this.data.key,
        sid : this.options.id
      }).then(obj=>{
        this.goDetail();
      })
    }
  }
})
