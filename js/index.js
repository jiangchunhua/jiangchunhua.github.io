// JavaScript Document
//nav
function d2a(n){
	return n*Math.PI/180;
}
function a2d(n){
	return n*180/Math.PI;
}
var lastX,lastY;
document.onmousemove=function (ev){
	var oEvent=ev||event;	
	lastX=oEvent.clientX;
	lastY=oEvent.clientY;
};
function addWall(obj){
	var oS=obj.children[1];
	obj.onmouseenter=function (){
		var cx=obj.offsetLeft+obj.offsetWidth/2;
		var cy=obj.offsetTop+obj.offsetHeight/2;
		var a=lastX-cx;
		var b=cy-lastY;
		var ang=90-a2d(Math.atan2(b, a));	
		if(ang>=-45 && ang<=45){
			oS.style.left=0;
			oS.style.top='-185px';
			move(oS, {left: 0, top: 0});
		}else if(ang>=45 && ang<=135){
			oS.style.left='185px';
			oS.style.top=0;
			move(oS, {left: 0, top: 0});
		}else if(ang>=135 && ang<=225){
			oS.style.left=0;
			oS.style.top='185px';
			move(oS, {left: 0, top: 0});
		}else{
			oS.style.left='-185px';
			oS.style.top=0;
			move(oS, {left: 0, top: 0});
		}
	};
	obj.onmouseleave=function (){
		var cx=obj.offsetLeft+obj.offsetWidth/2;
		var cy=obj.offsetTop+obj.offsetHeight/2;
		var a=lastX-cx;
		var b=cy-lastY;
		var ang=90-a2d(Math.atan2(b, a));
		if(ang>=-45 && ang<=45){
			move(oS, {left: 0, top: -185});
		}else if(ang>=45 && ang<=135){
			move(oS, {left: 185, top: 0});
		}else if(ang>=135 && ang<=225){
			move(oS, {left: 0, top: 185});
		}else{
			move(oS, {left: -185, top: 0});
		}
	};
}
//wheel
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
//
function addEvent(obj,sType,fn){//绑定
	if(obj.addEventListener){
		obj.addEventListener(sType,fn,false);	
	}else{
		obj.attachEvent('on'+sType,fn);
	}
}
function removeEvent(obj,sType,fn){//解绑
	if(obj.removeEventListener){
		obj.removeEventListener(sType,fn,false);	
	}else{
		obj.detachEvent('on'+sType,fn);
	}
}

window.onload=function (){
	var oNav=document.getElementById('nav');
	var aNavLi=oNav.children[0].children;
	var oBgBox=aNavLi[aNavLi.length-1];
	var speed = 0;
	var left = 0;
	function spring(obj,iTarget){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			speed += (iTarget - left)/5;
			speed *= 0.7;
			left += speed;
			obj.style.left = Math.round(left) + "px";
			if(obj.offsetLeft == iTarget && Math.abs(speed) < 1){
				clearInterval(obj.timer);
			}
		},30);
	}	
	for(var i = 0; i < aNavLi.length - 1; i++){
		aNavLi[i].onmouseover = function(){
			spring(oBgBox,this.offsetLeft);
		};
	}		
//banner	
	var oBanner=document.getElementById('banner');
	var oBanUl=oBanner.children[0];
	var aBanLi=oBanUl.children;
	var aImg=oBanUl.getElementsByTagName('img');
	oBanUl.innerHTML+=oBanUl.innerHTML;
	oBanUl.style.width=aBanLi[0].offsetWidth*aBanLi.length+'px';
	var oSltBtn=document.getElementById('slt_btn');
	var aShadow=oSltBtn.children[0].getElementsByTagName('div');
	var oBanBorder=oSltBtn.children[1];
	var oBanText=document.getElementById('img_text');
	var now=0;
	var ready=true;
	var timer=null;
	var bannerText=[
	'哈士奇',
	'拉布拉多',
	'藏獒',
	'泰迪',
	'德国牧羊犬'
	];		
	for(var i=0;i<aShadow.length;i++){
		(function(index){
			aShadow[i].onmouseover=function(){
				now=index;
				tab();
			}
		})(i)
	}
	function tab(){
		for(var i=0;i<aShadow.length;i++){
			aShadow[i].className='shadow';
		}
		if(now==5){
			aShadow[0].className='';
			move(oBanBorder,{left:0});
			oBanText.innerHTML='<p>'+bannerText[0]+'</p>';
		}else{
			move(oBanBorder,{left:now*aShadow[0].offsetWidth});
			aShadow[now].className='';
			oBanText.innerHTML='<p>'+bannerText[now]+'</p>';	
		}
		move(oBanUl,{left:-now*aBanLi[0].offsetWidth},{time:700,fn:function(){
			ready=true;
			if(now==5){
				oBanUl.style.left=0;
				now=0;	
			}
		}});
	}
	function next(){
		if(!ready)return ;
		ready=false;
		now++;		
		tab();
	}
	timer=setInterval(function(){
		next();
	},2000);
	oBanner.onmouseover=oSltBtn.onmouseover=function(){
		clearInterval(timer);
	};
	oBanner.onmouseout=oSltBtn.onmouseout=function(){
		timer=setInterval(function(){
			next();
		},2000);
	};
