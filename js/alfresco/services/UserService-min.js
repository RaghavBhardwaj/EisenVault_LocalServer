define(["dojo/_base/declare","alfresco/core/Core","alfresco/core/CoreXhr","alfresco/core/NotificationUtils","dojo/request/xhr","dojo/json","dojo/_base/lang","service/constants/Default"],function(e,b,h,c,k,j,a,d){return e([b,h,c],{i18nRequirements:[{i18nFile:"./i18n/UserService.properties"}],constructor:function l(m){a.mixin(this,m);this.alfSubscribe("ALF_UPDATE_USER_STATUS",a.hitch(this,"updateUserStatus"))},updateUserStatus:function f(n){var o=this,m=d.URL_SERVICECONTEXT+"components/profile/userstatus";this.serviceXhr({url:m,data:n,method:"POST",successCallback:this.userStatusUpdateSuccess,failureCallback:this.userStatusUpdateFailure,callbackScope:this})},userStatusUpdateSuccess:function g(n,m){this.alfLog("log","User Status Update Success",n);if(typeof n=="string"){var n=j.parse(this.cleanupJSONResponse(n))}this.displayMessage(this.message("message.status.success"));this.alfPublish("ALF_USER_STATUS_UPDATED",{userStatus:m.data.status,userStatusTime:n.userStatusTime.iso8601})},userStatusUpdateFailure:function i(n,m){this.alfLog("log","User Status Update Failure",n);if(typeof n=="string"){var n=j.parse(this.cleanupJSONResponse(n))}this.displayMessage(this.message("message.status.failure"));this.alfPublish("ALF_USER_STATUS_UPDATE_FAILURE",n)}})});