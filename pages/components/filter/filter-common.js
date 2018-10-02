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
        var item = e.currentTarget.dataset.item || {};
        var name = this.data.data.filed;
        var id = item.id || 0
        this.setData({
          id : id
        });
        var params = {};
        params[name] = id;

        this.triggerEvent('select',params);
      }
    },
    ready : function() {
      var data = this.data.data;
      var name = data.filed;
      var options = this.data.options;
      var id = options[name] || 0;
      this.setData({
        id : id
      });
    }
})
