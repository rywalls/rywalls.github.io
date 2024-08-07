var onov = (window.location.href.indexOf("http://ocean") == 0 || window.location.href.indexOf("https://ocean") == 0);
var weLocal = window.location.protocol === "file:" || window.location.hostname == "localhost";

var AdBase = function(init) {
    this.local = window.location.protocol === "file:" || window.location.hostname == "localhost";
    this.version = "0.0";
    this.init = init;

    this.clickthrough = function(name)
    {
        if(typeof EB !== "undefined")
        {
            name ? EB.clickthrough(name) : EB.clickthrough();
        }else if(typeof Enabler !== "undefined")
        {
          Enabler.exitOverride(name ? name : 'default', BackgroundExit);
        }
    }
    this.getAsset = function(asset)
    {
        if(local) return asset.local;
        if(onov)  return asset.ov;
        if(typeof EB !== "undefined" && ovversion == false)
        {
            if(typeof asset.eb === "number")
            {
                return EB.getAssetUrl('', asset.eb);
            }else{
                return asset.eb;
            }
        }else if(typeof Enabler !== "undefined")
        {
          return getAsset(asset.dc);
        }
    }
};

function Ad() {
  AdBase.call(this, "init");
  this.width = 300;
  this.start = function()  {  }
}

Ad.prototype = Object.create(AdBase.prototype);
Ad.prototype.constructor = Ad;

var myAd = new Ad();
myAd.start();

/*\    $$\  $$$$$$\  $$$$$$$\   $$$$$$\  
$$ |   $$ |$$  __$$\ $$  __$$\ $$  __$$\ 
$$ |   $$ |$$ /  $$ |$$ |  $$ |$$ /  \__|
\$$\  $$  |$$$$$$$$ |$$$$$$$  |\$$$$$$\  
 \$$\$$  / $$  __$$ |$$  __$$<  \____$$\ 
  \$$$  /  $$ |  $$ |$$ |  $$ |$$\   $$ |
   \$  /   $$ |  $$ |$$ |  $$ |\$$$$$$  |
    \_/    \__|  \__|\__|  \__| \_____*/ 

var WID = 300, HEI = 250,
    gridHorizontal, gridVertical,
    local = window.location.protocol === "file:" || window.location.hostname == "localhost",
    keylineConfig  =  {colour: "#d29e0e", thickness: 1}, keyline,
    buildPath      =  "../../../",
    globalPath     =  buildPath+"_global/",
    configPath     =  buildPath+"_configs/learnmore",
    videoPath      =  buildPath+"_introvids/",
    videoName      =  "PLACEHOLDER_"+WID+"x"+HEI,
    ovPath         =  "../../../../../_bannerGlobals/acti/python_grand_heist/",
    whichConfig    =  ["PS4", "GENERIC"],

    config_terr = "aus", // uk, fr, it, de, es, pt, nl, befr, benl, nordics, at, chfr, chde, pl, ru, uaear, ksa, rsa, aus;

    configPS4orGENERIC = whichConfig[0]; // 0 is PS4 | 1 is GENERIC

var getWindowHeight = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var getWindowWidth = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

var assets = {

fbf: 
{
/* OCEANVIEW */		ov:     ovPath+"_global/fbf.js",                                             
/* LOCAL */			  local:  globalPath + "fbf.js",
/* SIZMEK */		  eb:     1,
/* DOUBLECLICK */	dc:     "dir_global/fbf.js"      
},

svgstuff:
{     
/* OCEANVIEW */		ov:     "svg.gz.js",
/* LOCAL */			local:  "svg.gz.js",
/* SIZMEK */		eb:     "svg.gz.js",
/* DOUBLECLICK */	dc:     "dir_assets/svg.gz.js"
},
  
config:
{ 
/* OCEANVIEW */		ov:     ovPath+"_configs/config_"+configPS4orGENERIC+"_LEARN_"+config_terr+".js",
/* LOCAL */			  local:  configPath+"/config_"+configPS4orGENERIC+"_LEARN_"+config_terr+".js",
/* SIZMEK */		  eb:     2,
/* DOUBLECLICK */	dc:     "asset_config"
}, 
  
campaign:      
{
/* OCEANVIEW */		ov:     ovPath+"_global/python.js",
/* LOCAL */			  local:  globalPath + "python.js",
/* SIZMEK */		  eb:     3,
/* DOUBLECLICK */	dc:     "dir_global/python.js"
},
  
response:
{
/* OCEANVIEW */		ov:     ovPath+"_global/response.js",
/* LOCAL */			  local:  globalPath + "response.js",
/* SIZMEK */		  eb:     4,
/* DOUBLECLICK */	dc:     ""
},
  
response_gzip:
{
/* OCEANVIEW */		ov:     ovPath+"_global/response.xml.gz",
/* LOCAL */			  local:  globalPath + "response.js.gz",
/* SIZMEK */		  eb:     5,
/* DOUBLECLICK */	dc:     ""
},
  
videoIntroMp4: 
{
/* OCEANVIEW */		ov:     ovPath+"_introvids/"+videoName + ".mp4",
/* LOCAL */			  local:  videoPath  + videoName + ".mp4",
/* SIZMEK */		  eb:     70,
/* DOUBLECLICK */	dc:     "asset_intro_vid"
},
  
videoIntroWebM:
{
/* OCEANVIEW */		ov:     ovPath+"_introvids/"+videoName + ".webm",
/* LOCAL */			  local:  videoPath  + videoName + ".webm",
/* SIZMEK */		  eb:     71,
/* DOUBLECLICK */	dc:     "asset_intro_vid"
}

}; 

