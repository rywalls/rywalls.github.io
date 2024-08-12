var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";_gsScope._gsDefine("easing.CustomEase",["easing.Ease"],function(a){var b=/(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,c=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,d=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,e=/[cLlsS]/g,f="CustomEase only accepts Cubic Bezier data.",g=function(a,b,c,d,e,f,h,i,j,k,l){var m,n=(a+c)/2,o=(b+d)/2,p=(c+e)/2,q=(d+f)/2,r=(e+h)/2,s=(f+i)/2,t=(n+p)/2,u=(o+q)/2,v=(p+r)/2,w=(q+s)/2,x=(t+v)/2,y=(u+w)/2,z=h-a,A=i-b,B=Math.abs((c-h)*A-(d-i)*z),C=Math.abs((e-h)*A-(f-i)*z);return k||(k=[{x:a,y:b},{x:h,y:i}],l=1),k.splice(l||k.length-1,0,{x:x,y:y}),(B+C)*(B+C)>j*(z*z+A*A)&&(m=k.length,g(a,b,n,o,t,u,x,y,j,k,l),g(x,y,v,w,r,s,h,i,j,k,l+1+(k.length-m))),k},h=function(a){var b,e,g,h,i,j,k,l,m,n,o,p=(a+"").replace(d,function(a){var b=+a;return 1e-4>b&&b>-1e-4?0:b}).match(c)||[],q=[],r=0,s=0,t=p.length,u=2;for(b=0;t>b;b++)if(m=h,isNaN(p[b])?(h=p[b].toUpperCase(),i=h!==p[b]):b--,e=+p[b+1],g=+p[b+2],i&&(e+=r,g+=s),b||(k=e,l=g),"M"===h)j&&j.length<8&&(q.length-=1,u=0),r=k=e,s=l=g,j=[e,g],u=2,q.push(j),b+=2,h="L";else if("C"===h)j||(j=[0,0]),j[u++]=e,j[u++]=g,i||(r=s=0),j[u++]=r+1*p[b+3],j[u++]=s+1*p[b+4],j[u++]=r+=1*p[b+5],j[u++]=s+=1*p[b+6],b+=6;else if("S"===h)"C"===m||"S"===m?(n=r-j[u-4],o=s-j[u-3],j[u++]=r+n,j[u++]=s+o):(j[u++]=r,j[u++]=s),j[u++]=e,j[u++]=g,i||(r=s=0),j[u++]=r+=1*p[b+3],j[u++]=s+=1*p[b+4],b+=4;else{if("L"!==h&&"Z"!==h)throw f;"Z"===h&&(e=k,g=l,j.closed=!0),("L"===h||Math.abs(r-e)>.5||Math.abs(s-g)>.5)&&(j[u++]=r+(e-r)/3,j[u++]=s+(g-s)/3,j[u++]=r+2*(e-r)/3,j[u++]=s+2*(g-s)/3,j[u++]=e,j[u++]=g,"L"===h&&(b+=2)),r=e,s=g}return q[0]},i=function(a){var b,c=a.length,d=999999999999;for(b=1;c>b;b+=6)+a[b]<d&&(d=+a[b]);return d},j=function(a,b,c){c||0===c||(c=Math.max(+a[a.length-1],+a[1]));var d,e=-1*+a[0],f=-c,g=a.length,h=1/(+a[g-2]+e),j=-b||(Math.abs(+a[g-1]-+a[1])<.01*(+a[g-2]-+a[0])?i(a)+f:+a[g-1]+f);for(j=j?1/j:-h,d=0;g>d;d+=2)a[d]=(+a[d]+e)*h,a[d+1]=(+a[d+1]+f)*j},k=function(a){var b=this.lookup[a*this.l|0]||this.lookup[this.l-1];return b.nx<a&&(b=b.n),b.y+(a-b.x)/b.cx*b.cy},l=function(b,c,d){this._calcEnd=!0,this.id=b,b&&(a.map[b]=this),this.getRatio=k,this.setData(c,d)},m=l.prototype=new a;return m.constructor=l,m.setData=function(a,c){a=a||"0,0,1,1";var d,i,k,l,m,n,o,p,q,r,s=a.match(b),t=1,u=[];if(c=c||{},r=c.precision||1,this.data=a,this.lookup=[],this.points=u,this.fast=1>=r,(e.test(a)||-1!==a.indexOf("M")&&-1===a.indexOf("C"))&&(s=h(a)),d=s.length,4===d)s.unshift(0,0),s.push(1,1),d=8;else if((d-2)%6)throw f;for((0!==+s[0]||1!==+s[d-2])&&j(s,c.height,c.originY),this.rawBezier=s,l=2;d>l;l+=6)i={x:+s[l-2],y:+s[l-1]},k={x:+s[l+4],y:+s[l+5]},u.push(i,k),g(i.x,i.y,+s[l],+s[l+1],+s[l+2],+s[l+3],k.x,k.y,1/(2e5*r),u,u.length-1);for(d=u.length,l=0;d>l;l++)o=u[l],p=u[l-1]||o,o.x>p.x||p.y!==o.y&&p.x===o.x||o===p?(p.cx=o.x-p.x,p.cy=o.y-p.y,p.n=o,p.nx=o.x,this.fast&&l>1&&Math.abs(p.cy/p.cx-u[l-2].cy/u[l-2].cx)>2&&(this.fast=!1),p.cx<t&&(p.cx?t=p.cx:(p.cx=.001,l===d-1&&(p.x-=.001,t=Math.min(t,.001),this.fast=!1)))):(u.splice(l--,1),d--);if(d=1/t+1|0,this.l=d,m=1/d,n=0,o=u[0],this.fast){for(l=0;d>l;l++)q=l*m,o.nx<q&&(o=u[++n]),i=o.y+(q-o.x)/o.cx*o.cy,this.lookup[l]={x:q,cx:m,y:i,cy:0,nx:9},l&&(this.lookup[l-1].cy=i-this.lookup[l-1].y);this.lookup[d-1].cy=u[u.length-1].y-i}else{for(l=0;d>l;l++)o.nx<l*m&&(o=u[++n]),this.lookup[l]=o;n<u.length-1&&(this.lookup[l-1]=u[u.length-2])}return this._calcEnd=1!==u[u.length-1].y||0!==u[0].y,this},m.getRatio=k,m.getSVGData=function(a){return l.getSVGData(this,a)},l.create=function(a,b,c){return new l(a,b,c)},l.version="0.2.2",l.bezierToPoints=g,l.get=function(b){return a.map[b]},l.getSVGData=function(b,c){c=c||{};var d,e,f,g,h,i,j,k,l,m,n=1e3,o=c.width||100,p=c.height||100,q=c.x||0,r=(c.y||0)+p,s=c.path;if(c.invert&&(p=-p,r=0),b=b.getRatio?b:a.map[b]||console.log("No ease found: ",b),b.rawBezier){for(d=[],j=b.rawBezier.length,f=0;j>f;f+=2)d.push(((q+b.rawBezier[f]*o)*n|0)/n+","+((r+b.rawBezier[f+1]*-p)*n|0)/n);d[0]="M"+d[0],d[1]="C"+d[1]}else for(d=["M"+q+","+r],j=Math.max(5,200*(c.precision||1)),g=1/j,j+=2,k=5/j,l=((q+g*o)*n|0)/n,m=((r+b.getRatio(g)*-p)*n|0)/n,e=(m-r)/(l-q),f=2;j>f;f++)h=((q+f*g*o)*n|0)/n,i=((r+b.getRatio(f*g)*-p)*n|0)/n,(Math.abs((i-m)/(h-l)-e)>k||f===j-1)&&(d.push(l+","+m),e=(i-m)/(h-l)),l=h,m=i;return s&&("string"==typeof s?document.querySelector(s):s).setAttribute("d",d.join(" ")),d.join(" ")},l},!0)}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()(),function(a){"use strict";var b=function(){return(_gsScope.GreenSockGlobals||_gsScope)[a]};"undefined"!=typeof module&&module.exports?(require("../TweenLite.min.js"),module.exports=b()):"function"==typeof define&&define.amd&&define(["TweenLite"],b)}("CustomEase");

