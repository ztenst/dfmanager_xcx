const app = getApp();
Component({
    properties : {
      hid : {
        type : Array,
        value : [],
        observer : function(newValue,oldValue) {
          if(app.Global._.isEqual(newValue,oldValue)) return;
          this.setData({
            hid : newValue
          });
          this.initPlot();
        }
      }
    },
    data : {
      list : []
    },
    methods : {
      initPlot : function() {
        var hid = this.data.hid;
        var params = {
          hid : hid.join(',')
        };
        console.log(hid);
        this.Api.getPlotsById(params).then(obj=>{
          this.setData({
            list : obj
          })
        });
      },
      del : function(e) {
        var item = e.currentTarget.dataset.item;
        this.triggerEvent('del',item.id);
      }
    },
    created : function() {
      this.Global = app.Global;
      this.Api = this.Global.Api;
    },
    ready : function() {
    }
})
