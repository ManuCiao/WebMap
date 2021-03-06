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

define(["./Widgette","./support/AnchorElementViewModel","dojo/dom-class","dojo/dom-construct","dojo/dom-style"],function(e,t,s,i,o){var n={base:"esri-message",visible:"esri-message--visible",text:"esri-message__text",messageFadeIn:"esri-message--fade-in"};return e.createSubclass({properties:{viewModel:{type:t}},declaredClass:"esri.widgets.Message",baseClass:n.base,constructor:function(){this._text=i.create("span",{className:n.text})},postCreate:function(){this.inherited(arguments),i.place(this._text,this.domNode),this.own(this.viewModel.watch("point",function(e){this._setDomClasses(e)}.bind(this)),this.viewModel.watch("screenPoint",function(e){this._positionDomNode(e)}.bind(this)))},destroy:function(){this._clearTimeout()},_css:n,animationDelay:3e3,visible:!0,_setVisibleAttr:function(e){this._set("visible",e),this._visibleChange()},text:"",_setTextAttr:{node:"_text",type:"innerText"},_clearTimeout:function(){this._resetTimeout&&(clearTimeout(this._resetTimeout),this._resetTimeout=0)},_setDomClasses:function(e){this._clearTimeout(),s.remove(this.domNode,n.messageFadeIn),this.domNode.offsetWidth=this.domNode.offsetWidth,e&&(s.add(this.domNode,n.messageFadeIn),this._resetTimeout=setTimeout(function(){this.viewModel.point=null,this._resetTimeout=0}.bind(this),this.animationDelay))},_positionDomNode:function(e){e?o.set(this.domNode,{left:e.x+"px",top:e.y+"px"}):o.set(this.domNode,{left:"",top:""})},_visibleChange:function(){s.toggle(this.domNode,n.visible,this.visible)}})});