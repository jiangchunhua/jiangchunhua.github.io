// JavaScript Document
window.onload=function(){
	function tag(obj1,obj2,obj1OldName,obj2OldName,obj1NewName,obj2NewName){
		for(var i=0;i<obj1.length;i++){
			obj1[i].index=i;
			obj1[i].onmouseover=function(){
				for(var i=0;i<obj1.length;i++){
					obj1[i].className=obj1OldName;
					obj2[i].className=obj2OldName;
				}
				this.className=obj1NewName;
				obj2[this.index].className=obj2NewName;
			};			
		};
	};	
	var oCt=document.getElementById('class_title');
	var aCt=oCt.getElementsByTagName('li');
	var oCd=document.getElementById('class_detail');
	var aCd=oCd.children;
	tag(aCt,aCd,'','class_content hidden','on','class_content show');
	
	var oChoseTitle=document.getElementById('chose_title');
	var aChoseTitle=oChoseTitle.getElementsByTagName('a');
	var oChoseDetail=document.getElementById('chose_detail');
	var aChoseDetail=oChoseDetail.children;	
	tag(aChoseTitle,aChoseDetail,'','clearFix hidden','red','clearFix show');
	
	var oErd=document.getElementById('evaluation_r_detail');
	var aErdLi=oErd.getElementsByClassName('evaluation_r_detail_top');	
	var aErdDiv=oErd.getElementsByTagName('div');
	tag(aErdLi,aErdDiv,'evaluation_r_detail_top','hidden','evaluation_r_detail_top black','show');	
	
	var oBanner=document.getElementById('content1_l_banner_btm');
	var aBanner=oBanner.getElementsByTagName('img');
	var aBannerLi=oBanner.getElementsByTagName('li');
	var oText=oBanner.getElementsByTagName('p')[0];
	var arr=[
		'混血王子 PCauto试驾起亚凯尊',
		'值得期待 中华H530上市前实拍',
		'混血王子 PCauto试驾起亚凯尊',
		'值得期待 中华H530上市前实拍',
		'混血王子 PCauto试驾起亚凯尊',
		'值得期待 中华H530上市前实拍',
		'混血王子 PCauto试驾起亚凯尊',
		'值得期待 中华H530上市前实拍',
	]
	var now=0;
	var timer=null;
	for(var i=0;i<aBannerLi.length;i++){
		aBannerLi[i].index=i;
		aBannerLi[i].onmouseover=function(){
			clearInterval(timer);
			now=this.index;
			change();
		};
	};
	for(var i=0;i<aBannerLi.length;i++){
		aBannerLi[i].onmouseout=function(){
			timer=setInterval(next,1000);
		}		
	};
	function change(){
		for(var i=0;i<aBannerLi.length;i++){
			aBannerLi[i].className='';
			aBanner[i].className='';
		}
		aBannerLi[now].className='on';
		aBanner[now].className='show';
		oText.innerHTML=arr[now];
	}
	function next(){
		now++;
		if(now==aBannerLi.length){
			now=0;
		}
		change();
	};
	timer=setInterval(next,1000);
	for(var i=0;i<aBanner.length;i++){
		aBanner[i].onmouseover=function(){
			clearInterval(timer);
		}		
	};	
	for(var i=0;i<aBanner.length;i++){
		aBanner[i].onmouseout=function(){
			timer=setInterval(next,1000);
		}		
	};	
};




























