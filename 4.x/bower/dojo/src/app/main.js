define([
    "esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/Legend",
    "dojo/dom-construct",
    "dojo/on",
    "dojo/dom",
    "dojo/domReady!"
], function(WebMap, MapView, Legend, domConstruct, on, dom) {

    var map = new WebMap({
        portalItem: {
            id: "059372802b014806913c75871ed5879b"
        }
    });

    map.load()
        .then(function() {
            // load the basemap to get its layers created
            return map.basemap.load();
        })
        .then(function() {
            // grab all the layers and load them
            var allLayers = map.allLayers;
            var promises = allLayers.map(function(layer) {
                return layer.load();
            });
            return all(promises.toArray());
        })
        .then(function(layers) {
            // each layer load promise resolves with the layer
            console.log("all " + layers.length + " layers loaded");
        })
        .otherwise(function(error) {
            console.error(error);
        });


var view = new MapView({
    container: "viewDiv",
    map: map,
    scale: 35000000,
    center: [11.527454, 52.57867]
});
view.ui.add(dom.byId("container"), "top-right");

view.then(function() {
var tectonicPlates = map.layers.getItemAt(0);
var earthquakes = map.layers.getItemAt(4);
var volcanoes = map.layers.getItemAt(3);
var legend = new Legend({
    view: view,
    layerInfos: [{
        layer: tectonicPlates,
        title: "Tectonic Plates"
    }, {
        layer: volcanoes,
        title: "Volcanoes"
    }, {
        layer: earthquakes,
        title: "Seismic Activities (over 30 days)"
    }]
});

view.ui.add(legend, "bottom-right");
});

});