//command
	var oCard=document.getElementById('card');
	var oCardUl=oCard.children[1];
	var aCardLi=oCard.children[1].children;
	var aCardA=oCard.getElementsByTagName('a');
	oCardUl.style.width=aCardLi[0].offsetWidth*aCardLi.length+16*aCardLi.length+'px';
	var oGuide=document.getElementById('guide');
	var oBar=oGuide.children[0];
	oBar.onmousedown=function(ev){
		var oEvt=ev||event;
		var disX=oEvt.clientX-oBar.offsetLeft;
		document.onmousemove=function(ev){
			var oEvt=ev||event;
			var l=oEvt.clientX-disX;
			setPosition(l);
		};
		document.onmouseup=function(){
			document.onmousemove=document.onmouseup=null;
			oBar.releaseCapture && oBar.releaseCapture();
		};
		oBar.setCapture && oBar.setCapture();
		return false;
	};
	addMouseWheel(oCard,function(down){
		var l=oBar.offsetLeft;
		if(down) l+=40;
		else l-=40;
		setPosition(l);	
	})
	function setPosition(l){
		if(l<0){
			l=0;
		}
		if(l>oGuide.offsetWidth-oBar.offsetWidth){
			l=oGuide.offsetWidth-oBar.offsetWidth;
		}
		var scale=oBar.offsetLeft/(oGuide.offsetWidth-oBar.offsetWidth);
		oCardUl.style.left=scale*(oCard.offsetWidth-oCardUl.offsetWidth+11)+5+'px';
		oBar.style.left=l+'px';		
	}
	for(var i=0;i<aCardLi.length;i++){
		aCardLi[i].onmouseover=function(){
			this.style.left=-5+'px';
			this.style.top=-5+'px';
			this.style.boxShadow='5px 5px 5px';
		};
		aCardLi[i].onmouseout=function(){
			this.style.left=0;
			this.style.top=0;
			this.style.boxShadow='0 0 0';
		};
	}
