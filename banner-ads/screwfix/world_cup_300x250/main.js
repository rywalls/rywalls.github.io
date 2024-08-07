var demo = true;

var useDefaultClickThrough = true;
if(demo)
{
  var useDynamicExit = false;
  var useTracker = false;
}

//ad dimension variables
var WID = 300;
var HEI = 250;

//var local = window.location.protocol === "file:" || window.location.hostname == "localhost";
var local = window.location.protocol === "file:" || window.location.hostname == "localhost";
//keyline setup object---------------------------------------------------------------------------------------------------------------------------
var keylineConfig = {
    colour: "#004996",
    thickness: 1
};
var keyline;


var defaultClickURL = [
           {productLabel:"intro",productURL:"https://www.screwfix.com/legendsofthegame/"}
           ];

function setExits(){ //HAVE TO UPDATE THIS WITH CURRENT NAMING CONVENTION
//   //initExits to get the doubleclick platform to recognise the exits, cannot be dynamically injected();
   Enabler.exit('default');  Enabler.exit('intro');  Enabler.exit('product1');  Enabler.exit('product2');  Enabler.exit('product3');  Enabler.exit('product4');  Enabler.exit('product5');  Enabler.exit('product6'); 
 }

var DEGREES_TO_RADIANS = Math.PI / 180;
var RADIANS_TO_DEGREES = 180 / Math.PI;

function warpText(text, radius, fontSize, letterSpacing){
  log("--------WARP TEXT");
  //font, text, fontSize, kerning, leadingOffset, align, colour, wrapper, width
  var tf = TextField("IntroFontGFX", text, fontSize, letterSpacing, 0, "center", "#fff");
  var chars = tf.querySelectorAll("use");
  var svg = tf.querySelector("svg");
  
  var wid = parseInt(svg.getAttribute("width"));
  var hei = parseInt(svg.getAttribute("height"));
  console.log(wid, hei);
  svg.setAttribute("width", (wid + 40) + "px");
  svg.setAttribute("height", (hei + 40) + "px");
  
  //center of svg
  var cx = wid * 0.5;
  var cy = hei * 0.5;

      function createCircle(x,y,r,colour)
    {
      var svgns = "http://www.w3.org/2000/svg";
      var circle = document.createElementNS(svgns, 'circle');
          circle.setAttributeNS(null, 'cx', x);
          circle.setAttributeNS(null, 'cy', y);
          circle.setAttributeNS(null, 'r', r);
          circle.setAttributeNS(null, 'style', 'fill: none; stroke: ' + colour + ' ; stroke-width: 1px;' );
          return circle;
    }

//  svg.appendChild(createCircle(cx,cy,5,"#FFFF00"));

  /*
  svg.removeAttribute("width");
  svg.removeAttribute("height");
  */
  svg.setAttributeNS(null, "viewBox", "-20 -20 " + (wid + 40) + " " + (hei + 40));



  var rotation = 0.05;
  var baseline = 50;
  var rotation = -(chars.length-1)*2;


    for (var i = 0; i < chars.length; i++) {
    var x = Math.sin(rotation) * radius;
    var y = radius - Math.cos(rotation*DEGREES_TO_RADIANS) * radius;

    //TweenMax.set(chars[i], {x:x, y:y});
    var char = chars[i];
    var id = char.getAttributeNS("http://www.w3.org/1999/xlink", "href").substr(1);
    var orig = document.getElementById(id);
    var bbox = orig.getBBox();
    y = 0;
    
    //console.log(id);
    
    //the current transform of the character
    var transform = char.getAttribute("transform");

    console.log("////////////////////////////////////////////////////////////\n\nTRANSFORM: " + transform)
    
 
    //var split = transform.split(" ");
    var split = transform.split(" ");
    console.log("////////////////////////////////////////////////////////////\n\nSPLIT: " + split)

    console.log(split[0]);
    var position = split[0]
    


    position = position.substr(10, position.length-11).split(",");
    var pos_x = parseFloat(position[0]);
    var pos_y = parseFloat(position[1]);

    var scale = split[1];  
    console.log("////////////////////////////////////////////////////////////\n\nSCALE: " + scale) 
    scale = parseFloat(scale.substr(6, scale.length-7));

    
      
    var mid_x = (bbox.x + (bbox.width * 0.5)) * scale + pos_x;
    var mid_y = (bbox.y + (bbox.height * 0.5)) * scale + pos_y;
    var bottom_y = (bbox.y + (bbox.height * 1)) * scale + pos_y;

//    svg.appendChild(createCircle(mid_x,bottom_y+y,5,"#FF0000"));
    //console.log(mid_x);
    /*
    transform = "translate(-" + (bbox.width * 0.5) + ", -" + (bbox.height * 0.5) + ") " + 
    "rotate(5) " + 
    "translate(" + (bbox.width * 0.5) + ", " + (bbox.height * 0.5) + ") " +
    transform;*/
    //rotation = 90;
//    svg.appendChild(createCircle(pos_x+bbox.x*scale,pos_y+bbox.y*scale+y,2, "#00FF00"));
//    svg.appendChild(createCircle(pos_x,pos_y+y,2, "#0000FF"));
    var xx = bbox.x + (bbox.width * 0.5);
    var yy = bbox.y + (bbox.height * 1);

    //disance from cx (center of svg)
    var offset_x = mid_x - cx;
    var angle = Math.atan(offset_x/radius) * RADIANS_TO_DEGREES;
    rotation = angle;
  
    var dx = cx - mid_x;
    var dy = radius + 50 - bottom_y;
    var l = Math.sqrt(dx * dx + dy * dy);
    var dxn = dx / l;
    var dyn = dy / l;
    dxn *= radius;
    dyn *= radius;

    //console.log("deltas", dx - dxn, dy - dyn);



    var trans_r = "rotate(" + rotation + ", " + xx + ", " + yy + ")";   ;//(bbox.height * 0.5)
    //transform = transform.split("scale").join(" " + trans_r + " " + "scale");
    //transform = "translate(0, "+ y+") " + transform + " " + trans_r ;

    //THIS ONE WORKS
    //transform = "translate(0, "+ y+") " + transform + " " + trans_r ;
    transform = "translate(" +  (dx - dxn) + "," + (dy - dyn) +") " + transform + " " + trans_r ;
    //console.log(-y);
    char.setAttribute("transform", transform);
    //transform = 
    rotation+=4;
  }

  return tf;
  span.appendChild(tf);

  var spanWrapper = utils.create("div", null, "category_" + i, span);
  spanWrapper.style.top = "0px";
  spanWrapper.style.position = "absolute";
  span.style.position = "absolute";
  span.style.textAlign = "center";

  TweenMax.set(span, { transoformOrigin: "0% 0%", y: -575 });
  TweenMax.set(spanWrapper, { transoformOrigin: "0% 0%" });

  /*spanWrapper.style.left = "-200px";*/
  span.style.width = "400px";
  span.style.height = "100px";
  span.style.marginLeft = "-200px";
  span.style.marginTop = "-25px";

  spanWrapper.appendChild(span);
 }

