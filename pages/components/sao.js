const app = getApp();
Component({
    properties : {
    },
    data : {
    },
    methods : {
      sao : function() {
        wx.scanCode({
          success : (e) => {
            var id = e.result;
            var result = JSON.parse(e.result);
            var user = this.Global.getStaticUser();
            this.setData({
              result : result
            });
            var c = this.getDialog();
            if(user.type == 1){
              c.setMsg('确认客户' + result.name + '到访了么？').show();
            }
            if(user.type == 3){
              c.setMsg('确认接待该客户吗？').show();
            }
          }
        })
      },
      getDialog: function() {
        var c = this.selectComponent('#cdialog');
        return c;
      },
      //确认到访
      daoFang: function(id) {
        var user = this.Global.getStaticUser();
        return this.Api.setCome({
          sid : id,
          uid : user.id,
          user_type : user.type
        })
      },
      ok: function() {
        var id = this.data.result.id;
        var user = this.Global.getStaticUser();
        this.daoFang(id).then(obj=>{
            if(obj.status === 'error'){
              //if(obj.data == 1){
                //this.Global.WxService.navigateTo('/pages/anchang/order?id=' + id);
              //}else{
                this.Global.showErrorMsg(obj.msg);
              //}
            }else{
              if(user.type == 1){
                this.Global.WxService.navigateTo('/pages/anchang/fenpei?id=' + id);
              }
              if(user.type == 3){
                this.Global.WxService.navigateTo('/pages/anchang/order?id=' + id);
              }
            }
        })
      },
    },
    ready : function() {
      this.Global = app.Global;
      this.Api = this.Global.Api;
    }
})
