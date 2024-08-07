
//4 to bin
//5 to root

var onov = (window.location.href.indexOf("http://ocean") == 0 || window.location.href.indexOf("https://ocean") == 0);

/*
This will form the basis of future builds hopefully
*/
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
// Define the Student constructor
function Ad() {
  // Call the parent constructor, making sure (using call)
  // that "this" is set correctly during the call
  AdBase.call(this, "init");
  // Initialize our Student-specific properties
  this.width = 300;
  this.start = function()  {  }
  /*
    our code
  */
}
Ad.prototype = Object.create(AdBase.prototype);
Ad.prototype.constructor = Ad;

var myAd = new Ad();
myAd.start();


//DIN CONDENSE - MP and ZOMBIE creative
//BANK GOTHIC - date
//GOTHAM - btn
//DIN LIGHT - pre launch stuff

/*
END OF THAT
/////////////////////////////////////////////////////
*/
//ad dimension variables
var WID = 300;
var HEI = 600;
/*
var getWindowHeight = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var getWindowWidth = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
*/
var gridHorizontal;
var gridVertical;

//var local = window.location.protocol === "file:" || window.location.hostname == "localhost";
var local = window.location.protocol === "file:" || window.location.hostname == "localhost";
//keyline setup object---------------------------------------------------------------------------------------------------------------------------
var keylineConfig = {
    colour: "#ff9900",
    thickness: 1
};
var keyline;
//set up variables------------------------------------------------------------------------------------------------------------------------------
var buildPath   =     "../../../../";
var globalPath  =    buildPath+"_global/";
var configPath  =    buildPath+"_configs/_std/";
var videoPath   =     buildPath+"_introvids/";
var videoName   =     "PLACEHOLDER_"+WID+"x"+HEI;
var ovPath      =   "../../../../../_bannerGlobals/acti/python/";
var configChoices = [
                      "trailer", //0
                      "preorder" //1
                    ];

var config_terr = "uk";//"uk,fr","it","de","es","pt","nl","befr","benl","nordics","at","chfr","chde","pl","ru","uaear","ksa","rsa","au";

var sizmek              = false;
var expandUnit          = false;
var video_intro;
var ratio               = 16 / 9; //WID*HEI
var VIDWID              = WID;//300;
var VIDHEI              = HEI;//250; //VIDWID/ratio;

var vidReplayed         = false;
var onEndscreen         = false;

var out;
var nonVidGo            = false;
var weClick             = false;

var landscape           = false;

var preDateElements     = []; //store elements that are pre Date
var postDateElements    = []; //store elements that are post Date

var isThisRespUnit      = false;
var constructRespSetUp  = false; //if you need to get all the divs list with all the ratios then set this to true.
var chosenButton;


var config;
//var defaultClickURL = [ {productLabel:"intro",productURL:"https://www.diy.com/"} ];

/*-----------------------------------------------------------------------------------------------------------------------------------------
.%%%%%%..%%..%%..%%%%%%..%%%%%%..........%%%%%%..%%..%%..%%..%%...%%%%...%%%%%%..%%%%%%...%%%%...%%..%%...%%%%..
...%%....%%%.%%....%%......%%............%%......%%..%%..%%%.%%..%%..%%....%%......%%....%%..%%..%%%.%%..%%.....
...%%....%%.%%%....%%......%%............%%%%....%%..%%..%%.%%%..%%........%%......%%....%%..%%..%%.%%%...%%%%..
...%%....%%..%%....%%......%%............%%......%%..%%..%%..%%..%%..%%....%%......%%....%%..%%..%%..%%......%%.
.%%%%%%..%%..%%..%%%%%%....%%............%%.......%%%%...%%..%%...%%%%.....%%....%%%%%%...%%%%...%%..%%...%%%%.. GENERIC BANNER INIT FUNCTIONS
-----------------------------------------------------------------------------------------------------------------------------------------*/

function setExits()
{ //initExits to get the doubleclick platform to recognise the exits, cannot be dynamically injected();
 // Enabler.exit('intro');  Enabler.exit('product1'); Enabler.exit('product2'); Enabler.exit('product3'); 
}

