(function(){var e=YAHOO.util.Dom,i=YAHOO.util.Event;var c=Alfresco.util.encodeHTML;Alfresco.dashlet.WebView=function a(j){Alfresco.dashlet.WebView.superclass.constructor.call(this,"Alfresco.dashlet.WebView",j);this.configDialog=null;YAHOO.Bubbling.on("showPanel",this.onShowPanel,this);YAHOO.Bubbling.on("hidePanel",this.onHidePanel,this);return this};YAHOO.extend(Alfresco.dashlet.WebView,Alfresco.component.Base,{options:{componentId:"",webviewURI:"",webviewTitle:"",isDefault:true},configDialog:null,onReady:function d(){this.widgets.iframeWrapper=e.get(this.id+"-iframeWrapper");this.widgets.iframe=e.get(this.id+"-iframe");this.widgets.iframeTitle=e.get(this.id+"-iframe-title");this._syncIFrameOptions()},_syncIFrameOptions:function(){e.removeClass(this.id,"webview-default");e.removeClass(this.id,"webview-notsecure");e.removeClass(this.id,"webview-iframe");if(this.options.isDefault){e.addClass(this.id,"webview-default")}else{if(!Alfresco.util.IFramePolicy.isUrlAllowed(this.options.webviewURI)){e.addClass(this.id,"webview-notsecure")}else{this.widgets.iframe.src=this.options.webviewURI;this.widgets.iframeTitle.href=this.options.webviewURI;if(this.options.webviewTitle!=""){this.widgets.iframeTitle.innerHTML=c(this.options.webviewTitle)}else{if(!this.options.isDefault){this.widgets.iframeTitle.innerHTML=c(this.options.webviewURI)}}e.addClass(this.id,"webview-iframe")}}},onConfigWebViewClick:function g(m){i.stopEvent(m);var k=Alfresco.constants.URL_SERVICECONTEXT+"modules/webview/config/"+encodeURIComponent(this.options.componentId);if(!this.configDialog){this.configDialog=new Alfresco.module.SimpleDialog(this.id+"-configDialog").setOptions({width:"50em",templateUrl:Alfresco.constants.URL_SERVICECONTEXT+"modules/webview/config",onSuccess:{fn:function l(n){if(YAHOO.env.ua.ie===6){window.location.reload(true)}else{var o=n.json;this.options.webviewURI=o.uri;this.options.webviewTitle=o.title;this.options.isDefault=false;this._syncIFrameOptions()}},scope:this},doSetupFormsValidation:{fn:function j(o){o.addValidation(this.configDialog.id+"-url",Alfresco.forms.validation.mandatory,null,"keyup");o.addValidation(this.configDialog.id+"-url",Alfresco.forms.validation.url,null,"keyup",this.msg("Alfresco.forms.validation.url.message"));o.addValidation(this.configDialog.id+"-url",function(u,q,t,s,p,r){return(u.value.length<512)},null,"keyup");o.addValidation(this.configDialog.id+"-url",function(p){return p.value.length==0||Alfresco.util.IFramePolicy.isUrlAllowed(p.value)},null,"keyup",this.msg("form.url.validation.failure"));var n=e.get(this.configDialog.id+"-webviewTitle");if(n){n.value=this.options.webviewTitle}n=e.get(this.configDialog.id+"-url");if(n){n.value=this.options.isDefault?"":this.options.webviewURI}},scope:this}})}this.configDialog.setOptions({actionUrl:k}).show()},onShowPanel:function b(k,j){if(this._browserDestroysPanel()){e.setStyle(this.widgets.iframeWrapper,"visibility","hidden")}},onHidePanel:function h(k,j){if(this._browserDestroysPanel()){e.setStyle(this.widgets.iframeWrapper,"visibility","visible")}},_browserDestroysPanel:function f(){return(navigator.userAgent.indexOf("Windows")!==-1||(navigator.userAgent.indexOf("Macintosh")!==-1&&YAHOO.env.ua.gecko>0&&YAHOO.env.ua.gecko<1.9))}})})();