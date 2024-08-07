/*!
 * VERSION: 0.2.2
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/

var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("easing.CustomEase",["easing.Ease"],function(a){var b=/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,c=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,d=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,e=/[cLlsS]/g,f="CustomEase only accepts Cubic Bezier data.",g=function(a,b,c,d,e,f,h,i,j,k,l){var m,n=(a+c)/2,o=(b+d)/2,p=(c+e)/2,q=(d+f)/2,r=(e+h)/2,s=(f+i)/2,t=(n+p)/2,u=(o+q)/2,v=(p+r)/2,w=(q+s)/2,x=(t+v)/2,y=(u+w)/2,z=h-a,A=i-b,B=Math.abs((c-h)*A-(d-i)*z),C=Math.abs((e-h)*A-(f-i)*z);return k||(k=[{x:a,y:b},{x:h,y:i}],l=1),k.splice(l||k.length-1,0,{x:x,y:y}),(B+C)*(B+C)>j*(z*z+A*A)&&(m=k.length,g(a,b,n,o,t,u,x,y,j,k,l),g(x,y,v,w,r,s,h,i,j,k,l+1+(k.length-m))),k},h=function(a){var b,e,g,h,i,j,k,l,m,n,o,p=(a+"").replace(d,function(a){var b=+a;return 1e-4>b&&b>-1e-4?0:b}).match(c)||[],q=[],r=0,s=0,t=p.length,u=2;for(b=0;t>b;b++)if(m=h,isNaN(p[b])?(h=p[b].toUpperCase(),i=h!==p[b]):b--,e=+p[b+1],g=+p[b+2],i&&(e+=r,g+=s),b||(k=e,l=g),"M"===h)j&&j.length<8&&(q.length-=1,u=0),r=k=e,s=l=g,j=[e,g],u=2,q.push(j),b+=2,h="L";else if("C"===h)j||(j=[0,0]),j[u++]=e,j[u++]=g,i||(r=s=0),j[u++]=r+1*p[b+3],j[u++]=s+1*p[b+4],j[u++]=r+=1*p[b+5],j[u++]=s+=1*p[b+6],b+=6;else if("S"===h)"C"===m||"S"===m?(n=r-j[u-4],o=s-j[u-3],j[u++]=r+n,j[u++]=s+o):(j[u++]=r,j[u++]=s),j[u++]=e,j[u++]=g,i||(r=s=0),j[u++]=r+=1*p[b+3],j[u++]=s+=1*p[b+4],b+=4;else{if("L"!==h&&"Z"!==h)throw f;"Z"===h&&(e=k,g=l,j.closed=!0),("L"===h||Math.abs(r-e)>.5||Math.abs(s-g)>.5)&&(j[u++]=r+(e-r)/3,j[u++]=s+(g-s)/3,j[u++]=r+2*(e-r)/3,j[u++]=s+2*(g-s)/3,j[u++]=e,j[u++]=g,"L"===h&&(b+=2)),r=e,s=g}return q[0]},i=function(a){var b,c=a.length,d=999999999999;for(b=1;c>b;b+=6)+a[b]<d&&(d=+a[b]);return d},j=function(a,b,c){c||0===c||(c=Math.max(+a[a.length-1],+a[1]));var d,e=-1*+a[0],f=-c,g=a.length,h=1/(+a[g-2]+e),j=-b||(Math.abs(+a[g-1]-+a[1])<.01*(+a[g-2]-+a[0])?i(a)+f:+a[g-1]+f);for(j=j?1/j:-h,d=0;g>d;d+=2)a[d]=(+a[d]+e)*h,a[d+1]=(+a[d+1]+f)*j},k=function(a){var b=this.lookup[a*this.l|0]||this.lookup[this.l-1];return b.nx<a&&(b=b.n),b.y+(a-b.x)/b.cx*b.cy},l=function(b,c,d){this._calcEnd=!0,this.id=b,b&&(a.map[b]=this),this.getRatio=k,this.setData(c,d)},m=l.prototype=new a;return m.constructor=l,m.setData=function(a,c){a=a||"0,0,1,1";var d,i,k,l,m,n,o,p,q,r,s=a.match(b),t=1,u=[];if(c=c||{},r=c.precision||1,this.data=a,this.lookup=[],this.points=u,this.fast=1>=r,(e.test(a)||-1!==a.indexOf("M")&&-1===a.indexOf("C"))&&(s=h(a)),d=s.length,4===d)s.unshift(0,0),s.push(1,1),d=8;else if((d-2)%6)throw f;for((0!==+s[0]||1!==+s[d-2])&&j(s,c.height,c.originY),this.rawBezier=s,l=2;d>l;l+=6)i={x:+s[l-2],y:+s[l-1]},k={x:+s[l+4],y:+s[l+5]},u.push(i,k),g(i.x,i.y,+s[l],+s[l+1],+s[l+2],+s[l+3],k.x,k.y,1/(2e5*r),u,u.length-1);for(d=u.length,l=0;d>l;l++)o=u[l],p=u[l-1]||o,o.x>p.x||p.y!==o.y&&p.x===o.x||o===p?(p.cx=o.x-p.x,p.cy=o.y-p.y,p.n=o,p.nx=o.x,this.fast&&l>1&&Math.abs(p.cy/p.cx-u[l-2].cy/u[l-2].cx)>2&&(this.fast=!1),p.cx<t&&(p.cx?t=p.cx:(p.cx=.001,l===d-1&&(p.x-=.001,t=Math.min(t,.001),this.fast=!1)))):(u.splice(l--,1),d--);if(d=1/t+1|0,this.l=d,m=1/d,n=0,o=u[0],this.fast){for(l=0;d>l;l++)q=l*m,o.nx<q&&(o=u[++n]),i=o.y+(q-o.x)/o.cx*o.cy,this.lookup[l]={x:q,cx:m,y:i,cy:0,nx:9},l&&(this.lookup[l-1].cy=i-this.lookup[l-1].y);this.lookup[d-1].cy=u[u.length-1].y-i}else{for(l=0;d>l;l++)o.nx<l*m&&(o=u[++n]),this.lookup[l]=o;n<u.length-1&&(this.lookup[l-1]=u[u.length-2])}return this._calcEnd=1!==u[u.length-1].y||0!==u[0].y,this},m.getRatio=k,m.getSVGData=function(a){return l.getSVGData(this,a)},l.create=function(a,b,c){return new l(a,b,c)},l.version="0.2.2",l.bezierToPoints=g,l.get=function(b){return a.map[b]},l.getSVGData=function(b,c){c=c||{};var d,e,f,g,h,i,j,k,l,m,n=1e3,o=c.width||100,p=c.height||100,q=c.x||0,r=(c.y||0)+p,s=c.path;if(c.invert&&(p=-p,r=0),b=b.getRatio?b:a.map[b]||console.log("No ease found: ",b),b.rawBezier){for(d=[],j=b.rawBezier.length,f=0;j>f;f+=2)d.push(((q+b.rawBezier[f]*o)*n|0)/n+","+((r+b.rawBezier[f+1]*-p)*n|0)/n);d[0]="M"+d[0],d[1]="C"+d[1]}else for(d=["M"+q+","+r],j=Math.max(5,200*(c.precision||1)),g=1/j,j+=2,k=5/j,l=((q+g*o)*n|0)/n,m=((r+b.getRatio(g)*-p)*n|0)/n,e=(m-r)/(l-q),f=2;j>f;f++)h=((q+f*g*o)*n|0)/n,i=((r+b.getRatio(f*g)*-p)*n|0)/n,(Math.abs((i-m)/(h-l)-e)>k||f===j-1)&&(d.push(l+","+m),e=(i-m)/(h-l)),l=h,m=i;return s&&("string"==typeof s?document.querySelector(s):s).setAttribute("d",d.join(" ")),d.join(" ")},l},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(a){"use strict";var b=function(){return(_gsScope.GreenSockGlobals||_gsScope)[a]};"undefined"!=typeof module&&module.exports?(require("../TweenLite.min.js"),module.exports=b()):"function"==typeof define&&define.amd&&define(["TweenLite"],b)}("CustomEase");

var initLogoScaleX,
	initLogoScaleY,
	initLogoY,
	vidreplayInitScale,
	ButtonSizeInfo,
	widthOfWebTextParent = [];


var fontArray =
[
	{buttonFont:   	"buttonTextGFX"},
	{dateFont: 	   	"dateFontGFX", dateKerning:0.05},
	{straplineFont:	"introFontGFX"},
	{introFont:    	"introFontGFX"} 
]

var svgNS = "http://www.w3.org/2000/svg";

var strapCounter = 0;
var straplineWidPark = 0;

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

var parallaxBox,
	backgroundLeft,  	
    backgroundYop,   	
    foregroundLeft,  	
    foregroundTop,
    div1OriginalX,
	div1OriginalY,
	div2OriginalX,
	div2OriginalY;	

function isIE() {
	ua = navigator.userAgent;
	/* MSIE used to detect old browsers and Trident used to newer ones*/
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;

	return is_ie; 
}

