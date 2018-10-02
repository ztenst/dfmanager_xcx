const app = getApp();
Component({
    properties : {
      hid : {
        type : String
      }
    },
    data : {
    },
    methods : {
      fav : function() {
        this.Global.checkLogin().then(obj=>{
          this.Api.addSave({
            uid : obj.id,
            hid : this.data.hid
          }).then(obj=>{
            this.Global.showOkMsg(obj.msg);
          })
        })
      }
    },
    ready : function() {
      this.Global = app.Global;
      this.Api = this.Global.Api;
    }
})
