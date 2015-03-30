define(["dojo/_base/declare","alfresco/renderers/Property","dijit/_OnDijitClickMixin","alfresco/core/CoreWidgetProcessing","alfresco/renderers/_PublishPayloadMixin","dojo/text!./templates/InlineEditProperty.html","dojo/_base/lang","dojo/_base/array","dojo/on","dojo/dom-class","dojo/html","dojo/dom-attr","dojo/_base/fx","dojo/keys","dojo/_base/event","service/constants/Default","alfresco/forms/Form","alfresco/forms/controls/DojoValidationTextBox","alfresco/forms/controls/HiddenValue"],function(d,n,z,a,D,f,e,g,A,p,x,I,s,v,K,t,w,j){return d([n,z,a,D],{i18nRequirements:[{i18nFile:"./i18n/InlineEditProperty.properties"}],cssRequirements:[{cssFile:"./css/InlineEditProperty.css"}],templateString:f,postParam:null,saveLabel:"inline-edit.save.label",cancelLabel:"inline-edit.cancel.label",editAltText:"inline-edit.edit.altText",editLabel:"inline-edit.edit.label",setDefaultPublicationData:function C(){this.publishTopic="ALF_CRUD_CREATE";this.publishPayloadType="PROCESS";this.publishPayloadModifiers=["processCurrentItemTokens"];this.publishPayloadItemMixin=false;this.publishPayload={url:"api/node/{jsNode.nodeRef.uri}/formprocessor",noRefresh:true}},postMixInProperties:function b(){this.inherited(arguments);if(this.publishTopic==null){this.setDefaultPublicationData()}if(this.propertyToRender!=null){if(this.postParam==null&&this.propertyToRender!=null){this.postParam=this.propertyToRender}}else{this.alfLog("warn","Property to render attribute has not been set",this)}if(this.editIconImageSrc==null||this.editIconImageSrc===""){this.editIconImageSrc=require.toUrl("alfresco/renderers")+"/css/images/edit-16.png"}this.saveLabel=this.message(this.saveLabel);this.cancelLabel=this.message(this.cancelLabel);this.editAltText=this.message(this.editAltText,{0:this.renderedValue})},suppressContainerKeyboardNavigation:function c(L){A.emit(this.domNode,"onSuppressKeyNavigation",{bubbles:true,cancelable:true,suppress:L})},formWidget:null,hiddenDataRules:null,getPrimaryFormWidget:function r(){return{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:this.postParam,validationConfig:this.validationConfig,requirementConfig:this.requirementConfig,additionalCssClasses:"hiddenlabel",label:this.message(this.editLabel)}}},processHiddenDataRules:function h(){var L=[];if(this.hiddenDataRules!=null){g.forEach(this.hiddenDataRules,e.hitch(this,this.processHiddenDataRule,L))}return L},processHiddenDataRule:function i(L,M){L.push({name:"alfresco/forms/controls/HiddenValue",config:{name:M.name,value:"",autoSetConfig:[{rulePassValue:M.rulePassValue,ruleFailValue:M.ruleFailValue,rules:[{targetId:"PRIMARY_FIELD",is:M.is,isNot:M.isNot}]}]}})},getFormWidget:function o(){if(this.formWidget===null){var N=this.generateUuid();this.alfSubscribe(N+"ALF_FORM_VALIDITY",e.hitch(this,this.onFormValidityChange),true);var M=this.getPrimaryFormWidget();var L=this.processHiddenDataRules();e.setObject("config.fieldId","PRIMARY_FIELD",M);this.formWidget=this.createWidget({name:"alfresco/forms/Form",config:{pubSubScope:N,showOkButton:false,showCancelButton:false,widgets:[M].concat(L)}},this.formWidgetNode)}return this.formWidget},onFormValidityChange:function F(L){this.alfLog("log","Form validity changed",L);if(L.valid===true){this.isSaveAllowed=true;p.remove(this.saveLinkNode,"disabled")}else{this.isSaveAllowed=false;p.add(this.saveLinkNode,"disabled")}},onEditClick:function B(L){this.suppressContainerKeyboardNavigation(true);var M=this.getFormWidget();var N={};e.setObject(this.postParam,this.originalRenderedValue,N);M.setValue(N);p.toggle(this.renderedValueNode,"hidden");p.toggle(this.editNode,"hidden");M.focus();if(L!==undefined){K.stop(L)}},onKeyPress:function k(L){if(L.ctrlKey===true&&L.charCode===101){K.stop(L);this.onEditClick()}},onValueEntryKeyPress:function J(L){if(L.charOrCode==v.ESCAPE){K.stop(L);this.onCancel()}else{if(L.charOrCode==v.ENTER){K.stop(L);this.onSave()}}},onSave:function G(L){if(this.isSaveAllowed===true){var M=this.generateUuid();var N=e.clone(this.getGeneratedPayload(false,null));N.alfResponseTopic=M;this._saveSuccessHandle=this.alfSubscribe(M+"_SUCCESS",e.hitch(this,this.onSaveSuccess),true);this._saveFailureHandle=this.alfSubscribe(M+"_FAILURE",e.hitch(this,this.onSaveFailure),true);this.updateSaveData(N);this.alfPublish(this.publishTopic,N,true)}},updateSaveData:function E(L){e.mixin(L,this.getFormWidget().getValue())},refreshCurrentItem:false,onSaveSuccess:function m(N){this.alfUnsubscribeSaveHandles([this._saveSuccessHandle,this._saveFailureHandle]);this.alfLog("log","Property '"+this.propertyToRender+"' successfully updated for node: ",this.currentItem);this.originalRenderedValue=this.getFormWidget().getValue()[this.postParam];this.renderedValue=this.mapValueToDisplayValue(this.originalRenderedValue);if(this.refreshCurrentItem===true){e.setObject(this.propertyToRender,this.originalRenderedValue,this.currentItem)}var L=(this.requestedValuePrefix)?this.requestedValuePrefix:this.renderedValuePrefix;var M=(this.requestedValueSuffix)?this.requestedValueSuffix:this.renderedValueSuffix;x.set(this.renderedValueNode,L+this.renderedValue+M);p.remove(this.renderedValueNode,"hidden faded");p.add(this.editNode,"hidden");this.renderedValueNode.focus()},onSaveFailure:function y(L){this.alfUnsubscribeSaveHandles([this._saveSuccessHandle,this._saveFailureHandle]);this.alfLog("warn","Property '"+this.propertyToRender+"' was not updated for node: ",this.currentItem);this.onCancel()},onCancel:function l(){this.suppressContainerKeyboardNavigation(false);p.remove(this.renderedValueNode,"hidden");p.add(this.editNode,"hidden");this.getFormWidget().setValue(this.renderedValue);this.renderedValueNode.focus()},suppressFocusRequest:function u(L){this.alfLog("log","Suppress click event");K.stop(L)},showEditIcon:function H(){s.fadeIn({node:this.editIconNode}).play()},hideEditIcon:function q(){s.fadeOut({node:this.editIconNode}).play()}})});