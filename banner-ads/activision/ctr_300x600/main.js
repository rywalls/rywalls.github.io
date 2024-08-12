var onov = (window.location.href.indexOf("http://ocean") == 0 || window.location.href.indexOf("https://ocean") == 0);
var weLocal = window.location.protocol === "file:" || window.location.hostname == "localhost";

// window.logging = true;
// window.debug = false;

var AdBase = function(init)
{
    this.local = window.location.protocol === "file:" || window.location.hostname == "localhost";
    this.version = "0.0";
    this.init = init;

    this.clickthrough = function(name)
    {
        // if(typeof EB !== "undefined")
        // {
            // name ? EB.clickthrough(name) : EB.clickthrough();
        // }
       // else 
        if(typeof Enabler !== "undefined")
        {
        	if(weLocal || onov)
        	{
        		console.log("%c\nmyAd.clickthrough%c (local or on Oceanview)\n\nIf this ad was live, Enabler.exitOverride would be called.\n\n", 'text-decoration: underline; color: #344CFF;', 'text-decoration: none;');
        	}
        	else
        	{
				Enabler.exitOverride(name ? name : 'default', BackgroundExit);
        	}
        }
    }
    this.getAsset = function(asset)
    {
        if(weLocal) return asset.local;
        if(onov)  return asset.ov;
       //if(typeof EB !== "undefined" && ovversion == false)
       //{
       //    if(typeof asset.eb === "number")
       //    {
       //        return EB.getAssetUrl('', asset.eb);
       //    }else{
       //        return asset.eb;
       //    }
       //}else 
       if(typeof Enabler !== "undefined")
        {
          return getAsset(asset.dc);
        }
    }
};

function Ad()
{
	AdBase.call(this, "init");
	this.width = 300;
	this.start = function()  {  }
}

Ad.prototype = Object.create(AdBase.prototype);
Ad.prototype.constructor = Ad;

var myAd = new Ad();
myAd.start();

var demo = true; // need to look in to this for live and OV //weLocal; //<--- Could cha

/*\    $$\  $$$$$$\  $$$$$$$\   $$$$$$\  
$$ |   $$ |$$  __$$\ $$  __$$\ $$  __$$\ 
$$ |   $$ |$$ /  $$ |$$ |  $$ |$$ /  \__|
\$$\  $$  |$$$$$$$$ |$$$$$$$  |\$$$$$$\  
 \$$\$$  / $$  __$$ |$$  __$$<  \____$$\ 
  \$$$  /  $$ |  $$ |$$ |  $$ |$$\   $$ |
   \$  /   $$ |  $$ |$$ |  $$ |\$$$$$$  |
    \_/    \__|  \__|\__|  \__| \_____*/ 

var crashWid, 
	crashHei,
	crashScale,
	crashX,
	crashY,
	cocoWid,
	cocoHei,
	cocoX,
	cocoY,
	cocoScale,
	neoWid,
	neoHei,
	neoX,
	neoY,
	neoScale;

var WID = 300, HEI = 600,

    gridHorizontal, gridVertical,
    keylineConfig  =  {colour: "#000", thickness: 1},//{colour: "#d29e0e", thickness: 1},
    buildPath      =  "../../../",
    globalPath     =  buildPath+"_global/",
    configPath     =  buildPath+"_configs/",
    ovPath         =  "../../../../../_bannerGlobals/acti/octane_launch/",
    which_config    =  ["generic"],

    config_terr = "uk", // uk, fr, it, de, es, pt, nl, befr, benl, nordics, at, chfr, chde, pl, ru, uaear, ksa, rsa, au;

    config_type = which_config[0]; // 0 is PS4 | 1 is GENERIC

var getWindowHeight = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var getWindowWidth = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

var stop_embers = false,
	stop_fire = false;