var translations =
[
	{
		territory: "uk",
		strapline: "THE SEASON OF THE\nDRAGON BEGINS NOW",
		fontsize: 21,
		rating: "mc_rating_pegi_english",
		button: "mc_button_uk"
	},
	{
		territory: "fr",
		strapline: "LA SAISON DU DRAGON\nCOMMENCE MAINTENANT",
		fontsize: 19,
		rating: "mc_rating_pegi_english",
		button: "mc_button_fr"
	},
	{
		territory: "anz",
		strapline: "THE SEASON OF THE\nDRAGON BEGINS NOW",
		fontsize: 21,
		rating: "mc_rating_anz",
		button: "mc_button_uk"
	},
	{
		territory: "de",
		strapline: "DIE SAISON DES DRACHEN\nSTARTET JETZT",
		fontsize: 19,
		button: "mc_button_de"
	},
	{
		territory: "nl",
		strapline: "DE 'SEASON OF THE\nDRAGON' BEGINT NU",
		fontsize: 21,
		rating: "mc_rating_pegi_english",
		button: "mc_button_nl"
	},
	{
		territory: "pl",
		strapline: "ROZPOCZYNA SIĘ\nSEZON SMOKA",
		fontsize: 21,
		rating: "mc_rating_pegi_english",
		button: "mc_button_pl"
	},
	{
		territory: "de-pegi",
		strapline: "DIE SAISON DES DRACHEN\nSTARTET JETZT",
		fontsize: 19,
		rating: "mc_rating_pegi_english",
		button: "mc_button_de"
	},
   {
    territory: "es",  //7
    strapline: "LA TEMPORADA DEL\nDRAGÓN DA COMIENZO",
    fontsize: 19,
    rating: "mc_rating_pegi_english",
    button: "mc_button_es"
  },
   {
    territory: "it",  //8
    strapline: "LA STAGIONE DEL\nDRAGO INIZIA ORA",  
    fontsize: 19,
    rating: "mc_rating_pegi_english",
    button: "mc_button_it"
  }
]