var python = {

emergencyOverride:function(){

},

stopIEWobble:function (typeOfBrowser)
{
	var ua = typeOfBrowser;

	if (ua.indexOf('MSIE ')  >=  0 || ua.indexOf('Trident/') >= 0 || ua.indexOf('Edge/') >= 0) {
	    _root.style.cssText +="-webkit-transform:rotateZ(0.00001deg);-moz-transform:rotateZ(0.00001deg);-ms-transform:rotateZ(0.00001deg);-o-transform:rotateZ(0.00001deg);transform:rotateZ(0.00001deg);";
	}  
},

sortVideoLogo:function(divID,divToClone)
{
	var vidwatermark = divToClone.cloneNode(true);
	vidwatermark.id = "vidwatermark";
	divID.innerHTML = "";
	divID.appendChild(vidwatermark);

	var xVidLogoPos = parseInt(divID.children[0].style.width.split("px")[0]);
	var yVidLogoPos = parseInt(divID.children[0].style.height.split("px")[0]);

	TweenMax.set(divID.children[0],{x:-xVidLogoPos,y:-yVidLogoPos});
	TweenMax.set(divID.children[0],{x:0,y:0});
},

findLongWord:function(array)
{
    var longestLine = "";
    array.forEach(function(word) {if(word.length > longestLine.length) {longestLine = word;}});
    return longestLine;
},

howmanylines:function(textString)
{
	var textLines = textString.split("\n");
	return textLines.length;
},

findWidth:function(divID)
{
	var tfWid = Math.floor(divID.children[0].getAttribute("width").split("px")[0]);
	return tfWid;
},

createShadowGlow:function(divID,w,h,injectLoc)
{
	python.injectCanvas("cv_strapline",WID,HEI,injectLoc);
	var canvas = document.getElementById('cv_strapline');
	var ctx = canvas.getContext('2d');
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	var radius = WID*divID._scaleX;
	var ctx = canvas.getContext('2d');

	var x = Math.round(divID._x),
		y = Math.round(divID._y),
		innerRadius = Math.floor((w*divID._scaleX)*0.1),
		outerRadius = Math.floor(w*divID._scaleX)*1.5,
		radius = Math.floor(w*divID._scaleX*1.5);

	var gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
		gradient.addColorStop(0, 'rgba(0,0,0,0.8)');
		gradient.addColorStop(0.5, 'rgba(0,0,0,0)');
		ctx.fillStyle = gradient;
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.fill();			

	canvas.style.cssText+="-ms-filter: blur(2px); filter:progid:DXImageTransform.Microsoft.Blur(pixelradius='2', shadowopacity='0.0');";
},

/*$$$$$\  $$\       $$$$$$\ $$$$$$$$\  $$$$$$\  $$\   $$\ 
$$  __$$\ $$ |      \_$$  _|\__$$  __|$$  __$$\ $$ |  $$ |
$$ /  \__|$$ |        $$ |     $$ |   $$ /  \__|$$ |  $$ |
$$ |$$$$\ $$ |        $$ |     $$ |   $$ |      $$$$$$$$ |
$$ |\_$$ | $$ |        $$ |     $$ |   $$ |      $$  __$$ |
$$ |  $$ | $$ |        $$ |     $$ |   $$ |  $$\ $$ |  $$ |
\$$$$$$  |$$$$$$$$\ $$$$$$\    $$ |   \$$$$$$  |$$ |  $$ |
 \______/ \________|\______|   \__|    \______/ \__|  \_*/

animateGlitch:function(divID, delay)
{
	firstGlitchHasHappend = true;

	var topImage = document.getElementById(divID.id+'3');
	var middleImage = document.getElementById(divID.id+'2');
	var bottomImage = document.getElementById(divID.id);

  	fbf.show(topImage, middleImage);

	const glitch = new TimelineMax();

	if(glitchCurrentlyAnimating == false)
	{
		glitchCurrentlyAnimating = true;

		glitch
		.add('start')
		.to(topImage, 0.03, {x: '+=4'})
  		.to(topImage, 0.03, {x: '-=8'})
  		.to(topImage, 0.03, {y: '+=2'})
  		.to(topImage, 0.03, {y: '-=2'})
  		.to(topImage, 0.03, {x: '+=4'})
  		.to(topImage, 0.03, {x: '+=4'})
  		.to(topImage, 0.03, {x: '-=4'})
	
  		.to(middleImage, 0.03, {x: '-=8'}, 'start')
		.to(middleImage, 0.03, {x: '+=4'})
		.to(middleImage, 0.03, {x: '-=3'})
		.to(middleImage, 0.03, {x: '+=10'})
		.to(middleImage, 0.03, {x: '-=3'})
		.call(function(){ glitchCurrentlyAnimating = false })
	}

},

/*$$$$$\   $$$$$$\  $$$$$$$\   $$$$$$\  $$\       $$\        $$$$$$\  $$\   $$\ 
$$  __$$\ $$  __$$\ $$  __$$\ $$  __$$\ $$ |      $$ |      $$  __$$\ $$ |  $$ |
$$ |  $$ |$$ /  $$ |$$ |  $$ |$$ /  $$ |$$ |      $$ |      $$ /  $$ |\$$\ $$  |
$$$$$$$  |$$$$$$$$ |$$$$$$$  |$$$$$$$$ |$$ |      $$ |      $$$$$$$$ | \$$$$  / 
$$  ____/ $$  __$$ |$$  __$$< $$  __$$ |$$ |      $$ |      $$  __$$ | $$  $$<  
$$ |      $$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |      $$ |      $$ |  $$ |$$  /\$$\ 
$$ |      $$ |  $$ |$$ |  $$ |$$ |  $$ |$$$$$$$$\ $$$$$$$$\ $$ |  $$ |$$ /  $$ |
\__|      \__|  \__|\__|  \__|\__|  \__|\________|\________|\__|  \__|\__|  \_*/

getOriginalPositions:function(div1, div2)
{
	parallaxBox 		= div1;
	backgroundLeft  	= div1.offsetLeft;
   	backgroundTop   	= div1.offsetTop;
   	foregroundLeft  	= div2.offsetLeft;
   	foregroundTop   	= div2.offsetTop;

  	div1OriginalX = python.getOffset(div1).left; 
  	div1OriginalY = python.getOffset(div1).top; 
  	div2OriginalX = python.getOffset(div2).left; 
  	div2OriginalY = python.getOffset(div2).top;
},

getOffset:function(el) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
},

shouldWeUseParallax:function(div1, div2){

    if(useParallax == true){

    	console.log('%c\n PARALLAX EFFECT IS ON BECAUSE useParallax IS SET TO TRUE IN main.js \n', 'background: #000000; color: #FFFFFF');

    	onmousemove = function (event) 
    	{

      		event = event || window.event;

      		var x = event.clientX - parallaxBox.offsetLeft,
          		y = event.clientY - parallaxBox.offsetTop;

      		var obj 			= mc_ruin;
      		var parentObj 		= obj.parentNode,
      		containerWidth 		= parseInt( parentObj.offsetWidth ),
      		containerHeight 	= parseInt( parentObj.offsetHeight );

      		// LOTS OF IF STATEMENTS FIX PARALLAX ANIMATION FOR DIFFERENT SIZES

      		if(WID == 728 && HEI == 90 || WID == 840 && HEI == 150 || WID == 1000 && HEI == 240 || WID == 970 && HEI == 400 || WID == 970 && HEI == 250 || WID == 980 && HEI == 250 || WID == 990 && HEI == 250 || WID == 640 && HEI == 200)
      		{
      			var moveDiv2X = foregroundLeft - ( ( ( x + ( parseInt( obj.offsetWidth ) / 2 + foregroundLeft ) ) / containerWidth ) * 20 ) + 'px';
      			var moveDiv2Y = foregroundTop - ( ( ( y + ( parseInt( obj.offsetHeight ) / 2 + foregroundTop ) ) / containerHeight ) * 2 ) + 'px';
      		}
      		else if(WID == 1536 && HEI == 320){
      			var moveDiv2X = foregroundLeft - ( ( ( x + ( parseInt( obj.offsetWidth ) / 2 + foregroundLeft ) ) / containerWidth ) * 30 ) + 'px';
      			var moveDiv2Y = foregroundTop - ( ( ( y + ( parseInt( obj.offsetHeight ) / 2 + foregroundTop ) ) / containerHeight ) * 2 ) + 'px';
      		}
      		else if(WID == 1170 && HEI == 110 || WID == 1250 && HEI == 240)
      		{
				var moveDiv2X = foregroundLeft - ( ( ( x + ( parseInt( obj.offsetWidth ) / 2 + foregroundLeft ) ) / containerWidth ) * 25 ) + 'px';
      			var moveDiv2Y = foregroundTop - ( ( ( y + ( parseInt( obj.offsetHeight ) / 2 + foregroundTop ) ) / containerHeight ) * 2 ) + 'px';      		
      		}
      		else if(WID == 728 && HEI == 1048)
      		{
				var moveDiv2X = foregroundLeft - ( ( ( x + ( parseInt( obj.offsetWidth ) / 2 + foregroundLeft ) ) / containerWidth ) * 15 ) + 'px';
      			var moveDiv2Y = foregroundTop - ( ( ( y + ( parseInt( obj.offsetHeight ) / 2 + foregroundTop ) ) / containerHeight ) * 10 ) + 'px';      		
      		}
      		else if(WID == 480 && HEI == 360 || WID == 580 && HEI == 400)
      		{
      			var moveDiv2X = foregroundLeft - ( ( ( x + ( parseInt( obj.offsetWidth ) / 2 + foregroundLeft ) ) / containerWidth ) * 10 ) + 'px';
      			var moveDiv2Y = foregroundTop - ( ( ( y + ( parseInt( obj.offsetHeight ) / 2 + foregroundTop ) ) / containerHeight ) * 5 ) + 'px';      		
      		}
      		else
      		{
      			var moveDiv2X = foregroundLeft - ( ( ( x + ( parseInt( obj.offsetWidth ) / 2 + foregroundLeft ) ) / containerWidth ) * 5 ) + 'px';
      			var moveDiv2Y = foregroundTop - ( ( ( y + ( parseInt( obj.offsetHeight ) / 2 + foregroundTop ) ) / containerHeight ) * 5 ) + 'px';
      		}

      		var moveDiv1X = backgroundLeft - ( ( ( x - ( parseInt( obj.offsetWidth ) / 2 + backgroundLeft ) ) / containerWidth ) * 2 ) + 'px';
      		var moveDiv1Y = backgroundTop - ( ( ( y - ( parseInt( obj.offsetHeight ) / 2 + backgroundTop ) ) / containerHeight ) * 2 ) + 'px';


      		TweenMax.to(div1,  	1, {x: moveDiv1X, y: moveDiv1Y, scale: 1.015, transformOrigin: "50% 50%"});
      		TweenMax.to(div2, 	1, {x: moveDiv2X, y: moveDiv2Y, scale: 1.02, transformOrigin: "-50% 0%"});

    	}

  	}
  	else
  	{

    	setTimeout(function() {console.log('%c\n   PARALLAX EFFECT IS OFF BECAUSE useParallax IS SET TO FALSE IN main.js   \n\n', 'background: #000000; color: #FFFFFF');}, 1500);

  	}

},