var assets = {

fbf: 
{
/* OCEANVIEW */	ov:     ovPath+"_global/fbf.js",                                             
/* LOCAL */		local:  globalPath + "fbf.js",
/* STUDIO */	dc:     "dir_global/fbf.js"      
},

svgstuff:
{     
/* OCEANVIEW */	ov:     "svg.gz.js",
/* LOCAL */		local:  "svg.gz.js",
/* STUDIO */	dc:     "dir_assets/svg.gz.js"
},
  
config:
{ 
/* OCEANVIEW */	ov:     ovPath+"_configs/config_"+config_terr+".js",
/* LOCAL */		local:  configPath+"/config_"+config_terr+".js",
/* STUDIO */	dc:     "asset_config"
}, 
  
campaign:      
{
/* OCEANVIEW */	ov:     ovPath+"_global/octane.js",
/* LOCAL */		local:  globalPath + "octane.js",
/* STUDIO */	dc:     "dir_global/octane.js"
}
  
// response:
// {
// /* OCEANVIEW */	ov:     ovPath+"_global/response.js",
// /* LOCAL */		local:  globalPath + "response.js",
// /* STUDIO */	dc:     ""
// },
  
// response_gzip:
// {
// /* OCEANVIEW */	ov:     ovPath+"_global/response.xml.gz",
// /* LOCAL */		local:  globalPath + "response.js.gz",
// /* STUDIO */	dc:     ""
// }

}; 

var VIDWID = WID, VIDHEI = HEI,
    preDateElements = [], postDateElements = [],
    gameIsOut, chosenButton, config, PS4creative,
    onmousemove, onMobile

    ratio                = 16 / 9,
  //  sizmek               = false,
 //   expandUnit           = false,
    vidReplayed          = false,
    onEndscreen          = false,
    nonVidGo             = false,
    weClick              = false,
    landscape            = false,
  //  isThisRespUnit       = false,
  //  constructRespSetUp   = false,

    narrowUnit			 = false;

/*$$$$\ $$\   $$\ $$$$$$\ $$$$$$$$\
\_$$  _|$$$\  $$ |\_$$  _|\__$$  __|
  $$ |  $$$$\ $$ |  $$ |     $$ |
  $$ |  $$ $$\$$ |  $$ |     $$ |
  $$ |  $$ \$$$$ |  $$ |     $$ |
  $$ |  $$ |\$$$ |  $$ |     $$ |
$$$$$$\ $$ | \$$ |$$$$$$\    $$ |
\______|\__|  \__|\______|   \_*/

function startBanner() { loadScripts();}

function loadScripts()
{
	loadJS([ 'fbf.js', 'config.js', 'octane.js' ], loadSvgs);
}

function loadSvgs(){ fbf.loadSvgs(defaultsetup); }

function reportConfig(){	for (key in config) {if(config.hasOwnProperty(key))log(key+" : "+config[key])};}

function logBannerDetails()
{
	console.log('%c\nCRASH TEAM RACING'+'%c\nNITRO FUELED\n', 'font-size: 26px; color: #000000;', 'font-size: 9px; color: #000000;');
	console.log('\n%c'+WID+'px x ' + HEI + 'px\n', 'color: #000000');
}

function checkIfItsPS4()
{
	PS4creative = config.PS4;

	if(!PS4creative)
	{
		console.log('%c\n GENERIC CREATIVE \n', 'background: #EDEDED; color: #000000');
		mc_ps4.innerHTML = ""; //guts out the ps4 div so no ps4 logo shows, without ruining flow
		//need to add Spanish variaition here too
	}
	else
	{
		console.log('%c\n PS4 CREATIVE \n', 'background: #003791; color: #FFFFFF');
		//need to add Spanish variaition here too
	}
}

function defaultsetup()
{
	logging     = fbf.isLocal();
	gameIsOut   = config.releaseDate.getTime() <= Date.now();
	//gameIsOut   = new Date("Jan 12 2018 00:00:00 GMT+0000").getTime() <= Date.now(); // USE THIS JUST TO TEST POST-LAUNCH CREATIVE (BUY NOW) 
	
	reportConfig();
	log(fbf.logDom(_root));
    octane.generalSetup();
	onMobile = fbf.isMobile();
	fbf.show(_root);
    logBannerDetails();

	octane.stopIEWobble(window.navigator.userAgent);
	
	setUpLanguages();	

	//octane.setUpDateGFX(mc_date,config.dateStore[0],config.lang); 
	
	octane.sortoutIntroText(config.straplineStore[0],mc_startengines);
	octane.sortoutStrapline(config.straplineStore[1],mc_tagline);
mc_date.innerHTML = "";
	for (var i = 0; i < config.dateStore.length; i++) {
		//Things[i]
		octane.setUpDateGFX(mc_date,config.dateStore[i],config.lang); 
	}

	log("00000000000000000000000000",config.dateStore.length);
	octane.sortOutDateElements(preDateElements,postDateElements);
	housekeepButtons();
	tweekElementsForLanguages();
	
	checkIfItsPS4();
	setListeners();
	
	octane.emergencyOverride();

	octane.setupLogo(mc_logo);
	//octane.addGradientToLogo(mc_logo_shine);


	setup();
}