var VIDWID = WID, VIDHEI = HEI,
    preDateElements = [], postDateElements = [],
    video_intro, out, chosenButton, config, PS4creative,
    onmousemove, onMobile

    ratio                = 16 / 9,
    sizmek               = false,
    expandUnit           = false,
    vidReplayed          = false,
    onEndscreen          = false,
    nonVidGo             = false,
    weClick              = false,
    landscape            = false,
    isThisRespUnit       = false,
    constructRespSetUp   = false,

    narrowUnit			 = false;

/*$$$$\ $$\   $$\ $$$$$$\ $$$$$$$$\ 
\_$$  _|$$$\  $$ |\_$$  _|\__$$  __|
  $$ |  $$$$\ $$ |  $$ |     $$ |   
  $$ |  $$ $$\$$ |  $$ |     $$ |   
  $$ |  $$ \$$$$ |  $$ |     $$ |   
  $$ |  $$ |\$$$ |  $$ |     $$ |   
$$$$$$\ $$ | \$$ |$$$$$$\    $$ |   
\______|\__|  \__|\______|   \_*/   

function startBanner() 
{
  loadScripts();
}

function logBannerDetails()
{
  PS4creative = config.PS4;

  console.log('%c\nOPERATION    '+'%c \nGRAND HEIST   \n', 'font-size: 12px; font-style: italic; background-color: #FFFFFF; color: #000000; font-weight: bold;', 'font-size: 15px; font-style: italic; background-color: #FFFFFF; color: #000000; font-weight: bold;');

  console.log('\n%c  '+WID+'px x ' + HEI + 'px  \n', 'background: #E6C951; color: #000000');

  if(PS4creative)
  {
    console.log('%c\n  PS4 CREATIVE  \n', 'background: #214E8D; color: #FFFFFF');
  }
  else
  { 
    console.log('%c\n GENERIC CREATIVE \n', 'background: #EDEDED; color: #000000');
  }

}

function checkIfItsPS4()
{

  if(!PS4creative)
  {
    TweenMax.set(mc_ps4, {alpha: 0});
  }
}

function checkIfItsPSPlus()
{

  if(config.PSplus){

    setTimeout(function() {console.log('%c\n   + THIS IS A PLAYSTATION PLUS CREATIVE   \n\n', 'background: #FFDE00; color: #0032B0');}, 1500);
    fbf.setLang(mc_playstation_plus_text, config.lang);

  } else {

    fbf.hide(mc_playstation_plus);
  }
}

function loadScripts()
{

    loadJS([ 'fbf.js', 'config.js', 'python.js' ], loadSvgs);
}

function loadSvgs()
{ 
  logBannerDetails();
  fbf.loadSvgs(defaultsetup, myAd.getAsset(assets.svgstuff));
  
  checkIfItsPS4(); // HAVE TO CALL THIS AFTER loadScripts
  checkIfItsPSPlus(); // HAVE TO CALL THIS AFTER loadScripts
}

function reportConfig()
{
  for (key in config) {if(config.hasOwnProperty(key))log(key+" : "+config[key])};
}

