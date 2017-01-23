define([
  "esri/Map",
  "esri/layers/FeatureLayer",
  "esri/views/MapView",
  "esri/PopupTemplate",
  "esri/widgets/Search",
  "esri/widgets/Search/SearchViewModel",
  "dojo/domReady!"
], function (Map, FeatureLayer, MapView, PopupTemplate, Search, SearchVM) {


  var popupTemplate = new PopupTemplate({
    title:"<b>Volcano Name: {Name}</b>",
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

  var tectonicPlates = new FeatureLayer({
    url: "http://edumaps.esricanada.com/ArcGIS/rest/services/MapServices/TectonicPlates/MapServer"
  });

  var volcanoes = new FeatureLayer({
    url: "http://services.arcgis.com/BG6nSlhZSAWtExvp/arcgis/rest/services/World_Volcanoes/FeatureServer",
    outFields: ["*"],
    popupTemplate: popupTemplate
  });

  var earthquakes = new FeatureLayer({
    url: "http://earthquake.usgs.gov/arcgis/rest/services/eq/event_30DaySignificant/MapServer/0"
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