var createGradient = function(svg,id,stops)
	{
		var svgNS = svg.namespaceURI;
		var grad  = document.createElementNS(svgNS,'linearGradient');
		grad.setAttribute('id',id);
		grad.setAttribute('x0',"0");
		grad.setAttribute('y0',"0");
		grad.setAttribute('x1',"1");
		grad.setAttribute('y1',"1");
		for (var i=0;i<stops.length;i++){
			var attrs = stops[i];
			var stop = document.createElementNS(svgNS,'stop');
			for (var attr in attrs){
				if (attrs.hasOwnProperty(attr)) stop.setAttribute(attr,attrs[attr]);
			}
			grad.appendChild(stop);
		}
		var defs = svg.querySelector('defs') ||	svg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild);
		defs.appendChild(grad)
		return grad;
	}
function housekeepButtons()
{
	whatButtonToShow();

	/* LOOP THROUGH BUTTON ARRAY AND FIND CORRECT ONE TO SET UP */

	var button_array = config.buttonStore;

	for (var i = button_array.length - 1; i >= 0; i--)
	{
		var button = button_array[i];

		if(button.buttonID==chosenButton)
		{
			octane.buttonFontSetup(mc_button_text, button.buttonText, button.letterSpacing, button.lineHeight, button.buttonFontSize, config.lang);
		}
	}
}

function whatButtonToShow()
{
	if(config.chosenBtn == "Purchase")	{		chosenButton = buyOrPre();	}
	else								{		chosenButton = chosenBtn;	}
}

function buyOrPre()
{
	var purchaseBtn;

	if(!gameIsOut)
	{
		purchaseBtn = "btn_preorder";
		console.log('%c\n PREORDER \n', 'background: #E11D23; color: #FFFFFF');
	} 
	else
	{      
		purchaseBtn = "btn_buy";
		console.log('%c\n BUY NOW \n', 'background: #E11D23; color: #FFFFFF');
	}
	return purchaseBtn;
}

function tweekElementsForLanguages()
{
	if(config.lang == "au")
	{

	}
	else
	{
	  
	}
}

function setUpLanguages() 
{
	if (config.lang == "uk" || config.lang == "chde" || config.lang == "at" || config.lang == "chfr" ||config.lang == "befr" || config.lang == "benl" || config.lang == "fr" || config.lang == "it" || config.lang == "es" || config.lang == "nl" || config.lang == "nordics" || config.lang == "pt" || config.lang == "pl")
	{
		fbf.setLang(mc_rating, 'uk');
	}
	else if(config.lang == "uaear" || config.lang == "uaeen")
	{
		fbf.hide(mc_rating.children);
		fbf.show(mc_rating_uae);
	}
	else if(config.lang == "ksaen" || config.lang == "ksaar")
	{
		fbf.hide(mc_rating.children);
		fbf.show(mc_rating_arabic);
	}
	else 
	{
		fbf.setLang(mc_rating, config.lang);
	}
}

/*$$$$$\  $$$$$$$$\ $$$$$$$$\ $$\   $$\ $$$$$$$\  
$$  __$$\ $$  _____|\__$$  __|$$ |  $$ |$$  __$$\ 
$$ /  \__|$$ |         $$ |   $$ |  $$ |$$ |  $$ |
\$$$$$$\  $$$$$\       $$ |   $$ |  $$ |$$$$$$$  |
 \____$$\ $$  __|      $$ |   $$ |  $$ |$$  ____/ 
$$\   $$ |$$ |         $$ |   $$ |  $$ |$$ |      
\$$$$$$  |$$$$$$$$\    $$ |   \$$$$$$  |$$ |      
 \______/ \________|   \__|    \______/ \_*/      

function setup()
{
	initialHide();
	getCharacterDimensions();
	startFlow();
}

function getCharacterDimensions()
{
	//get all these details to help with animation later
	crashWid = mc_crash.style.width.split("px")[0];
	crashHei = mc_crash.style.height.split("px")[0];
	crashScale = mc_crash._scaleX;

	cocoWid = mc_coco.style.width.split("px")[0];
	cocoHei = mc_coco.style.height.split("px")[0];
	cocoScale = mc_coco._scaleX;

	neoWid = mc_neo.style.width.split("px")[0];
	neoHei = mc_neo.style.height.split("px")[0];
	neoScale = mc_neo._scaleX;

	storeRacersPosish();
}

