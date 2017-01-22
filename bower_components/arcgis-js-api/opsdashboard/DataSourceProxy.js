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

define(["require","exports","../core/tsSupport/extendsHelper","../core/tsSupport/decorateHelper","../core/typescript","dojo/json","dojo/Deferred","../renderers/support/jsonUtils","./core/messageHandler","./core/MessageReceiver","./core/errorMessages","../layers/support/Field","../tasks/support/FeatureSet"],function(e,t,r,i,n,s,o,a,u,d,l,p,c){var h=function(e){function t(t){e.call(this),this.id=null,this.name=null,this.mapWidgetId=null,this.objectIdFieldName=null,this.displayFieldName=null,this.typeIdFieldName=null,this.fields=null,this.types=null,this.geometryType=null,this.supportsSelection=!1,this.isBroken=!1,this._popupInfo=null,this._renderer=null,this.advancedQueryCapabilities=null}return r(t,e),t.prototype.dojoConstructor=function(e){this.fields||(this.fields=[]);for(var t=0;t<this.fields.length;t++){var r=this.fields[t];"string"==typeof r&&(r=s.parse(r)),this.fields[t]=new p(r)}},t.prototype._findField=function(e){if(!e||!Array.isArray(this.fields))return null;for(var t=0;t<this.fields.length;t++)if(this.fields[t].name===e)return this.fields[t];return null},t.prototype._findType=function(e){if(!e||!Array.isArray(this.types))return null;for(var t=0;t<this.types.length;t++)if(this.types[t].id===e)return this.types[t];return null},t.prototype._getCodedValueFromCodedDomain=function(e,t){if(!t||"codedValue"!==t.type)return null;for(var r=0;r<t.codedValues.length;r++)if(t.codedValues[r].code===e)return t.codedValues[r];return null},t.prototype.executeQuery=function(e){var t=this,r={functionName:"executeQuery",args:{dataSourceId:this.id,query:e}};return u._sendMessageWithReply(r).then(function(e){t.isBroken=!1;var r=e.featureSet;return new c(r)}).otherwise(function(e){throw t.isBroken=!0,e})},t.prototype.getAssociatedSelectionDataSourceId=function(){return u._sendMessageWithReply({functionName:"getAssociatedSelectionDataSource",args:{dataSourceId:this.id}}).then(function(e){return e.dataSourceId})},t.prototype.selectFeaturesByObjectIds=function(e){if(!Array.isArray(e))throw new Error(l.invalidObjectIdArray);if(!this.supportsSelection)throw new Error(l.selectionNotSupported);u._sendMessage({functionName:"selectFeaturesByIds",args:{dataSourceId:this.id,objectIds:e}})},t.prototype.selectFeatures=function(e){if(!this.supportsSelection)throw new Error(l.selectionNotSupported);u._sendMessage({functionName:"selectFeatures",args:{dataSourceId:this.id,geometry:e}})},t.prototype.clearSelection=function(){this.supportsSelection&&u._sendMessage({functionName:"clearSelection",args:{dataSourceId:this.id}})},t.prototype.getPopupInfo=function(){var e=this;return this._popupInfo?(new o).resolve(this._popupInfo):u._sendMessageWithReply({functionName:"getPopupInfo",args:{dataSourceId:this.id}}).then(function(t){return e._popupInfo=t.popupInfo,e._popupInfo})},t.prototype.getRenderer=function(){var e=this;return this._renderer?(new o).resolve(this._renderer):u._sendMessageWithReply({functionName:"getRenderer",args:{dataSourceId:this.id}}).then(function(t){return t.renderer?(e._renderer=a.fromJSON(t.renderer),e._renderer):null})},t.prototype.getAdvancedQueryCapabilities=function(){var e=this;return this.advancedQueryCapabilities?(new o).resolve(this.advancedQueryCapabilities):u.isNative?u._sendMessageWithReply({functionName:"getAdvancedQueryCapabilities",args:{dataSourceId:this.id}}).then(function(t){return t.advancedQueryCapabilities?(e.advancedQueryCapabilities=t.advancedQueryCapabilities,e.advancedQueryCapabilities):null}):(new o).resolve(null)},t.prototype.getTypeFromFeature=function(e){return this.typeIdFieldName?this._findType(e.attributes[this.typeIdFieldName]):null},t.prototype.getValueFromFeature=function(e,t){var r=this._findField(t);if(!t||!r)return null;var i=e.attributes[t];if(!i&&(i=e.attributes[t.toUpperCase()],!i))return null;if(this.typeIdFieldName===t){var n=this._findType(i);if(n)return n.name}var s,o=this.getTypeFromFeature(e);if(o&&Array.isArray(o.domains)){var a=o.domains[t];if(s=this._getCodedValueFromCodedDomain(i,a))return s.name}return s=this._getCodedValueFromCodedDomain(i,r.domain),s?s.name:i},i([n.shared("esri.opsdashboard.DataSourceProxy")],t.prototype,"declaredClass",void 0),t=i([n.subclass()],t)}(d);return h});