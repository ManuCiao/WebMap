define([
    "esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/Print",
    "esri/widgets/Legend",
    "dojo/dom-construct",
    "dojo/on",
    "dojo/dom",
    "dojo/domReady!"
], function(WebMap, MapView, Print, Legend, domConstruct, on, dom) {

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
        center: [11.527454, 52.57867],
        ui: {
          padding:{
            top:16,
            left:16,
            bottom:16,
            right:16
          },
          components:["zoom","compass","attribution"]
        }
    });
    view.ui.add(dom.byId("container"), "bottom-right");

    view.then(function() {
        var earthquakes = map.layers.getItemAt(2);
        var volcanoes = map.layers.getItemAt(3);
        var tectonicPlates = map.layers.getItemAt(1);
        var print = new Print({
            view: view,
            // specify your own print service
            printServiceUrl: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
        });
        var legend = new Legend({
            view: view,
            layerInfos: [{
                layer: earthquakes,
                title: "Seismic Activities (30 days)"
            }, {
                layer: volcanoes,
                title: "Volcanoes"
            }, {
                layer: tectonicPlates,
                title: "Tectonic Plates"
            }]
        });
        legend.startup();
        view.ui.add(legend, "top-right");
        view.ui.add(print, "bottom-left");
    });

});
