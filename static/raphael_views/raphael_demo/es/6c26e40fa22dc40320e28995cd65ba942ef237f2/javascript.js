(function(){var a="sproutcore/ace";if(!SC.BUNDLE_INFO){throw"SC.BUNDLE_INFO is not defined!"
}if(SC.BUNDLE_INFO[a]){return}SC.BUNDLE_INFO[a]={requires:["sproutcore/empty_theme"],styles:["/static/sproutcore/ace/es/71fef724301b04e00df8643ac18a190f56ab68a0/stylesheet-packed.css","/static/sproutcore/ace/es/71fef724301b04e00df8643ac18a190f56ab68a0/stylesheet.css"],scripts:["/static/sproutcore/ace/es/71fef724301b04e00df8643ac18a190f56ab68a0/javascript-packed.js","/static/sproutcore/ace/es/71fef724301b04e00df8643ac18a190f56ab68a0/javascript.js"]}
})();RaphaelDemo=SC.Application.create({NAMESPACE:"RaphaelDemo",VERSION:"0.1.0",store:SC.Store.create().from(SC.Record.fixtures)});
RaphaelDemo.DataSeriesController=SC.ArrayController.extend({series:null,contentWhenConnected:null,isConnected:YES,disconnect:function(){this.set("isConnected",NO)
},reconnect:function(){this.set("isConnected",YES)},content:function(){if(this.get("isConnected")){return this.get("contentWhenConnected")
}else{return[]}}.property("contentWhenConnected","isConnected").cacheable(),addRandomPoint:function(){var b=Math.random()*320;
var c=Math.random()*200;var a=RaphaelDemo.store.createRecord(RaphaelDemo.DataPoint,{x:b,y:c,guid:RaphaelDemo.DataPoint.nextGuid++});
a.set("series",this.get("series"))},addManyPoints:function(c){var a=this;var b=function(){if(c>0){c--;
SC.RunLoop.begin();a.addRandomPoint();a.incrementProperty("nAdded");SC.RunLoop.end();
setTimeout(b,1)}else{a.timingStop();SC.RunLoop.begin();a.didAddManyPoints();SC.RunLoop.end()
}};this.set("nAdded",0);this.willAddManyPoints();SC.RunLoop.end();this.timingStart();
b()},startTime:null,endTime:null,nAdded:null,timingStart:function(){this.set("startTime",new Date())
},timingStop:function(){this.set("endTime",new Date())},totalTime:function(){return this.get("endTime")-this.get("startTime")
}.property("endTime").cacheable(),add100Points:function(){this.addManyPoints(100)
},add20Points:function(){this.addManyPoints(20)},willAddManyPoints:function(){},didAddManyPoints:function(){}});
sc_require("controllers/data_series");RaphaelDemo.fastPathController=RaphaelDemo.DataSeriesController.create({willAddManyPoints:function(a){RaphaelDemo.noFastPathController.disconnect()
},didAddManyPoints:function(){RaphaelDemo.noFastPathController.reconnect()}});sc_require("controllers/data_series");
RaphaelDemo.noFastPathController=RaphaelDemo.DataSeriesController.create({willAddManyPoints:function(a){RaphaelDemo.fastPathController.disconnect()
},didAddManyPoints:function(){RaphaelDemo.fastPathController.reconnect()}});RaphaelDemo.DataPoint=SC.Record.extend({x:SC.Record.attr(Number),y:SC.Record.attr(Number),series:SC.Record.toOne("RaphaelDemo.DataSeries",{inverse:"points"})});
sc_require("models/data_point");RaphaelDemo.DataPoint.FIXTURES=[];RaphaelDemo.DataPoint.nextGuid=1;
RaphaelDemo.DataSeries=SC.Record.extend({points:SC.Record.toMany("RaphaelDemo.DataPoint",{inverse:"series"})});
sc_require("models/data_series");RaphaelDemo.DataSeries.FIXTURES=[{guid:"fast-path",points:[]},{guid:"no-fast-path",points:[]}];
RaphaelDemo.DataPointView=RaphaelViews.RaphaelView.extend({displayProperties:"content.x content.y isEnabled isSelected fill stroke radius".w(),fill:"#cccccc",stroke:"#cccccc",noHoverRadius:3,hoverRadius:5,isHovered:NO,isSelected:NO,isEnabled:YES,selectedFill:"#0000aa",selectedStroke:"#0000aa",layerIsCacheable:YES,isPoolable:YES,radius:function(){return(this.get("isHovered")?this.get("hoverRadius"):this.get("noHoverRadius"))
}.property("isHovered","hoverRadius","noHoverRadius").cacheable(),mouseEntered:function(){this.set("isHovered",YES)
},mouseExited:function(){this.set("isHovered",NO)},renderCallback:function(f,b,e,a,d,c){return f.circle(b,e,a).attr({fill:d,stroke:c})
},render:function(b,f){var a=this.get("isSelected");var e=a?this.get("selectedFill"):this.get("fill");
var d=a?this.get("selectedStroke"):this.get("stroke");if(f){b.callback(this,this.renderCallback,this.getPath("content.x")||0,this.getPath("content.y")||0,this.get("radius"),e,d)
}else{var c=b.raphael();c.attr({cx:this.getPath("content.x")||0,cy:this.getPath("content.y")||0,radius:this.get("radius"),fill:e,stroke:d})
}}});RaphaelDemo.RectView=RaphaelViews.RaphaelView.extend({displayProperties:"x y width height fill stroke".w(),renderCallback:function(g,b,f,c,a,e,d){return g.rect(b,f,c,a).attr({fill:e,stroke:d})
},render:function(a,c){if(c){a.callback(this,this.renderCallback,this.get("x"),this.get("y"),this.get("width"),this.get("height"),this.get("fill"),this.get("stroke"));
this.renderChildViews(a,c)}else{var b=a.raphael();b.attr({x:this.get("x"),y:this.get("y"),width:this.get("width"),height:this.get("height"),fill:this.get("fill"),stroke:this.get("stroke")})
}}});RaphaelDemo.ScatterTestView=SC.View.extend({});RaphaelDemo.mainPage=SC.Page.design({mainPane:SC.MainPane.design({childViews:"fastPathView noFastPathView".w(),fastPathView:SC.View.design({layout:{centerX:0,centerY:-140,left:0,right:0,height:280},childViews:"labelView drawingView addPairButton timingView".w(),labelView:SC.LabelView.design({layout:{centerX:0,top:20,left:20,right:20,height:42},classNames:"view-label".w(),value:"Using fast RaphaelCollectionView (the new way):"}),drawingView:RaphaelViews.RaphaelCanvasView.design({layout:{centerX:-100,centerY:40,width:320,height:200},childViews:"rectView".w(),rectView:RaphaelDemo.RectView.design({x:0,y:0,width:320,height:200,fill:"#aa0000",stroke:"#aa0000",childViews:"fastPathScatterView ".w(),fastPathScatterView:RaphaelViews.RaphaelCollectionView.design({exampleView:RaphaelDemo.DataPointView,contentBinding:"RaphaelDemo.fastPathController",useFastPath:YES})})}),addPairButton:SC.ButtonView.design({layout:{centerX:175,centerY:15,width:150,height:28},title:"Add 20 Points",target:RaphaelDemo.fastPathController,action:"add20Points"}),timingView:SC.LabelView.design({layout:{centerX:250,centerY:65,width:300,height:28},totalTimeBinding:"RaphaelDemo.fastPathController.totalTime",classNames:"timing-label",value:function(){return Math.round(this.get("totalTime")/20)+" ms per point"
}.property("totalTime").cacheable()})}),noFastPathView:SC.View.design({layout:{centerX:0,centerY:140,left:0,right:0,height:280},childViews:"labelView drawingView addPairButton timingView".w(),labelView:SC.LabelView.design({layout:{centerX:0,top:20,left:20,right:20,height:42},classNames:"view-label".w(),value:"Complete redraw after every new point (the old way):"}),drawingView:RaphaelViews.RaphaelCanvasView.design({layout:{centerX:-100,centerY:40,width:320,height:200},childViews:"rectView".w(),rectView:RaphaelDemo.RectView.design({x:0,y:0,width:320,height:200,fill:"#aa0000",stroke:"#aa0000",childViews:"noFastPathScatterView ".w(),noFastPathScatterView:RaphaelViews.RaphaelCollectionView.design({exampleView:RaphaelDemo.DataPointView,contentBinding:"RaphaelDemo.noFastPathController",useFastPath:NO})})}),addPairButton:SC.ButtonView.design({layout:{centerX:175,centerY:15,width:150,height:28},title:"Add 20 Points",target:RaphaelDemo.noFastPathController,action:"add20Points"}),timingView:SC.LabelView.design({layout:{centerX:250,centerY:65,width:300,height:28},totalTimeBinding:"RaphaelDemo.noFastPathController.totalTime",classNames:"timing-label",value:function(){return Math.round(this.get("totalTime")/20)+" ms per point"
}.property("totalTime").cacheable()})})})});RaphaelDemo.main=function main(){RaphaelDemo.getPath("mainPage.mainPane").append();
var b=RaphaelDemo.store.find(RaphaelDemo.DataSeries,"fast-path");RaphaelDemo.FAST_PATH_QUERY=SC.Query.local(RaphaelDemo.DataPoint,{conditions:"series = {series}",series:b,orderBy:"id"});
RaphaelDemo.fastPathController.set("contentWhenConnected",RaphaelDemo.store.find(RaphaelDemo.FAST_PATH_QUERY));
RaphaelDemo.fastPathController.set("series",b);var a=RaphaelDemo.store.find(RaphaelDemo.DataSeries,"no-fast-path");
RaphaelDemo.NO_FAST_PATH_QUERY=SC.Query.local(RaphaelDemo.DataPoint,{conditions:"series = {series}",series:a,orderBy:"id"});
RaphaelDemo.noFastPathController.set("contentWhenConnected",RaphaelDemo.store.find(RaphaelDemo.NO_FAST_PATH_QUERY));
RaphaelDemo.noFastPathController.set("series",a)};function main(){RaphaelDemo.main()
};