function startBanner() 
{
    console.log("StartBanner");
  //  console.log("IS THIS LOCAL: "+fbf.isLocal())
  // // console.log(getConfigAssetPath());
  // console.log("-----"+getAsset('asset_config'));
  // loadJS(getAsset('asset_config'),loadSvgs);
   loadScripts();
   //createBoxOverlay();
}



function loadScripts()
{
    loadJS(['fbf.js', 'config.js',  'python.js'], loadSvgs);
//  }
}

function loadSvgs()
{   
  
    fbf.loadSvgs(defaultsetup, "svg.gz.js");
     //fbf.loadSvgs(defaultsetup,getAsset("dir_template/svg.gz.js"));
}

function reportConfig()
{
  log("------ config loaded --------------------------------------------");
  for (key in config) {if(config.hasOwnProperty(key))log(key+" : "+config[key])};
  log("----------------------------------------------------------------");
}

function defaultsetup()
{
    console.log("----------------------------defaultsetup");
    logging     = fbf.isLocal();
    // out         = config.outDate.getTime() <= Date.now(); 
    out = false;
    reportConfig();
    //debug = true;   //use this to log the dom structure into the browser console.   (NB the log function only works once fbf is loaded and the global "logging" variable is true)
    log(fbf.logDom(_root));   
    fbf.clean(_root);        //this tranverses the dom and removes empty nodes to avoid confusion when looping though a node's children
    fbf.replaceSVGDefs();    //copys the svg definitions into any svg where they are used so the svgs can then be modfied individually by code
    fbf.displayBlock(_root); //show the main content, this also triggers applying the css so call this before you query any node for trasnsform info.
    _root.buttonMode = true; //gives the whole ad area a hand cursor
    //  _root.style.overflow = "hidden";
   /// if(isThisRespUnit){
  //    setUpblack();
  //  };
    document.getElementsByTagName("BODY")[0].style.overflow = "hidden";
    _root.style.cssText += "background-color:#000; overflow:hidden;";   
    keyline = addKeylineTo(_root, WID, HEI, '#ff6600', keylineConfig.thickness); //adds a keyline (border) to the root, good practice for ads to seperate them from their surrounding content where not needed to blend in
   
    fbf.show(_root);
 
   python.stopIEWobble(window.navigator.userAgent);
  
   setupLanguages(config.lang);
   python.straplineFontSetup(mc_strapline,config.straplineStore); //needs to be din condensed but for now we are using bank gothic
   python.buttonFontSetup(mc_button,config.buttonStore,config.lang);
   python.setUpDateGFX(mc_date,config.dateStore,config.lang);    
   python.sortOutDateElements(preDateElements,postDateElements);
   python.sortVideoLogo(mc_video_logo,mc_logo);
   TweenMax.set(mc_video_logo, {y:mc_video_logo._height*0.9});
   log("mc_video_logo height: "+mc_video_logo._height);
   housekeepButtons();
   tweekElementsForLanguages()

    //fbf.hide(mc_dateline,mc_video_logo);
    //fbf.displayNone(mc_close);
    python.emergencyOverride();

    //if(!isThisRespUnit){
     // setupAd();
    // } else {
    //  if(response.responseReady()) {setupRespAd()} else { log("response script not loaded")  };
    //} 

    setup();  
}

function whatButtonToShow()
{
 if(config.chosenBtn == "PreOrder"){  chosenButton = "btn_preorder";     } else
 if(config.chosenBtn == "Trailer") {  chosenButton = "btn_watch_trailer";} else
 if(config.chosenBtn == "MP")      {  chosenButton = "btn_MP";           } else
 if(config.chosenBtn == "Zombies") {  chosenButton = "btn_zombies";      }
}

function housekeepButtons()
{
  log("-----------HOUSE KEEP BUTTONS-----------------------------------------------");
  fbf.hide(mc_button.children);
  whatButtonToShow(); 
}

function tweekElementsForLanguages() //____________________for cases where you might need to move things slightly for different translations
{
  log("tweekElementsForLanguages");
  if (config.lang == "uaear") {
    TweenMax.set(mc_date,{scale:0.9,x:"-=14",y:"+=18"}); //tweek these values for reszing arabic
  }else if (config.lang == "fr"){
    //
  }else if(config.lang == "de"){
    //
  }else{
    //do nothing
  }

}

