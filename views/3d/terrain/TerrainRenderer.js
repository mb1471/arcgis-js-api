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
// See http://js.arcgis.com/4.0/esri/copyright.txt for details.

define(["dojo/Deferred","dojo/when","./TileUtils","./TerrainConst","./TileGeometryFactory","../support/PreallocArray","../support/ObjectPool","../webgl-engine/lib/GLVBO","../webgl-engine/lib/GLIBO","../webgl-engine/lib/ShaderVariations","dojo/text!./TerrainMaterial.xml","../webgl-engine/materials/internal/MaterialUtil","../webgl-engine/lib/GLSLProgram","../webgl-engine/lib/Util","../webgl-engine/lib/GLUtil","../lib/glMatrix","../webgl-engine/lib/RenderPass","../webgl-engine/lib/RenderSlot","../webgl-engine/lib/tracer"],function(e,t,r,i,n,a,s,o,l,d,u,f,c,T,h,m,v,E,g){var p,R=T.assert,y=m.vec2d,b=m.vec3d,x=m.vec4d,_=m.mat4d.identity(),D=4,A=[2,2],I=E.OPAQUE_TERRAIN,S=E.TRANSPARENT_TERRAIN,L=[0,0],O=b.create(),w=7,M=10,U=f.Layouts.PosTex,P=y.create(),N=function(){this.overlayTexOffset=y.create(),this.texOffset=y.create(),this.geometryInfo={geometry:null,numSurfaceIndices:0,numSkirtIndices:0,numWithoutSkirtIndices:0,numVertsPerRow:0},this.init()};N.prototype.init=function(){this.geometryInfo.geometry=null,this.geometryInfo.numSurfaceIndices=0,this.geometryInfo.numSkirtIndices=0,this.geometryInfo.numWithoutSkirtIndices=0,this.geometryInfo.numVertsPerRow=0,this.geometryState=null,this.vbo=null,this.ibo=null,this.texture=null,this.textureReference=null,y.set2(0,0,this.texOffset),this.texScale=1,this.overlayTexId=null,this.overlayTexScale=[1,1],this.overlayOpacity=1,this.localOrigin=null},N.prototype.updateGeometryState=function(e){return this.geometryState=e.geometryState(this.geometryState),this.geometryState};var X=function(m,E){function X(){for(;bt.length<bt.data.length&&_t.length>0;){var e=_t.pop();bt.push(e)}xt=bt.length}function G(){for(var e=0;e<bt.length;e++){var t=bt.data[e];Dt.release(t),t.callback(e>=xt),t.callback=null}bt.clear()}function F(e,t){var r=e.screenDepth,i=t.screenDepth;return i>r?-dt:r>i?dt:0}function B(e,t){return 0===e.tiles.length?-dt:0===t.tiles.length?dt:F(e.tiles.data[0],t.tiles.data[0])}function C(e,t){return void 0===t&&(t=at.subdivisionReduceLevels),0===t?e:0>t?Math.floor((e-1)*(1<<-t))+1:Math.floor((e-1)/(1<<t))+1}function j(e){for(var t=e.extent,r=e.lij[0],i=0;xt>i;){var n=bt.data[i],a=n.extent;r>=n.minLevel&&r<=n.maxLevel&&a[0]<=t[2]&&a[2]>=t[0]&&a[1]<=t[3]&&a[3]>=t[1]?(bt.swap(i,xt-1),xt--):i++}}E=E||256;var k,V,W,H,Y,q,z=!1,Z=null,Q=null,K=null,J={},$=new s(100,N),et=new a(10,function(){return{root:null,tiles:new a(300)}}),tt=new r.IteratorPreorder,rt=!0,it=1,nt=!0,at={mode:"none",width:1.5,falloff:1.5,wireOpacity:1,surfaceOpacity:0,color:[1,1,1,0],subdivision:"geometry",subdivisionReduceLevels:0},st=!1,ot=!1,lt=!1,dt=1,ut=!0,ft=null,ct=null,Tt=null,ht=null,mt=null,vt=null;this.updateTileBackground=function(t){mt&&mt.reject(),vt=t;var r=new e;if(mt=r,t){var i=new Image;i.src=t instanceof Image?t.src:t,i.onload=function(){r.isFulfilled()||r.resolve(i)}}else r.resolve(null);return this.renderTileBackground(),r.promise};var Et=0,gt=0,pt=0,Rt=0;this.numTileTexturesComposited=0,this.castShadows=!1,this.loaded=function(){};var yt=!1;this.needsRender=!0,this.didRender=!1;var bt=new a(10),xt=0,_t=new a(30),Dt=new s(10,function(){this.extent=x.create(),this.minLevel=0,this.maxLevel=0,this.callback=null});this.renderTileBackground=function(){return k&&mt?mt.then(function(e){Tt=this._buildTexture(),e&&h.texImage2D(e,Tt,k,null,null,!1,!1,!1),Z&&r.traverseTilesPreorder(Z,function(e){this.updateTileTexture(e)}.bind(this))}.bind(this)):void 0},this.initializeRenderContext=function(e){k=e.gl,H=k.getExtension("EXT_texture_filter_anisotropic")||k.getExtension("MOZ_EXT_texture_filter_anisotropic")||k.getExtension("WEBKIT_EXT_texture_filter_anisotropic"),R(!p||p===H.TEXTURE_MAX_ANISOTROPY_EXT,"contexts have different definitions afExt.TEXTURE_MAX_ANISOTROPY_EXT"),null!=H&&(p=H.TEXTURE_MAX_ANISOTROPY_EXT,Y=k.getParameter(H.MAX_TEXTURE_MAX_ANISOTROPY_EXT),q=Math.min(8,Y));var r=k.getExtension("OES_element_index_uint");n.setSupportsUintIndices(!!r),t(this.renderTileBackground(),function(){z=!0,this.needsRender=!0}.bind(this));var i=new Float32Array(20);i[0]=-1,i[1]=-1,i[2]=0,i[3]=0,i[4]=0,i[5]=1,i[6]=-1,i[7]=0,i[8]=1,i[9]=0,i[10]=-1,i[11]=1,i[12]=0,i[13]=0,i[14]=1,i[15]=1,i[16]=1,i[17]=0,i[18]=1,i[19]=1,ct=new o(i,U,k),ft=k.createFramebuffer(),V=e.textureRep;var a=e.shaderSnippets,s=e.shaderRep,l=e.programRep;a.vsTerrain||a._parse(u),k.getExtension("OES_standard_derivatives");var f=new d("terrain",["vsTerrain","fsTerrain"],null,l,s,a,k);f.addDefine("Spherical","SPHERICAL"),f.addDefine("Overlay","OVERLAY"),f.addDefine("Atmosphere","ATMOSPHERE"),f.addDefine("Wireframe","WIREFRAME"),f.addDefine("TileBorders","TILE_BORDERS"),f.addBinaryShaderSnippetSuffix("Wireframe","Wireframe",[!1,!0]);var T=new d("terrainNormal",["vsTerrainNormal","fsNormal"],null,l,s,a,k);T.addDefine("Spherical","SPHERICAL"),T.addDefine("AlphaZero","ALPHA_ZERO"),K={depth:l.get("depth"),depthShadowMap:l.get("depthShadowMap"),depthOnly:c.fromSnippets("vsTerrainDepthOnly","fsTerrainDepthOnly",a,k),blendLayers:c.fromSnippets("vertexShaderBlendLayers","fragmentShaderBlendLayers",a,k)},Q={color:f,normal:T},this._updatePrograms(),ht=h.createEmptyTexture(k)},this._updatePrograms=function(){var e="spherical"===m,t="shader"===at.mode;K.color=Q.color.getProgram([e,!0,e,t,st,t||st]),K.normal=Q.normal.getProgram([e,!0])},this.install=function(e){e.addExternalRenderer([I,S],this)},this.uninstall=function(e){e.removeExternalRenderer(this)},this.setRootTiles=function(e){Z=e},this.setTileSize=function(e){E=e},this.loadTile=function(e){R(null===e.renderData),e.renderData=$.acquire(),e.renderData.init();var t=this.getLocalOriginOfTile(e),r=e.createGeometry(e.renderData.updateGeometryState(e),t,"debug"===at.mode,e.renderData.geometryInfo);e.renderData.localOrigin=t,this._setTileGeometry(e,r),this.updateTileTexture(e),this.needsRender=!0},this.queryVisibleLevelRange=function(e,t,r,i){var n=Dt.acquire();x.set(e,n.extent),n.minLevel=t?t:-Number.MAX_VALUE,n.maxLevel=null!=r?r:Number.MAX_VALUE,n.callback=i,_t.push(n),this.needsRender=!0},this._buildTexture=function(e){var t=k.createTexture();if(k.bindTexture(k.TEXTURE_2D,t),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_WRAP_S,k.CLAMP_TO_EDGE),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_WRAP_T,k.CLAMP_TO_EDGE),k.texParameteri(k.TEXTURE_2D,k.TEXTURE_MAG_FILTER,k.LINEAR),q&&k.texParameterf(k.TEXTURE_2D,p,q),e)try{k.texImage2D(k.TEXTURE_2D,0,k.RGBA,k.RGBA,k.UNSIGNED_BYTE,e)}catch(r){k.texImage2D(k.TEXTURE_2D,0,k.RGBA,E,E,0,k.RGBA,k.UNSIGNED_BYTE,null),console.warn("TerrainRenderer: failed to execute 'texImage2D', cross-origin image may not be loaded.")}else k.texImage2D(k.TEXTURE_2D,0,k.RGBA,E,E,0,k.RGBA,k.UNSIGNED_BYTE,null);return k.texParameteri(k.TEXTURE_2D,k.TEXTURE_MIN_FILTER,k.LINEAR_MIPMAP_LINEAR),k.generateMipmap(k.TEXTURE_2D),t},this._composeTexture=function(e,t,r){k.activeTexture(k.TEXTURE0),k.bindTexture(k.TEXTURE_2D,e),K.blendLayers.uniform1f("scale",t),K.blendLayers.uniform2fv("offset",r),k.drawArrays(k.TRIANGLE_STRIP,0,ct.getNum())},this._composeMapLayers=function(e,t,r,n,a){var s=i.LayerClass.MAP;e.renderData.texture||(e.renderData.texture=this._buildTexture()),k.bindFramebuffer(k.FRAMEBUFFER,ft),k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,e.renderData.texture,0),k.viewport(0,0,E,E),k.clearColor(0,0,0,0),k.clear(k.COLOR_BUFFER_BIT),k.enable(k.BLEND),k.blendFuncSeparate(k.ONE_MINUS_DST_ALPHA,k.DST_ALPHA,k.ONE_MINUS_DST_ALPHA,k.ONE),K.blendLayers.use(),K.blendLayers.uniform1i("tex",0),U.enableVertexAttribArrays(k,K.blendLayers,!1),ct.bind(),ct.setPointers(K.blendLayers);for(var o=0;r>=o;o++){var l,d,u=t[o],f=null;if(u.data)f=u,l=L,d=1;else if(u.upsampleFromTile){var c=u.upsampleFromTile;f=c.tile.layerInfo[s][o],l=c.offset,d=c.scale}f&&(f.data instanceof Image&&(f.data=this._buildTexture(f.data)),K.blendLayers.uniform1f("opacity",a[o]),this._composeTexture(f.data,d,l))}n&&this._composeTexture(Tt,1,L),k.bindTexture(k.TEXTURE_2D,e.renderData.texture),k.generateMipmap(k.TEXTURE_2D),U.disableVertexAttribArrays(k,K.blendLayers,!1),k.bindFramebuffer(k.FRAMEBUFFER,null);var T=k.web3DDefaultState;k.blendFunc(T.blendFuncSrc,T.blendFuncDst),k.disable(k.BLEND),this.numTileTexturesComposited++};var At=new Array(20);this.updateTileTexture=function(e){for(var t=e.layerInfo[i.LayerClass.MAP],r=0;r<t.length;r++)t[r].pendingUpdates&=~i.TileUpdateTypes.UPDATE_TEXTURE;if(e.renderData){var n,a,s,o,l=i.LayerClass.MAP,d=e.renderData,u=0;for(o=0;o<t.length;o++){n=t[o];var f=e.parentSurface.layerViewByIndex(o,l),c=f.layer.get("opacity");if(At[o]=c,(n.data||n.upsampleFromTile)&&(u++,!f.isTransparent()&&c>=1))break}var T=!1;o===t.length&&(T=!0,o--),0===u?(d.textureReference=Tt,y.set2(0,0,d.texOffset),d.texScale=1):1!==u||T?(this._composeMapLayers(e,t,o,T,At),d.textureReference=null,y.set2(0,0,d.texOffset),d.texScale=1):(n=t[o],n.data?(a=n,y.set2(0,0,d.texOffset),d.texScale=1):(s=n.upsampleFromTile,a=s.tile.layerInfo[l][o],y.set(s.offset,d.texOffset),d.texScale=s.scale),a&&(a.data instanceof Image&&(a.data=this._buildTexture(a.data)),d.textureReference=a.data)),this.needsRender=!0}},this.releaseTileTexture=function(e){k.deleteTexture(e)},this.releaseTileTextures=function(e){for(var t=e.layerInfo[i.LayerClass.MAP],r=0;r<t.length;r++){var n=t[r];n&&n.data instanceof window.WebGLTexture&&k.deleteTexture(n.data)}},this.updateTileGeometryNeedsUpdate=function(e){return e.renderData.updateGeometryState(e).needsUpdate},this._updateTileGeometry=function(e){for(var t=e.renderData.geometryState,r=e.layerInfo[i.LayerClass.ELEVATION],n=0;n<r.length;n++)r[n].pendingUpdates&=~i.TileUpdateTypes.UPDATE_GEOMETRY;if(t.needsUpdate){e.renderData.vbo&&this._releaseTileGeometry(e);var a=e.createGeometry(t,e.renderData.localOrigin,"debug"===at.mode,e.renderData.geometryInfo);return this._setTileGeometry(e,a),!0}return!1},this.updateTileGeometry=function(e){return e.renderData.updateGeometryState(e),this._updateTileGeometry(e)},this.unloadTile=function(e){this._releaseTileGeometry(e),e.renderData.texture&&k.deleteTexture(e.renderData.texture),$.release(e.renderData),e.renderData=null},this.getLocalOriginOfTile=function(e){if(e.lij[0]>=M){for(;e.lij[0]>w;)e=e.parent;return e.centerAtSeaLevel}if("spherical"===m)return O;for(;e.parent;)e=e.parent;return e.centerAtSeaLevel},this.setVisibility=function(e){rt=e,this.needsRender=!0},this.getStats=function(){return{numTilesRendered:gt,numTilesCulled:pt,numTrianglesRendered:Et,numOriginsRendered:Rt}},this.setMaxAnisotropy=function(e){H&&(e=T.clamp(e,1,Y),e!==q&&(q=e,Z&&r.traverseTilesPreorder(Z,function(e){e.renderData&&e.renderData.texture&&(k.bindTexture(k.TEXTURE_2D,e.renderData.texture),k.texParameterf(k.TEXTURE_2D,H.TEXTURE_MAX_ANISOTROPY_EXT,q))}))),this.needsRender=!0},this.getMaxAnisotropy=function(){return q},this.setDisableRendering=function(e){ot=!!e,this.needsRender=!0},this.getOpacity=function(){return it},this.getWireframeEnabled=function(){return"shader"===at.mode},this.setWireframe=function(e){if(e&&e!==!0||(e={mode:e?"shader":"none"}),void 0!==e.mode&&at.mode!==e.mode){var t="debug"===at.mode,i="debug"===e.mode;at.mode=e.mode,this._updatePrograms(),t!==i&&Z&&r.traverseTilesPreorder(Z,function(e){if(e.renderData){e.renderData.vbo&&this._releaseTileGeometry(e);var t=e.createGeometry(e.renderData.updateGeometryState(e),e.renderData.localOrigin,i,e.renderData.geometryInfo);this._setTileGeometry(e,t)}}.bind(this)),this.needsRender=!0}for(var n in e)at.hasOwnProperty(n)&&(at[n]=e[n]),this.needsRender=!0},this.setOpacity=function(e){it=e,this.needsRender=!0},this.setDrawSkirts=function(e){nt=e,this.needsRender=!0},this.setCullBackFaces=function(e){lt=e,this.needsRender=!0},this.setRenderOrder=function(e){dt=e,this.needsRender=!0},this.setBorders=function(e){st!==e&&(st=e,"none"===at.mode&&(at.transitionTime=0),this._updatePrograms(),this.needsRender=!0)},this.setFrontMostTransparent=function(e){ut!==e&&(ut=e,this.needsRender=!0)},this.setNeedsRender=function(){this.needsRender=!0,this.didRender=!1},this.resetNeedsRender=function(){this.didRender&&(this.needsRender=0!==_t.length,this.didRender=!1)};var It=b.create();this.isTransparent=function(){return 1>it||"shader"===at.mode&&(at.wireOpacity<1||at.surfaceOpacity<1)||!vt},this.render=function(e){if(z&&!ot&&rt&&Z){var t=this.isTransparent(),r=t?S:I;if(e.slot===r){if(g.trace("# BEGIN RENDER TERRAIN"),et.clear(),W=null,this._renderCollectOrigins(),0!==dt){for(var i=0;i<et.length;i++)this._sortFrontToBack(et.data[i].tiles,F);this._sortFrontToBack(et,B)}var n,a=!1,s=!1,o=e.pass,l=e.camera;if(o===v.MATERIAL){if(s=t,t&&ut){var d=K.depthOnly;d.use(),U.enableVertexAttribArrays(k,d,!1),k.colorMask(!1,!1,!1,!1),this._renderTilesDepthOnly(l,k,d),k.colorMask(!0,!0,!0,!0),k.depthFunc(k.EQUAL),k.depthMask(!1)}n=K.color,a=!0,n.use(),n.uniform1f("opacity",it),s&&k.enable(k.BLEND),!k.web3DDefaultState.cullEnabled&&lt?k.enable(k.CULL_FACE):k.web3DDefaultState.cullEnabled&&!lt&&k.disable(k.CULL_FACE),("shader"===at.mode||st)&&(n.uniform1f("wireframe.width",at.width),n.uniform1f("wireframe.falloff",Math.min(at.width,at.falloff)),n.uniform1f("wireframe.wireOpacity",at.wireOpacity*it),n.uniform1f("wireframe.surfaceOpacity",at.surfaceOpacity*it),n.uniform4fv("wireframe.color",at.color),n.uniform1f("wireframe.near",l.near),n.uniform1f("wireframe.far",l.far),"geometry"!==at.subdivision&&"constant"!==at.subdivision&&n.uniform1f("wireframe.subdivision",C(at.subdivision)))}else if(o===v.MATERIAL_DEPTH_SHADOWMAP&&this.castShadows||o===v.MATERIAL_DEPTH)n=o===v.MATERIAL_DEPTH_SHADOWMAP?K.depthShadowMap:K.depth,n.use(),n.uniformMatrix4fv("model",_),P[0]=l.near,P[1]=l.far,n.uniform2fv("nearFar",P);else{if(o!==v.MATERIAL_NORMAL)return;n=K.normal,n.use()}e.shadowMap&&e.shadowMap.bind(n),e.ssaoHelper&&e.ssaoHelper.setUniforms(n),U.enableVertexAttribArrays(k,n,!1),a&&(n.uniform1i("tex",D),n.uniform1i("overlayTex",D+1)),n.uniformMatrix4fv("viewNormal",l.viewInverseTransposeMatrix),n.uniformMatrix4fv("proj",l.projectionMatrix),n.uniform3fv("lightDirection",e.lightingData.direction);var u=l.viewMatrix;for(b.set3(u[12],u[13],u[14],It),b.normalize(It),n.uniform3fv("viewDirection",It),gt=0,pt=0,Et=0,Rt=0,X(),i=0;i<et.length;i++){var c=et.data[i];n.uniform3fv("origin",c.origin),f.bindView(c.origin,u,n),e.shadowMap&&e.shadowMap.bindView(n,c.origin),Rt++,this._renderTiles(c.tiles,n,a)}return U.disableVertexAttribArrays(k,n,!1),k.activeTexture(k.TEXTURE0),k.bindBuffer(k.ELEMENT_ARRAY_BUFFER,null),s&&k.disable(k.BLEND),t&&ut&&(k.depthFunc(k.LESS),k.depthMask(!0)),!k.web3DDefaultState.cullEnabled&&lt?k.disable(k.CULL_FACE):k.web3DDefaultState.cullEnabled&&!lt&&k.enable(k.CULL_FACE),G(),gt>0&&!yt&&(yt=!0,this.loaded&&this.loaded()),g.trace("# END RENDER TERRAIN"),!0}}},this._renderCollectOrigins=function(){for(var e=0;e<Z.length;e++){var t=Z[e],r=et.next();r.root=t,r.origin="spherical"===m?O:t.centerAtSeaLevel,r.tiles.clear(),this._renderCollectOriginsForRoot(r)}},this._renderCollectOriginsForRoot=function(e){for(tt.reset(e.root);!tt.done;){var t=tt.next(),r=t.renderData;if(!r||t.visible){var i=et.peek();if(t.lij[0]===w&&((i===e||0!==i.tiles.length)&&(i=et.next(),i.tiles.clear()),i.root=t,i.origin=t.centerAtSeaLevel),r){var n=t.lij[0];n>=M?et.peek().tiles.push(t):e.tiles.push(t),(null===W||W.lij[0]<n)&&(W=t),tt.skip()}}else pt++,tt.skip()}},this._sortFrontToBack=function(e,t){e.sort(t)},this._renderTilesDepthOnly=function(e,t,r){var i=e.viewMatrix;r.uniformMatrix4fv("proj",e.projectionMatrix);for(var n=0;n<et.length;n++){var a=et.data[n];r.uniform3fv("origin",a.origin),f.bindView(a.origin,i,r);for(var s=0;s<a.tiles.length;s++){var o=a.tiles.data[s],l=o.renderData;l.vbo.bind(),l.vbo.setPointers(r);var d=l.ibo;d.bind();var u=d.getNum();nt||(u=l.geometryInfo.numWithoutSkirtIndices),t.drawElements(t.TRIANGLES,u,d.getType(),0)}}},this._renderTiles=function(e,t,r){if(0!==e.length){var i=k.TRIANGLES;"debug"===at.mode&&(i=k.LINES);var n,a,s="geometry"===at.subdivision,o="constant"===at.subdivision,l=W;l?(n=l.lij[0],a=C(l.renderData.geometryInfo.numVertsPerRow)):(n=16,a=16);for(var d=0;d<e.length;d++){var u=e.data[d],f=u.renderData;g.trace("# RENDER TILE "+u.lij[0]+"/"+u.lij[1]+"/"+u.lij[2]+", screenDepth:"+u.screenDepth),f.vbo.bind(),f.vbo.setPointers(t);var c=f.ibo;if(c.bind(),r){t.uniform2fv("texOffset",f.texOffset),t.uniform1f("texScale",f.texScale),k.activeTexture(k.TEXTURE0+D);var T=f.textureReference||f.texture;if(k.bindTexture(k.TEXTURE_2D,T),f.overlayTexId?St(t,f):(t.uniform2fv("overlayTexOffset",A),Lt(t,ht)),("shader"===at.mode||st)&&(s||o))if(s)t.uniform1f("wireframe.subdivision",C(f.geometryInfo.numVertsPerRow));else{var h=C(a,u.lij[0]-n);t.uniform1f("wireframe.subdivision",h)}}var m=c.getNum();nt||(m=f.geometryInfo.numWithoutSkirtIndices),k.drawElements(i,m,c.getType(),0),u.renderOrder=gt,gt++,Et+=m/3,j(u)}}};var St=function(e,t){var r=t.overlayTexId,i=J[r];i||(i=V.aquire(r),R(i),J[r]=i),e.uniform2fv("overlayTexOffset",t.overlayTexOffset),e.uniform2fv("overlayTexScale",t.overlayTexScale),e.uniform1f("overlayOpacity",t.overlayOpacity),k.activeTexture(k.TEXTURE0+D+1),k.bindTexture(k.TEXTURE_2D,i)},Lt=function(e,t){k.activeTexture(k.TEXTURE0+D+1),k.bindTexture(k.TEXTURE_2D,t)},Ot=b.create(),wt=b.create(),Mt=b.create();this.intersect=function(e,t,i,n){if(Z&&("select"!==e.mode||!this.isTransparent())){b.subtract(i,t,Ot);var a=e.getMinResult(),s=e.getMaxResult();for(tt.reset(Z);!tt.done;){var o=tt.next();if(null!==o.renderData&&o.visible){var l=o.renderData.geometryInfo.geometry,d=o.renderData.localOrigin;b.subtract(t,d,wt),b.subtract(i,d,Mt),f.intersectTriangleGeometry(l,0,void 0,n,t,i,wt,Mt,void 0,e.tolerance,function(e,t){if(e>=0){var i;(void 0===a.dist||e<a.dist)&&(i=r.lij2str(o.lij[0],o.lij[1],o.lij[2]),a.set(void 0,i,e,t,void 0),a.setIntersector("terrain")),(void 0===s.dist||e>s.dist)&&(i=r.lij2str(o.lij[0],o.lij[1],o.lij[2]),s.set(void 0,i,e,t,void 0),s.setIntersector("terrain"))}})}}}},this._setTileGeometry=function(e,t){var r=e.renderData,i=t.geometry.getData(),a=i.getVertexAttr().terrain.data;r.vbo=new o(a,U,k);var s=i.getFaces()[0].indices.terrain;r.ibo=new l(s,k),r.geometryInfo.geometry&&n.releaseGeometry(r.geometryInfo.geometry),r.geometryInfo=t,this.needsRender=!0},this._releaseTileGeometry=function(e){var t=e.renderData;t.vbo.dispose(),t.ibo.dispose(),t.vbo=null,t.ibo=null,t.geometryInfo.geometry&&n.releaseGeometry(t.geometryInfo.geometry),t.geometryInfo.geometry=null,this.needsRender=!0}};return X.TileRenderData=N,X});