var territory = translations[0];

var onov = (window.location.href.indexOf("http://ocean") == 0 || window.location.href.indexOf("https://ocean") == 0);
var weLocal = window.location.protocol === "file:" || window.location.hostname == "localhost";

var WID = 300,
    HEI = 600;

var button_animating = false;

var getWindowHeight = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var getWindowWidth = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

var onEndscreen = false;

function startBanner() 
{
  loadScripts();
}

function loadScripts()
{
  loadJS(["fbf.js"], loadSvgs);
}

function loadSvgs()
{ 
  fbf.loadSvgs(defaultsetup, "svg.gz.js");
}

function defaultsetup()
{
	logging = fbf.isLocal();
	fbf.clean(_root);
	fbf.replaceSVGDefs();
	fbf.displayBlock(_root);
	_root.buttonMode = true;

	document.getElementsByTagName("BODY")[0].style.overflow = "hidden";
	_root.style.cssText += "background-color:#000; overflow:hidden;";

	var keyline = addKeylineTo(_root, WID, HEI, '#fcd274', 1);
   
	fbf.show(_root);

	onMobile = fbf.isMobile();

	setup();
}

function setUpLanguages() 
{
	if(territory.territory=="anz")
	{
		TweenMax.set(mc_rating, {x: '-=245'});
		TweenMax.set(mc_copyright, {x: '+=214'});
	}
    if(territory.territory == "nl") 
   {
      TweenMax.set(mc_ps4, {x: '-=85'});
      TweenMax.set(mc_xbox, {x: '+=70'});
    }
}

function setup()
{
  setupStrapline(mc_strapline);
  createButtonOverlay();
  setListeners();
  setupIntroElements();
  startFlow();
}

function createButtonOverlay()
{
  var buttonWidth = mc_button.children[0].clientWidth;
  var buttonHeight = mc_button.children[0].clientHeight;

  var button_overlay = document.createElement("div");
      button_overlay.id = "button_overlay";
      button_overlay.style.position = "absolute";
      button_overlay.style.width = buttonWidth-3+"px";
      button_overlay.style.height = buttonHeight-2+"px";
      button_overlay.style.overflow = "hidden";
      button_overlay.style.zIndex = 10000;

  var shine = document.createElement("div");
      shine.id = "button_shine";
      shine.style.position = "absolute";
      shine.style.width = "20px";
      shine.style.height = buttonHeight+"px";

  var shine_svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 30"><defs><style>.cls-1{fill:#fff;}</style></defs><title>Asset 1</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="cls-1" points="20 30 0 30 15 0 35 0 20 30"/></g></g></svg>';

  shine.innerHTML = shine_svg;
  shine.children[0].style.height = buttonHeight;

  button_overlay.appendChild(shine);
  mc_button.appendChild(button_overlay);

  resetButtonShine();

  TweenMax.set(button_overlay, {y: '-='+buttonHeight*0.5, x: '-='+buttonWidth*0.5, alpha: 0.25});
}