function setupLanguages() 
{
   log("setupLanguages");
    if (config.lang == "at" || config.lang == "chfr" || config.lang == "chde" || config.lang == "uaear" || config.lang == "uaeen") {
        fbf.setLang(mc_rating, "uk");
    } else {
        fbf.setLang(mc_rating, config.lang);
    }
}

/*-----------------------------------------------------------------------------------------------------------------------------------------
..%%%%...%%%%%%..%%%%%%..%%..%%..%%%%%...........%%%%%%..%%..%%..%%..%%...%%%%...%%%%%%..%%%%%%...%%%%...%%..%%...%%%%..
.%%......%%........%%....%%..%%..%%..%%..........%%......%%..%%..%%%.%%..%%..%%....%%......%%....%%..%%..%%%.%%..%%.....
..%%%%...%%%%......%%....%%..%%..%%%%%...........%%%%....%%..%%..%%.%%%..%%........%%......%%....%%..%%..%%.%%%...%%%%..
.....%%..%%........%%....%%..%%..%%..............%%......%%..%%..%%..%%..%%..%%....%%......%%....%%..%%..%%..%%......%%.SETUP DIVS AND SUCH 
..%%%%...%%%%%%....%%.....%%%%...%%..............%%.......%%%%...%%..%%...%%%%.....%%....%%%%%%...%%%%...%%..%%...%%%%..READY FOR BANNER FLOW 
-----------------------------------------------------------------------------------------------------------------------------------------*/
// var howManyProducts = 0;
// var showBlade = "true";

function setup()
{
    log("setup");
    setListeners();
    setupIntroElements();
    startFlow();
}


function setupIntroElements()
{
	initialHide();
	setUpLanguages();
}

function initialHide()
{
	fbf.hide(mc_strapline);
}

function setUpLanguages()
{
	if (config.lang == "uaear" || config.lang == "uaeen") {
        fbf.setLang(mc_rating, "uk");
    } else {
        fbf.setLang(mc_rating, config.lang); //.config
    }
}


/*-----------------------------------------------------------------------------------------------------------------------------------------
.%%%%%....%%%%...%%..%%..%%..%%..%%%%%%..%%%%%...........%%%%%%..%%.......%%%%...%%...%%.
.%%..%%..%%..%%..%%%.%%..%%%.%%..%%......%%..%%..........%%......%%......%%..%%..%%...%%.
.%%%%%...%%%%%%..%%.%%%..%%.%%%..%%%%....%%%%%...........%%%%....%%......%%..%%..%%.%.%%.
.%%..%%..%%..%%..%%..%%..%%..%%..%%......%%..%%..........%%......%%......%%..%%..%%%%%%%.
.%%%%%...%%..%%..%%..%%..%%..%%..%%%%%%..%%..%%..........%%......%%%%%%...%%%%....%%.%%.. INCLUDES FLOW AND ANIMATION FUNCTIONS
-----------------------------------------------------------------------------------------------------------------------------------------*/

function startFlow()
{
    log("startFlow");
    log(fbf.isMobile());
     _root.addEventListener("click", handleClick);
     //config.showIntroVid = false;
     if (config.rich && !fbf.isMobile() && config.showIntroVid) {
       videoIntro();
    } else {
       nonVideoIntro();
    }
}

function videoIntro()
{
    fbf.displayBlock(mc_video_logo);
    fbf.show(mc_video_logo);
    fbf.displayNone(mc_logo,mc_ps4,mc_strapline,mc_date);
    setupVideo(mc_video_intro,myAd.getAsset(assets.videoIntroMp4), myAd.getAsset(assets.videoIntroWebM),VIDWID,VIDHEI);
}

function nonVideoIntro()
{
    log('nonVideoIntro');
    if(!nonVidGo) {  animateEndscreen();  nonVidGo = true;    }    
}


function animateEndscreen()
{
  fbf.displayNone(mc_video_intro,mc_video_logo);
  fbf.displayBlock(mc_logo,mc_ps4,mc_date);
	log("animateEndScreen");
	python.fadeDownAndDisplayNone(mc_black);
	python.animateBackground(mc_bg_house,0, "50% 50%");
  python.animateForeground(mc_ruin_scaled,0,"50% 30%");
  python.animateSimpleFadeUp(mc_ps4,0);
	python.animateLogo(mc_logo,0.7);
	python.animateDate(mc_date,1)
  if(config.lang != "uaear") {animateChosenButton(2)} else { python.showChosenButton(chosenButton)}
  python.animateSimpleFadeUp(mc_devLogos,3);
  python.animateSimpleFadeUp(mc_rating,3);
}


