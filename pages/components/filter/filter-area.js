const app = getApp();
const _ = app.Global._;
Component({
    properties : {
      data : {
        type : Object,
        observer : function(newValue) {
        }
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
      show : [1,0,0],
      city : [],
      area : [],
      street : [],
      cityid : 0,
      areaid: 0,
      streetid: 0
    },
    methods : {
      onTabCity : function(e) {
        var dataset = e.currentTarget.dataset;
        var item = dataset.item;
        var city = this.data.city;
        this.setData({
          show : [1,1,0],
          area : item.childAreas,
          cityid : item.id,
          areaid : -1
        })
      },
      onTabArea : function(e) {
        var dataset = e.currentTarget.dataset;
        var item = dataset.item;
        this.setData({
          show : [1,1,1],
          street : item.childAreas,
          areaid : item.id,
          streetid : -1
        })
      },
      onAreaSelect : function() {
        this.setData({
          areaid : 0,
          streetid : 0,
          show : [1,0,0]
        })
        this.trigger();
      },
      onCitySelect : function() {
        this.setData({
          cityid : 0,
          areaid : 0,
          streetid : 0,
          show : [1,0,0]
        })
        this.trigger();
      },
      onStreetSelect: function(e) {
        var item = e.currentTarget.dataset.item;
        if(item){
          this.setData({
            streetid : item.id
          });
        }else{
          this.setData({
            streetid : 0
          });
        }
        this.trigger();
      },
      trigger : function() {
        this.triggerEvent('select',{
          city : this.data.cityid,
          area : this.data.areaid,
          street : this.data.streetid
        });
      }
    },
    ready : function() {
      var list = this.data.data.list;
      var value = this.data.options;
      var cityid = value.city;
      var areaid = value.area;
      var streetid = value.street;

      var city = list;
      var area = cityid ? _.findWhere(city,{
        id : cityid
      }).childAreas : [];
      var street = areaid ? _.findWhere(area,{
        id : areaid
      }).childAreas : [];
      this.setData({
        cityid : value.city || 0,
        areaid : value.area || 0,
        streetid : value.street || 0,
        city : city,
        area : area,
        street : street
      })
    }
})
