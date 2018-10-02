const app = getApp();
Component({
    properties : {
    },
    data : {
    },
    methods : {
      onGoMy : function() {
        this.Global.link('/pages/my/index');
      },
      onGoIndex : function() {
        this.Global.link('/pages/index/index');
      },
      onSao : function() {
        this.Global.getUser().then(obj=>{
          if(obj.type == 1 || obj.type == 3){
            var c = this.getSao()
            c.sao();
          }
        })
      },
      getSao : function() {
        var c = this.selectComponent('#c-sao');
        return c;
      },
      cancel : function() {
        
      }
    },
    ready : function() {
      this.Global = app.Global;
      this.Api = this.Global.Api;
      var page = this.Global.getCurrentPage();
      var route = page.route;
      this.setData({
        route : route
      });
    }
})
