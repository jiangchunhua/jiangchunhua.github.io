// JavaScript Document

function getStyle(obj, name){
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
}
function move(obj, json, options)
{
	options=options||{};
	options.type=options.type||'ease-out';
	options.time=options.time||500;
	var start={};
	var dis={};
	for(var name in json){
		start[name]=parseFloat(getStyle(obj, name));
		dis[name]=json[name]-start[name];
	}
	var count=Math.round(options.time/30);
	var n=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		for(var name in json){
			switch(options.type){
				case 'linear':
					var cur=start[name]+dis[name]*n/count;
					break;
				case 'ease-in':
					var a=n/count;
					
					var cur=start[name]+dis[name]*a*a*a;
					break;
				case 'ease-out':
					var a=1-n/count;
					
					var cur=start[name]+dis[name]*(1-a*a*a);
					break;
			}
			if(name=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else if(name=='scrollTop'){
				obj.scrollTop=cur;
			}else{
				obj.style[name]=cur+'px';
			}
		}
		if(n==count)
		{
			clearInterval(obj.timer);
			options.fn && options.fn();
		}
	}, 30);
}
function addMouseWheel(obj,fn){
	if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
		obj.addEventListener('DOMMouseScroll',fnWheel,false);
	}else{
		obj.onmousewheel=fnWheel;
	}
	function fnWheel(ev){
		var oEvt=ev||event;
		var down=false;
		if(oEvt.detail){
			down=oEvt.detail>0?true:false;
		}else{
			down=oEvt.wheelDelta>0?false:true;
		}		
		fn(down);		
		oEvt.preventDefault && oEvt.preventDefault();
		return false;	
	}	
}
//事件绑定
function addEvent(obj,sType,fn){
	if(obj.addEventListener){
		obj.addEventListener(sType,fn,false);	
	}else{
		obj.attachEvent('on'+sType,fn);
	}
}
//事件解绑
function removeEvent(obj,sType,fn){
	
	if(obj.removeEventListener){
		obj.removeEventListener(sType,fn,false);	
	}else{
		obj.detachEvent('on'+sType,fn);
	}
}
//随机数
function rnd(n,m){
	return Math.round(n+Math.random()*(m-n));
}