function startBanner() 
{
    //in here load any other assets and/or wait for any platform specific conditions such as Enabler/EB inits or Flashtalking instant ad variables to load
    console.log("StartBanner");
    //loadEB();
    //loadScripts();
    loadSvgs();
    //loadJS(getConfigAssetPath(),loadScripts);

}

function getConfigAssetPath()
{
//    if(fbf.isLocal() || demo)
//    {
//      logging = true;
//
//      return "config.js";
//    }else{
//      return dc["asset_config"].Url; 
//    }
}

function loadScripts()
{
   if(demo == true)
    {   
      loadSvgs();
  }else{
    loadJS([getAsset('asset_config')], loadSvgs);
  } /*console.log("loadScripts");*/
 
   // loadJS([myAd.getAsset(assets.config), myAd.getAsset(assets.fbf), myAd.getAsset(assets.campaign)], loadSvgs);
}

//function loadSvgs(){    fbf.loadSvgs(setupAd,getAsset("dir_assets/svg.gz.js"));  }

function loadSvgs(){    
  if(demo == true)
    {
    fbf.loadSvgs(setupAd); 
  }else{
    fbf.loadSvgs(setupAd,getAsset("dir_assets/svg.gz.js"));
  }
}
function reportConfig()
{
  log("------ config loaded --------------------------------------------");
  for (key in config) {if(config.hasOwnProperty(key))log(key+" : "+config[key])};
  log("----------------------------------------------------------------");
}

