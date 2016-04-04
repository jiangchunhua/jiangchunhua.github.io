// JavaScript Document
window.onload=function(){
	var oBox=document.getElementById('box');
	var oShadow=document.getElementById('shadow');
	var oContent=document.getElementById('remind_content');
	var oClose=document.getElementById('close');
	var oCount=document.getElementById('count');
	var oRemind=document.getElementById('remind');

	var aLi=oBox.children[0].children;
	var aLiPos=[];
	var ready=true;
	
	for(var i=0;i<aLi.length;i++){
		aLiPos.push({left:aLi[i].offsetLeft,top:aLi[i].offsetTop});
		aLi[i].style.left=aLiPos[i].left+'px';
		aLi[i].style.top=aLiPos[i].top+'px';
	} 
	for(var i=0;i<aLi.length;i++){
		aLi[i].style.position="absolute";
		aLi[i].style.margin=0;
		aLi[i].index=i;
	}
	for(var i=0;i<aLi.length;i++){
		aLi[i].style.left=aLiPos[0].left+'px';
		aLi[i].style.top=aLiPos[0].top+'px';
	}
	function close(){
		oShadow.style.display='none';
		oContent.innerHTML='';
		move(oContent,{width:0, height:0, marginLeft:0,marginTop:0, opacity:0});
		oRemind.style.display='none';
	}
	
	oClose.onclick=function(){
		clearInterval(closeTimer);
		close();
		startView();
	}
	var n=3;
	var closeTimer=setInterval(function(){
		n--;
		oCount.innerHTML=n+'秒后关闭';
		if(n==0){
			clearInterval(closeTimer);
			close();
			startView();
		}
	},1000)
	
	
	function startView(){
		setTimeout(function(){
			for(var i=0;i<aLi.length;i++){
				move(aLi[i],{opacity:1});
			}
			var n=0;
			var timer=setInterval(function(){
				if(n<=2){
					move(aLi[n],aLiPos[n],{fn:function(){
						if(n>2){
							aLi[3].style.left=aLi[4].style.left=aLi[5].style.left=aLiPos[2].left+'px';
							aLi[3].style.top=aLi[4].style.top=aLi[5].style.top=aLiPos[2].top+'px';
						}
					}});
				}else if(n==3){
					
					move(aLi[3],aLiPos[5],{fn:function(){
						aLi[4].style.left=aLi[5].style.left=aLiPos[5].left+'px';
						aLi[4].style.top=aLi[5].style.top=aLiPos[5].top+'px';				
					}});
				}else if(n==4){
					move(aLi[4],aLiPos[4],{fn:function(){
						aLi[5].style.left=aLiPos[4].left+'px';
						aLi[5].style.top=aLiPos[4].top+'px';	
					}});
				}else if(n==5){
					move(aLi[n],aLiPos[3],{fn:function(){
						change();
					}});
				}
				n++;
				if(n==aLi.length){
					clearInterval(timer);
				}
			},600)
		},300);
	}
	function change(){
		for(var i=0;i<aLi.length;i++){
			(function(index){
				move(aLi[index],{opacity:0.7},{fn:function(){
					move(aLi[index].children[0],{top:100});
					move(aLi[index].children[1],{top:0});
					shake();
				}});
			})(i)																																																																										
		}
	}
	function shake(){
		var n=0;
		var tmpP=null;
		var tmpDiv=null;
		var _this=null;
		for(var i=0;i<aLi.length;i++){
			aLi[i].onmouseover=function(ev){
				var oEvt=ev||event;
				var oFrom=oEvt.fromElement||oEvt.relatedTarget;
				if(this.contains(oFrom)) return;
				_this=this;
				tmpP=this.children[1];
				tmpDiv=this.children[2];
				clearInterval(this.timer);
				this.timer=setInterval(function(){
					n++;
					if(n%2==0){
						move(tmpP,{top:-10});
					}else{
						move(tmpP,{top:10});
					}
				},100)
				move(tmpDiv,{top:100})			
				setTimeout(function(){
					move(tmpP,{top:0});
					clearInterval(_this.timer);
				},500)
			}
			aLi[i].onmouseout=function(ev){
				var oEvt=ev||event;
				var oTo=oEvt.toElement||oEvt.relatedTarget;
				if(this.contains(oTo)) return;
				if(_this.timer){
					clearInterval(_this.timer);
				}
				move(tmpP,{top:0});		
				move(tmpDiv,{top:200})
			};
		}			
	}
};