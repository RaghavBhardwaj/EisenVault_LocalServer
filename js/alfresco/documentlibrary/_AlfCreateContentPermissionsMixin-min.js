define(["dojo/_base/declare","alfresco/core/Core","dojo/on","dojo/_base/lang","dijit/popup"],function(e,f,c,g,b){return e([f],{permission:"CreateChildren",onUserAcess:function a(i){if(i&&i.userAccess&&typeof this.permission=="string"){this.set("disabled",!this.hasPermission(this.permission,i.userAccess))}},hasPermission:function h(k,t){var r=true,v,s,l,u,o,q;v=k.split(",");for(var n=0;n<v.length;n++){if(v[n].indexOf("|")!==-1){o=false;s=v[n].split("|");for(var m=0,p=s.length;m<p;m++){l=s[m].split(":");u=l[0];q=l.length==2?l[1]=="true":true;if((t[u]&&q)||(!t[u]&&!q)){o=true;break}}if(!o){r=false;break}}else{l=v[n].split(":");u=l[0];q=l.length==2?l[1]=="true":true;if((t[u]&&!q)||(!t[u]&&q)){r=false;break}}}return r},onFilterChange:function d(j){var i=g.getObject("path",false,j);this.set("disabled",(i==null))}})});