const PI = 3.14159265358979324;
const X_PI = PI * 3000 / 180;

const mapUtil = {
  //火星坐标系 (GCJ-02) 转百度坐标系 (BD-09) 
  mars_2_bd(gg_lat, gg_lng) {

    let x = gg_lng;
    let y = gg_lat;

    let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
    let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);

    return {
      lat: z * Math.sin(theta) + 0.006,
      lng: z * Math.cos(theta) + 0.0065
    }
  },
  //百度坐标系 (BD-09) 转 火星坐标系 (GCJ-02)
  bd_2_mars(bd_lat, bd_lng) {

    let x = bd_lng - 0.0065;
    let y = bd_lat - 0.006;

    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);

    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);

    return {
      lat: z * Math.sin(theta),
      lng: z * Math.cos(theta)
    }
  },
  // World Geodetic System ==> Mars Geodetic System  地球转火星
  gps_2_mars(wgLat, wgLng) {
    if (this.outOfChina(wgLat, wgLng)) {
      return {
        lat: wgLat,
        lng: wgLng
      };
    }

    const a = 6378245;
    const ee = 0.00669342162296594323;
    let dLat = this.transformLat(wgLng - 105, wgLat - 35);
    let dLng = this.transformLng(wgLng - 105, wgLat - 35);
    let radLat = wgLat / 180 * PI;
    let magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    let sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI);
    dLng = (dLng * 180) / (a / sqrtMagic * Math.cos(radLat) * PI);
    return {
      lat: wgLat + dLat,
      lng: wgLng + dLng
    }
  },
  //是否出中国
  outOfChina(lat, lng) {
    if (lng < 72.004 || lng > 137.8347)
      return true;
    if (lat < 0.8293 || lat > 55.8271)
      return true;
    return false;
  },
  
  //gps 转 bd
  gps_2_bd(wgLat, wgLng) {
    let crd = this.gps_2_mars(wgLat, wgLng);
    return this.mars_2_bd(crd.lat, crd.lng);
  },

  
  transformLat(x, y) {
    let ret = -100 + 2 * x + 3 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20 * Math.sin(6 * x * PI) + 20 * Math.sin(2 * x * PI)) * 2 / 3;
    ret += (20 * Math.sin(y * PI) + 40 * Math.sin(y / 3 * PI)) * 2 / 3;
    ret += (160 * Math.sin(y / 12 * PI) + 320 * Math.sin(y * PI / 30)) * 2 / 3;
    return ret;
  },

  transformLng(x, y) {
    let ret = 300 + x + 2 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20 * Math.sin(6 * x * PI) + 20 * Math.sin(2 * x * PI)) * 2 / 3;
    ret += (20 * Math.sin(x * PI) + 40 * Math.sin(x / 3 * PI)) * 2 / 3;
    ret += (150 * Math.sin(x / 12 * PI) + 300 * Math.sin(x / 30 * PI)) * 2 / 3;
    return ret;
  },

  /**
   * 计算两组经纬度坐标 之间的距离
   * params ：lat1 纬度1； lng1 经度1； lat2 纬度2； lng2 经度2； len_type （1:m or 2:km);
   * return m or km
   */
  getDistance($lat1, $lng1, $lat2, $lng2, $len_type = 1, $decimal = 0) {
    [$lat1, $lng1, $lat2, $lng2] = [parseFloat($lat1), parseFloat($lng1), parseFloat($lat2), parseFloat($lng2)]
    const EARTH_RADIUS = 6378.137;

    let $radLat1 = $lat1 * Math.PI / 180;
    let $radLat2 = $lat2 * Math.PI / 180;
    let $a = $radLat1 - $radLat2;
    let $b = ($lng1 * Math.PI / 180) - ($lng2 * Math.PI / 180);
    let $s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin($a / 2), 2) + Math.cos($radLat1) * Math.cos($radLat2) * Math.pow(Math.sin($b / 2), 2)));
    $s = $s * EARTH_RADIUS;
    $s = Math.round($s * 1000);
    if ($len_type > 1) {
      $s /= 1000;
    }
    return Math.round($s, $decimal);
  }
}

export default mapUtil