function resetButtonShine()
{
	button_animating = false;
	var button_shine_width = button_shine.children[0].clientWidth;
	TweenMax.set(button_shine, {x: -button_shine_width});
}

function animateButton()
{
  var buttonWidth = mc_button.children[0].clientWidth;

  if(!button_animating)
  {
  	button_animating = true;
  	TweenMax.to(button_shine, 0.5, {x: buttonWidth, ease: Power2.easeInOut, onComplete: resetButtonShine});
  }
}

function setupStrapline(divID)
{
  divID.innerHTML = ""; 
  divWidth = parseInt(divID.style.width.split("px")[0]);

  var tffont = "garamondProGFX";

  var tf = TextField(tffont, territory.strapline, territory.fontsize, 1, 3, "center", "#FFFFFF");   
      tf.id = "strapline_tf";  
      divID.appendChild(tf); 

      tf._x = -Math.round(parseInt(tf._("svg").getAttribute("width"))) * 0.5;
}

function setupIntroElements()
{
	initialHide();
	setUpLanguages();
}

function initialHide()
{
  fbf.hide(mc_tablet.children);
  TweenMax.set(mc_rating.children, {alpha: 0});
  TweenMax.set(mc_button.children, {alpha: 0});
  fbf.hide(mc_wrathstone_logo, mc_strapline, mc_button);
}

function startFlow()
{
  animateEndscreen();
}

function animateEndscreen()
{
	fbf.show(mc_tablet_half_left, mc_tablet_half_right, mc_wrathstone_logo, mc_strapline, mc_button, mc_tablet_flare, mc_flash);
  
  	if(territory.rating)
  	{
  		TweenMax.set(territory.rating, {alpha: 1});
  	}

  	TweenMax.set(territory.button, {alpha: 1});
  	TweenMax.set(button_overlay, {alpha: 0.25});

  var tablet_delay = 0.25,
      speed_of_tablets = 0.6,
      distance_to_come_from = 300;

  TweenMax.set(mc_tablet_flare, {alpha: 0, scale: 0.2});
  TweenMax.to(mc_tablet_flare, 0.75, {alpha: 1, scale: 1, delay: 0.8, ease: Expo.easeOut});
  TweenMax.to(mc_tablet_flare, 0.85, {alpha: 0, scale: 0.1, delay: 1.3, ease: Expo.easeIn});

  TweenMax.set(mc_flash_1, {alpha: 0});
  TweenMax.set(mc_flash_2, {alpha: 0});

  TweenMax.from(mc_tablet_half_left,  speed_of_tablets, {x: '-='+distance_to_come_from, ease: Power1.easeIn, delay: tablet_delay});
  TweenMax.from(mc_tablet_half_right, speed_of_tablets, {x: '+='+distance_to_come_from, ease: Power1.easeIn, delay: tablet_delay, onComplete: function()
    {
      TweenMax.to(mc_tablet, 0.1, {x: '-=3'});
      TweenMax.to(mc_tablet, 0.1, {x: '+=6', delay: 0.1});
      TweenMax.to(mc_tablet, 0.1, {x: '-=3', delay: 0.2});

      fbf.show(mc_tablet_whole_glow, mc_tablet_smoke, mc_tablet_fire);

      TweenMax.fromTo(mc_tablet_whole_glow.children[0], 3, {clip:"rect(50px 250px 85px 0px)"}, {clip:"rect(0px 250px 256px 0px)", ease: Power1.easeIn, delay: 0.75});

      TweenMax.set(mc_flash_1, {x: '+=5',y: '+=20'});
      TweenMax.to(mc_flash_1, 0.5, {alpha: 0.9, delay: 0.75});
      TweenMax.set(mc_flash_2, {x: '+=0',y: '-=10'});
      TweenMax.to(mc_flash_2, 0.5, {alpha: 0.9, delay: 0.75});

      var bezierPointsUP = [{left: -5, top: -25}, {left: -25, top: -62}];

      var bezierPointsDOWN = [{left: 5, top: 25}, {left: -3, top: 50}, {left: -2, top: 188}];

      TweenMax.to(mc_flash_1, 3, {bezier: bezierPointsDOWN, ease: Power1.easeIn, delay: 0.75});

      var flash_1_1 = mc_flash_1.getElementsByTagName('path')[1];
      var flash_1_2 = mc_flash_1.getElementsByTagName('path')[0];
      var flash_2_1 = mc_flash_2.getElementsByTagName('path')[1];
      var flash_2_2 = mc_flash_2.getElementsByTagName('path')[0];

      TweenMax.to(flash_1_1, 1.25, {rotation: 80, transformOrigin: "50% 50%"});
      TweenMax.to(flash_1_2, 1.25, {rotation: -50, transformOrigin: "50% 50%"});
      TweenMax.to(flash_2_1, 1.25, {rotation: 80, transformOrigin: "50% 50%"});
      TweenMax.to(flash_2_2, 1.25, {rotation: -50, transformOrigin: "50% 50%"});

      TweenMax.to(mc_flash_2, 3, {bezier: bezierPointsUP, rotation: -50, ease: Power1.easeIn, delay: 0.75});

      TweenMax.to(mc_flash_1, 1, {scale: 0, delay: 2.5});
      TweenMax.to(mc_flash_2, 1, {scale: 0, delay: 2.5});

      TweenMax.from(mc_tablet_smoke,  3, {x: '+=30', y: '+=30', rotation: 5});
      TweenMax.from(mc_tablet_fire,   3, {x: '-=30', y: '-=30', rotation: -5});
      TweenMax.from(mc_tablet_smoke,  8, {alpha: 0});
      TweenMax.from(mc_tablet_fire,   8, {alpha: 0, ease: RoughEase.ease.config({ template:  Power0.easeNone, strength: 0.5, points: 20, taper: "none", randomize: true, clamp: false})});
    }
  });

  animateTabletGlow(0);

  TweenMax.from(mc_wrathstone_logo, 1, {alpha: 0, delay: 2.25});
  TweenMax.from(mc_strapline, 1, {alpha: 0, delay: 2.75});
  TweenMax.from(mc_button, 1, {alpha: 0, delay: 3.25});
  TweenMax.from(mc_platform_logos, 1, {alpha: 0, delay: 3.75, onComplete: animateButton});
}