returnElements:function(div1, div2){
    //console.log("\nReturn elements back to original position\n\n");

    TweenMax.to(div1,    1, {x: div1OriginalX, y: div1OriginalY, scale: 1});
    TweenMax.to(div2,    1, {x: div2OriginalX, y: div2OriginalY, scale: 1});
},

/*$$$$$\   $$$$$$\  $$\   $$\ $$\    $$\  $$$$$$\   $$$$$$\  
$$  __$$\ $$  __$$\ $$$\  $$ |$$ |   $$ |$$  __$$\ $$  __$$\ 
$$ /  \__|$$ /  $$ |$$$$\ $$ |$$ |   $$ |$$ /  $$ |$$ /  \__|
$$ |      $$$$$$$$ |$$ $$\$$ |\$$\  $$  |$$$$$$$$ |\$$$$$$\  
$$ |      $$  __$$ |$$ \$$$$ | \$$\$$  / $$  __$$ | \____$$\ 
$$ |  $$\ $$ |  $$ |$$ |\$$$ |  \$$$  /  $$ |  $$ |$$\   $$ |
\$$$$$$  |$$ |  $$ |$$ | \$$ |   \$  /   $$ |  $$ |\$$$$$$  |
 \______/ \__|  \__|\__|  \__|    \_/    \__|  \__| \_____*/ 

createCanvas:function()
{
	python.injectCanvas("cv_strapline",WID,HEI,_root);
	$('cv_strapline').style.cssText = "display:block;width:300px;height:250px;position:absolute;z-index:1000;top:0;";
	var c = document.getElementById("cv_strapline");
	var ctx = c.getContext("2d");
	var svgdata = $("mc_date")._("svg");
	//log(svgdata);
	var DOMURL = window.URL || window.webkitURL || window;

	var img = new Image();
	var svg = new Blob([svgdata], {type: 'image/svg+xml'});
	var url = DOMURL.createObjectURL(svg);
	//log(url);
	//log(img);
	//log(svg);
	
	//log(ctx);
	img.onload = function() {
		ctx.drawImage(img, 0, 0);
		DOMURL.revokeObjectURL(url);
	}

	img.src = url;		
},
	
injectCanvas:function(id,width,height,whereToPut) 
{
	var newCanvas = document.createElement('canvas');
	newCanvas.id = id, newCanvas.className = "do",	newCanvas.width = width, newCanvas.height = height;		
	var locationFornewCanvas = python.findMyLocInDom(whereToPut);
	_root.insertBefore(newCanvas, _root.childNodes[locationFornewCanvas])
	return newCanvas;
},

/*$$$$$\  $$\   $$\ $$$$$$$$\ $$$$$$$$\  $$$$$$\  $$\   $$\        $$$$$$\ $$$$$$$$\ $$\   $$\ $$$$$$$$\ $$$$$$$$\ 
$$  __$$\ $$ |  $$ |\__$$  __|\__$$  __|$$  __$$\ $$$\  $$ |      $$  __$$\\__$$  __|$$ |  $$ |$$  _____|$$  _____|
$$ |  $$ |$$ |  $$ |   $$ |      $$ |   $$ /  $$ |$$$$\ $$ |      $$ /  \__|  $$ |   $$ |  $$ |$$ |      $$ |      
$$$$$$$\ |$$ |  $$ |   $$ |      $$ |   $$ |  $$ |$$ $$\$$ |      \$$$$$$\    $$ |   $$ |  $$ |$$$$$\    $$$$$\    
$$  __$$\ $$ |  $$ |   $$ |      $$ |   $$ |  $$ |$$ \$$$$ |       \____$$\   $$ |   $$ |  $$ |$$  __|   $$  __|   
$$ |  $$ |$$ |  $$ |   $$ |      $$ |   $$ |  $$ |$$ |\$$$ |      $$\   $$ |  $$ |   $$ |  $$ |$$ |      $$ |      
$$$$$$$  |\$$$$$$  |   $$ |      $$ |    $$$$$$  |$$ | \$$ |      \$$$$$$  |  $$ |   \$$$$$$  |$$ |      $$ |      
\_______/  \______/    \__|      \__|    \______/ \__|  \__|       \______/   \__|    \______/ \__|      \_*/	   

createBtn:function(divID, btnCont, btnPadX, btnPadY, divIdName, edgeColor, btnBgColor, btnFunction, btnDate, btnDateInfo, lineNO, spread, langChoice)
{
	var heightOfAccolade = parseInt(btnCont.children[0].getAttribute("height").split("px")[0]);
	var totalHeight = Math.floor(parseInt(heightOfAccolade));													
	var totalWidth = python.findWidth(btnCont);																	
	var heightBtn = Math.round((btnCont.children[0].getAttribute("height").split("px")[0]))+(btnPadY*2);
	var widthBtn  = Math.floor((Math.round((btnCont.children[0].getAttribute("width").split("px")[0]))+(btnPadX*2.5)+(totalHeight))*0.98);
	python.webFontButtonTidy(langChoice,divID,btnCont,btnPadX,btnPadY,totalWidth,totalHeight);

	var newBtnHouse = document.createElement('div');
		newBtnHouse.id = divIdName.toString();
		newBtnHouse.className = "do";
		newBtnHouse.style.width = widthBtn+"px";
		newBtnHouse.style.height = heightBtn+"px";

	divID.appendChild(newBtnHouse);
	if(btnDate != undefined)  {  python.storeDateEffectDivs(btnDateInfo,newBtnHouse)  }

	newBtnHouse.appendChild(btnCont);

	var text_width = btnCont.children[0].clientWidth;
	var text_height = btnCont.children[0].clientHeight;

	TweenMax.set(btnCont, {x: (widthBtn*0.5)-(text_width*0.5)-5, y: (heightBtn*0.5)-(text_height*0.5)-2})

	//btnCont.style.marginLeft=btnPadX+"px";  
	//btnCont.style.marginTop=btnPadY-(btnPadY*0.1)+"px";  

	//var btnTriangle = python.tidyTriangle(lineNO,btnPadX,btnPadY,totalWidth);
	var btnBox = python.drawSVGButtonBox(widthBtn,heightBtn,btnBgColor);

	var nameOfFlash = newBtnHouse.id+'_flash';
	var btnRollOverGFX = python.drawSVGButtonBoxFlash(nameOfFlash,widthBtn,heightBtn,edgeColor);

	python.buildGFXforBTN(newBtnHouse,widthBtn,heightBtn,btnBox,btnRollOverGFX);

/*		  
	if(langChoice == "uaear" || langChoice == "ksaar")
	{

		TweenMax.set(tri,{x:"-="+btnPadX*0.1, y:"+="+btnPadY*0.0, scale: 1.6});
		TweenMax.set(newBtnHouse.children[0],{x:"+="+btnPadX*0.4, y: "+=4"});

		TweenMax.set(newBtnHouse.children[0],{x:"+="+btnPadX*0.4, y: "-=1"});

	} 
	else if(langChoice == "ru")
	{
		TweenMax.set(tri,{x:"-="+btnPadX*0.10, y: "+="+btnPadY*0.18, scale: 0.8});
		TweenMax.set(newBtnHouse.children[0],{y:"+="+btnPadX*0.1});
	}
	else if(langChoice == "tch")
	{
		TweenMax.set(tri,{x:"-="+btnPadX*0.1, y: "+="+btnPadY*0.3, scale: 0.6});
		TweenMax.set(newBtnHouse.children[0],{x:"-="+btnPadX*0.2});
	}
	else if(langChoice == "pl")
	{
		if(config.chosenBtn=="Purchase" && !out){
			console.log("\nSpecial Polish preorder button triangle tweek\n\n");
			TweenMax.set(tri,{x:"-="+btnPadX*0.1, y: "+="+btnPadY*0.17, scale: 0.7});
			TweenMax.set(newBtnHouse.children[0],{x:"-="+btnPadX*0.3});
		} else {
			TweenMax.set(tri, {x:"-="+btnPadX*0.5, y: "+="+btnPadY*0.16, scale: 0.5});
		}
	}
*/

	TweenMax.set(newBtnHouse,{x:-(newBtnHouse.style.width.split("px")[0])*0.5,y:-(newBtnHouse.style.height.split("px")[0])*0.5});   
	TweenMax.set(nameOfFlash,{alpha:0});

	python.giveButtonAction(newBtnHouse.id,nameOfFlash,btnFunction);
	if(spread) spreadOutButtons(mc_button,heightBtn*2);
},

isIE:function()
{
	ua = navigator.userAgent;
	/* MSIE used to detect old browsers and Trident used to newer ones*/
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;

	if(is_ie)
	{
		console.log("\nYou are in Internet Explorer\n\n");
	}	
	
	return is_ie;
},

