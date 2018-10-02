const app = getApp();
const _ = app.Global._;
Component({
    properties : {
      data : {
        type : Object
      },
      options : {
        type : Object,
        observer : function(newValue) {
          this.setData({
            options : newValue
          })
        }
      }
    },
    data : {
    },
    methods : {
      onSelect : function(e) {
        var dataset = e.currentTarget.dataset;
        var index = dataset.index;
        var item = dataset.item;
        this.data.data.list[index].value = item.id;
        this.setData({
          data : this.data.data
        });
      },
      onReset : function() {
        var data = this.data.data;
        _.each(data.list,function(v,k) {
          delete v.value;
        });
        this.setData({
          data : data
        });
        this.trigger();
      },
      onConfirm : function() {
        this.trigger();
      },
      trigger : function() {
        var data = this.data.data;
        var params = {};
         _.each(data.list,function(v,k) {
          var value = v.value;
          var name = v.filed;
          params[name] = value;
        });
        this.triggerEvent('select',params);
      }
    },
    ready : function() {
      var data = this.data.data;
      var list = data.list;
      var params = this.data.options;
      _.each(list,function(v,k) {
        var name = v.filed;
        v.value = params[name];
      });
      this.setData({
        'data.list' : list
      })
    }
})