function setupAd() 
{
    /*logging is a global var and log is a global function*/
    //sets logging enabled based on the ad running locally to stop logs happening in live ads (always use log("message") rather than console.log("message"))
    logging = fbf.isLocal();
    reportConfig();
    //debug = true;   //use this to log the dom structure into the browser console.   (NB the log function only works once fbf is loaded and the global "logging" variable is true)
    log(fbf.logDom(_root));   
    fbf.clean(_root);        //this tranverses the dom and removes empty nodes to avoid confusion when looping though a node's children
    fbf.replaceSVGDefs();    //copys the svg definitions into any svg where they are used so the svgs can then be modfied individually by code
    fbf.displayBlock(_root); //show the main content, this also triggers applying the css so call this before you query any node for trasnsform info.
    _root.buttonMode = true; //gives the whole ad area a hand cursor
    //  _root.style.overflow = "hidden";
    _root.style.cssText += "overflow:hidden;";   
    keyline = addKeylineTo(_root, WID, HEI, keylineConfig.colour, keylineConfig.thickness); //adds a keyline (border) to the root, good practice for ads to seperate them from their surrounding content where not needed to blend in
    setup();
}

function setup()
{
   log("setup");
    hideSections();
    setListeners();


      introText = intro_text[0].split("|"); 
      introTextLong = intro_text_long[0].split("|");

      console.log("\n////////////////////////\n\nINTRO TEXT: " + introText +"\n\n////////////////////////\n\n");
    	console.log("\n////////////////////////\n\nINTRO TEXT LONG: " + introTextLong +"\n\n////////////////////////\n\n");

      console.log("\n||||||||||||||||||||||||||||||||||||||\n\n\n\n");
      checkforlinebreaks(introTextLong[0]);
      


    startFlow();

}

function checkforlinebreaks(texttocheck){
    //text = text.substr(0, lastSpace) + String.fromCharCode(10) + text.substr(lastSpace + 1);
    log(texttocheck);
}

function hideSections()
{
  fbf.displayNone();
  fbf.hide(mc_image, mc_shadow, mc_screwfix_logo, mc_itv_logo, mc_slogan, mc_legends_of_game, mc_cta, mc_endscreen, mc_intro, mc_text_long);
}

function setListeners()//UTIL
{
    _root.addEventListener("click", handleClick);
    _root.addEventListener('mouseover', ad_rollOver, false);
    _root.addEventListener('mouseout', ad_rollOut, false); 
}

// --------------------------------------------------------------------------------------------------------------------- <- START FLOW OF BANNER
var prodCounter = -1,
    prodTotal = 0,
    delayText = 2,
    chosenCTA,
    HurryMessageToUse = "",
    fontchoice = "IntroFontGFX",
    eventStart =  new Date("May 4 2018 00:00:00 GMT+0000"), //this date doesn't effect the banner
    eventEnd =  new Date("May 8 2018 00:00:00 GMT+0000"), //the date after the event finishes (event is 4th-7th May, so this date should be 8th May)
    todaysDay = "",
    daysLeft,
    screwFixRed = "#E30613",
    screwFixRedDark = "#AE040E",
    screwFixBlue = "#004996",
    screwFixBlueDark = "#003873",
    textSpacing = 5,
    chosenAccolade = [],
    wakeUpBanner = false,
    products = "",
    config,
    introText,
    introTextLong;

var intro_text = [ // FOR LOCAL TESTING

    // CURVED TEXT, RADIUS, FONT SIZE, LINE TOP BUFFER, LETTER SPACING, TEXT STRAIGHT, FONT SIZE, LINE TOP BUFFER, LETTER SPACING
              
    /*0*/   "WHAT A|450|32|0|5|WIN!|55|0|7",
    /*1*/   "GOOD LUCK|450|32|0|5|ENGLAND|50|10|10",
    /*2*/   "GOOD LUCK|450|32|0|5|ENGLAND|50|10|10",
    /*3*/   "GOOD LUCK|450|32|0|5|ENGLAND|50|10|10",
    /*4*/   "GOOD LUCK|450|32|0|5|ENGLAND|50|10|10",
    /*5*/   "GOOD LUCK|450|32|0|5|ENGLAND|50|10|10",
    /*6*/   "GOOD LUCK|450|32|0|5|ENGLAND|50|10|10"

];