drawSVGButtonBox:function(widthBtn,heightBtn,btnBgColor)
{
	var svgns = "http://www.w3.org/2000/svg";

	var btnBoxSVG = document.createElementNS (svgns, "svg");
	var defs = document.createElementNS(svgns, 'defs');
	var gradient = document.createElementNS(svgns, 'linearGradient');
	var rect = document.createElementNS(svgns, 'rect');

	var rect2 = document.createElementNS(svgns, 'rect');
	
	var stops =
	[
    	{
    	    "color": "#d29e0e",
    	    "offset": "0%"
    	},{
    	    "color": "#f0d283",
    	    "offset": "100%"
    	}
	];

	for (var i = 0, length = stops.length; i < length; i++)
	{
    	var stop = document.createElementNS(svgns, 'stop');
    	stop.setAttribute('offset', stops[i].offset);
    	stop.setAttribute('stop-color', stops[i].color);
    	gradient.appendChild(stop);
	}

	gradient.id = 'Gradient';
	gradient.setAttribute('x1', '0');
	gradient.setAttribute('x2', '1');
	gradient.setAttribute('y1', '0');
	gradient.setAttribute('y2', '0');
	defs.appendChild(gradient);	

	rect.setAttributeNS(null,  'fill', 'url(#Gradient)');
	rect.setAttributeNS(null,  'width', widthBtn);
	rect.setAttributeNS(null,  'height', heightBtn);

	if(python.isIE())
	{
		rect.setAttribute("stroke-width","2");
	}
	else
	{
		rect.setAttribute("stroke-width","5");
	}
	
	//rect.setAttribute("stroke","rgba('"+edgeColor+"')");
	rect.setAttribute("stroke","#000000");

	var inner_rect_gap = 18;

	rect2.setAttributeNS(null,  'fill', 'none');
	rect2.setAttributeNS(null,  'width', widthBtn-inner_rect_gap);
	rect2.setAttributeNS(null,  'height', heightBtn-inner_rect_gap);
	rect2.setAttribute("stroke-width","2");
	rect2.setAttribute("stroke","#000000");

	btnBoxSVG.setAttributeNS(null, 'id','button_svg_gradient');
	btnBoxSVG.setAttributeNS(null, 'width', widthBtn);
	btnBoxSVG.setAttributeNS(null, 'height', heightBtn);

	btnBoxSVG.appendChild(defs);
	btnBoxSVG.appendChild(rect);
	btnBoxSVG.appendChild(rect2);

	TweenMax.set(rect2, {x: '+='+(inner_rect_gap*0.5), y: '+='+(inner_rect_gap*0.5)});

	//console.log(btnBoxSVG)
	
	return btnBoxSVG;
},

drawSVGButtonBoxFlash:function(nameOfFlash,widthBtn,heightBtn,edgeColor)
{
	/*var btnBoxSVGFlash = '<div id="'+nameOfFlash+'" style="position:absolute;top:0;width:'+widthBtn+'px; height:'+heightBtn+'px;display:block;">
	<svg width="'+widthBtn+'" height="'+heightBtn+'"><rect width="'+widthBtn+'" height="'+heightBtn+'" style="fill:rgba('+edgeColor+');" /></svg>
	</div>';*/
	
	var flashDiv = document.createElement('div');
		flashDiv.id = nameOfFlash;
		flashDiv.className = "do";
		flashDiv.style.position = "absolute";
		flashDiv.style.display = "block";
		flashDiv.style.top = "0";
		flashDiv.style.width = widthBtn+"px";
		flashDiv.style.height = heightBtn+"px";

	var svgns = "http://www.w3.org/2000/svg";

	var btnBoxSVGFlash = document.createElementNS (svgns, "svg");
	var rect = document.createElementNS(svgns, 'rect');	

	rect.setAttributeNS(null,  'fill', '#FFFFFF');
	rect.setAttributeNS(null,  'width', widthBtn);
	rect.setAttributeNS(null,  'height', heightBtn);

	btnBoxSVGFlash.setAttributeNS(null, 'id', nameOfFlash);
	btnBoxSVGFlash.setAttributeNS(null, 'width', widthBtn);
	btnBoxSVGFlash.setAttributeNS(null, 'height', heightBtn);

	btnBoxSVGFlash.appendChild(rect);
	flashDiv.appendChild(btnBoxSVGFlash);

	return flashDiv;
},

tidyTriangle:function(lineNO,btnPadX,btnPadY,totalWidth)
{
	var triangleShizzle; //triangle size, triangle margin top, triangle margin left

	if(lineNO == 1)
	{
		var triangleSize = (Math.floor((btnPadX)*0.8));
		var triPrms = [triangleSize, triangleSize+(btnPadY*1.125), totalWidth+(btnPadX*1.5)];
	}
	else if(lineNO == 2)
	{
		var triangleSize = (Math.floor((btnPadX)*2));
		var triPrms = [triangleSize,triangleSize+(btnPadY*2.5),totalWidth+(btnPadX*2.5)];
	}
	else if(lineNO == 3)
	{
		var triangleSize = (Math.floor((btnPadX)*2.5));
		var triPrms = [triangleSize,triangleSize+(btnPadY*3.5),totalWidth+(btnPadX*3.2)];
	}
	else
	{
		var triangleSize = (Math.floor((btnPadX)*0.88));
		var triPrms = [triangleSize,triangleSize+(btnPadY*1.22),totalWidth+(btnPadX*2)];
	}		
	
	triangleShizzle = '<div id="tri" style="width:'+triPrms[0]+'px; height:'+triPrms[0]+'px; margin-top:-'+(triPrms[1])+'px; margin-left:'+(triPrms[2])+'px;"><svg height="'+triPrms[0]+'" width="'+triPrms[0]+'"><polygon points="0,0 0,'+triPrms[0]+' '+triPrms[0]+','+(triPrms[0]*0.5)+'" style="fill:#ffffff;"/></svg></div>';
	return triangleShizzle;
},

buildGFXforBTN:function(newBtnHouse,widthBtn,heightBtn,btnBox,btnRollOverGFX)
{
	newBtnHouse.innerHTML+='';

	var buttonHouseDiv = document.createElement("div");
		buttonHouseDiv.id = "buttonHouseDiv";
		buttonHouseDiv.style.width = widthBtn+"px";
		buttonHouseDiv.style.height = heightBtn+"px";
		buttonHouseDiv.style.display = "block";

		buttonHouseDiv.appendChild(btnBox);

	newBtnHouse.appendChild(buttonHouseDiv);
	newBtnHouse.appendChild(btnRollOverGFX);

	//newBtnHouse.innerHTML+='<div style="width:'+widthBtn+'px; height:'+heightBtn+'px;display:block;"></div>';
	//newBtnHouse.innerHTML+='<div style="width:'+widthBtn+'px; height:'+heightBtn+'px;display:block;"></div>';

	//newBtnHouse.innerHTML+=btnRollOverGFX;
},

storeDateEffectDivs:function(btnDateInfo,newBtnHouse)
{
	if(btnDateInfo)	{ postDateElements.push(newBtnHouse); } 
	else {            preDateElements.push(newBtnHouse);  }
},

webFontButtonTidy:function(langChoice,divID,btnCont,btnPadX,btnPadY,totalWidth,totalHeight)
{
	if(langChoice == "uaear" || langChoice == "ksaar") {
		TweenMax.set(divID,{y:"+=1"});
		var widthBtn  = Math.floor((Math.round((btnCont.children[0].getAttribute("width").split("px")[0]))+(btnPadX*2)+(totalWidth))*0.35);
	} else if(langChoice == "ru") {
		TweenMax.set(divID,{y:"-=1"});
		var widthBtn  = Math.floor((Math.round((btnCont.children[0].getAttribute("width").split("px")[0]))+(btnPadX*2)+(totalWidth))*0.35);
	} else {
	 	
	}
},

spreadOutButtons:function(divID,gapYBetween)
	{
		for (var i = 0; i < divID.children.length; i++) {
		TweenMax.set(divID.children[i],{y:gapYBetween*i});
	}
},

giveButtonAction:function(btn,nameOfTrigger,functionName)
{
	if(btn._hasClickHandler) return;
	    var cta_path = $(btn)._("#"+nameOfTrigger).lastChild._("rect");
	   
	    cta_path.mouseEnabled = true;
	    cta_path.buttonMode = true;

	    if (typeof amazon == 'undefined')
	    {
	    	cta_path.addEventListener("mouseover", python.onCtaOver);
	    }
	    else
	    {
	    	console.log("\nThis is an Amazon creative so rollover on CTA is OFF\n\n");
	    }

	    cta_path.addEventListener("click", function(event){
	    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	    var target = event.target || event.srcElement;
	    var phase = event.eventPhase;
	    python.onCtaClicked(functionName);
	    
	});
	     
	btn._hasClickHandler = true;
},

onCtaOver:function(event) 
{
	event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	var target = event.target || event.srcElement;
	var phase = event.eventPhase;
	var whatbtn = target.parentNode.parentNode.parentNode.id;
	log(whatbtn);
	python.btnFlash($(whatbtn),target.parentNode.parentNode.id);
},

btnFlash:function(btn,btnflashGFX)
{
	TweenMax.set(btnflashGFX,{alpha:0});
	TweenMax.from(btnflashGFX,0.25,{alpha:1});
},

onCtaClicked:function(functionName) { log("\nonCtaClicked\n\n");  window[functionName](arguments); },

/*$$$$$\   $$$$$$\ $$$$$$$$\ $$$$$$$$\ 
$$  __$$\ $$  __$$\\__$$  __|$$  _____|
$$ |  $$ |$$ /  $$ |  $$ |   $$ |      
$$ |  $$ |$$$$$$$$ |  $$ |   $$$$$\    
$$ |  $$ |$$  __$$ |  $$ |   $$  __|   
$$ |  $$ |$$ |  $$ |  $$ |   $$ |      
$$$$$$$  |$$ |  $$ |  $$ |   $$$$$$$$\ 
\_______/ \__|  \__|  \__|   \______*/

