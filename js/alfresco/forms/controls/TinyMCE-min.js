define(["alfresco/forms/controls/BaseFormControl","dojo/_base/declare","alfresco/editors/TinyMCE","dojo/_base/lang","dojo/aspect"],function(i,f,c,b,a){return f([i],{getWidgetConfig:function j(){return{id:this.generateUuid(),name:this.name,initialContent:this.value,initiallyDisabled:(this.disablementConfig&&this.disablementConfig.initialValue===true),immediateInit:false,contentChangeScope:this,contentChangeHandler:this.onEditorValueChange}},createFormControl:function e(l){var m=new c(l);return m},placeWidget:function k(){this.inherited(arguments);this.wrappedWidget.init()},setupChangeEvents:function h(){},onEditorValueChange:function d(l){var m=this.wrappedWidget.getValue();this.onValueChangeEvent(this.name,this.lastValue,m);this.lastValue=m},alfDisabled:function g(l){this.inherited(arguments);if(this.wrappedWidget!=null){this.wrappedWidget.setDisabled(this._disabled)}}})});