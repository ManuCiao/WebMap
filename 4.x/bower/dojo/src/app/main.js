define([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/renderers/SimpleRenderer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/PopupTemplate",
    "esri/widgets/Search",
    "esri/widgets/Search/SearchViewModel",
    "esri/widgets/Legend",
    "dojo/domReady!"
], function(Map, MapView, FeatureLayer, SimpleRenderer,
    SimpleMarkerSymbol, SimpleLineSymbol, PopupTemplate, Search, SearchVM, Legend) {

    var sismaRenderer = new SimpleRenderer({
        symbol: new SimpleMarkerSymbol({
            color: "#FF4000",
            outline: { // autocasts as new SimpleLineSymbol()
                color: [255, 64, 0, 0.4], // autocasts as new Color()
                width: 8
            },
            // label: "Seismic Activities scaled by Magnitude",
            // visualVariables: [{
            //   type: "size",
            //   field: "magnitude",
            //   legendOptions: {
            //       title: "Sesmic Activities by Magnitude"
            //   },
            //   stops: [
            //     { value: 4.0, size: 5, label: "< 4.0M" },
            //     { value: 6.0, size: 8, label: "< 6.0M" },
            //     { value: 8.0, size: 11, label: "< 8.0M" }
            //   ]
            // }]
        })
    });

    var tectonicRenderer = new SimpleRenderer({
        symbol: new SimpleLineSymbol({
            width: 2,
            color: [255, 0, 0],
            style: "short-dot"
        })
    });

    var popupTemplate = new PopupTemplate({
        title: "<b>Volcano: {Name}</b>",
        content: [{
            type: "fields",
            fieldInfos: [{
                fieldName: "STATUS",
                visible: true,
                label: "Historical Status: "
            }, {
                fieldName: "TYPE",
                visible: true,
                label: "Description: "
            }, {
                fieldName: "SimpleType",
                visible: true,
                label: "Volcano Class: "
            }]
        }]
    });

    var popupTemplateSisma = new PopupTemplate({
        title: "Seismic Activity: {location}",
        content: [{
            type: "fields",
            fieldInfos: [{
                fieldName: "magnitude",
                visible: true,
                label: "Magnitude (M): "
            }, {
                fieldName: "eventdate",
                visible: true,
                label: "Occurred at: "
            }]
        }]
    });

    var tectonicPlates = new FeatureLayer({
        url: "http://edumaps.esricanada.com/ArcGIS/rest/services/MapServices/TectonicPlates/MapServer",
        renderer: tectonicRenderer
    });

    var volcanoes = new FeatureLayer({
        url: "http://services.arcgis.com/BG6nSlhZSAWtExvp/arcgis/rest/services/World_Volcanoes/FeatureServer",
        outFields: ["*"],
        popupTemplate: popupTemplate
    });

    var earthquakes = new FeatureLayer({
        url: "http://earthquake.usgs.gov/arcgis/rest/services/eq/event_30DaySignificant/MapServer/0",
        outFields: ["*"],
        popupTemplate: popupTemplateSisma,
        renderer: sismaRenderer
    });


    var layer = [tectonicPlates, volcanoes, earthquakes];

    var map = new Map({
        basemap: "dark-gray",
        layers: layer
    });

    map.addMany(layer);

    layer.forEach(function(items) {
        items.watch("loadStatus", function(status) {
            console.log("'" + items.title + "'" + " " + status);
            if (status === "failed") {
                console.log(items.loadError);
            }
        });
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        scale: 35000000,
        center: [11.527454, 52.57867],

        popup: {
            dockEnabled: true,
            dockOptions: {
                buttonEnabled: true,
                position: "bottom-right"
            }
        }

    });

    var searchWidget = new Search({
        viewModel: new SearchVM({
            view: view
        })
    }, "searchDiv");

    var legend = new Legend({
        view: view,
        layerInfos: [
          {
            layer: earthquakes,
            title: "Seismic Activities(over 30 days)"
        }, {
          layer: tectonicPlates,
          title: "Tectonic Plates"
        }, {
          layer: volcanoes,
          title: "Volcanoes"
        }
      ]
    });

    view.ui.add(legend, "bottom-right");

    searchWidget.startup();
});
