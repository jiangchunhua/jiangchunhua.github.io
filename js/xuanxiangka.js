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
		aNavLi[i].onclick = function(){
			spring(oBgBox,this.offsetLeft);
			for(var i = 0; i < aNavLi.length - 1; i++){
				aNavLi[i].className='';
			}
			this.className='active';
		};
	}		
//banner	
	var oBanner=document.getElementById('banner');
	var oBanUl=oBanner.children[0];
	var aBanLi=oBanUl.children;
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
			};
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
			oBanText.innerHTML='<div></div><p>'+bannerText[now]+'</p>';	
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
	var aCardA=oCard.getElementsByTagName('a');
	var oCardUl=oCard.children[0];
	var aCardLi=oCard.children[0].children;
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
			this.style.boxShadow='5px 5px 5px #fff';
		};
		aCardLi[i].onmouseout=function(){
			this.style.left=0;
			this.style.top=0;
			this.style.boxShadow='0 0 0';
		};
	}
	for(var i=0;i<aCardA.length;i++){
		aCardA[i].onmouseover=function(){
			this.className='active';
		};
		aCardA[i].onmouseout=function(){
			this.className='';
		};
	}
	//kinds
	var oKinds=document.getElementById('kinds');
	var aKindsDiv=oKinds.children;
	for(var i=1;i<aKindsDiv.length;i++){
		aKindsDiv[i].style.left=aKindsDiv[i].offsetWidth+20*(i-1)+'px';
	}
	for(var i=0;i<aKindsDiv.length;i++){
		(function(index){
			aKindsDiv[i].onmouseover=function(){
				for(var i=0;i<aKindsDiv.length;i++){
					if(i<=index){
						move(aKindsDiv[i],{left:i*20},{time:1000});
					}else{
						move(aKindsDiv[i],{left:aKindsDiv[i].offsetWidth+20*(i-1)},{time:1000});
					}
				}
			};	
		})(i);
	}
	//drag
	var oDrag=document.getElementById('drag');
	var oDragUl=oDrag.children[0];
	var aDragLi=oDragUl.children;
	var aDragImg=oDragUl.getElementsByTagName('img');
	var aDragSpan=oDragUl.getElementsByTagName('span');
	oDragUl.style.width=oDragUl.children.length*aDragLi[0].offsetWidth+'px';	
	oDragUl.onmousedown=function(ev){
		var oEvt=ev||event;
		var disX=oEvt.clientX-oDragUl.offsetLeft;
		document.onmousemove=function(ev){
			var oEvt=ev||event;
			var l=oEvt.clientX-disX;
			if(l>oDrag.offsetWidth/2-(0+0.5)*aDragLi[0].offsetWidth)
				l=oDrag.offsetWidth/2-(0+0.5)*aDragLi[0].offsetWidth;
			if(l<oDrag.offsetWidth/2-(aDragLi.length-1+0.5)*aDragLi[0].offsetWidth)
				l=oDrag.offsetWidth/2-(aDragLi.length-1+0.5)*aDragLi[0].offsetWidth;
			oDragUl.style.left=l+'px';
			setSize();
		};	
		document.onmouseup=function(){
			document.onmousemove=document.onmouseup=null;	
		};
		return false;
	};
	function setSize(){
		for(var i=0;i<aDragImg.length;i++){
			var dis=Math.abs(oDrag.offsetWidth/2-(oDragUl.offsetLeft+aDragLi[i].offsetLeft+aDragLi[i].offsetWidth/2));
			var scale=1-dis/800;
			if(scale<0.5) scale=0.5;
			aDragImg[i].style.width=520*scale+'px';
			aDragImg[i].style.height=358*scale+'px';
			aDragImg[i].style.marginLeft=-(aDragImg[i].offsetWidth-aDragLi[i].offsetWidth)/2+'px';
			aDragImg[i].style.marginTop=-(aDragImg[i].offsetHeight-aDragLi[i].offsetHeight)/2+'px';
			aDragImg[i].style.zIndex=parseInt(scale*10000);
			aDragImg[i].style.opacity=scale;
		}	
	}
	setCenter(parseInt(aDragLi.length/2));
	function setCenter(n){
		oDragUl.style.left=	oDrag.offsetWidth/2-(n+0.5)*aDragLi[0].offsetWidth+'px';
		setSize();
	}
	addEvent(window,'resize',setSize);
	//big
	var oBig=document.getElementById('big');
	var aBigLi=oBig.children[0].children;
	var bBigReady=true;
	var BigData=[
	'xuenarui',
	'songshi',
	'hudie',
	'bianmu',
	'gumu',
	'jinmao',
	'bixiong',
	'lachang',
	'samo'
	];
	for(var i=0;i<aBigLi.length;i++){
		aBigLi[i].index=i;
		aBigLi[i].onclick=function(){
			if(!bBigReady) return;
			bBigReady=false;
			var oDiv=document.createElement('div');
			oDiv.innerHTML='<img src="images/'+BigData[this.index]+'.jpg" alt=""><span>&times;</span>';
			oBig.appendChild(oDiv);
			move(oDiv,{width:500,height:400,marginTop:-220,marginLeft:-250})
			var oClose=oDiv.children[1];
			oClose.onmouseover=function(){
				this.className='active';
			};
			oClose.onclick=function(){
					move(oDiv,{width:0,height:0,marginTop:0,marginLeft:0},{fn:function(){
						oBig.removeChild(oDiv);	
						bBigReady=true;				
					}});
			};
		};
	}	
	//random
	var oRandom=document.getElementById('random');
	var aRanLeft=oRandom.children[0].children;
	var aRanRight=oRandom.children[1].children;
	var oCloseFoot=document.getElementById('close_footprint');
	var oCloseReady=true;
	var ranTimer=setInterval(function(){
		var oRdNumber1=rnd(0,2);
		var oRdNumber2=rnd(0,2);
		move(aRanLeft[oRdNumber1],{opacity:1},{fn:function(){
			move(aRanRight[oRdNumber2],{opacity:1},{fn:function(){
				move(aRanLeft[oRdNumber1],{opacity:0},{fn:function(){
					move(aRanRight[oRdNumber2],{opacity:0});
				}});
			}});
		}});
	},1000);
	oCloseFoot.onclick=function(){
		if(oCloseReady){
			clearInterval(ranTimer);
			this.children[0].innerHTML='打开脚印';
			for(var i=0;i<aRanLeft.length;i++){
				move(aRanLeft[i],{opacity:0});
				move(aRanRight[i],{opacity:0});
			}
			oCloseReady=false;
		}else{
			ranTimer=setInterval(function(){
				var oRdNumber1=rnd(0,2);
				var oRdNumber2=rnd(0,2);
				move(aRanLeft[oRdNumber1],{opacity:1},{fn:function(){
					move(aRanRight[oRdNumber2],{opacity:1},{fn:function(){
						move(aRanLeft[oRdNumber1],{opacity:0},{fn:function(){
							move(aRanRight[oRdNumber2],{opacity:0});
						}});
					}});
				}});
			},1000);
			this.children[0].innerHTML='关闭脚印';
			oCloseReady=true;
		}
	};
};	
	
	
	
	



























