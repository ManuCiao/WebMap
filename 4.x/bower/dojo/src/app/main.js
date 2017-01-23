define([
  "esri/Map",
  "esri/layers/FeatureLayer",
  "esri/views/MapView",
  "esri/renderers/SimpleRenderer",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/PopupTemplate",
  "esri/widgets/Search",
  "esri/widgets/Search/SearchViewModel",
  "dojo/domReady!"
], function (Map, FeatureLayer, MapView, SimpleRenderer,
        SimpleMarkerSymbol, SimpleLineSymbol, PopupTemplate, Search, SearchVM) {

  var sismaRenderer = new SimpleRenderer({
         symbol: new SimpleMarkerSymbol({
           size: 10,
           color: "#FF4000",
           outline: { // autocasts as new SimpleLineSymbol()
             color: [255, 64, 0, 0.4], // autocasts as new Color()
             width: 7
           }
         })
       });

   var tectonicRenderer = new SimpleRenderer({
          symbol: new SimpleLineSymbol({
            width: 1,
            color: [64, 255, 0]
          })
        });

  var popupTemplate = new PopupTemplate({
    title:"<b>Volcano: {Name}</b>",
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
    renderer: tectonicRenderer,
    minScale: 0,
    maxScale: 0
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

  layer.forEach(function (items) {
  items.watch("loadStatus", function(status) {
    console.log("'" + items.title + "'" + " " + status);
    if (status === "failed"){
      console.log(items.loadError);
    }
  });
});

  var view = new MapView({
    container: "viewDiv",
    map: map,
    scale: 35000000,
    center: [11.527454,52.57867],

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


  searchWidget.startup();
});