setUpDateGFX:function(divID,textArray,langChoice)
{
	//log("\nsetUpDateGFX\n\n");
			  divID.innerHTML = "";
	for (var i = 0; i < textArray.length; i++) {
	    // textArray[i]
	    strapCounter++;
	    var tffont = fontArray[1]["dateFont"];
	    var tfText = textArray[i]['dateText'];
	    var tfSubText = textArray[i]['dateSupScript'];
	    var tfTextSize = textArray[i]['dateFontSize'];
	    var tfColor = textArray[i]['dateColour'];//textArray[i]['strapColour'];   
	    var tfDateEffect = textArray[i]['dateEffect'];  
	    var dateBox = [];	      

	    if(langChoice == "pl" || langChoice == "tch" || langChoice == "ru" || langChoice == "uaear" || langChoice == "ksaar" || langChoice == "tw"){
	        var tffont = "Arial,'Helvetica Neue',Helvetica,sans-serif;";
	        var tf = document.createElement("div");
	        	tf.innerHTML = tfText;
	        	tf.id = "dateTextDIV";
	        	
	        divID.style.cssText +="text-align:center;";
	        tf.setAttribute("width",divID.style.width);
	        tf.setAttribute("height",divID.style.height);
	        tf.className = "do";
	        tf.style.cssText += "font-size:"+tfTextSize+"px; font-family:"+tffont+"; font-weight:bold;color:"+tfColor+";";

	        if(langChoice == "uaear" || langChoice == "ksaar"){
 				tf.style.cssText += "letter-spacing: 2px;";
 				TweenMax.set(mc_date, {y: '-=12'});
	        }
	        else if(langChoice == "tch"){
 				tf.style.cssText += "letter-spacing:"+(tfTextSize*0.15)+"px;/*left:-42%;margin-left:10%;*/top:-"+(tfTextSize*0.6)+"px";
 				TweenMax.set(mc_date, {y: '-=3'});
 				TweenMax.set(mc_strapline, {y: '-=1'});
	        }else{
	           	tf.style.cssText += "letter-spacing:"+(tfTextSize*0.15)+"px;/*left:-42%;margin-left:10%;*/top:-"+(tfTextSize*0.6)+"px";
	        }
	        
	        divID.appendChild(tf);

	        tf.parentNode.style.width = python.fromRussiaWithLove(tfText.length*tfTextSize)+"px";

			//tf._x = -Math.round(parseInt(tf.getAttribute("width"))) * 0.5;

			dateTextDivWidth = dateTextDIV.offsetWidth;

			TweenMax.set(dateTextDIV, {x: '-='+(dateTextDivWidth*0.5)});

	        python.addSVGShadow(tf);

	    }
	    else
	    {	        		
	        // var tf = TextField({font:tffont, normal:tffont},tfText,tfTextSize,Math.floor(tfTextSize*0.15),0,"center",tfColor); 

	        var tf = TextField({normal:tffont},tfText,tfTextSize,Math.floor(tfTextSize*fontArray[1]["dateKerning"]),0,"center",tfColor); 
	        tf.id = "text_"+strapCounter;
	        divID.appendChild(tf);    	            
	        tf._x = -Math.round(parseInt(tf._("svg").getAttribute("width"))) * 0.5;
	        tf._y = -Math.round(parseInt(tf._("svg").getAttribute("height"))) * 0.5;
	           	
	        python.addSVGShadow(tf._("svg"));
	           			
	    }
	           
	//log(tfDateEffect);

	    if(textArray[i]['dateEffect'] != undefined)
	    { 
			if(textArray[i]['datePost'])
			{
			  postDateElements.push(tf);
			} else {
			   preDateElements.push(tf);
			}
	    }	           
	}

},
	
fromRussiaWithLove:function( widthOfText)
{
	widthOfWebTextParent.push(widthOfText*1.2);
    var widestPoint = Math.max.apply(null, widthOfWebTextParent);

    return widestPoint;
},

sortOutDateElements:function(dateArrayPre,dateArrayPost)
{
	if(out){
	    fbf.displayNone(dateArrayPre);
	    fbf.displayBlock(dateArrayPost);
	} else {
	    fbf.displayBlock(dateArrayPre);
	    fbf.displayNone(dateArrayPost);
	}
},

addSVGShadow:function(svgID)
{
	svgID.style.cssText += "filter: drop-shadow(2px 2px 2px rgba(0,0,0,1));-webkit-filter: drop-shadow(2px 2px 2px rgba(0,0,0,1));-ms-filter: 'progid:DXImageTransform.Microsoft.Dropshadow(OffX=12, OffY=12, Color='#444')';filter: 'progid:DXImageTransform.Microsoft.Dropshadow(OffX=12, OffY=12, Color='#444')';";
},

findMyLocInDom:function(divID)
{
	var location;
	var arrayOfDom = divID.parentNode.children;
	for (var i = 0; i <arrayOfDom.length; i++) {
		if(arrayOfDom[i].id == divID.id)
		{
			location = i+1;
		}
	}	
	
	return location;
},

/*$$$$$\  $$\   $$\ $$$$$$\ $$\      $$\  $$$$$$\ $$$$$$$$\ $$$$$$\  $$$$$$\  $$\   $$\ 
$$  __$$\ $$$\  $$ |\_$$  _|$$$\    $$$ |$$  __$$\\__$$  __|\_$$  _|$$  __$$\ $$$\  $$ |
$$ /  $$ |$$$$\ $$ |  $$ |  $$$$\  $$$$ |$$ /  $$ |  $$ |     $$ |  $$ /  $$ |$$$$\ $$ |
$$$$$$$$ |$$ $$\$$ |  $$ |  $$\$$\$$ $$ |$$$$$$$$ |  $$ |     $$ |  $$ |  $$ |$$ $$\$$ |
$$  __$$ |$$ \$$$$ |  $$ |  $$ \$$$  $$ |$$  __$$ |  $$ |     $$ |  $$ |  $$ |$$ \$$$$ |
$$ |  $$ |$$ |\$$$ |  $$ |  $$ |\$  /$$ |$$ |  $$ |  $$ |     $$ |  $$ |  $$ |$$ |\$$$ |
$$ |  $$ |$$ | \$$ |$$$$$$\ $$ | \_/ $$ |$$ |  $$ |  $$ |   $$$$$$\  $$$$$$  |$$ | \$$ |
\__|  \__|\__|  \__|\______|\__|     \__|\__|  \__|  \__|   \______| \______/ \__|  \_*/

animateStraplines:function(divID, delay)
{
	if(straplinesLength==1)
	{
		python.animateSimpleFadeUp(mc_strapline, 3);
	}
	else
	{
		for (i = 0; i < straplinesLength; i++)
  		{
			var strapline = mc_strapline.children[i];

			if(i==0) // IF IT'S THE FIRST ONE
			{
				TweenMax.from(strapline, 1, {alpha:0, delay: delay});
				TweenMax.to(strapline, 1, {alpha:0, delay: delay+delayBetweenStraplines});
			}
			else if(i==straplinesLength-1) // IF IT'S THE LAST ONE
			{
				TweenMax.from(strapline, 1, {alpha:0, delay: delay+(delayBetweenStraplines*i)+1});
			}
			else
			{
				TweenMax.from(strapline, 1, {alpha:0, delay: delay+delayBetweenStraplines*i+1});
				TweenMax.to(strapline, 1, {alpha:0, delay: delay+(delayBetweenStraplines*i+1)+(delayBetweenStraplines*i)});
			}
        	
		}
	}	
},

animateLockup:function(divID, wait)
{
	fbf.show(divID);
	var initialScale = divID._scaleX;

	TweenMax.set(divID, {alpha:0});

	TweenMax.to(divID, 0.2, {alpha: 1, ease: Back.easeIn.config(1), delay: wait});
	TweenMax.from(divID, 0.4, {scale: initialScale*5, ease: Back.easeInOut.config(1), delay: wait, onComplete: python.glitchEffect});
	
	var doesElementExist = document.getElementById("mc_white");

	if(doesElementExist != null)
	{
		python.whiteFlash(0.1, wait+0.25);
	}
	
},

whiteFlash:function(speed, delay)
{
	fbf.show(mc_white);
	TweenMax.set(mc_white, {alpha: 0});
	TweenMax.to(mc_white, speed, {alpha: 0.5, delay: delay});
	TweenMax.to(mc_white, speed, {alpha: 0, delay: delay+speed});
},

glitchEffect:function()
{
	python.animateGlitch(mc_OAZ_logo, 0.25);
},

fadeDownAndDisplayNone:function(divID)
{
	TweenMax.to(divID,2,{alpha:0,onComplete:fbf.displayNone,onCompleteParams:[divID]});
},

animateLogo:function(divID,wait) 
{
	fbf.show(divID);
	var initialScale = divID._scaleX;

	TweenMax.set(divID,{alpha:0});

	TweenMax.to(divID, 0.1, {alpha: 1, delay: wait});
	TweenMax.from(divID, 0.2, {scale: initialScale*3, ease: Back.easeOut.config(1), delay: wait});
},

animateDate:function(divID,wait)
{
	//log("animateDate: "+divID);
	fbf.show(divID);
   	var initialScale = divID._scaleX;

	TweenMax.from(mc_date,1,{alpha:0, scale:initialScale*1.1, ease:Power1.easeOut, delay:wait});
},

animateSimpleFadeUp:function(divID,wait)
{
	fbf.show(divID);
	TweenMax.from(divID,0.5,{alpha:0, delay:wait});
},

animateStrap:function(divID,wait)
{
	fbf.show(divID);
	var initialScale = divID._scaleX;  
	TweenMax.set(divID,{alpha:0});
	TweenMax.set(divID,{alpha:1,delay:wait});
	TweenMax.from(divID,0.2,{scale:initialScale*5,ease: Expo.easeOut,delay:wait});
	TweenMax.to(divID,0.1,{scale:initialScale*0.98,delay:wait+0.2});

	if($('cv_strapline')){
		TweenMax.from($('cv_strapline'),4,{alpha:0});
	};
	
	TweenMax.to(divID,0.1,{scale:initialScale*1,delay:wait+0.4});
},

animateRating:function(divID,wait)
{ 
	fbf.show(divID);
	TweenMax.from(divID,0.5,{alpha:0,delay:wait});
},