function defaultsetup()
{
  logging     = fbf.isLocal();
  out         = config.outDate.getTime() <= Date.now();

  reportConfig();
  log(fbf.logDom(_root));
  fbf.clean(_root);
  fbf.replaceSVGDefs();
  fbf.displayBlock(_root);
  _root.buttonMode = true;

  document.getElementsByTagName("BODY")[0].style.overflow = "hidden";
  _root.style.cssText += "background-color:#000; overflow:hidden;";   
  keyline = addKeylineTo(_root, WID, HEI, '#d29e0e', keylineConfig.thickness);
   
  fbf.show(_root);
 
  python.stopIEWobble(window.navigator.userAgent);

  chosenButton = config.chosenBtn;

  python.straplineFontSetup(mc_strapline,config.straplineStore);

  python.buttonFontSetup(mc_button, config.buttonStore,config.lang);

  python.setUpDateGFX(mc_date,config.dateStore,config.lang); 

  python.sortOutDateElements(preDateElements,postDateElements);

  housekeepButtons();
  tweekElementsForLanguages();

  onMobile = fbf.isMobile();

  python.emergencyOverride();

  if(PS4creative)
  {
    python.createPS4exclusiveText(_root, config.exclusiveText2Lines, 12, 0.1, 0, WID*0.5, 197);
  }  

  setup(); 

}

function whatButtonToShow()
{

  log('%c\nwhatButtonToShow: '+chosenButton+'\n', 'color: #000000; font-weight: bold;');

  //if(config.chosenBtn == "Purchase"){  chosenButton = buyOrPre();     } else
  //if(config.chosenBtn == "Trailer") {  chosenButton = "btn_watch_trailer"; setTimeout(function() {log('%c\n   WATCH TRAILER   \n\n', 'background: #D09D36; color: #FFFFFF');}, 1500);}
}

function housekeepButtons()
{
  fbf.hide(mc_button.children);
  whatButtonToShow();
}

function tweekElementsForLanguages()
{
	if(config.lang == "de" || config.lang == "au")
	{
		TweenMax.set(mc_devLogos, {x: '+=7'});
	}
	else
	{
	  
	}

	// NUDGE TEXT DOWN A FEW PX
	var buttonText = document.getElementById(chosenButton).children[0];

	TweenMax.set(buttonText, {y: '+=2'});
}

