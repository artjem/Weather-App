function Layers(l, key){

    this.layers = l;
    this._mainDiv = document.createElement('div');
    this._mainDiv.id = "WeatherLayers";
    this._mainDiv.style.position = "absolute";
    this._mainDiv.style.top = 0;
    this._mainDiv.style.padding = "0 2% 0 0";
    this._mainDiv.style.backgroundColor = "white";
    this._tbody = document.createElement('tbody');
    this._mainDiv.appendChild(this._tbody);
    document.body.appendChild(this._mainDiv);

    var runLayer = 1;
    for(var layer in this.layers){

        var l = Cesium.createOpenStreetMapImageryProvider({
            url : this.layers[layer].url,
            fileExtension : 'png'+'?APPID='+key.OWM_APPKEY,
            proxy: new Cesium.DefaultProxy('/proxy/'),
            zIndex: runLayer
        });


        this.layers[layer].provider = l;
        this.layers[layer].id = runLayer;
        this.applyHTML(layer);
        runLayer++;
    }


}
Layers.prototype.applyHTML = function(n){
    console.log(n);
    var tr = document.createElement('tr');

    var td_input = document.createElement('td');
    var input = document.createElement('input');
    input.type = "checkbox";
    input.checked = true;

    input.addEventListener( 'change', function() {
        if(this.checked) {
            // Checkbox is checked..
            addLayer(n);
        } else {
            // Checkbox is not checked..
            removeLayer(n);
        }
    });


    td_input.appendChild(input);

    var td_name = document.createElement('td');
    var name = document.createElement('p');
    var name_txt = document.createTextNode(n);
    name.appendChild(name_txt);
    td_name.appendChild(name);

    tr.appendChild(td_input);
    tr.appendChild(td_name);

    this._tbody.appendChild(tr);


    function addLayer(name){
        var l_Arr = this.layers.layers;

        for(var l in l_Arr){
            (l == name) ? l_Arr[l].obj = this.viewer.scene.imageryLayers.addImageryProvider(l_Arr[l].provider, l_Arr[l].id) : {};
        }
    }

    function removeLayer(name){
        var l_Arr = this.layers.layers;

        for(var l in l_Arr){

            (l == name) ? this.viewer.imageryLayers.remove( l_Arr[l].obj ): {};
        }
    }

};


Layers.prototype.addLayersToView = function(){

    for(var layer in this.layers) {
       this.layers[layer].obj = viewer.scene.imageryLayers.addImageryProvider(this.layers[layer].provider, this.layers[layer].id);
    }

};