var intro_text_long = [ // FOR LOCAL TESTING

    // CURVED TEXT, RADIUS, FONT SIZE, LINE TOP BUFFER, LETTER SPACING, TEXT STRAIGHT, FONT SIZE, LINE TOP BUFFER, LETTER SPACING
    /*0*/   "JOB DONE!\n\nSPEAKING OF GETTING THE\nJOB DONE - GET YOURSELF\nTO SCREWFIX.COM.\nWE’VE GOT EVERYTHING\nYOU NEED!|22|1|1",
    /*1*/   "HALF TIME! FORGET THE ENERGY DRINKS AND MASSAGES, WE'LL PROBABLY JUST POP THE KETTLE ON AND NIP TO THE LOO!|55|0|1",
    /*2*/   "KICK OFF! HOW LONG BEFORE SOMEONE SAYS THIS GAME NEEDS AN EARLY GOAL?|55|0|7",
    /*3*/   "KICK OFF! HOW LONG BEFORE SOMEONE SAYS THIS GAME NEEDS AN EARLY GOAL?|55|0|7",
    /*4*/   "KICK OFF! HOW LONG BEFORE SOMEONE SAYS THIS GAME NEEDS AN EARLY GOAL?|55|0|7",
    /*5*/   "KICK OFF! HOW LONG BEFORE SOMEONE SAYS THIS GAME NEEDS AN EARLY GOAL?|55|0|7",
    /*6*/   "KICK OFF! HOW LONG BEFORE SOMEONE SAYS THIS GAME NEEDS AN EARLY GOAL?|55|0|7"

];

function startFlow()
{
    //log("startFlow");
    introTextSetup();
    animateIntro();


}

function introTextSetup()
{

    var tffont = "IntroFontGFX"; //flash.text.Font 

    //var tf_curved = TextField(tffont,introText[0]["line"],introText[0]["lineFontSize"],0,0,"center", "#ffffff");
    //font, text, fontSize, kerning, leadingOffset, align, colour, wrapper, width

    // CURVED TEXT
    var tf_curved = warpText(introText[0], introText[1]-0, introText[2], introText[4]-0);

    mc_text_curved.appendChild(tf_curved);

    TweenMax.set(tf_curved,{y: introText[3],x:centerMe(mc_text_curved.children[0])});

    // STRAIGHT TEXT

   // var tf_straight = TextField(tffont, introText[5], introText[6]-0, introText[8]-0, 0,"center", "#ffffff");
   var tf_straight = TextField(tffont, introText[5], parseInt(introText[6]), parseInt(introText[8]), 0,"center", "#ffffff");

    mc_text_straight.appendChild(tf_straight);

    TweenMax.set(tf_straight,{y: introText[7], x:centerMe(mc_text_straight.children[0])+4});

    // LONG TEXT

    //                      font    text              font size       line height       align     colour

    var tf_long = TextField(tffont, introTextLong[0], introTextLong[1]-0, introTextLong[3]-0, 0,"center", "#ffffff");

    mc_text_long.appendChild(tf_long);

    TweenMax.set(tf_long,{y: introTextLong[2], x:centerMe(mc_text_long.children[0])+0});

    console.log(" \n////////////////////////\n\nintroTextSetup\n\nCURVED: " + introText[0] + "\n\nSTRAIGHT: " + introText[5] + 
    	"\n\n////////////////////////\n\n");

    
}

function giveContentDimensions(divID)
{
  log("giveParentContentDimensions");
  var width = Math.round((divID._("svg").getAttribute("width").split("px")[0]));
  var height = Math.round(divID._("svg").getAttribute("height").split("px")[0]);
  log(width,height);
  log(divID);
  divID.setAttribute("width", width+"px");
  divID.setAttribute("height", height+"px");
}

function centerMe(divID)
{
  //log(" \n////////////////////////\n\nCenterMe...\n\n////////////////////////\n ");
  var centerX = Math.round((WID*0.0)-(divID._("svg").getAttribute("width").split("px")[0]*0.5));
  return centerX
}

function getHeight(divID)
{
  log(" \n////////////////////////\n\nHeight of font...\n\n////////////////////////\n ");
  var heightAbove = Math.round(divID._("svg").getAttribute("height").split("px")[0]);
  return heightAbove;
}

