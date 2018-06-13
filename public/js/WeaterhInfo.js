function WeatherInfo(){


}

WeatherInfo.prototype.appendData = function(x,y){

    var mousePosition = new Cesium.Cartesian2(x, y);
    var ellipsoid = viewer.scene.globe.ellipsoid;
    var cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);
    if (cartesian) {
        var cartographic = ellipsoid.cartesianToCartographic(cartesian);
        var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(10).replace('.',',');
        var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(10).replace('.',',');

        params = 'lon='+longitudeString+'&lat='+latitudeString;

        getWeather(this.addToDiv );

        function getWeather( callback)
        {

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                    callback(xmlHttp.responseText);
            }
            xmlHttp.open("GET", '/getweather'+"?"+params, true); // true for asynchronous
            xmlHttp.send(null);
        }



    } else {
        console.warn('Globe was not picked');
    }

};

WeatherInfo.prototype.addToDiv = function(e){
    cleanEntities();

    e = JSON.parse(e);

    var entity =  new Cesium.Entity({
        name : this.weatherBox.fillName(e),
        position : Cesium.Cartesian3.fromDegrees(e.coord.lon, e.coord.lat),
        point : {
            pixelSize : 1,
            color : Cesium.Color.RED,
            outlineColor : Cesium.Color.WHITE,
            outlineWidth : 2,
            heightReference : Cesium.HeightReference.CLAMP_TO_GROUND
        }
    });

    entity.description = this.weatherBox.fillDescription(e);
    viewer.entities.add(entity);
    viewer.selectedEntity = entity;


    function cleanEntities(){

        viewer.entities.removeAll();

    }
};

WeatherInfo.prototype.fillName = function(e){
  var str =  'Waether in ';

  (e.name != "") ? str += e.name+', '+e.sys.country : str += 'longitude '+e.coord.lon+' latitude '+e.coord.lat;

  return str;
};
WeatherInfo.prototype.fillDescription = function(e){

    var str = '\
        <img\
         style="float:left; margin: 0 1em 1em 0;"\
         src="http://openweathermap.org/img/w/'+e.weather[0].icon+'.png"/>' +
        '<p>'+e.weather[0].description+'</p><br>' +
        '<p>temperature '+e.main.temp+' °C</p>\ '+
        '<p>max. temperature today '+e.main.temp_max+' °C</p>\ '+
        '<p>min. temperature today '+e.main.temp_min+' °C</p>\ '+
        '<p>pressure '+e.main.pressure+' hPa</p>' +
        '<p>wind speed '+e.wind.speed+' meter/sec</p>';

  //  console.log(e );
        //str += '\ '+JSON.stringify(e.weather[0])+'\\ '+JSON.stringify(e.wind);

  return str;
};