function animateTabletGlow(delay)
{
  var glow_speed = 2;
  var repeat = 5;

  for (var i = repeat-1; i >= 0; i--)
  {
    var bring_in = delay+(i*3)+glow_speed;

    if(i==0)
    {
      var take_out = delay+(i*3)+glow_speed+2;
    }
    else
    {
      var take_out = delay+(i*3)+glow_speed+2;
    }
  
    TweenMax.to(mc_tablet_whole_glow, glow_speed, {alpha: 1, ease: Power1.easeInOut, delay: bring_in});
    
    if(i == repeat-1)
    {
      /* IF IT'S THE LAST ONE, FINISH WITH THE GLOWING TABLET */
      TweenMax.to(mc_tablet_whole_glow, glow_speed, {alpha: 1, ease: Power1.easeInOut, delay: bring_in});
    }
    else
    {
      TweenMax.to(mc_tablet_whole_glow, glow_speed, {alpha: 0.25, delay: take_out});
    }
  }
}

function setListeners()
{
  _root.addEventListener("mouseenter", animateButton);
}

var _root = $('root');
	var mc_artwork = $('mc_artwork');
		var mc_background = $('mc_background');
		var mc_tablet = $('mc_tablet');
			var mc_tablet_fire = $('mc_tablet_fire');
			var mc_tablet_smoke = $('mc_tablet_smoke');
			var mc_tablet_half_right = $('mc_tablet_half_right');
			var mc_tablet_half_left = $('mc_tablet_half_left');
			var mc_tablet_whole_glow = $('mc_tablet_whole_glow');
			var mc_tablet_flare = $('mc_tablet_flare');
			var mc_flash = $('mc_flash');
				var mc_flash_1 = $('mc_flash_1');
				var mc_flash_2 = $('mc_flash_2');
	var mc_footer = $('mc_footer');
		var mc_rating = $('mc_rating');
			var mc_rating_anz = $('mc_rating_anz');
			var mc_rating_pegi_english = $('mc_rating_pegi_english');
		var mc_copyright = $('mc_copyright');
		var mc_platform_logos = $('mc_platform_logos');
	var mc_strapline = $('mc_strapline');
	var mc_wrathstone_logo = $('mc_wrathstone_logo');
	var mc_button = $('mc_button');
		var mc_button_pl = $('mc_button_pl');
		var mc_button_nl = $('mc_button_nl');
		var mc_button_de = $('mc_button_de');
		var mc_button_fr = $('mc_button_fr');
		var mc_button_uk = $('mc_button_uk');