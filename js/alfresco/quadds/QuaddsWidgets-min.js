define(["alfresco/core/ProcessWidgets","alfresco/core/CoreWidgetProcessing","dojo/_base/declare","dojo/_base/array","dojo/_base/lang","alfresco/core/CoreXhr","service/constants/Default","dojo/dom-construct","dojo/json","dojo/query","dojo/NodeList-manipulate"],function(l,b,i,k,c,d,e,g,h,m){return i([l,b,d],{quadds:null,postCreate:function f(){if(this.quadds!=null){var o=this.generateUuid();this._quaddsItemsHandle=this.alfSubscribe(o+"_SUCCESS",c.hitch(this,"processQuaddsItems"),true);this.alfPublish("ALF_GET_QUADDS_ITEMS",{responseTopic:o,quadds:this.quadds})}else{this.alfLog("warn","A QuaddsWidgets instance was configured that did not specify a QuADDS name",this)}},updatePage:function n(p,o){for(var s in p.cssMap){m("head").append('<link rel="stylesheet" type="text/css" href="'+appContext+p.cssMap[s]+'" media="'+s+'">')}for(var r in p.i18nMap){if(typeof window[p.i18nGlobalObject].messages.scope[r]=="undefined"){window[p.i18nGlobalObject].messages.scope[r]=p.i18nMap[r]}else{c.mixin(window[p.i18nGlobalObject].messages.scope[r],p.i18nMap[r])}}var q=[];k.forEach(p.nonAmdDeps,function(u,t){q.push(e.URL_RESCONTEXT+u)});q.push(e.URL_RESCONTEXT+p.javaScript);require(q,function(){console.log("QuADDS requirements loaded")})},processQuaddsItems:function j(s){var p=[];k.forEach(s.items,c.hitch(this,"processQuaddsItem",p));var r={publishOnReady:[],services:[],widgets:p};r=h.stringify(r);var o=h.parse(r);var q={jsonContent:o,widgets:r};this.serviceXhr({url:e.URL_SERVICECONTEXT+"surf/dojo/xhr/dependencies",data:q,method:"POST",successCallback:this.updatePage,callbackScope:this});this.processWidgets(p,this.containerNode)},processQuaddsItem:function a(p,q,o){var r=c.getObject("data.widget",false,q);if(r!=null){p.push(r)}}})});