define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dojo/text!./templates/CurrentUserStatus.html","alfresco/core/Core","dojo/_base/lang","dojo/on","dojo/dom-class","alfresco/dialogs/AlfDialog","alfresco/buttons/AlfButton","dijit/form/Textarea","alfresco/core/TemporalUtils"],function(e,h,q,l,d,c,g,j,p,i,n,m){return e([h,q,d],{cssRequirements:[{cssFile:"./css/CurrentUserStatus.css"}],i18nRequirements:[{i18nFile:"./i18n/CurrentUserStatus.properties"}],templateString:l,unknownStatus:null,userStatus:"",userStatusTime:null,postCreate:function o(){this.alfSubscribe("ALF_USER_STATUS_UPDATED",c.hitch(this,"statusUpdated"));this.alfSubscribe("ALF_SET_USER_STATUS",c.hitch(this,"showStatusDialog"));if(this.userStatus==""){j.add(this.statusNode,"blank");this.userStatus=this.message("unknown.status.label")}else{j.remove(this.statusNode,"blank")}this.statusNode.innerHTML=this.userStatus.replace(/\n/g,"<br>").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");this.setStatusRelativeTime()},statusDialog:null,postNewUserStatusTopic:"ALF_POST_NEW_USER_STATUS",cancelUserStatusUpdateTopic:"ALF_CANCEL_USER_STATUS_UPDATE",showStatusDialog:function f(r){if(this.statusDialog==null){this.alfSubscribe(this.postNewUserStatusTopic,c.hitch(this,"postStatus"));this.statusDialog=new p({title:this.message("status.dialog.title"),widgetsContent:[{name:"dijit/form/Textarea",config:{id:this.id+"_STATUS_TEXTAREA",name:"status",value:this.unknownStatus?"":this.userStatus,style:"width:400px"}}],widgetsButtons:[{name:"alfresco/buttons/AlfButton",config:{label:this.message("post.button.label"),publishTopic:this.postNewUserStatusTopic,publishPayload:r}},{name:"alfresco/buttons/AlfButton",config:{label:this.message("cancel.button.label"),publishTopic:this.cancelUserStatusUpdateTopic,publishPayload:r}}]})}this.statusDialog.show()},setStatusRelativeTime:function a(){var r=(this.userStatusTime==""||this.userStatusTime==null)?this.message("status.never-updated"):m.getRelativeTime(this.userStatusTime);this.lastUpdateNode.innerHTML=this.message("status.updated",[r])},postStatus:function k(s){var r=s.dialogContent[0].getValue();this.alfLog("log","Status payload",s,r);this.alfPublish("ALF_UPDATE_USER_STATUS",{status:r})},statusUpdated:function b(r){this.alfLog("log","User status update",r);if(r.userStatus!=null){this.userStatus=r.userStatus;if(this.userStatus==""){j.add(this.statusNode,"blank");this.userStatus=this.message("unknown.status.label")}else{j.remove(this.statusNode,"blank")}this.statusNode.innerHTML=this.userStatus.replace(/\n/g,"<br>").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}else{}if(r.userStatusTime){this.userStatusTime=r.userStatusTime;this.setStatusRelativeTime()}}})});