animateBackgroundResp:function(divID,wait,transformPerc)
{
	fbf.show(divID);
	TweenMax.set(divID);
	fbf.show(divID);
	var initialScale = divID._scaleX;   
	TweenMax.from(divID,3,{scale:initialScale*2,ease: Expo.easeOut,delay:wait,transformOrigin:transformPerc});
},

animateBackground:function(divID,wait,transformPerc)
{
	fbf.show(divID);

	if (typeof amazon == 'undefined'){

		// play as normal.
	    TweenMax.from(divID,4,{transformOrigin: transformPerc, scale:1.5, ease: Expo.easeOut, delay:wait});
	
	}
	else 
	{

		// speed up animation for Amazon banners as they have fewer assets.
	    TweenMax.from(divID,2,{transformOrigin: transformPerc, scale:1.5, ease: Expo.easeOut, delay:wait});
	
	}
},

animateForeground:function(divID,wait,transformPerc)
{
	 fbf.show(divID);

	 if (typeof amazon == 'undefined'){

	 	// play as normal.
	    TweenMax.from(divID,4,{transformOrigin: transformPerc, scale:2, ease: Expo.easeOut, delay:wait});
	
	}
	else 
	{

		// speed up animation for Amazon banners as they have fewer assets.
	    TweenMax.from(divID,2,{transformOrigin: transformPerc, scale:2, ease: Expo.easeOut, delay:wait});
	
	}
},

btnGrow:function(divID,wait)
{
	TweenMax.set(divID, {scaleX:0, scaleY:0});
	TweenMax.to(divID, 0.5, {scaleY:1, ease: Back.easeOut, delay: wait});
	TweenMax.to(divID, 0.1, {scaleX:0.05, ease: Expo.easeOut, delay: wait});
	TweenMax.to(divID, 0.5, {scaleX:1, ease: Expo.easeOut, delay: wait+0.4});
	TweenMax.set(divID.children[3],{alpha:1});
	TweenMax.to(divID.children[3],0.5,{alpha:0, ease: Elastic.easeIn.config(2, 0.2), delay: wait +0.3});
},

animateButton:function(divID,wait)
{
	  TweenMax.set(divID,{alpha:0, transformOrigin:"50% 50%"});
	  TweenMax.set(divID,{alpha:1,delay:wait});
	  TweenMax.delayedCall(wait,python.btnGrow,[divID,0]);
},

showChosenButton:function(chosenButton)
{
	fbf.show($(chosenButton));
},

/*$$$$$$\ $$$$$$$$\ $$\   $$\ $$$$$$$$\             $$\       $$$$$$$$\  $$$$$$\  $$\   $$\ $$$$$$$$\  $$$$$$\  
\__$$  __|$$  _____|$$ |  $$ |\__$$  __|           $$  |      $$  _____|$$  __$$\ $$$\  $$ |\__$$  __|$$  __$$\ 
   $$ |   $$ |      \$$\ $$  |   $$ |             $$  /       $$ |      $$ /  $$ |$$$$\ $$ |   $$ |   $$ /  \__|
   $$ |   $$$$$\     \$$$$  /    $$ |            $$  /        $$$$$\    $$ |  $$ |$$ $$\$$ |   $$ |   \$$$$$$\  
   $$ |   $$  __|    $$  $$<     $$ |           $$  /         $$  __|   $$ |  $$ |$$ \$$$$ |   $$ |    \____$$\ 
   $$ |   $$ |      $$  /\$$\    $$ |          $$  /          $$ |      $$ |  $$ |$$ |\$$$ |   $$ |   $$\   $$ |
   $$ |   $$$$$$$$\ $$ /  $$ |   $$ |         $$  /           $$ |       $$$$$$  |$$ | \$$ |   $$ |   \$$$$$$  |
   \__|   \________|\__|  \__|   \__|         \__/            \__|       \______/ \__|  \__|   \__|    \_____*/ 

createPS4exclusiveText:function(div_to_append, text, fontSize, letterSpacing, lineHeight, xPOS, yPOS)
{

  var div = document.createElement("div");
  div.id = "PS4exclusiveText";

  div_to_append.appendChild(div);

  TweenMax.set(PS4exclusiveText, {x: xPOS, y: yPOS});

  python.PS4ExclusiveTextFontSetup(PS4exclusiveText, text, letterSpacing, lineHeight, config.lang, fontSize);

},

straplineFontSetup:function(divID,textArray,langChoice) //how to centre this
{
    if(langChoice == "pl" || langChoice == "ru" || langChoice == "uaear")
    {
    	python.webFontRouteSetup(divID,textArray,"straplineText",langChoice);
    } 
    else
    {
     	divID.innerHTML = ""; 
	    divWidth = parseInt(divID.style.width.split("px")[0]);

	    for (var i = 0; i < textArray.length; i++)
	    {
	        strapCounter++;
	        var tffont = fontArray[2]["straplineFont"];
	        var tfText = textArray[i]['strapText'];
	        var tfTextSize = textArray[i]['strapFontSize'];
	        var tfLineHeight = textArray[i]['strapLineHeight'];
	        var tfColor = textArray[i]['strapColour'];   
	        var tfDateEffect = textArray[i]['dateEffect'];     
	        var tf = TextField(tffont,tfText,tfTextSize,-1,tfLineHeight,"center",tfColor);   
	        tf.id = "text_"+strapCounter;  
	        divID.appendChild(tf); 

	        if(textArray[i]['dateEffect'] != undefined)
	        { 
	            if(textArray[i]['datePost'])
	            {
	              postDateElements.push(tf);
	            }
	            else
	            {
	               preDateElements.push(tf);
	            }
	        }

	        tf._x = -Math.round(parseInt(tf._("svg").getAttribute("width"))) * 0.5;
	        tf._y = -Math.round(parseInt(tf._("svg").getAttribute("height"))) * 0.5;
	        log(tfDateEffect);
		}
	} 
},

PS4ExclusiveTextFontSetup:function(divID,text,letterSpacing,lineHeight,langChoice,fontSize)
{	    

	if(langChoice == "pl" || langChoice == "tch" || langChoice == "ru" || langChoice == "uaear" || langChoice == "ksaar" || langChoice == "tw"){
	
		divID.innerHTML = ""; 
		divWidth = divID.offsetWidth;

		var tffont = "Arial,'Helvetica Neue',Helvetica,sans-serif;";

		var tf = document.createElement("div");
			tf.id = divID.id+"_text";

			tf.innerHTML = text;

		divID.style.cssText +="text-align:center;";

	    tf.className = "do";
	    tf.style.cssText += "font-size:"+fontSize+"px; font-family:"+tffont+"; font-weight:bold;color:"+"#FFFFFF"+";";

	    divID.appendChild(tf);

	    var sup = document.getElementsByTagName('sup')[0];

	    console.log(sup);

	   	sup.style.fontSize = "50%";
	   	sup.style.top = "-0.0em";

	    //var sup = document.getElementById('supText');console.log(sup);

		divID.style.width = divID.children[0].getAttribute("width");

		tf.parentNode.style.width = python.fromRussiaWithLove(text.length*fontSize)+"px";

		divWidth = divID.offsetWidth;

		offeringTextDivWidth = tf.offsetWidth;

		TweenMax.set(tf, {x:"-="+(offeringTextDivWidth*0.5)});
		
	    python.addSVGShadow(tf);
        
        console.log("\n\n WEB FONT OFFERING TEXT SETUP \n\n\n");
	        
	}
	else
	{

		//console.log('%c\n\nPS4ExclusiveTextFontSetup();\n\n'+text+'\n\n','background: #000000; color: #FFFFFF');

			divID.innerHTML = ""; 
			divWidth = parseInt(divID.style.width.split("px")[0]);

			var tffont = fontArray[3]["introFont"];



			//var tf = TextField(tffont,text,fontSize,letterSpacing,0,"center","#FFFFFF");
	        var tf = TextField({normal:tffont},text,fontSize,letterSpacing,lineHeight,"center","#FFFFFF"); 
				tf.id = "text_intro";
				python.addSVGShadow(tf);

			divID.appendChild(tf);

			divID.style.width = divID.children[0]._("svg").getAttribute("width");
			divWidth = parseInt(divID.style.width.split("px")[0]);

			divID.style.height = divID.children[0]._("svg").getAttribute("height");
			divHeight = parseInt(divID.style.height.split("px")[0]);

			TweenMax.set(divID.children[0],{x:(0-divWidth*0.5), y: (0-divHeight*0.5)});

	}

},

introTextFontSetup:function(divID,text,langChoice,fontSize)
{	    

	if(langChoice == "pl" || langChoice == "tch" || langChoice == "ru" || langChoice == "uaear" || langChoice == "ksaar" || langChoice == "tw"){
	
		divID.innerHTML = ""; 
		divWidth = divID.offsetWidth; //parseInt(divID.style.width.split("px")[0]);

		var tffont = "Arial,'Helvetica Neue',Helvetica,sans-serif;";

		var tf = document.createElement("div");
			tf.id = divID.id+"_text";

			tf.innerHTML = text;

		divID.style.cssText +="text-align:center;";

	    tf.className = "do";
	    tf.style.cssText += "font-size:"+fontSize+"px; font-family:"+tffont+"; font-weight:bold;color:"+"#FFFFFF"+";";

	    /*
	    if(langChoice == "tch"){
 			tf.style.cssText += "letter-spacing:"+(fontSize*0.1)+"px;";
 			TweenMax.set(mc_date, {y: '+=4'});
	    }
	    */

	    divID.appendChild(tf);

		divID.style.width = divID.children[0].getAttribute("width");

		tf.parentNode.style.width = python.fromRussiaWithLove(text.length*fontSize)+"px";

		divWidth = divID.offsetWidth;

		offeringTextDivWidth = tf.offsetWidth;

		TweenMax.set(tf, {x:"-="+(offeringTextDivWidth*0.5)});
		
	    python.addSVGShadow(tf);
        
        console.log("\n\n WEB FONT OFFERING TEXT SETUP \n\n\n");
	        
	}
	else
	{

		//console.log('%c\n\nintroTextFontSetup();\n\n'+text+'\n\n','background: #000000; color: #FFFFFF');

			divID.innerHTML = ""; 
			divWidth = parseInt(divID.style.width.split("px")[0]);

			var tffont = fontArray[3]["introFont"];

			var tf = TextField(tffont,text,fontSize,-3,0,"center","#FFFFFF");
				tf.id = "text_intro";
				python.addSVGShadow(tf);

			divID.appendChild(tf);

			divID.style.width = divID.children[0]._("svg").getAttribute("width");
			divWidth = parseInt(divID.style.width.split("px")[0]);

			divID.style.height = divID.children[0]._("svg").getAttribute("height");
			divHeight = parseInt(divID.style.height.split("px")[0]);

			TweenMax.set(divID.children[0],{x:(0-divWidth*0.5), y: (0-divHeight*0.5)});

	}

},

