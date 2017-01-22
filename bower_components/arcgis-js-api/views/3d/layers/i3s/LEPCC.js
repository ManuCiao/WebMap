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

define(["require","exports","../../../../core/Error"],function(e,r,t){function o(e,r,t){return{identifier:String.fromCharCode.apply(null,new Uint8Array(e,t+h.identifierOffset,h.identifierLength)),version:r.getUint16(t+h.versionOffset,l),checksum:r.getUint32(t+h.checksumOffset,l)}}function n(e,r){return{sizeLo:e.getUint32(r+w.sizeLo,l),sizeHi:e.getUint32(r+w.sizeHi,l),minX:e.getFloat64(r+w.minX,l),minY:e.getFloat64(r+w.minY,l),minZ:e.getFloat64(r+w.minZ,l),maxX:e.getFloat64(r+w.maxX,l),maxY:e.getFloat64(r+w.maxY,l),maxZ:e.getFloat64(r+w.maxZ,l),errorX:e.getFloat64(r+w.errorX,l),errorY:e.getFloat64(r+w.errorY,l),errorZ:e.getFloat64(r+w.errorZ,l),count:e.getUint32(r+w.count,l),reserved:e.getUint32(r+w.reserved,l)}}function i(e){var r=new DataView(e,0),i=0,a=o(e,r,i),d=a.identifier,s=a.version;if(i+=h.byteCount,"LEPCC     "!==d)throw new t("lepcc-decode-error","Bad identifier");if(s>1)throw new t("lepcc-decode-error","Unknown version");var u=n(r,i);i+=w.byteCount;var f=u.sizeHi*Math.pow(2,32)+u.sizeLo;if(f!==e.byteLength)throw new t("lepcc-decode-error","Bad size");var l=new Float64Array(3*u.count),g=[],p=[],v=[],m=[];if(i=c(e,i,g),i=c(e,i,p),i=c(e,i,v),i=c(e,i,m),i!==e.byteLength)throw new t("lepcc-decode-error","Bad length");for(var U=0,y=0,M=0;M<g.length;M++){y+=g[M];for(var z=0,L=0;L<p[M];L++){z+=v[U];var b=m[U];l[3*U]=Math.min(u.maxX,u.minX+2*u.errorX*z),l[3*U+1]=Math.min(u.maxY,u.minY+2*u.errorY*y),l[3*U+2]=Math.min(u.maxZ,u.minZ+2*u.errorZ*b),U++}}return{errorX:u.errorX,errorY:u.errorY,errorZ:u.errorZ,result:l}}function c(e,r,t){var o=[];r=a(e,r,o);for(var n=[],i=0;i<o.length;i++){n.length=0,r=a(e,r,n);for(var c=0;c<n.length;c++)t.push(n[c]+o[i])}return r}function a(e,r,o){var n=new DataView(e,r),i=n.getUint8(0),c=31&i,a=!!(32&i),d=(192&i)>>6,s=0;if(0===d)s=n.getUint32(1,l),r+=5;else if(1===d)s=n.getUint16(1,l),r+=3;else{if(2!==d)throw new t("lepcc-decode-error","Bad count type");s=n.getUint8(1),r+=2}if(a)throw new t("lepcc-decode-error","LUT not implemented");for(var u=Math.ceil(s*c/8),f=new Uint8Array(e,r,u),h=0,w=0,g=0,p=-1>>>32-c,v=0;s>v;v++){for(;c>w;)h|=f[g]<<w,w+=8,g+=1;o[v]=h&p,h>>>=c,w-=c,w+c>32&&(h|=f[g-1]>>8-w)}return r+g}function d(e,r){return{sizeLo:e.getUint32(r+g.sizeLo,l),sizeHi:e.getUint32(r+g.sizeHi,l),count:e.getUint32(r+g.count,l),colorMapCount:e.getUint16(r+g.colorMapCount,l),lookupMethod:e.getUint8(r+g.lookupMethod),compressionMethod:e.getUint8(r+g.compressionMethod)}}function s(e){var r=new DataView(e,0),n=0,i=o(e,r,n),c=i.identifier,a=i.version;if(n+=h.byteCount,"ClusterRGB"!==c)throw new t("lepcc-decode-error","Bad identifier");if(a>1)throw new t("lepcc-decode-error","Unknown version");var s=d(r,n);n+=g.byteCount;var u=s.sizeHi*Math.pow(2,32)+s.sizeLo;if(u!==e.byteLength)throw new t("lepcc-decode-error","Bad size");if(2!==s.lookupMethod&&1!==s.lookupMethod||0!==s.compressionMethod){if(0===s.lookupMethod&&0===s.compressionMethod){if(3*s.count+n!==e.byteLength||0!==s.colorMapCount)throw new t("lepcc-decode-error","Bad count");return new Uint8Array(e,n).slice()}if(s.lookupMethod<=2&&1===s.compressionMethod){if(n+3!==e.byteLength||1!==s.colorMapCount)throw new t("lepcc-decode-error","Bad count");for(var f=r.getUint8(n),l=r.getUint8(n+1),w=r.getUint8(n+2),p=new Uint8Array(3*s.count),v=0;v<s.count;v++)p[3*v]=f,p[3*v+1]=l,p[3*v+2]=w;return p}throw new t("lepcc-decode-error","Bad method "+s.lookupMethod+","+s.compressionMethod)}if(3*s.colorMapCount+s.count+n!==e.byteLength||s.colorMapCount>256)throw new t("lepcc-decode-error","Bad count");for(var m=new Uint8Array(e,n,3*s.colorMapCount),U=new Uint8Array(e,n+3*s.colorMapCount,s.count),p=new Uint8Array(3*s.count),v=0;v<s.count;v++){var y=U[v];p[3*v]=m[3*y],p[3*v+1]=m[3*y+1],p[3*v+2]=m[3*y+2]}return p}function u(e,r){return{sizeLo:e.getUint32(r+p.sizeLo,l),sizeHi:e.getUint32(r+p.sizeHi,l),count:e.getUint32(r+p.count,l),scaleFactor:e.getUint16(r+p.scaleFactor,l),bitsPerPoint:e.getUint8(r+p.bitsPerPoint),reserved:e.getUint8(r+p.reserved)}}function f(e){var r=new DataView(e,0),n=0,i=o(e,r,n),c=i.identifier,d=i.version;if(n+=h.byteCount,"Intensity "!==c)throw new t("lepcc-decode-error","Bad identifier");if(d>1)throw new t("lepcc-decode-error","Unknown version");var s=u(r,n);n+=p.byteCount;var f=s.sizeHi*Math.pow(2,32)+s.sizeLo;if(f!==e.byteLength)throw new t("lepcc-decode-error","Bad size");var l=new Uint16Array(s.count);if(8===s.bitsPerPoint){if(s.count+n!==e.byteLength)throw new t("lepcc-decode-error","Bad size");for(var w=new Uint8Array(e,n,s.count),g=0;g<s.count;g++)l[g]=w[g]*s.scaleFactor}else if(16===s.bitsPerPoint){if(2*s.count+n!==e.byteLength)throw new t("lepcc-decode-error","Bad size");for(var w=new Uint16Array(e,n,s.count),g=0;g<s.count;g++)l[g]=w[g]*s.scaleFactor}else{var w=[],v=a(e,n,w);if(v!==e.byteLength)throw new t("lepcc-decode-error","Bad size");for(var g=0;g<s.count;g++)l[g]=w[g]*s.scaleFactor}return l}var l=!0,h={identifierOffset:0,identifierLength:10,versionOffset:10,checksumOffset:12,byteCount:16},w={sizeLo:0,sizeHi:4,minX:8,minY:16,minZ:24,maxX:32,maxY:40,maxZ:48,errorX:56,errorY:64,errorZ:72,count:80,reserved:84,byteCount:88};r.decodeXYZ=i;var g={sizeLo:0,sizeHi:4,count:8,colorMapCount:12,lookupMethod:14,compressionMethod:15,byteCount:16};r.decodeRGB=s;var p={sizeLo:0,sizeHi:4,count:8,scaleFactor:12,bitsPerPoint:14,reserved:15,byteCount:16};r.decodeIntensity=f});