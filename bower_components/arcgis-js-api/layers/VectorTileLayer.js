// COPYRIGHT © 2016 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/_base/lang","../core/accessorSupport/decorators","../core/Error","../core/MultiOriginJSONSupport","../core/urlUtils","../core/promiseUtils","../core/lang","../request","../geometry/Extent","../geometry/SpatialReference","../portal/support/jsonContext","./TiledLayer","./mixins/OperationalLayer","./mixins/PortalLayer","./mixins/ScaleRangeLayer","./mixins/ArcGISCachedService","./support/TileInfo","./support/vectorTileLayerLoader","../views/vectorTiles/style/StyleRepository","../views/vectorTiles/SchemaHelper"],function(e,r,t,o,i,l,n,s,p,a,y,u,c,d,f,v,h,g,m,S,I,U,b,T){function O(){return v}var w=function(e){function r(r,t){e.call(this),this.currentStyleInfo=null,this.fullExtent=null,this.operationalLayerType="VectorTileLayer",this.tileInfo=null,this.type="vector-tile",this.url=null}return t(r,e),r.prototype.normalizeCtorArgs=function(e,r){return"string"==typeof e?i.mixin({},{url:e},r):e},r.prototype.load=function(){var e=this,r=this.loadFromPortal({supportedTypes:["Vector Tile Service"],supportsData:!1}).then(function(){if(e.portalItem&&e.portalItem.id){var r=e.portalItem.itemUrl+"/resources/styles/root.json",t={query:{f:"json"}};return u(r,t).then(function(t){t.data&&e.read({url:r},f.createForItem(e.portalItem))})}}).always(function(){return e.loadStyle()});return this.addResolvingPromise(r),this},Object.defineProperty(r.prototype,"attributionDataUrl",{get:function(){var e=this.currentStyleInfo,r=e&&e.serviceUrl&&p.urlToObject(e.serviceUrl);return r?this._getDefaultAttribution(r.path):null},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"serviceUrl",{get:function(){return this.currentStyleInfo&&this.currentStyleInfo.serviceUrl||null},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"spatialReference",{get:function(){return this.tileInfo&&this.tileInfo.spatialReference||null},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"styleUrl",{get:function(){return this.currentStyleInfo&&this.currentStyleInfo.styleUrl||null},enumerable:!0,configurable:!0}),r.prototype.writeStyleUrl=function(e,r){e&&p.isProtocolRelative(e)&&(e="https:"+e),e&&!y.endsWith(e,"root.json")&&(e=p.join(e,"root.json")),r.styleUrl=e},r.prototype.readTileIndexType=function(e,r){return r.type},r.prototype.readTileIndexUrl=function(e,r){return p.join(this.serviceUrl,r.tileMap)},r.prototype.readTileServers=function(e,r){var t=this,o=r.tiles;return this.serviceUrl&&o.forEach(function(e,r,o){o[r]=p.join(t.serviceUrl,e)}),o},r.prototype.readVersion=function(e,r){return r.version?parseFloat(r.version):parseFloat(r.currentVersion)},r.prototype.readTileInfo256=function(e,r){return new I(T.create256x256CompatibleTileInfo(this.tileInfo.toJSON()))},r.prototype.loadStyle=function(e){var r=e||this.url;if(this._loadingPromise&&"string"==typeof r&&this.url===r)return this._loadingPromise;var t=this._loadingPromise;return this._loadingPromise=this._getSourceAndStyle(r),t&&!t.isFulfilled()&&t.cancel(),this._loadingPromise},r.prototype.getTileUrl=function(e,r,t){var o=this.tileServers[r%this.tileServers.length];return o=o.replace(/\{z\}/gi,e.toString()).replace(/\{y\}/gi,r.toString()).replace(/\{x\}/gi,t.toString())},r.prototype.write=function(e,r){return r&&r.origin&&!this.styleUrl?(r.messages&&r.messages.push(new n("vectortilelayer:unsupported","VectorTileLayer ("+this.title+", "+this.id+") with style defined by JSON only are not supported",{layer:this})),null):this.inherited(arguments,[e,r])},r.prototype._getSourceAndStyle=function(e){var r=this;return e?U.loadMetadata(e).then(function(e){r._set("currentStyleInfo",{serviceUrl:e.serviceUrl,styleUrl:e.styleUrl,spriteUrl:e.spriteUrl,glyphsUrl:e.glyphsUrl,style:e.style,layerDefinition:e.layerDefinition}),r._set("styleRepository",new b(e.style,e)),r.read(e.layerDefinition)}):a.reject(new Error("invalid style!"))},r.prototype._getDefaultAttribution=function(e){var r=e.match(/^https?:\/\/(basemaps|basemapsbeta)\.arcgis\.com(\/[^\/]+)?\/arcgis\/rest\/services\/([^\/]+(\/[^\/]+)*)\/vectortileserver/i),t=["World_Basemap"];if(r){var o=r[3]&&r[3].toLowerCase();if(o)for(var i=r[2]||"",l=0,n=t;l<n.length;l++){var s=n[l];if(s.toLowerCase().indexOf(o)>-1)return p.normalize("//static.arcgis.com/attribution/Vector"+i+"/"+s)}}},o([l.shared({"2d":"../views/2d/layers/VectorTileLayerView2D","3d":"../views/3d/layers/VectorTileLayerView3D"})],r.prototype,"viewModulePaths",void 0),o([l.property({readOnly:!0,dependsOn:["currentStyleInfo"]})],r.prototype,"attributionDataUrl",null),o([l.property({readOnly:!0})],r.prototype,"currentStyleInfo",void 0),o([l.property({type:c,readOnly:!0})],r.prototype,"fullExtent",void 0),o([l.property({readOnly:!0,dependsOn:["currentStyleInfo"]})],r.prototype,"serviceUrl",null),o([l.property({type:d,dependsOn:["tileInfo"],readOnly:!0})],r.prototype,"spatialReference",null),o([l.property({readOnly:!0})],r.prototype,"styleRepository",void 0),o([l.property({readOnly:!0,dependsOn:["currentStyleInfo"],json:{writable:!0,writeAlways:!0}})],r.prototype,"styleUrl",null),o([l.write("styleUrl")],r.prototype,"writeStyleUrl",null),o([l.property({readOnly:!0})],r.prototype,"tileIndexType",void 0),o([l.read("tileIndexType",["tileIndexType","type"])],r.prototype,"readTileIndexType",null),o([l.property({readOnly:!0})],r.prototype,"tileIndexUrl",void 0),o([l.read("tileIndexUrl",["tileIndexUrl","tileMap"])],r.prototype,"readTileIndexUrl",null),o([l.property({readOnly:!0,type:I})],r.prototype,"tileInfo",void 0),o([l.property({readOnly:!0})],r.prototype,"tileServers",void 0),o([l.read("tileServers",["tiles"])],r.prototype,"readTileServers",null),o([l.property({json:{readable:!1}})],r.prototype,"type",void 0),o([l.property({json:{origins:{webDocument:{readFrom:"styleUrl"},portalItem:{readFrom:"url"}},writable:!1,readable:!1}})],r.prototype,"url",void 0),o([l.property({readOnly:!0})],r.prototype,"version",void 0),o([l.read("version",["version","currentVersion"])],r.prototype,"readVersion",null),o([l.property({readOnly:!0})],r.prototype,"tileInfo256",void 0),o([l.read("tileInfo256",["tileInfo"])],r.prototype,"readTileInfo256",null),r=o([l.subclass("esri.layers.VectorTileLayer")],r)}(l.declared(O(),h,g,m,s,S));return w});