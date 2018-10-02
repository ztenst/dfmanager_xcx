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
          });
        }
      }
    },
    data : {
      id : 0
    },
    methods : {
      onSelect : function(e) {
        var item = e.currentTarget.dataset.item;
        this.setData({
          id : item.id
        });
      },
      onConfirm : function() {
        this.trigger();
      },
      onReset : function() {
        this.setData({
          id : 0
        });
        this.trigger();
      },
      trigger : function() {
        var id = this.data.id;
        var name = this.data.data.filed;
        var params = {};
        params[name] = id;
        this.triggerEvent('select',params);
      }
    },
    ready : function() {
      var data = this.data.data;
      var name = data.filed;
      var params = this.data.options;
      var id = params[name] || 0;
      this.setData({
        id : id
      });
    }
})
