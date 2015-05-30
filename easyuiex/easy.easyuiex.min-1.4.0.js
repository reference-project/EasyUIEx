/**
 * EasyUIEx 1.4.0
 * 
 * http://easyproject.cn
 * 
 * Copyright 2014 ray [ inthinkcolor@gmail.com ]
 * 
 * Dependencies: jQuery EasyUI
 * 
 */
!function(){function clearOldDatagrid(a){var b=$(a).attr("id");dgLastEditIndex[b]=void 0,dgLastEditType[b]=void 0,dgHeaderMenu[b]=void 0}var contextMenuTab,createColumnMenu,endEditing,_uiEx=window.uiEx,uiEx={showRowEditMsg:!1,showRowAddMsg:!1,showRowDeleteMsg:!0,msgDefaults:{timeout:4e3,showType:"slide"},dataGridDefaults:{rownumbers:!0,fitColumns:!0,singleSelect:!0,pagination:!0,method:"post",striped:!0},detailDataGridDefaults:{rownumbers:!0,fitColumns:!0,singleSelect:!0,pagination:!0,method:"post",striped:!0,detailFormatter:function(){return'<div class="ddv"></div>'}},expReg:/\{([\s\S]+?)\}/g,msg:{}},dgLastEditIndex={},dgLastEditType={},dgHeaderMenu={},treeChkData={};uiEx.alert=function(a,b){$.messager.alert(this.alertTitle,a,b)},uiEx.confirm=function(a,b){$.messager.confirm(this.confirmTitle,a,b)},uiEx.prompt=function(a,b){$.messager.prompt(this.promptTitle,a,b)},uiEx.msg=function(a,b,c){var d,e;b&&(b=b.toLowerCase(),"topleft"==b?d={right:"",left:0,top:document.body.scrollTop+document.documentElement.scrollTop,bottom:""}:"topcenter"==b?d={right:"",top:document.body.scrollTop+document.documentElement.scrollTop,bottom:""}:"topright"==b?d={left:"",right:0,top:document.body.scrollTop+document.documentElement.scrollTop,bottom:""}:"centerleft"==b?d={left:0,right:"",bottom:""}:"center"==b?d={right:"",bottom:""}:"centerright"==b?d={left:"",right:0,bottom:""}:"bottomleft"==b?d={left:0,right:"",top:"",bottom:-document.body.scrollTop-document.documentElement.scrollTop}:"bottomcenter"==b&&(d={right:"",top:"",bottom:-document.body.scrollTop-document.documentElement.scrollTop})),e={},c||(c={}),c.style=d,c.msg=a,c.title=this.msgTitle,$.extend(e,uiEx.msgDefaults,c),$.messager.show(e)},uiEx.openDialog=function(a,b){return b||(b=$(a).panel("options").title),$(a).dialog({closed:!1,title:b})},uiEx.closeDialog=function(a){return $(a).dialog({closed:!0})},uiEx.clearForm=function(a){return this.disableValidate(a).form("clear")},uiEx.enableValidate=function(a){return $(a).form("enableValidation")},uiEx.disableValidate=function(a){return $(a).form("disableValidation")},uiEx.validate=function(a){return this.enableValidate(a).form("validate")},uiEx.serializeJSON=function(a){var b={},c=$(a).serializeArray();return $.each(c,function(){void 0!==b[this.name]?(b[this.name].push||(b[this.name]=[b[this.name]]),b[this.name].push(this.value||"")):b[this.name]=this.value||""}),b},uiEx.submitForm=function(a,b,c){var d=[];b&&$.each(b,function(b,c){var e=$('<input type="text" name="'+b+'" value="'+c+'"/>');$(a).append(e),d.push(e)}),0==c?$(a)[0].submit():this.validate(a)&&$(a)[0].submit(),$.each(d,function(a,b){$(b).remove()})},uiEx.submitAjax=function(a,b,c,d){$(a).form("submit",{onSubmit:function(b){return c&&$.extend(b,c),0==d?!0:uiEx.validate(a)},success:b})},uiEx.submitURLAjax=function(a,b,c,d,e){$(a).form("submit",{url:b,onSubmit:function(){return d&&$.extend(param,d),0==e?!0:uiEx.validate(a)},success:c})},uiEx.openTab=function(a,b,c,d){var e=$(a);e.tabs("exists",b)?e.tabs("select",b):e.tabs("add",{title:b,closable:!0,href:c,iconCls:d})},uiEx.reloadSelTab=function(a){$(a).tabs("getSelected").panel("refresh")},uiEx.openMenuByText=function(a,b,c){var f,d=$(a),e=function(a){var c=d.tree("getNode",$(".tree-node:contains('"+a+"')")[0]);c&&(uiEx.openTab(b,c.text,c.url,c.iconCls),d.tree("select",c.target))};if($.isArray(c))for(f=0;f<c.length;f++)e(c[f]);else e(c)},uiEx.openMenuById=function(a,b,c){var f,d=$(a),e=function(a){var c=d.tree("find",a);c&&(uiEx.openTab(b,c.text,c.url,c.iconCls),d.tree("select",c.target))};if($.isArray(c))for(f=0;f<c.length;f++)e(c[f]);else e(c)},uiEx.addTabsMenu=function(a){$(a).tabs({onContextMenu:function(a,b,c){a.preventDefault();var d=$("#tabsMenu");contextMenuTab=$(this).tabs("getTab",c),contextMenuTab.panel("options").closable?d.menu("enableItem",d.find("[name=close]")):d.menu("disableItem",d.find("[name=close]")),d.menu("show",{left:a.pageX,top:a.pageY}).data("tabTitle",b)}}),$("#tabsMenu").menu({onClick:function(b){var f,g,h,c=contextMenuTab,d=$(a),e=d.tabs("getTabIndex",c);if(c)for(f=[],"close"==b.name?f.push(c):"all"==b.name?$.each(d.tabs("tabs"),function(a,b){f.push(b)}):"other"==b.name?$.each(d.tabs("tabs"),function(a,b){b!=c&&f.push(b)}):"closeRight"==b.name?$.each(d.tabs("tabs"),function(a,b){var c=d.tabs("getTabIndex",b);console.info(c),console.info(e),c>e&&f.push(b)}):"closeLeft"==b.name?$.each(d.tabs("tabs"),function(a,b){var c=d.tabs("getTabIndex",b);e>c&&f.push(b)}):"refresh"==b.name&&c.panel("refresh"),g=0;g<f.length;g++)h=f[g].panel("options"),h.closable&&d.tabs("close",h.title)}})},createColumnMenu=function(a){var c,d,e,f,b=$("<div/>").appendTo("body");for(b.menu({onClick:function(c){"icon-ok"==c.iconCls?($(a).datagrid("hideColumn",c.name),b.menu("setIcon",{target:c.target,iconCls:"icon-empty"})):($(a).datagrid("showColumn",c.name),b.menu("setIcon",{target:c.target,iconCls:"icon-ok"}))}}),c=$(a).datagrid("getColumnFields"),d=0;d<c.length;d++)e=c[d],f=$(a).datagrid("getColumnOption",e),b.menu("appendItem",{text:f.title,name:e,iconCls:"icon-ok"});return b},uiEx.initDatagrid=function(a,b){clearOldDatagrid(a);var c={};$.extend(c,uiEx.dataGridDefaults,b),$(a).datagrid(c)},uiEx.initEdatagrid=function(a,b){clearOldDatagrid(a);var c={};$.extend(c,uiEx.dataGridDefaults,b),$(a).edatagrid(c)},uiEx.initDetailDatagrid=function(a,b,c){var d,e;clearOldDatagrid(a),d=$(a),e={view:detailview,onExpandRow:function(a,c){var e=$(this).datagrid("getRowDetail",a).find("div.ddv");e.panel({border:!1,cache:!0,href:b+"?index="+a,onLoad:function(){d.datagrid("fixDetailRowHeight",a),d.datagrid("selectRow",a),d.datagrid("getRowDetail",a).find("form").form("load",c)}}),$("#userDataGrid5").datagrid("fixDetailRowHeight",a)}},$.extend(e,uiEx.detailDataGridDefaults,c),d.datagrid(e)},uiEx.detailRowAdd=function(a){var c,b=$(a);b.datagrid("appendRow",{isNewRecord:!0}),c=b.datagrid("getRows").length-1,b.datagrid("expandRow",c),b.datagrid("selectRow",c)},uiEx.detailRowSave=function(datagridSelector,index,showMsg){var successMsg,failureMsg,dg=$(datagridSelector),row=dg.datagrid("getRows")[index],saveUrl=dg.datagrid("options").saveUrl,updateUrl=dg.datagrid("options").updateUrl,url=row.isNewRecord?saveUrl:updateUrl;url=url.replace(uiEx.expReg,function(a,b){return row[b]}),successMsg=uiEx.rowEditSuccessMsg,failureMsg=uiEx.rowEditFailureMsg,row.isNewRecord?(void 0==showMsg&&(showMsg=uiEx.showRowAddMsg),successMsg=uiEx.rowAddSuccessMsg,failureMsg=uiEx.rowAddFailureMsg):void 0==showMsg&&(showMsg=uiEx.showRowEditMsg),dg.datagrid("getRowDetail",index).find("form").form("submit",{url:url,onSubmit:function(){return $(this).form("validate")},success:function(data){data=eval("("+data+")"),data.isNewRecord=!1,dg.datagrid("collapseRow",index),dg.datagrid("updateRow",{index:index,row:dg.datagrid("getRowDetail",index).find("form").serializeJSON()}),showMsg&&uiEx.msg(successMsg)}})},uiEx.detailRowCancel=function(a,b){var c=$(a),d=c.datagrid("getRows")[b];d.isNewRecord?c.datagrid("deleteRow",b):c.datagrid("collapseRow",b)},endEditing=function(a,b){var f,g,h,i,j,c=$(a),d=c.attr("id"),e=dgLastEditIndex[d];return void 0==e?!0:(f=dgLastEditType[d],c.datagrid("validateRow",e)?(c.datagrid("endEdit",e),g=c.datagrid("options").updateUrl,h=uiEx.rowEditSuccessMsg,i=uiEx.rowEditFailureMsg,j=c.datagrid("options").method,"add"==f?(void 0==b&&(b=uiEx.showRowAddMsg),g=c.datagrid("options").saveUrl,h=uiEx.rowAddSuccessMsg,i=uiEx.rowAddFailureMsg):"edit"==f&&void 0==b&&(b=uiEx.showRowEditMsg),$.ajax({url:g,type:j,data:c.datagrid("getRows")[e],error:function(){b&&uiEx.msg(i)},success:function(){b&&uiEx.msg(h)}}),dgLastEditIndex[d]=void 0,!0):!1)},uiEx.rowAdd=function(a,b){var c,d,e;void 0==b&&(b={}),c=$(a),d=c.attr("id"),endEditing(a)&&(c.datagrid("appendRow",b),e=c.datagrid("getRows").length-1,c.datagrid("selectRow",e).datagrid("beginEdit",e),dgLastEditIndex[d]=e,dgLastEditType[d]="add")},uiEx.rowEdit=function(a){var b=$(a),c=b.attr("id");b.datagrid({onClickRow:function(a){var e=dgLastEditIndex[c];e!=a&&(endEditing(c)?(b.datagrid("selectRow",a).datagrid("beginEdit",a),dgLastEditIndex[c]=a,dgLastEditType[c]="edit"):b.datagrid("selectRow",a))}})},uiEx.onRowEdit=function(a){var c=$(this),d=c.attr("id"),e=dgLastEditIndex[d];e!=a&&(endEditing(c)?(c.datagrid("selectRow",a).datagrid("beginEdit",a),dgLastEditIndex[d]=a,dgLastEditType[d]="edit"):c.datagrid("selectRow",a))},uiEx.rowDelete=function(a,b,c){var d=$(a),e=d.attr("id"),f=[],g=d.datagrid("getSelections");0!=g.length&&($.each(g,function(a,b){f.push(d.datagrid("getRowIndex",b))}),f.sort(function(a,b){return b-a}),void 0==c&&(c=uiEx.showRowDeleteMsg),uiEx.confirm(uiEx.deleteConfirmMsg,function(a){a&&($.each(f,function(a,b){var g,h,f=b;d.datagrid("endEdit",f),g=d.datagrid("options").destroyUrl,h=d.datagrid("options").method,$.ajax({url:g,type:h,data:d.datagrid("getRows")[f],error:function(){c&&uiEx.msg(uiEx.rowDeleteFailureMsg)},success:function(){c&&uiEx.msg(uiEx.rowDeleteSuccessMsg)}}),d.datagrid("cancelEdit",f).datagrid("deleteRow",f),dgLastEditIndex[e]=void 0}),b&&d.datagrid("reload"))}))},$.extend($.fn.datagrid.methods,{editCell:function(a,b){return a.each(function(){var c,d,a=$(this).datagrid("getColumnFields",!0).concat($(this).datagrid("getColumnFields"));for(c=0;c<a.length;c++)d=$(this).datagrid("getColumnOption",a[c]),d.editor1=d.editor,a[c]!=b.field&&(d.editor=null);for($(this).datagrid("beginEdit",b.index),c=0;c<a.length;c++)d=$(this).datagrid("getColumnOption",a[c]),d.editor=d.editor1})}}),uiEx.onCellEdit=function(a,b){var d=$(this),e=d.attr("id");endEditing(d)&&(d.datagrid("selectRow",a).datagrid("editCell",{index:a,field:b}),dgLastEditIndex[e]=a,dgLastEditType[e]="edit")},uiEx.onHeaderMenu=function(a){var c,d,e;a.preventDefault(),c=this,d=$(this).attr("id"),e=dgHeaderMenu[d],void 0==e&&(e=createColumnMenu(c),dgHeaderMenu[d]=e),e.menu("show",{left:a.pageX,top:a.pageY})},uiEx.headerMenu=function(a){$(a).datagrid({onHeaderContextMenu:function(a){var c,d;a.preventDefault(),c=$(this).attr("id"),d=dgHeaderMenu[c],void 0==d&&(d=createColumnMenu(this),dgHeaderMenu[c]=d),d.menu("show",{left:a.pageX,top:a.pageY})}})},uiEx.initTreeChk=function(a,b,c){var d,e,f,g,h,i;b||(b={}),d=$(a),e=d.attr("id"),f=function(b,d){treeChkData[e]=d,uiEx.treeChkSetValues(a,c)},g=function(a){a.checked?d.tree("uncheck",a.target):d.tree("check",a.target)},b["onLoadSuccess"]&&(h=b["onLoadSuccess"],f=function(b,d){h(b,d),treeChkData[e]=d,uiEx.treeChkSetValues(a,c)}),b["onClick"]&&(i=b["onClick"],g=function(a,b){i(a,b),d.tree("check",a.target)}),b["onLoadSuccess"]=f,b["onClick"]=g,d.tree(b)},uiEx.treeChkRest=function(a){var b=$(a),c=b.attr("id");b.tree("loadData",treeChkData[c])},uiEx.treeChkSetValues=function(a,b){var c=$(a);$.each(b,function(a,b){var d=c.tree("find",b);d&&c.tree("check",d.target)})},uiEx.getCheckedIds=function(a){var b=$(a).tree("getChecked",["checked","indeterminate"]),c=$.map(b,function(a){return a.id});return c},uiEx.initTree=function(a,b,c){var d={onClick:function(a){a.url&&uiEx.openTab(b,a.text,a.url,a.iconCls)},onSelect:uiEx.onSelectOpen};$.extend(d,c),$(a).tree(d)},uiEx.onSelectOpen=function(a){$(this).tree("toggle",a.target)},uiEx.noConflict=function(){return window.uiEx===uiEx&&(window.uiEx=_uiEx),uiEx},jQuery.fn.extend({addTabsMenu:function(){return this.each(function(){uiEx.addTabsMenu(this)})},clearForm:function(){var a;return this.each(function(){a=uiEx.clearForm(this)}),a},openDialog:function(a){var b;return this.each(function(){b=uiEx.openDialog(this,a)}),b},closeDialog:function(){var a;return this.each(function(){a=uiEx.closeDialog(this)}),a},enableValidate:function(){var a;return this.each(function(){a=uiEx.enableValidate(this)}),a},disableValidate:function(){var a;return this.each(function(){a=uiEx.disableValidate(this)}),a},headerMenu:function(){return this.each(function(){uiEx.headerMenu(this)})},openMenuById:function(a,b){return this.each(function(){uiEx.openMenuById(this,a,b)})},openMenuByText:function(a,b){return this.each(function(){uiEx.openMenuByText(this,a,b)})},openTab:function(a,b,c){return this.each(function(){uiEx.openTab(this,a,b,c)})},initDatagrid:function(a){return this.each(function(){uiEx.initDatagrid(this,a)})},initEdatagrid:function(a){return this.each(function(){uiEx.initEdatagrid(this,a)})},initDetailDatagrid:function(a,b){return this.each(function(){uiEx.initDetailDatagrid(this,a,b)})},reloadSelTab:function(){return this.each(function(){uiEx.reloadSelTab(this)})},rowAdd:function(a){return this.each(function(){uiEx.rowAdd(this,a)})},rowDelete:function(a,b){return this.each(function(){uiEx.rowDelete(this,a,b)})},rowEdit:function(){return this.each(function(){uiEx.rowEdit(this)})},detailRowAdd:function(){return this.each(function(){uiEx.detailRowAdd(this)})},detailRowCancel:function(a){return this.each(function(){uiEx.detailRowCancel(this,a)})},detailRowSave:function(a){return this.each(function(){uiEx.detailRowSave(this,a)})},serializeJSON:function(){var a={};return this.each(function(){a=uiEx.serializeJSON(this)}),a},submitForm:function(a,b){return this.each(function(){uiEx.submitForm(this,a,b)})},submitAjax:function(a,b,c){return this.each(function(){uiEx.submitAjax(this,a,b,c)})},submitURLAjax:function(a,b,c,d){return this.each(function(){uiEx.submitURLAjax(this,a,b,c,d)})},initTreeChk:function(a,b){return this.each(function(){uiEx.initTreeChk(this,a,b)})},initTree:function(a,b){return this.each(function(){uiEx.initTree(this,a,b)})},treeChkRest:function(){return this.each(function(){uiEx.treeChkRest(this)})},treeChkSetValues:function(a){return this.each(function(){uiEx.treeChkSetValues(this,a)})},getCheckedIds:function(){var a;return this.each(function(){a=uiEx.getCheckedIds(this)}),a},validate:function(){var a;return this.each(function(){a=uiEx.validate(this)}),a}}),window.uiEx=uiEx}(),$(function(){$.extend($.fn.validatebox.defaults.rules,{equals:{validator:function(a,b){return a==$(b[0]).val()},message:"{1}"}}),$.extend($.fn.validatebox.defaults.rules,{minLength:{validator:function(a,b){return a.length>=b[0]},message:"Length can not be less than {0}."}})});