straplineSetup:function(divID, text, langChoice, fontSize)
{
	if(langChoice == "pl" || langChoice == "tch" || langChoice == "ru" || langChoice == "uaear" || langChoice == "ksaar" || langChoice == "tw"){
	
		divID.innerHTML = ""; 
		divWidth = divID.offsetWidth;

		var tffont = "Arial,'Helvetica Neue',Helvetica,sans-serif;";

		var allText = text[0]+' | '+text[1]+' | '+text[2];

		var tf = document.createElement("div");
			tf.innerHTML = allText;
			tf.id = "text_offering";

		divID.style.cssText +="text-align:center;";

		tf.setAttribute("width",divID.style.width);
	    tf.setAttribute("height",divID.style.height);
	    tf.className = "do";
	    tf.style.cssText += "font-size:"+fontSize+"px; font-family:"+tffont+"; font-weight:bold;color:"+"#E77000"+";";

	    if(langChoice == "tch"){
 			tf.style.cssText += "letter-spacing:"+(fontSize*0.1)+"px;";
 			TweenMax.set(mc_date, {y: '+=4'});
	    }

	    divID.appendChild(tf);

		divID.style.width = divID.children[0].getAttribute("width");

		tf.parentNode.style.width = python.fromRussiaWithLove(allText.length*fontSize)+"px";

		divWidth = divID.offsetWidth;

		offeringTextDivWidth = text_offering.offsetWidth;

		TweenMax.set(text_offering, {x:"-="+(offeringTextDivWidth*0.5)});

		
	    python.addSVGShadow(tf);
     	
     	console.log("\n\n WEB FONT OFFERING TEXT SETUP \n\n\n");
	    
	}

	else
	
	{	

		console.log("%c\n"+straplinesLength+" strapline(s) in the config\n", 'font-weight: bold;');

		if(straplinesLength==1)
		{
			var strapline = straplines.splice(Math.floor(Math.random()*straplines.length),1);

			console.log('%c\nstraplineSetup: '+ strapline[0].strapText +'\n','color: #000000; font-weight: bold;');

			divWidth = parseInt(divID.style.width.split("px")[0]);

			var tffont = fontArray[2]["straplineFont"];

			var tf = TextField(tffont, strapline[0].strapText, fontSize, 0, 0, "center", "#E77000");
				tf.id = "strapline_text";

			divID.appendChild(tf);

			divID.style.width = divID.children[0]._("svg").getAttribute("width");
			divWidth = parseInt(divID.style.width.split("px")[0]);

			TweenMax.set(divID.children[0],{x:(0-divWidth*0.5)});

		}
		else
		{
			
			divWidth = parseInt(divID.style.width.split("px")[0]);
			var tffont = fontArray[2]["straplineFont"];

			for (i = 0; i < straplinesLength; i++)
  			{
  				var strapline = straplines[i];

  				console.log('%c\nstraplineSetup: '+ strapline.strapText +'\n','color: #000000; font-weight: bold;');

  				var tf = TextField(tffont, strapline.strapText, fontSize, 0, 0, "center", "#E77000");
				tf.id = "strapline_text_"+i;

				divID.appendChild(tf);

				divID.style.width = divID.children[0]._("svg").getAttribute("width");
				divWidth = parseInt(divID.style.width.split("px")[0]);

				//TweenMax.set(divID.children,{x:(0-divWidth*0.5)});
				
			}

			var halfPoint = WID*0.5;

			for (i = 0; i < straplinesLength; i++)
  			{
  				var straplineDIV = divID.children[i];

  				var straplineDIVwidth = divID.children[i].children[0].clientWidth;

  				var halfStraplineDIVwidth = straplineDIVwidth*0.5;

				TweenMax.set(straplineDIV, {x: 0-halfStraplineDIVwidth});
				
			}

			
		}
	}

},

AccoladeFontSetup:function(divID,textArray,langChoice,inbetween) //how to centre this
{     
	if(langChoice == "pl" || langChoice == "ru" || langChoice == "uaear" || langChoice == "ksaar")
	{
		python.webFontRouteSetup(divID,textArray,"straplineText",langChoice);
	} 
	else
	{
	    divID.innerHTML = ""; 
		divWidth = parseInt(divID.style.width.split("px")[0]);
		for (var i = 0; i < textArray.length; i++) {

		strapCounter++;
		var tffont 				= "arvofontGFX";

		var tfText 				= textArray[i]['strapText'];
		var tfTextSize 			= textArray[i]['strapFontSize'];
		var tfLineHeight 		= textArray[i]['strapLineHeight'];
		var tfColor 			= textArray[i]['strapColour'];   

		var tfAuthText 			= textArray[i]['strapTextAuthor'];
		var tfAuthTextFtSize 	= textArray[i]['strapTextAuthorFontSize'];
		var tfAuthTextColour 	= textArray[i]['strapTextAuthorColour'];

		var tfDateEffect = textArray[i]['dateEffect'];     
		var tf = TextField(tffont,tfText,tfTextSize,0,tfLineHeight,"center",tfColor);   
		var tfa = TextField(tffont,tfAuthText,tfAuthTextFtSize,0,tfLineHeight,"center",tfAuthTextColour);   
		tf.id = "text_"+strapCounter;  
		tfa.id = "text_author_"+strapCounter;
		divID.appendChild(tf); 
		divID.appendChild(tfa);
		if(textArray[i]['dateEffect'] != undefined)
		{ 
		    if(textArray[i]['datePost'])
		    {
		      postDateElements.push(tf);
		    } else {
		       preDateElements.push(tf);
		    }
		}
		    tf._x = -Math.round(parseInt(tf._("svg").getAttribute("width"))) * 0.5;
		    tf._y = -Math.round(parseInt(tf._("svg").getAttribute("height"))) * 0.5;

		    tfa._x = -Math.round(parseInt(tfa._("svg").getAttribute("width"))) * 0.5;
		    if(inbetween)
		    {
		        tfa._y = tf._y*0.4;
		    } 
		    else 
		    {
		        tfa._y = -tf._y;      
		    }

		python.addSVGShadow(tf._("svg"));
		python.addSVGShadow(tfa._("svg"));
		}
	} 
},

webFontRouteSetup:function(divID,textArray,nameForBox,langChoice)
{
	divID.innerHTML = "";
	var tffont = "Arial,'Helvetica Neue',Helvetica,sans-serif;";

	for (var i = 0; i < textArray.length; i++) 
	{
		var webtextHouse = document.createElement("div");
		    webtextHouse.id = nameForBox+"_"+i;		        		
		var tfText = textArray[i]['strapText'];
		var tfFontSize = textArray[i]['strapFontSize'];
		var tfLineHeight = textArray[i]['strapLineHeight'];
		var tfDateEffect = textArray[i]['dateEffect'];  
		var widthOfParent = parseInt(divID.style.width.split("px")[0]);
		
		if(langChoice == "uaear" || langChoice == "ksaar")
		{
		    var heightOfParent = parseInt(divID.style.height.split("px")[0])+20;
		} 
		else 
		{
		    var heightOfParent = parseInt(divID.style.height.split("px")[0]);
		}
		    webtextHouse.id = nameForBox+"_"+i;
			webtextHouse.style.cssText = "/*background-color:#990000;*/ color:#fff;width:"+(widthOfParent*4)+"px; height:"+(heightOfParent)+"px; left:-"+(widthOfParent*2)+"px; line-height:"+tfFontSize+"px; top:-"+(heightOfParent*1.5)+"px;position:absolute; font-family:"+tffont+" text-align:center; font-weight:bold; font-size:"+tfFontSize+"px;";
					
			webtextHouse.innerHTML +=tfText;
			divID.appendChild(webtextHouse);

		    if(textArray[i]['dateEffect'] != undefined)
		    { 
		        if(textArray[i]['datePost'])
		        {
		            postDateElements.push(webtextHouse);
		        } else {
		            preDateElements.push(webtextHouse);
		        }
		    }	
	}
},

buttonFontSetup:function(divID, btnArray, langChoice)
{
	divID.innerHTML ="";

	var tffont = "buttonTextGFX";

	if(langChoice == "pl"   ) { python.buttonPolishWebFontRouteSetup(divID,btnArray,"buttonText",langChoice); } else 
	if(langChoice == "ru"   ) { python.buttonRussianWebFontRouteSetup(divID,btnArray,"buttonText",langChoice); } else
	if(langChoice == "tch"  ) { python.buttonChineseWebFontRouteSetup(divID,btnArray,"buttonText",langChoice); } else
	if(langChoice == "uaear" || langChoice == "ksaar") { python.buttonArabicWebFontRouteSetup(divID,btnArray,"buttonText",langChoice);
	}
	else 
	{

		for (var i = 0; i < btnArray.length; i++)
		{			              
			var tfText = btnArray[i]['buttonText'];
			var letterSpacing = btnArray[i]['letterSpacing'];
			var tfFontSize = btnArray[i]['buttonFontSize'];
			var btnFunction = btnArray[i]['buttonFunction'];
			var btnDateDeets = btnArray[i]['dateEffect'];
			var btnDatePost = btnArray[i]['datePost'];
			var btnID = btnArray[i]['buttonID'];

			var tf = TextField(tffont,tfText,tfFontSize, letterSpacing, -5,"left","#000000");
			python.createBtn(divID, tf, tfFontSize*0.5, tfFontSize*0.4, btnID, "255,153,0,1", "29,29,27,0.9", btnFunction, btnDateDeets, btnDatePost, python.howmanylines(tfText),false);		      
		}
	}
},

