define(["dojo/_base/declare","alfresco/preview/AlfDocumentPreviewPlugin","dojo/_base/lang"],function(c,b,e){return c([b],{constructor:function d(f){e.mixin(f);this.attributes={src:null,srcMaxSize:"2000000"}},display:function a(){var i=this.attributes.srcMaxSize;if(!this.attributes.src&&i.match(/^\d+$/)&&this.previewManager.size>parseInt(i)){var h="";h+=this.previewManager.msg("Image.tooLargeFile",this.previewManager.name,Alfresco.util.formatFileSize(this.previewManager.size));h+="<br/>";h+='<a class="theme-color-1" href="'+this.previewManager.getContentUrl(true)+'">';h+=this.previewManager.msg("Image.downloadLargeFile");h+="</a>";h+="<br/>";h+='<a style="cursor: pointer;" class="theme-color-1" onclick="javascript: this.parentNode.parentNode.innerHTML = \'<img src='+this.previewManager.getContentUrl(false)+">';\">";h+=this.previewManager.msg("Image.viewLargeFile");h+="</a>";return'<div class="message">'+h+"</div>"}else{var g=this.attributes.src?this.previewManager.getThumbnailUrl(this.attributes.src):this.previewManager.getContentUrl();var f=new Image;f.onload=function(){if("naturalHeight" in this){if(this.naturalHeight+this.naturalWidth===0){this.onerror();return}}else{if(this.width+this.height==0){this.onerror();return}}this.previewManager.previewerNode.innerHTML="";this.previewManager.previewerNode.appendChild(f)};f.onerror=function(){this.previewManager.previewerNode.innerHTML='<div class="message">'+this.previewManager.msg("label.noPreview",this.previewManager.getContentUrl(true))+"</div>"};f.previewManager=this.previewManager;f.src=g;return null}}})});