function animateChosenButton(del){ 
  python.showChosenButton(chosenButton);
  if(!onEndscreen){
     python.animateButton($(chosenButton),2)
  }
 
 
}

function immediateEndScreen()
{
  log("immediateEndscreen");  
      if(config.rich && !fbf.isMobile() && config.showIntroVid)
      {
        if(video_intro && video_intro.currentTime > 0 && !video_intro.paused && !video_intro.ended && video_intro.readyState > 2) video_intro.pause();
        fbf.displayNone(mc_video_intro);
      }   
      if (!onEndscreen) {
        log("first time round")
          fbf.displayNone(mc_accolade_house,mc_video_logo,mc_black);
          fbf.displayBlock(mc_ps4,mc_logo,mc_date, mc_button);
          fbf.show(mc_button);
          fbf.show($(chosenButton));
          TweenMax.killAll(true); //forces all animations using Tween script to go to the final state of their animation 
          onEndscreen = true;
      }}

/*-----------------------------------------------------------------------------------------------------------------------------------------
.%%..%%..%%%%%%..........%%%%%%..%%..%%..%%..%%...%%%%...%%%%%%..%%%%%%...%%%%...%%..%%...%%%%..
.%%..%%....%%............%%......%%..%%..%%%.%%..%%..%%....%%......%%....%%..%%..%%%.%%..%%.....
.%%..%%....%%............%%%%....%%..%%..%%.%%%..%%........%%......%%....%%..%%..%%.%%%...%%%%..
.%%..%%....%%............%%......%%..%%..%%..%%..%%..%%....%%......%%....%%..%%..%%..%%......%%.
..%%%%...%%%%%%..........%%.......%%%%...%%..%%...%%%%.....%%....%%%%%%...%%%%...%%..%%...%%%%.. INCLUDES FUNCTIONS FOR USER INTERACTIONS
-----------------------------------------------------------------------------------------------------------------------------------------*/

function setListeners()//UTIL
{
    log("setListeners");
    _root.addEventListener("click", handleClick);
}

function handleClick(event) 
{
    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    var target = event.target || event.srcElement;
    var phase = event.eventPhase;
    log("handleClick---------------");
   // EB.clickthrough();
   clickType();
    //weClick = true;
    immediateEndScreen();
}