function setUpLanguages() 
{
	if (config.lang == "uk" || config.lang == "nl")
	{
		fbf.show(mc_operation_logo_uk);
		fbf.setLang(mc_rating, 'uk');
	}
	else if (config.lang == "fr")
	{
		fbf.show(mc_operation_logo_fr);
		fbf.setLang(mc_rating, 'uk');
	}
  else if (config.lang == "de")
  {
    fbf.show(mc_operation_logo_de);
    fbf.setLang(mc_rating, config.lang);
  }
  else if (config.lang == "it")
  {
    fbf.show(mc_operation_logo_it);
    fbf.setLang(mc_rating, 'uk');
  } 
	else if (config.lang == "es")
	{
		fbf.show(mc_operation_logo_es);
		fbf.setLang(mc_rating, 'uk');
	}
	else 
	{
		fbf.show(mc_operation_logo_uk);
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
  setListeners(); setupIntroElements();
  startFlow();

  python.addSVGShadow(mc_date);
  python.addSVGShadow(mc_strapline);
}

function setupIntroElements()
{
	initialHide();
	setUpLanguages();
}

function initialHide()
{
	fbf.hide(mc_white, mc_button, mc_operation_logo, mc_logo, mc_strapline, mc_rating, mc_devLogos, mc_shadow);

	if(PS4creative)
	{
	  fbf.hide(PS4exclusiveText);
	}

	fbf.hide(mc_operation_logo.children);
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
  _root.addEventListener("click", handleClick);

  animateEndscreen();
}

function animateEndscreen()
{
  fbf.show(mc_logo, mc_operation_logo, mc_strapline, mc_button, mc_shadow);

  TweenMax.set(mc_shadow, {alpha: 0});
  TweenMax.to(mc_shadow, 5, {alpha: 0.6, delay: 1});

  python.fadeDownAndDisplayNone(mc_black);

  python.animateSimpleFadeUp(mc_devLogos, 1);
  python.animateSimpleFadeUp(mc_rating, 1);

  CustomEase.create("operation_logo_slam", "M0,0,C0.028,0.288,0.106,0.782,0.12,0.8,0.178,0.876,0.9,1,1,1");

  TweenMax.from(mc_operation_logo,  1.5,  {scale: 0.5, alpha: 0, ease: "operation_logo_slam", delay: 2});
  TweenMax.from(mc_logo,  0.5,  {alpha: 0, delay: 2.75});
  
  TweenMax.from(mc_strapline,  0.5,  {alpha: 0, delay: 3.5});
  animateChosenButton(4);

  if(PS4creative)
  {
    fbf.show(PS4exclusiveText);
    TweenMax.from(PS4exclusiveText,  0.5,  {alpha: 0, delay: 4.5});
  }

  TweenMax.from(mc_background,  5,  {scale: 1.25, transformOrigin: '50% 40%', ease: Expo.easeOut});
  TweenMax.from(mc_midground,   5,  {scale: 1.5, alpha: 0, transformOrigin: '50% 40%', ease: Expo.easeOut, delay: 0.25});
  TweenMax.from(mc_foreground,  5,  {scale: 1.5, alpha: 0, transformOrigin: '50% 40%', ease: Expo.easeOut, delay: 1});
}

function animateChosenButton(del)
{ 
  python.showChosenButton(chosenButton);

  if(!onEndscreen)
  {
    TweenMax.from(mc_button,  0.5,  {alpha: 0, delay: del});
    //python.animateButton($(chosenButton), 4)
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
  _root.addEventListener("click", handleClick);
}

function handleClick(event) 
{
  event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
  var target = event.target || event.srcElement;
  var phase = event.eventPhase;
  //EB.clickthrough();
  clickType();
  weClick = true;
  
}

function clickType()
{
  //EB.clickthrough();
  //Enabler.exit('default');
  immediateEndScreen();
  myAd.clickthrough();
}

function setUpCloseBtn()
{  
}

var clickToExpandClick = function ()
{  
}

var closeClick = function ()
{  
}

var buyNowClick = function ()
{
  clickType();
  //EB.clickthrough();
}

var ExpandForTrailerClick = function ()
{
}

var learnMoreClick = function()
{
  clickType();
  //EB.clickthrough();
}

var watchClick = function () //btn function
{
  clickType();
  // EB.clickthrough();
}

var preOrderClick = function () //btn function
{
  clickType();
  //EB.clickthrough();
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
  if(config.rich && !fbf.isMobile() && config.showIntroVid)
  {
    if(video_intro && video_intro.currentTime > 0 && !video_intro.paused && !video_intro.ended && video_intro.readyState > 2) video_intro.pause();
    fbf.displayNone(mc_video_intro);
  }   
  
  if (!onEndscreen) {
    fbf.displayNone();
    fbf.displayBlock(mc_ps4, mc_logo, mc_date, mc_button);
    fbf.show(mc_button);
    fbf.show($(chosenButton));
    TweenMax.killAll(true);
    onEndscreen = true;
  }
}

function showUpToRoot(mc) 
{
    var target = mc;
    while(target)
    {
      target.visible = true;
      target.display = true;//displayBlock();
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
		var mc_midground = $('mc_midground');
		var mc_foreground = $('mc_foreground');
		var mc_frame = $('mc_frame');
	var mc_rating = $('mc_rating');
		var rating_german = $('rating_german');
		var rating_english = $('rating_english');
	var mc_devLogos = $('mc_devLogos');
	var mc_accolade_house = $('mc_accolade_house');
		var mc_accoladesmudge = $('mc_accoladesmudge');
	var mc_shadow = $('mc_shadow');
	var mc_logo = $('mc_logo');
		var mc_logobox = $('mc_logobox');
	var mc_operation_logo = $('mc_operation_logo');
		var mc_operation_logo_ar = $('mc_operation_logo_ar');
		var mc_operation_logo_pl = $('mc_operation_logo_pl');
		var mc_operation_logo_ru = $('mc_operation_logo_ru');
		var mc_operation_logo_pt = $('mc_operation_logo_pt');
		var mc_operation_logo_es = $('mc_operation_logo_es');
		var mc_operation_logo_de = $('mc_operation_logo_de');
		var mc_operation_logo_fr = $('mc_operation_logo_fr');
		var mc_operation_logo_uk = $('mc_operation_logo_uk');
	var mc_date = $('mc_date');
	var mc_playstation_plus = $('mc_playstation_plus');
		var mc_playstation_plus_background = $('mc_playstation_plus_background');
		var mc_playstation_plus_text = $('mc_playstation_plus_text');
			var plus_spanish = $('plus_spanish');
	var mc_ps4 = $('mc_ps4');
	var mc_strapline = $('mc_strapline');
	var mc_button = $('mc_button');
	var mc_black = $('mc_black');
	var mc_white = $('mc_white');
	var mc_close = $('mc_close');
		var btn_close = $('btn_close');
			var mc_btn_bg = $('mc_btn_bg');
			var mc_close_cross = $('mc_close_cross');
			var mc_flash = $('mc_flash');
			var mc_ctahit = $('mc_ctahit');