function updateColor(divToChange,colourToUse)
{
  log(" \n////////////////////////\n\nupdateColor: "+divToChange.id+" to colour: "+colourToUse +"\n\n////////////////////////\n ");

  var pathStore = divToChange.__("path");
  if(pathStore)
  {
    for (var i = pathStore.length - 1; i >= 0; i--) {
      pathStore[i].setAttribute("fill",colourToUse);
    }
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

function showIntro()
{
  fbf.displayBlock(mc_intro);
}

function showProductSection()
{
  fbf.displayBlock(mc_products);
}

function TextSetup(divID,textDeets,fontChoice,textfontSize,textfontColour,lineHeight,halign,gutDiv)
{
  log(" \n////////////////////////\n\nText setup...\n\n////////////////////////\n ");
  if(gutDiv){
    divID.innerHTML = "";
  }
  
  var tf = TextField(fontChoice,textDeets,textfontSize,0,lineHeight,halign,textfontColour);
  divID.appendChild(tf); 
  TweenMax.set(tf,{x:centerMe(divID.children[0])});
}

function setText(divID)
{
  log(" \n////////////////////////\n\nSet 'HURRY!' text in correct place...\n\n////////////////////////\n ");
  //TweenMax.set(divID,{x:WID*-0.51,y:-47});
  TweenMax.set(divID,{x:WID*-setTextX,y:-setTextY});
}

var setTextX = 0.51;
var setTextY = 38;

/*-------------------------------------------------------------------------------------------
..%%%%...%%..%%..%%%%%%..%%...%%...%%%%...%%%%%%..%%%%%%...%%%%...%%..%%.
.%%..%%..%%%.%%....%%....%%%.%%%..%%..%%....%%......%%....%%..%%..%%%.%%.
.%%%%%%..%%.%%%....%%....%%.%.%%..%%%%%%....%%......%%....%%..%%..%%.%%%.
.%%..%%..%%..%%....%%....%%...%%..%%..%%....%%......%%....%%..%%..%%..%%.
.%%..%%..%%..%%..%%%%%%..%%...%%..%%..%%....%%....%%%%%%...%%%%...%%..%%.
-------------------------------------------------------------------------------------------*/

function animateIntro()
{

    fbf.show(mc_image, mc_screwfix_logo, mc_itv_logo, mc_slogan);

    const introTimeline = new TimelineMax();
  
    // DELAYS NOT REQUIRED, THIS AUTOMATICALLY RUNS IN SEQUENCE
  
    introTimeline
                .set(mc_image, {transformOrigin: '0% 15%'})
                .from(mc_screwfix_logo,   0.75,   {alpha: 0,  ease: Expo.easeOut},  '+=0.25')
                .from(mc_slogan,          0.75,   {alpha: 0,  ease: Expo.easeOut},  '-=0.75')
                .from(mc_itv_logo,        0.75,   {alpha: 0,  ease: Expo.easeOut, onComplete:animateIntroText},  '-=0.75')
                .from(mc_image,		        10.0,		{scale: 4.5, 	ease: Sine.easeInOut, onComplete:animateEndScreen},  '-=0.75')
}

function animateIntroText()
{
  fbf.show(mc_intro,mc_text_curved, mc_text_straight, mc_text_long, mc_shadow);
  mc_intro.style.width = WID+"px";
  mc_intro.style.height = HEI+"px";

  var scaleUp = 20;

  console.log(" \n////////////////////////\n\nANIMATING INTRO TEXT...\n\n////////////////////////\n ")

  //TweenMax.from(mc_intro.children[0],0.5,{alpha:0, scale: scaleUp});
  //TweenMax.from(mc_intro.children[1],0.5,{alpha:0, scale: scaleUp});
  //TweenMax.from(mc_intro, 0.5, {alpha:0, scale: scaleUp, ease: Expo.easeOut});

  const animatingText = new TimelineMax();
  
  console.log(" \n////////////////////////\n\nANIMATING END SCREEN...\n\n////////////////////////\n ")
    
  // DELAYS ARE NOT REQUIRED, THIS AUTOMATICALLY RUNS IN SEQUENCE
  
  animatingText
              .set(mc_shadow, {alpha: 0.6})
              .from(mc_intro,     0.5, {alpha:0, scale: scaleUp, ease: Expo.easeOut}, '+=0.0')
              .to(mc_intro,       0.75, {x: '-=300', ease: Expo.easeOut}, '+=2.5')
              .from(mc_shadow,    0.5, {alpha: 0, ease: Sine.easeInOut}, '-=0.8')
              .from(mc_text_long, 0.75, {x: '+=300', ease: Expo.easeOut}, '-=0.7')
              
}

function animateEndScreen()
{
    fbf.show(mc_endscreen, mc_legends_of_game, mc_cta);
    
    const endscreenTimeline = new TimelineMax();
  
    console.log(" \n////////////////////////\n\nANIMATING END SCREEN...\n\n////////////////////////\n ")
    
    // DELAYS ARE NOT REQUIRED, THIS AUTOMATICALLY RUNS IN SEQUENCE
    
    endscreenTimeline
                // FADE OUT ASSETS
                .to(mc_intro,                    0.35,   {alpha: 0},  '+=0.0')
                .to(mc_text_long,                0.35,   {alpha: 0},  '-=0.35')
                .to(mc_shadow,                   0.35,   {alpha: 0},  '-=0.35')
                // BRING IN NEW ASSETS
                .from(mc_endscreen_background,   0.25,   {x: '+=300',  ease: Power1.easeInOut},  '+=0.25')
                .from(mc_legends_of_game,        0.5,    {alpha: 0,  ease: Power1.easeInOut},  '+=0.5')
                .from(mc_cta,                    0.5,    {alpha: 0,  ease: Expo.easeOut},  '+=0.0')    
}

ad_rollOver = function(e) {//UTIL
    ctaOn();  
}
ad_rollOut = function(e) {//UTIL
   ctaOff();
}

function ctaSetup()
{
  var pathStore = mc_cta.__("path");
  pathStore[0].setAttribute("fill", "#CC232D"); //bg of button
}

function ctaOn()
{
  var pathStore = mc_cta.__("path");
  pathStore[0].setAttribute("fill", "#184A98"); //bg of button
}

function ctaOff()
{
  var pathStore = mc_cta.__("path");
  pathStore[0].setAttribute("fill","#CC232D"); //bg of button
}

function endAnimation(){  nowOnEndscreen = true; }
function ignore(event){if(event!=null) event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;}

function handleClick(event) { //UTIL
  log("handleClick");
    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true; 
    var target = event.target || event.srcElement;
    var phase = event.eventPhase;
 //NEED TO WORK ON THIS 

    if (useDefaultClickThrough) {
        log("useDefaultClickThrough");
       // if (nowOnEndscreen) {
            clickLabel = defaultClickURL[0]["productLabel"];
            clickURL = defaultClickURL[0]["productURL"];
       // } else {
        //    clickLabel = defaultClickURL[0]["productLabel"];
        //    clickURL = defaultClickURL[0]["productURL"];
       // }
    } else {      
      var productIndexCounter = numberArray[prodCounter];
      log("88888888888888888888888888888888888888888888888888888888");
      log(numberArray);
      log("productIndexCounter: "+productIndexCounter);
      log("prodCounter: "+ prodCounter)
        clickLabel = products[productIndexCounter]["productLabel"];
        clickURL = products[productIndexCounter]["productURL"];
    }

    if (useDynamicExit && !fbf.isLocal && !demo) clickURL = dynamicExit;
    Enabler.exitOverride(clickLabel, clickURL);
    if (useTracker) trackClick(event.clientX, event.clientY, clickLabel, clickURL);
    
}

// --------------------------------------------------------------------------------------------------------------------- <- DOM CUT AND PASTE TO HERE
var _root = $('root');
  var mc_image = $('mc_image');
  var mc_shadow = $('mc_shadow');
    var mc_shadow_blurred = $('mc_shadow_blurred');
  var mc_frame = $('mc_frame');
  var mc_endscreen = $('mc_endscreen');
    var mc_endscreen_background = $('mc_endscreen_background');
    var mc_cta = $('mc_cta');
    var mc_legends_of_game = $('mc_legends_of_game');
  var mc_itv_logo = $('mc_itv_logo');
  var mc_slogan = $('mc_slogan');
  var mc_intro = $('mc_intro');
    var mc_text_straight = $('mc_text_straight');
    var mc_text_curved = $('mc_text_curved');
  var mc_text_long = $('mc_text_long');
  var mc_screwfix_logo = $('mc_screwfix_logo');