function clickType()
{
   // EB.clickthrough();
   Enabler.exit('default');
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

// --------------------------------------------------------------------------------------------------------------------- <- CLOSE BUTTON FUNCTION
function setUpCloseBtn()
{
    /*codiw.showUpToRoot(btn_close);
    codiw.giveFlash(btn_close);
    codiw.setUpButton(btn_close, closeClick);*/
}
// --------------------------------------------------------------------------------------------------------------------- <- BUTTON CALLOUT FUNCTIONS
var clickToExpandClick = function () //btn function
    {
        log("clickToExpandClick");
    }

var closeClick = function () //btn function
    {
        log("closeClick");        

    }

var buyNowClick = function () //btn function
    {
        log("buyNowClick");
        clickType();
        //EB.clickthrough();
    }

var ExpandForTrailerClick = function () //btn function
    {
        log("ExpandForTrailerClick");
    }

var learnMoreClick = function() //btn function
    {
        log("learnMoreClick");
        clickType();
       // EB.clickthrough();
    }

var watchClick = function () //btn function
    {
        log("watchClick");
        clickType();
       // EB.clickthrough();
    }
var preOrderClick = function () //btn function
    {
        log("preOrderClick");
        clickType();
       // EB.clickthrough();
    }

var vidPlayClick = function () //btn function
    {
        log("vidPlayClick");
        clickType();
        // EB.clickthrough("preOrderClick");
    }


// --------------------------------------------------------------------------------------------------------------------- <- VIDEO FUNCTIONS
function setupVideo(divDest,vidURLMP4,vidURLWEBM,VIDWID,VIDHEI) 
{
    log("setupVideo");
    video_intro = fbf.createVideo("video_intro", divDest._width, divDest._height, vidURLMP4, vidURLWEBM);
    video_intro.style.cssText += "width:" + VIDWID + "px; height:" + VIDHEI + "px; display:block;";
    fbf.displayBlock(divDest);
    fbf.show(divDest);
    // fbf.displayNone(mc_black,mc_thumbnailplay);
    divDest.appendChild(video_intro);   
    if (sizmek && !local) var videoModule = new EBG.VideoModule(video_intro);
    video_intro.addEventListener('play', videoStarted, false);
    video_intro.addEventListener('ended', videoFinished, false);
    video_intro.addEventListener('canplaythrough', canPlayHandler, false);
    video_intro.addEventListener('error', videoError, true);
    video_intro.load();
}

function videoError()
{
  log("videoError");
  nonVideoIntro();
}

function canPlayHandler() 
{
    log("playVid:" + video_intro.id);
    if(!weClick){
      video_intro.play();
    } else {
      //nonVideoIntro();
    }    
    TweenMax.to(mc_black,0.5,{alpha:0});   
   //fbf.hide(blocker);
}

function videoStarted(event) 
{
    log("videoStarted");
    var video = event.target || event.srcElement;
    video.removeEventListener('play', videoStarted);    
    // animateIntroText();
    //animateAccolade(2);
}

function videoFinished(event) 
{
    log("videoFinished");
    var video = event.target || event.srcElement;
    log(video.id);
    video.pause();
    if (video.id == "video_intro") {
        log("showEndscreen");
        videoComplete();
    } else {
        log("resetVideo");
    }
}

function videoComplete() 
{
    log("videoComplete");
    video_intro.pause();
    TweenMax.set(mc_black,{alpha:1});
    animateEndscreen();
}
// --------------------------------------------------------------------------------------------------------------------- <- BACKUP
/*-----------------------------------------------------------------------------------------------------------------------------------------
.%%%%%....%%%%...%%...%%...........%%%%...%%%%%%...%%%%...%%%%%...%%%%%%.
.%%..%%..%%..%%..%%%.%%%..........%%........%%....%%..%%..%%..%%..%%.....
.%%..%%..%%..%%..%%.%.%%...........%%%%.....%%....%%..%%..%%%%%...%%%%...
.%%..%%..%%..%%..%%...%%..............%%....%%....%%..%%..%%..%%..%%.....
.%%%%%....%%%%...%%...%%...........%%%%.....%%.....%%%%...%%..%%..%%%%%%. COPY AND PASTE THE DOM FROM CONSOLE LOG BELOW
-----------------------------------------------------------------------------------------------------------------------------------------*/

var _root = $('root');
	var mc_background = $('mc_background');
		var mc_bg_house = $('mc_bg_house');
	var mc_ruin = $('mc_ruin');
		var mc_ruin_scaled = $('mc_ruin_scaled');
	var mc_rating = $('mc_rating');
		var rating_english = $('rating_english');
		var rating_french = $('rating_french');
		var rating_spanish = $('rating_spanish');
		var rating_italian = $('rating_italian');
		var rating_german = $('rating_german');
		var rating_australian = $('rating_australian');
		var rating_dutch = $('rating_dutch');
		var rating_russian = $('rating_russian');
		var mc_rating_polish = $('mc_rating_polish');
	var mc_devLogos = $('mc_devLogos');
	var mc_button = $('mc_button');
	var mc_video_intro = $('mc_video_intro');
	var mc_video_logo = $('mc_video_logo');
	var mc_ps4 = $('mc_ps4');
	var mc_accolade_house = $('mc_accolade_house');
		var mc_accoladesmudge = $('mc_accoladesmudge');
	var mc_logo = $('mc_logo');
		var mc_logobox = $('mc_logobox');
	var mc_date = $('mc_date');
	var mc_strapline = $('mc_strapline');
	var mc_black = $('mc_black');
	var mc_close = $('mc_close');
		var btn_close = $('btn_close');
			var mc_btn_bg = $('mc_btn_bg');
			var mc_close_cross = $('mc_close_cross');
			var mc_flash = $('mc_flash');
			var mc_ctahit = $('mc_ctahit');