function initialHide()
{
	//fbf.hide(mc_date,mc_tagline,mc_button);
	fbf.hide(mc_startengines,mc_date,mc_tagline,mc_button,mc_logo);

	fbf.hide(mc_sparkles);
}

/*$$$$$$\ $$\       $$$$$$\  $$\      $$\ 
$$  _____|$$ |     $$  __$$\ $$ | $\  $$ |
$$ |      $$ |     $$ /  $$ |$$ |$$$\ $$ |
$$$$$\    $$ |     $$ |  $$ |$$ $$ $$\$$ |
$$  __|   $$ |     $$ |  $$ |$$$$  _$$$$ |
$$ |      $$ |     $$ |  $$ |$$$  / \$$$ |
$$ |      $$$$$$$$\ $$$$$$  |$$  /   \$$ |
\__|      \________|\______/ \__/     \_*/

function startFlow()
{
	
	TweenMax.to(mc_curtain,1,{alpha:0});
	//if(!onEndscreen)
	//{
	animateIntro();
	//}
}

function storeRacersPosish()
{
	crashX = mc_crash._x;
	crashY = mc_crash._y;
	cocoX = mc_coco._x;
	cocoY = mc_coco._y;
	neoX = mc_neo._x;
	neoY = mc_neo._y;
}

var introLines = -1;
function animateIntro()
{
 // if(!onEndscreen)
//	{
    TweenMax.delayedCall(1,animateIntroLines,[introLines]);
    fbf.hide(mc_neo);
    TweenMax.from(mc_artwork,3,{rotation:0.01,scale:mc_artwork._scaleX*1.2,transformOrigin: "50% 60%"});
    TweenMax.to(mc_coco,0.075,{rotation:0.01,scale:mc_coco._scaleX*1.1,transformOrigin: "50% 60%"});
    TweenMax.to(mc_crash,0.05,{rotation:0.01,yoyo:true, repeat:-1,y:"+=1",x:"+=0"/*scale:mc_artwork._scaleX*1.05,transformOrigin: "50% 60%"*/});
    TweenMax.to(mc_coco,0.075,{rotation:0.01,yoyo:true, repeat:-1,y:"-=1",x:"+=0"/*scale:mc_artwork._scaleX*1.05,transformOrigin: "50% 60%"*/});
    TweenMax.delayedCall(3,zoomzoom);

    TweenMax.delayedCall(4,animateLogo);
    TweenMax.delayedCall(4.5,animateEndscreen);
	//}
}

function zoomzoom()
{
	// if(!onEndscreen)
	//{
	 TweenMax.to(mc_crash,0.2,{delay:0.2,x:"+=400",y:"+=200",ease: Back.easeIn.config(1.2)});
	 TweenMax.to(mc_coco,0.2,{x:"+=400",y:"+=200",ease: Back.easeIn.config(1.2)});	
	//}
}

function animateIntroLines(introLines)
{
	introLines++;
	var lines = mc_startengines.children;
	if(introLines<lines.length){
		fbf.show(mc_startengines);
	   fbf.hide(lines);
	   fbf.show(lines[introLines]);
	  
	   if(introLines == 2){
	   	 TweenMax.from(mc_startengines,0.25,{scale:mc_startengines._scaleX*3.5,ease: Back.easeOut.config(1.2)})	   	
	   	 TweenLite.to(mc_startengines, 1, { delay:0.25,ease: RoughEase.ease.config({ template:  Power0.easeNone, strength: 1, points: 20, taper: "none", randomize: false, clamp: false}), x: "+=5",y: "+=5" });
		 TweenMax.to(mc_startengines,0.25,{delay:1.25,scale:mc_startengines._scaleX*2,ease: Back.easeIn.config(1.2),alpha:0});	
	   } else {
	   	 TweenMax.from(mc_startengines,0.25,{scale:mc_startengines._scaleX*3.5,ease: Back.easeOut.config(1.2)})
	   }
	   TweenMax.delayedCall(0.5,animateIntroLines,[introLines]);
	}
	
}

var logoTick = 0.05;
var logoMaxBright = 2;
var logoMinBright = 1;
function animateLogo()
{
	fbf.show(mc_logo);
	TweenMax.from(mc_logo,1,{scale:mc_logo._scaleX*2.5,ease: Back.easeOut.config(1.2)})
    window.requestAnimationFrame(shineDown);
}

function setUpSparkles()
{
	//mc_sparkles
}