//card
	var Cardarr=[
	'hashiqi.jpg',
	'jinmao.jpg',
	'demu.jpg',
	'zangao.jpg',
	'alasijia.jpg',
	'guibing.jpg',
	'gumu.jpg',
	'labuladuo.jpg',
	'qiutian.jpg',
	'samo.jpg'
	];
	var oKinds=document.getElementById('kinds');
	var oKindNext=oKinds.children[3];
	var oKindPrev=oKinds.children[2];
	var oKindDiv=oKinds.children[1];
	var aKindLi=oKinds.children[1].children[0].children;
	var kindReady=true;
	var aPos=[];
	var n=0;
	for(var i=0;i<aKindLi.length;i++){
		aPos.push({
			left:aKindLi[i].offsetLeft,
			top:aKindLi[i].offsetTop,
			width:aKindLi[i].offsetWidth-2,
			height:aKindLi[i].offsetHeight-2,
			opacity:1
			});	
		aKindLi[i].style.left=aPos[i].left+'px';
		aKindLi[i].style.top=aPos[i].top+'px';
	}
	for(var i=0;i<aKindLi.length;i++){
		aKindLi[i].style.position='absolute';	
		aKindLi[i].style.margin=0;
	}
	oKindNext.onclick=function(){
		if(!kindReady) return;
		kindReady=false;
		n++;
		if (n==Cardarr.length)n=0;
		down(n);
	};
	oKindPrev.onclick=function(){
		if(!kindReady) return;
		kindReady=false;
		n--;
		if (n==-1)n=Cardarr.length-1;
		down(n);
	};
	oKindNext.onmouseover=oKindPrev.onmouseover=function(){
		this.style.background='#fff';
		this.style.color='#000';
	};	
	oKindNext.onmouseout=oKindPrev.onmouseout=function(){
		this.style.background='#666';
		this.style.color='#fff';
	};
	function down(n){
		var i=aKindLi.length-1;
		var timer=setInterval(function(){
			(function(index){
				move(aKindLi[i].children[0],{ width:0,height:0});
				move(aKindLi[i],{left:oKindDiv.offsetWidth/2+230,top:oKindDiv.offsetHeight/2,width:0,height:0,opacity:0.5},{time:700,fn:function(){
					if(index==0){
						for(var i=0;i<aKindLi.length;i++){
							aKindLi[i].innerHTML='<img src="images/'+Cardarr[n]+'" alt="" />';	
						}
						up();	
					}
				}});
			})(i);			
			i--;
			if(i==-1) clearInterval(timer);	
		},100);	
	}
	function up(){
		var i=aKindLi.length-1;
		var timer=setInterval(function(){
			(function(index){
				move(aKindLi[i],aPos[i],{time:700,fn:function(){
					if(index==0){
						kindReady=true;	
					}
				}});	
			})(i);
			i--;
			if(i==-1) clearInterval(timer);	
		},100);	
	}
//side
	var oSide=document.getElementById('side');
	var oSideBtn=oSide.getElementsByTagName('span')[0];
	var oSideUl=oSide.children[0].children[0];
	var aSideLi=oSide.children[0].children[0].children;
	var oHome=oSide.children[1]
	var oSideSwitch=true;
	var sidePos=[];
	var oBody=document.getElementsByTagName('body')[0];
	for(var i=0;i<aSideLi.length;i++){
		sidePos.push({left:aSideLi[i].offsetLeft,top:aSideLi[i].offsetTop});
		aSideLi[i].style.left=sidePos[i].left+'px';
		aSideLi[i].style.top=sidePos[i].top+'px';  
	}
	for(var i=0;i<aSideLi.length;i++){
		aSideLi[i].style.position='absolute';
	}
	for(var i=0;i<aSideLi.length;i++){
		aSideLi[i].style.left=sidePos[aSideLi.length-1].left+'px';
		aSideLi[i].style.top=sidePos[aSideLi.length-1].top+'px';
	}	
	oSideBtn.onclick=function(){ 
		if(oSideSwitch){
			move(oSideUl,{left:0},{fn:function(){
				for(var k=0;k<aSideLi.length-1;k++){
					move(aSideLi[k],{left:sidePos[k].left,top:sidePos[k].top},{time:1000});
					oSideBtn.innerHTML='隐藏';
				};
			}});
			oSideSwitch=false;
			
		}else{
			for(var k=0;k<aSideLi.length-1;k++){
				move(aSideLi[k],{left:sidePos[aSideLi.length-1].left,top:sidePos[aSideLi.length-1].top},{time:1000,fn:function(){move(oSideUl,{left:-50});oSideBtn.innerHTML='展开';
}});
			};
			oSideSwitch=true;			
		}
	};
	oHome.onmouseover=function(){
		this.style.background='#fff';
		this.style.color='#000';
	};
	oHome.onmouseout=function(){
		this.style.background='#000';
		this.style.color='#fff';
	};
	oHome.onclick=function(){
		move(oBody,{scrollTop:0});
		move(oHome,{bottom:document.documentElement.clientHeight/2,opacity:0},{fn:function(){
			oHome.style.bottom=0;
		}});
	}
	addEvent(document,'scroll',function(){
		var oSt=document.documentElement.scrollTop||document.body.scrollTop;
		if(oSt>document.documentElement.clientHeight){
			move(oHome,{opacity:1},{time:1000})
		}
/*		if(oSt<document.documentElement.clientHeight){
			move(oHome,{opacity:0},{time:1000})
		}	*/	
	})	
};


























