(function(){var a="sproutcore/standard_theme";if(!SC.BUNDLE_INFO){throw"SC.BUNDLE_INFO is not defined!"
}if(SC.BUNDLE_INFO[a]){return}SC.BUNDLE_INFO[a]={requires:["sproutcore/empty_theme"],styles:["/static/sproutcore/standard_theme/es/67df6ea4fa8d21acd570d65a05bda4d3c39ea927/stylesheet-packed.css","/static/sproutcore/standard_theme/es/67df6ea4fa8d21acd570d65a05bda4d3c39ea927/stylesheet.css"],scripts:["/static/sproutcore/standard_theme/es/67df6ea4fa8d21acd570d65a05bda4d3c39ea927/javascript-packed.js"]}
})();Demos=SC.Application.create({NAMESPACE:"Demos",VERSION:"0.1.0",store:SC.Store.create().from(SC.Record.fixtures)});
Demos.mainPage=SC.Page.design({mainPane:SC.MainPane.design({childViews:"tabView".w(),tabView:SC.TabView.design({layout:{top:30,bottom:5,left:5,right:5},items:[{title:"Welcome",value:"demos"},{title:"MW Applet",value:"mwAppletView"},{title:"Generic Applet",value:"pedigreeAppletView"},{title:"Sensor Applet",value:"sensorAppletView"},{title:"Inner pages",value:"innerTabView"},{title:"OR Question",value:"openResponseQuestionView"},{title:"MC Question",value:"multipleChoiceQuestionView"},{title:"Question Stack",value:"questionStackView"},{title:"Chat",value:"chatView"}],itemTitleKey:"title",itemValueKey:"value",nowShowing:"demos",userDefaultKey:"mainPaneTab"})}),sensorAppletView:SC.View.design({childViews:"sensorApplet resultsList startButton stopButton resetButton".w(),resultsController:SC.ArrayController.create(),sensorApplet:CC.SensorAppletView.design({resultsBinding:"*parentView.resultsController",listenerPath:"Demos.mainPage.sensorAppletView.sensorApplet",layout:{centerX:-250,centerY:-235,width:160,height:40},dataReceived:function(c,b,e){SC.RunLoop.begin();
var f=this.get("results");var d=f.get("content");if(d===null){d=e}else{for(var a=0;
a<b;a++){d.pushObject(e[a])}}f.set("content",d);SC.RunLoop.end()},dataStreamEvent:function(b,a,c){}}),resultsList:SC.ScrollView.design({hasHorizontalScroller:NO,layout:{centerX:0,centerY:0,height:350,width:300},backgroundColor:"white",contentView:SC.ListView.design({contentBinding:"Demos.mainPage.sensorAppletView.resultsController.arrangedObjects",selectionBinding:"Demos.mainPage.sensorAppletView.resultsController.selection",rowHeight:30,canEditContent:NO,hasContentIcon:NO,isSelectable:YES})}),startButton:SC.ButtonView.design({layout:{centerY:-235,centerX:-85,height:50,width:80},title:"Start",appletBinding:"*parentView.sensorApplet",action:function(){this.get("applet").run(this.appletAction)
},appletAction:function(a){a.startCollecting()}}),stopButton:SC.ButtonView.design({layout:{centerY:-235,centerX:0,height:50,width:80},title:"Stop",appletBinding:"*parentView.sensorApplet",action:function(){this.get("applet").run(this.appletAction)
},appletAction:function(a){a.stopCollecting()}}),resetButton:SC.ButtonView.design({layout:{centerY:-235,centerX:85,height:50,width:80},title:"Reset",appletBinding:"*parentView.resultsList",resultsBinding:"Demos.mainPage.sensorAppletView.resultsController",action:function(){var a=this.get("results");
a.set("content",[])}})}),mwAppletView:SC.View.design({childViews:"mwApplet startButton stopButton resetButton".w(),mwApplet:CC.MwAppletView.design({cmlUrl:"http://mw2.concord.org/public/student/classic/machine/bike.cml",layout:{centerX:0,centerY:0,width:500,height:400}}),startButton:SC.ButtonView.design({layout:{centerY:-235,centerX:-85,height:50,width:80},title:"Start",appletBinding:"*parentView.mwApplet",action:function(){this.get("applet").run(this.appletAction)
},appletAction:function(a){a.runMwScript("mw2d:1:run")}}),stopButton:SC.ButtonView.design({layout:{centerY:-235,centerX:0,height:50,width:80},title:"Stop",appletBinding:"*parentView.mwApplet",action:function(){this.get("applet").run(this.appletAction)
},appletAction:function(a){a.runMwScript("mw2d:1:stop")}}),resetButton:SC.ButtonView.design({layout:{centerY:-235,centerX:85,height:50,width:80},title:"Reset",appletBinding:"*parentView.mwApplet",action:function(){this.get("applet").run(this.appletAction)
},appletAction:function(a){a.runMwScript("mw2d:1:reset")}})}),pedigreeAppletView:CC.AppletView.design({jarUrls:"http://geniverse.dev.concord.org/Geniverse-Experiments/Comet-streamhub/lib/biologica-applets-0.1.0-SNAPSHOT.jar, http://geniverse.dev.concord.org/Geniverse-Experiments/Comet-streamhub/lib/biologica-0.1.0-SNAPSHOT.jar, http://geniverse.dev.concord.org/Geniverse-Experiments/Comet-streamhub/lib/framework-0.1.0-SNAPSHOT.jar, http://geniverse.dev.concord.org/Geniverse-Experiments/Comet-streamhub/lib/frameworkview-0.1.0-SNAPSHOT2.jar",code:"org/concord/biologica/applet/PedigreeApplet.class"}),innerTabView:SC.TabView.design({layout:{centerX:0,centerY:0,width:500,height:400},items:[{title:"Page 1",value:"page1"},{title:"Page 2",value:"page2"}],itemTitleKey:"title",itemValueKey:"value",nowShowing:"page1"}),demos:SC.LabelView.design({escapeHTML:NO,value:"<h1>Welcome</h1><p>CC SproutCore component demos</p>",layout:{centerX:0,centerY:0,width:500,height:400}}),page1:SC.LabelView.design({escapeHTML:NO,value:"<h1>Page 1</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>"}),page2:SC.LabelView.design({escapeHTML:NO,value:"<h1>Page 2</h1><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>"}),openResponseQuestionView:CC.QuestionView.design({layout:{top:15,left:0,right:0,bottom:0},classNames:"question1View",prompt:"What do you think of this fine question?"}),multipleChoiceQuestionView:CC.MultipleChoiceQuestionView.design({layout:{top:15,left:0,right:0,bottom:0},classNames:"question2View",prompt:"What do you think of this different fine question?<br/>This <span style='font-weight: bold;'>question</span> has <span style='font-style: oblique;'>styling</span>.",choices:"one two three four".w()}),questionStackView:SC.StackedView.design({layout:{top:15,bottom:0,left:0,right:0},childViews:"question1 question2 question3".w(),question1:CC.QuestionView.design({useStaticLayout:YES,classNames:"question1",prompt:"First Question: What is your name?"}),question2:CC.QuestionView.design({useStaticLayout:YES,classNames:"question2",prompt:"Second Question: What is your quest?"}),question3:CC.MultipleChoiceQuestionView.design({useStaticLayout:YES,classNames:"question3",prompt:"Third Question: What is your favorite color?",choices:["Blue","Blue. No yell-- Auuuuuuuuuugh!"]})}),chatView:SC.StackedView.design({layout:{top:15,bottom:0,left:0,right:0},childViews:"loginView chatComposeView chatListView userListView".w(),loginView:CcChat.LoginView.design({layout:{top:15,left:20}}),chatComposeView:CcChat.ChatComposeView.design({layout:{top:80,left:20,width:400,bottom:0}}),chatListView:SC.ScrollView.extend({hasHorizontalScroller:NO,layout:{left:20,top:210,height:250,width:400},backgroundColor:"white",contentView:SC.ListView.design({contentBinding:"CcChat.chatListController.arrangedObjects",selectionBinding:"CcChat.chatListController.selection",rowHeight:30,canEditContent:NO,hasContentIcon:YES,contentValueKey:"message",isSelectable:YES,showAlternatingRows:YES,exampleView:CcChat.ChatMessageView})}),userListView:CcChat.UserListView.design({layout:{top:480,left:20,width:400}})})});
Demos.main=function main(){Demos.getPath("mainPage.mainPane").append();CcChat.store.commitRecordsAutomatically=YES;
var a=SC.Query.local(CcChat.ChatMessage,{orderBy:"time"});var b=CcChat.store.find(a);
CcChat.chatListController.set("content",b)};function main(){Demos.main()};