function shineDown()
{
	// logoTick
	 mc_logo.style.filter = "brightness("+logoMaxBright+")";
	 logoMaxBright = logoMaxBright-logoTick
	 if(logoMaxBright>logoMinBright)
	 {
	 	 window.requestAnimationFrame(shineDown);
	 }
	

}

function lightSwitch(mc, del)
	{
		log("lightSwitch");
		TweenMax.to(mc.children[0],0,{alpha:0, delay:del});
		TweenMax.to(mc.children[1],0,{alpha:1, delay:del});

	}

function animateEndscreen()
{	
	//CTR LET'S GO
	log("animateEndscreen");
	fbf.show(mc_neo,mc_tagline,mc_date,mc_button);
	//setup
	TweenMax.set(mc_crash,{x:crashX,y:crashY});
	TweenMax.set(mc_coco,{x:cocoX,y:cocoY});
	TweenMax.set(mc_neo,{x:neoX,y:neoY});
	// chars drive in
	TweenMax.from(mc_crash,0.6,{x:"-="+crashWid, y:"-="+crashHei, ease:Power3.easeOut, scale:crashScale*0.5, delay:1.2});
	TweenMax.from(mc_coco,0.5,{x:"-="+cocoWid*1.2, y:"-="+cocoHei*0.7, scale:cocoScale*0.6, ease:Power3.easeOut, delay:1});
	TweenMax.from(mc_neo,1,{rotation:-20,x:neoX-50,y:neoY-30,scale:neoScale*0.5, ease:Expo.easeOut, delay:1.4,transformOrigin: "50% 50%"});
	//logos text cta animate in
	TweenMax.from(mc_tagline,0.5,{scale:mc_tagline._scaleX*3, alpha:0, ease:Back.easeOut, delay:0.4});
	TweenMax.from(mc_date,0.5,{scale:mc_date._scaleX*3, alpha:0, ease:Back.easeOut, delay:0.6});
	TweenMax.from(mc_button,0.5,{scale:mc_button._scaleX*3, alpha:0, ease:Back.easeOut, delay:0.8});
}

function animateButton(delay)
{
	//if(!onEndscreen)
	//{
		octane.animateButton(mc_button, delay)
	//}
}

function setupParticles(num)
{
	for (var i = 0; i < num; i++)
	{
		var ember = mc_particles.children[i].cloneNode(true);
		mc_particles.appendChild(ember);
	}	

	for (var i = 0; i < mc_particles.children.length; i++)
	{
		mc_particles.children[i].id ="ember_"+i;
	}
}

function animateParticles()
{
	for (var i = 0; i < mc_particles.children.length; i++)
	{
		animateOneParticleUp(mc_particles.children[i].id);
	}
}

function animateOneParticleUp(particleToMove)
{
	if(!stop_embers)
	{
		TweenMax.set($(particleToMove),{x:-30+Math.round(Math.random()*WID),y:HEI});
		TweenMax.from($(particleToMove),1,{alpha:0});
	    TweenMax.to($(particleToMove),5+Math.random()*10,{x:Math.round(Math.random()*WID),y:-(HEI+20)-(Math.round(Math.random()*(HEI*0.5))),onComplete:animateOneParticleUp,onCompleteParams:[particleToMove]});
	}
	else
	{
		TweenMax.delayedCall(4, stopFire);
	}
}



/*\   $$\ $$$$$$\       $$$$$$$$\ $$\   $$\ $$\   $$\  $$$$$$\ $$$$$$$$\ $$$$$$\  $$$$$$\  $$\   $$\  $$$$$$\  
$$ |  $$ |\_$$  _|      $$  _____|$$ |  $$ |$$$\  $$ |$$  __$$\\__$$  __|\_$$  _|$$  __$$\ $$$\  $$ |$$  __$$\ 
$$ |  $$ |  $$ |        $$ |      $$ |  $$ |$$$$\ $$ |$$ /  \__|  $$ |     $$ |  $$ /  $$ |$$$$\ $$ |$$ /  \__|
$$ |  $$ |  $$ |        $$$$$\    $$ |  $$ |$$ $$\$$ |$$ |        $$ |     $$ |  $$ |  $$ |$$ $$\$$ |\$$$$$$\  
$$ |  $$ |  $$ |        $$  __|   $$ |  $$ |$$ \$$$$ |$$ |        $$ |     $$ |  $$ |  $$ |$$ \$$$$ | \____$$\ 
$$ |  $$ |  $$ |        $$ |      $$ |  $$ |$$ |\$$$ |$$ |  $$\   $$ |     $$ |  $$ |  $$ |$$ |\$$$ |$$\   $$ |
\$$$$$$  |$$$$$$\       $$ |      \$$$$$$  |$$ | \$$ |\$$$$$$  |  $$ |   $$$$$$\  $$$$$$  |$$ | \$$ |\$$$$$$  |
 \______/ \______|      \__|       \______/ \__|  \__| \______/   \__|   \______| \______/ \__|  \__| \_____*/ 

