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

define(["../../core/JSONSupport","../../core/lang","../../core/kebabDictionary","../../core/Error","dojo/_base/lang","dojo/number","../../PopupTemplate","../../widgets/Popup/PopupRendererViewModel","../../symbols/support/jsonUtils"],function(e,r,n,t,l,a,o,i,s){var c="__begin__",u="__end__",b=new RegExp(c,"ig"),p=new RegExp(u,"ig"),v=new RegExp("^"+c,"i"),m=new RegExp(u+"$","i"),f='"',d=f+" + ",g=" + "+f,h=n({esriServerPointLabelPlacementAboveCenter:"above-center",esriServerPointLabelPlacementAboveLeft:"above-left",esriServerPointLabelPlacementAboveRight:"above-right",esriServerPointLabelPlacementBelowCenter:"below-center",esriServerPointLabelPlacementBelowLeft:"below-left",esriServerPointLabelPlacementBelowRight:"below-right",esriServerPointLabelPlacementCenterCenter:"center-center",esriServerPointLabelPlacementCenterLeft:"center-left",esriServerPointLabelPlacementCenterRight:"center-right",esriServerLinePlacementAboveAfter:"above-after",esriServerLinePlacementAboveAlong:"above-along",esriServerLinePlacementAboveBefore:"above-before",esriServerLinePlacementAboveStart:"above-start",esriServerLinePlacementAboveEnd:"above-end",esriServerLinePlacementBelowAfter:"below-after",esriServerLinePlacementBelowAlong:"below-along",esriServerLinePlacementBelowBefore:"below-before",esriServerLinePlacementBelowStart:"below-start",esriServerLinePlacementBelowEnd:"below-end",esriServerLinePlacementCenterAfter:"center-after",esriServerLinePlacementCenterAlong:"center-along",esriServerLinePlacementCenterBefore:"center-before",esriServerLinePlacementCenterStart:"center-start",esriServerLinePlacementCenterEnd:"center-end",esriServerPolygonPlacementAlwaysHorizontal:"always-horizontal"}),S=e.createSubclass({declaredClass:"esri.layers.support.LabelClass",properties:{name:{value:null,json:{writable:!0}},labelExpression:{value:null,json:{writable:!0}},labelExpressionInfo:{value:null,json:{write:function(e,n,a){var o=r.fixJson(e&&l.clone(e));a&&"web-scene"===a.origin?(o.expression&&(a.messages&&a.messages.push(new t("property:unsupported",this.declaredClass+".labelExpressionInfo.expression is not supported in Web Scene. Please remove this property to save the Web Scene.",{instance:this,propertyName:"labelExpressionInfo.expression",context:a})),delete o.expression),n.labelExpressionInfo=o):n.labelExpressionInfo=this._processLabelExpressionInfo(o)}}},labelPlacement:{value:null,json:{read:function(e,r){return h.fromJSON(e)},write:function(e,r){var n=h.toJSON(e);n&&(r.labelPlacement=n)}}},maxScale:{value:0,json:{write:function(e,r){(e||this.minScale)&&(r.maxScale=e)}}},minScale:{value:0,json:{write:function(e,r){(e||this.maxScale)&&(r.minScale=e)}}},requiredFields:{readOnly:!0,dependsOn:["labelExpression","labelExpressionInfo","where"],get:function(){var e=Object.create(null);return this._collectRequiredFields(e),Object.keys(e)}},symbol:{value:null,json:{read:s.read,write:function(e,r,n){r.symbol=s.write(e,{},n)}}},useCodedValues:{value:null,json:{writable:!0}},where:{value:null,json:{writable:!0}}},getLabelExpression:function(){return this.labelExpressionInfo?this.labelExpressionInfo.value:this._validateLabelExpression(this.labelExpression)?this._convertLabelExpression(this.labelExpression):""},_collectRequiredFields:function(e){this._collectLabelExpressionRequiredFields(this.getLabelExpression(),e),this._collectWhereRequiredFields(this.where,e)},_validateLabelExpression:function(e){var r=/^(\s*\[[^\]]+\]\s*)+$/i;return r.test(e)},_convertLabelExpression:function(e){return e.replace(new RegExp("\\[","g"),"{").replace(new RegExp("\\]","g"),"}")},_collectWhereRequiredFields:function(e,r){if(null!=e){var n=e.split(" ");3===n.length&&(r[n[0]]=!0),7===n.length&&(r[n[0]]=!0,r[n[4]]=!0)}},_collectLabelExpressionRequiredFields:function(e,r){var n=e.match(/{[^}]*}/g);n&&n.forEach(function(e){r[e.slice(1,-1)]=!0})},_processLabelExpressionInfo:function(e){return e&&e.value&&(e.expression=this._convertTemplatedStringToArcade(e.value)),e},_convertTemplatedStringToArcade:function(e){var r;return e&&(r=l.replace(e,function(e,r){return c+'$feature["'+r+'"]'+u}),r=v.test(r)?r.replace(v,""):f+r,r=m.test(r)?r.replace(m,""):r+f,r=r.replace(b,d).replace(p,g)),r}});return S.evaluateWhere=function(e,r){var n=function(e,r,n){switch(r){case"=":return e==n?!0:!1;case"<>":return e!=n?!0:!1;case">":return e>n?!0:!1;case">=":return e>=n?!0:!1;case"<":return n>e?!0:!1;case"<=":return n>=e?!0:!1}return!1};try{if(null==e)return!0;var t=e.split(" ");if(3===t.length)return n(r[t[0]],t[1],t[2]);if(7===t.length){var l=n(r[t[0]],t[1],t[2]),a=t[3],o=n(r[t[4]],t[5],t[6]);switch(a){case"AND":return l&&o;case"OR":return l||o}}return!1}catch(i){console.log("Error.: can't parse = "+e)}},S.buildLabelText=function(e,r,n,t){var l=e.replace(/{[^}]*}/g,function(e){return S.formatField(e.slice(1,-1),e,r,n,t)});return l},S.formatField=function(e,n,t,s,c){var u,b,p=n;for(u=0;u<s.length;u++)if(s[u].name==e){p=t[s[u].name];var v=s[u].domain;if(v&&l.isObject(v)){if("codedValue"==v.type)for(b=0;b<v.codedValues.length;b++)v.codedValues[b].code==p&&(p=v.codedValues[b].name);else"range"==v.type&&v.minValue<=p&&p<=v.maxValue&&(p=v.name);return null==p?"":p}var m=s[u].type;if("date"==m){var f=c&&c.dateFormat||"shortDate";f=o.prototype._dateFormatKebabDict.fromJSON(f);var d="DateFormat"+i.prototype._dateFormats[f];d&&(p=r.substitute({myKey:p},"{myKey:"+d+"}"))}else("integer"==m||"small-integer"==m||"long"==m||"double"==m)&&c&&c.numberFormat&&c.numberFormat.digitSeparator&&c.numberFormat.places&&(p=a.format(p,{places:c.numberFormat.places}))}return null==p?"":p},S});