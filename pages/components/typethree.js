const app = getApp();
Component({
    properties : {
      item : {
        type : Object
      }
    },
    data : {
    },
    methods : {
      change : function(e) {
        var name = this.data.item.param;
        var index = e.detail.value;
        var key = this.data.range[index]['id'];
        this.setData({
          selectname : this.data.range[index]['value'],
          key : key
        });
        this.triggerEvent('change',{
          name : name,
          value : key
        });
      }
    },
    ready : function() {
      this.Global = app.Global;
      var item  = this.data.item;
      var value = item.value;
      var typeArr = item.typeArr;
      var range = this.Global._.map(typeArr,function(v,k) {
        return {
          id : k,
          value : v
        };
      })
      this.setData({
        range : range
      });
      var index = this.Global._.findIndex(range,function(v) {
        return v.id == value;
      });
      if(index == -1){
        index = 0;
      };
      this.setData({
        index : index,
        selectname : range[index]['value']
      });
    }
})