function setListeners()
{
	_root.addEventListener("mouseover", octane.rollover);
	_root.addEventListener("click", handleClick);
}

function handleClick(event) 
{
	event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	var target = event.target || event.srcElement;
	var phase = event.eventPhase;

	immediateEndScreen();
	clickType();
	weClick = true;
}

function clickType()
{
	myAd.clickthrough();
}

 /*$$$$\ $$$$$$$$\ $$\   $$\ $$$$$$$$\ $$$$$$$\
$$  __$$\\__$$  __|$$ |  $$ |$$  _____|$$  __$$\
$$ /  $$ |  $$ |   $$ |  $$ |$$ |      $$ |  $$ |
$$ |  $$ |  $$ |   $$$$$$$$ |$$$$$\    $$$$$$$  |
$$ |  $$ |  $$ |   $$  __$$ |$$  __|   $$  __$$<
$$ |  $$ |  $$ |   $$ |  $$ |$$ |      $$ |  $$ |
 $$$$$$  |  $$ |   $$ |  $$ |$$$$$$$$\ $$ |  $$ |
 \______/   \__|   \__|  \__|\________|\__|  \_*/

function immediateEndScreen()
{  
	//if (!onEndscreen)
	//{
	//	TweenMax.killAll(true);
	//	onEndscreen = true;
	//}
}

function showUpToRoot(mc) 
{
    var target = mc;

    while(target)
    {
      target.visible = true;
      target.display = true;
      target = target.parentNode;
    }
}

/*$$$$$\   $$$$$$\  $$\      $$\        $$$$$$\ $$$$$$$$\  $$$$$$\  $$$$$$$\  $$$$$$$$\ 
$$  __$$\ $$  __$$\ $$$\    $$$ |      $$  __$$\\__$$  __|$$  __$$\ $$  __$$\ $$  _____|
$$ |  $$ |$$ /  $$ |$$$$\  $$$$ |      $$ /  \__|  $$ |   $$ /  $$ |$$ |  $$ |$$ |      
$$ |  $$ |$$ |  $$ |$$\$$\$$ $$ |      \$$$$$$\    $$ |   $$ |  $$ |$$$$$$$  |$$$$$\    
$$ |  $$ |$$ |  $$ |$$ \$$$  $$ |       \____$$\   $$ |   $$ |  $$ |$$  __$$< $$  __|   
$$ |  $$ |$$ |  $$ |$$ |\$  /$$ |      $$\   $$ |  $$ |   $$ |  $$ |$$ |  $$ |$$ |      
$$$$$$$  | $$$$$$  |$$ | \_/ $$ |      \$$$$$$  |  $$ |    $$$$$$  |$$ |  $$ |$$$$$$$$\ 
\_______/  \______/ \__|     \__|       \______/   \__|    \______/ \__|  \__|\______*/

var _root = $('root');
	var mc_artwork = $('mc_artwork');
		var mc_background = $('mc_background');
		var mc_neo = $('mc_neo');
		var mc_coco = $('mc_coco');
		var mc_crash = $('mc_crash');
	var mc_ps4 = $('mc_ps4');
		var mc_ps4_vectorish = $('mc_ps4_vectorish');
			var mc_ps4_bg = $('mc_ps4_bg');
				var mc_ps4_bmp = $('mc_ps4_bmp');
	var mc_logo = $('mc_logo');
		var mc_logo_shine = $('mc_logo_shine');
		var mc_sparkles = $('mc_sparkles');
			var mc_sparklette = $('mc_sparklette');
	var mc_button = $('mc_button');
		var mc_button_background = $('mc_button_background');
		var mc_button_text = $('mc_button_text');
	var mc_date = $('mc_date');
	var mc_tagline = $('mc_tagline');
	var mc_rating = $('mc_rating');
		var rating_english = $('rating_english');
		var rating_german = $('rating_german');
		var rating_uae = $('rating_uae');
	var mc_startengines = $('mc_startengines');
	var mc_curtain = $('mc_curtain');