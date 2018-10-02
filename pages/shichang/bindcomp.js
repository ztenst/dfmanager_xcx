const app = getApp();

Page({
  data:{
  },
  onLoad: function(options){
    this.setData({
      options : options
    });
    this.Global = app.Global;
    this.Api = this.Global.Api;
  },
  newCompany : function() {
    this.Global.WxService.navigateTo('/pages/shichang/applymd');
  },
  bindCompany : function(e) {
    var value = e.detail.value;
    var company = value.company;
    if(company.length == 0){
      this.Global.showErrorMsg('请输入公司信息');
    }else{
      this.Global.getUser().then(obj=>{
        this.Api.bindMarket({
          uid : obj.id,
          hid : this.data.options.id,
          company : company
        }).then(obj=>{
          if(obj['status'] == 'error'){
            this.Global.showErrorMsg(obj.msg);
          }else{
            this.Global.showOkMsg(obj.msg).then(obj=>{
              this.Global.goMy();
            })
          }
        })
      })
    }
  }
})