buttonPolishWebFontRouteSetup:function(divID,btnArray,nameForBox,langChoice)
	{
	log("%c\n\n   PolishFontRoute   \n\n\n", 'background: #000000; color: #FFFFFF');
	divID.innerHTML = "";
	var tffont = "Arial, Helvetica, tahoma, verdana, 宋体, SimSun, 华文细黑, STXihei, sans-serif;";
	for (var i = 0; i < btnArray.length; i++) 
	{
		var webtextHouse = document.createElement("div");
			webtextHouse.id = nameForBox+"_"+i;		        		
		var widthOfParent = parseInt(divID.style.width.split("px")[0]);
		var heightOfParent = parseInt(divID.style.height.split("px")[0]);
	
		var tfText = btnArray[i]['buttonText'];
		var tfFontSize = btnArray[i]['buttonFontSize'];
		var btnFunction = btnArray[i]['buttonFunction'];
		var btnDateDeets = btnArray[i]['dateEffect'];
		var btnDatePost = btnArray[i]['datePost'];
		var btnID = btnArray[i]['buttonID'];
		var textlineNumbers = tfText.split("<br />");

		var lineLength = python.findLongWord(textlineNumbers);		
	 	var widthLength = ((lineLength.length*tfFontSize)*0.65); 
		var heightLength = (textlineNumbers.length*tfFontSize);
			webtextHouse.id = nameForBox+"_"+i;
			webtextHouse.style.width = (widthLength)+"px";
			webtextHouse.style.height = (heightLength)+"px";
			webtextHouse.className = "do";
	
		webtextHouse.innerHTML +='<div class="do" width="'+((widthLength))+'px" height="'+(heightLength)+'px" style="width:'+(widthLength*1.5)+'px;color:#fff;font-family:'+tffont+';font-size:'+tfFontSize+'px;">'+tfText+'</div>';
		python.createBtn(divID,webtextHouse,tfFontSize*0.9,tfFontSize*0.5,btnID,"255,153,0,1","29,29,27,0.9",btnFunction,btnDateDeets,btnDatePost,python.howmanylines(tfText),false,langChoice);
	}
},

buttonRussianWebFontRouteSetup:function(divID,btnArray,nameForBox,langChoice)
{
	log("\nRussianFontRoute\n\n");
	divID.innerHTML = "";
	var tffont = "Arial, Helvetica, tahoma";
	
	for (var i = 0; i < btnArray.length; i++) 
	{
		//log(btnArray[i]);
			 var webtextHouse = document.createElement("div");		                        		
	         var widthOfParent = parseInt(divID.style.width.split("px")[0]);
	         var heightOfParent = parseInt(divID.style.height.split("px")[0]);

	        var tfText = btnArray[i]['buttonText'];
	        var tfFontSize = btnArray[i]['buttonFontSize'];
	        var btnFunction = btnArray[i]['buttonFunction'];
	        var btnDateDeets = btnArray[i]['dateEffect'];
	        var btnDatePost = btnArray[i]['datePost'];
	        var btnID = btnArray[i]['buttonID'];
	        var textlineNumbers = tfText.split("<br />");
	        var lineLength = python.findLongWord(textlineNumbers);		
			var widthLength = ((lineLength.length*tfFontSize)*0.65); 
	        var heightLength = (textlineNumbers.length*tfFontSize*1.1);
	         	webtextHouse.id = nameForBox+"_"+i;
	         	webtextHouse.style.width = (widthLength)+100+"px";
				webtextHouse.style.height = (heightLength)+"px";
				webtextHouse.className = "do";
		        webtextHouse.innerHTML +='<div class="do" width="'+(widthLength)+'px" height="'+(heightLength)+'px" style="color:#fff;font-family:'+tffont+';font-size:'+tfFontSize+'px;">'+tfText+'</div>';
				python.createBtn(divID,webtextHouse,tfFontSize*0.8,tfFontSize*0.6,btnID,"255,153,0,1","29,29,27,0.9",btnFunction,btnDateDeets,btnDatePost,textlineNumbers.length,false,langChoice);
	}
},

buttonChineseWebFontRouteSetup:function(divID,btnArray,nameForBox,langChoice)
{

	log("%c\n\n   ChineseFontRoute   \n\n\n", 'background: #000000; color: #FFFFFF');
	divID.innerHTML = "";
	var tffont = "Arial, Helvetica, tahoma, verdana, 宋体, SimSun, 华文细黑, STXihei, sans-serif;";
	for (var i = 0; i < btnArray.length; i++) 
	{
		var webtextHouse = document.createElement("div");
			webtextHouse.id = nameForBox+"_"+i;		        		
		var widthOfParent = parseInt(divID.style.width.split("px")[0]);
		var heightOfParent = parseInt(divID.style.height.split("px")[0]);
	
		var tfText = btnArray[i]['buttonText'];
		var tfFontSize = btnArray[i]['buttonFontSize'];
		var btnFunction = btnArray[i]['buttonFunction'];
		var btnDateDeets = btnArray[i]['dateEffect'];
		var btnDatePost = btnArray[i]['datePost'];
		var btnID = btnArray[i]['buttonID'];
		var textlineNumbers = tfText.split("<br />");

		var lineLength = python.findLongWord(textlineNumbers);		
	 	var widthLength = ((lineLength.length*tfFontSize)*1.0); 
		var heightLength = (textlineNumbers.length*tfFontSize);
			webtextHouse.id = nameForBox+"_"+i;
			webtextHouse.style.width = (widthLength)+"px";
			webtextHouse.style.height = (heightLength)+"px";
			webtextHouse.className = "do";
	
		webtextHouse.innerHTML +='<div class="do" width="'+((widthLength))+'px" height="'+(heightLength)+'px" style="width:'+(widthLength*1.5)+'px;color:#fff;font-family:'+tffont+';font-size:'+tfFontSize+'px;">'+tfText+'</div>';
		python.createBtn(divID,webtextHouse,tfFontSize*1,tfFontSize*0.5,btnID,"255,153,0,1","29,29,27,0.9",btnFunction,btnDateDeets,btnDatePost,python.howmanylines(tfText),false,langChoice);
	}
},

buttonArabicWebFontRouteSetup:function(divID,btnArray,nameForBox,langChoice)
{
	log("\nArabicFontRoute\n\n");
	divID.innerHTML = "";
   	var tffont = "Arial, Helvetica, tahoma, verdana, 宋体, SimSun, 华文细黑, STXihei, sans-serif;";
	//var tffont = "Arial,'Helvetica Neue',Helvetica,sans-serif;";
	for (var i = 0; i < btnArray.length; i++) 
	{
	    var webtextHouse = document.createElement("div");
		    webtextHouse.id = nameForBox+"_"+i;		        		
	    var widthOfParent = parseInt(divID.style.width.split("px")[0]);
	    var heightOfParent = parseInt(divID.style.height.split("px")[0]);

	   	var tfText = btnArray[i]['buttonText'];
	    var tfFontSize = btnArray[i]['buttonFontSize'];
	    var btnFunction = btnArray[i]['buttonFunction'];
	    var btnDateDeets = btnArray[i]['dateEffect'];
	    var btnDatePost = btnArray[i]['datePost'];
	    var btnID = btnArray[i]['buttonID'];
	    var textlineNumbers = tfText.split("<br />");
	        // var widestLineOfText = Math.max(textlineNumbers)
	    var lineLength = python.findLongWord(textlineNumbers);		
		var widthLength = ((lineLength.length*tfFontSize)*0.4); 
	    var heightLength = (textlineNumbers.length*tfFontSize);
		webtextHouse.id = nameForBox+"_"+i;
		webtextHouse.style.width = (widthLength)+"px";
		webtextHouse.style.height = (heightLength)+"px";
		webtextHouse.className = "do";
		webtextHouse.innerHTML +='<div class="do" width="'+((widthLength))+'px" height="'+(heightLength)+'px" style="color:#fff;font-family:'+tffont+';font-size:'+tfFontSize+'px;">'+tfText+'</div>';

		python.createBtn(divID,webtextHouse,tfFontSize*0.3,tfFontSize*0.6,btnID,"255,153,0,1","29,29,27,0.9",btnFunction,btnDateDeets,btnDatePost,textlineNumbers.length,false,langChoice);

		/*
		if(config.chosenBtn=="Trailer"){
			// WATCH TRAILER
			python.createBtn(divID,webtextHouse,tfFontSize*0.5,tfFontSize*0.6,btnID,"255,153,0,1","29,29,27,0.9",btnFunction,btnDateDeets,btnDatePost,textlineNumbers.length,false,langChoice);
			
		} else if(config.chosenBtn=="Purchase" && !out){
			// PREORDER
			python.createBtn(divID,webtextHouse,tfFontSize*0.1,tfFontSize*0.6,btnID,"255,153,0,1","29,29,27,0.9",btnFunction,btnDateDeets,btnDatePost,textlineNumbers.length,false,langChoice);
			
		} else {
			// BUY NOW
			python.createBtn(divID,webtextHouse,tfFontSize*0.5,tfFontSize*0.6,btnID,"255,153,0,1","29,29,27,0.9",btnFunction,btnDateDeets,btnDatePost,textlineNumbers.length,false,langChoice);	
					
		}
		*/

	}
}


}