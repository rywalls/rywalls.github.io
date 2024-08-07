var demo = true;

var useDefaultClickThrough = true;

if(demo)
{
	var useDynamicExit = false;
	var useTracker = false;
}

var WID = 300;
var HEI = 250;

var local = window.location.protocol === "file:" || window.location.hostname == "localhost";

var keylineConfig =
{
	colour: "#0053a0",
	thickness: 1
};

var keyline;

var defaultClickURL =
[
    {
    	productLabel:"intro",
   		productURL:"https://www.screwfix.com/"
	}
];

function setExits()
{
	Enabler.exit('default');  
	Enabler.exit('intro');  
	Enabler.exit('product1');  
	Enabler.exit('product2');  
	Enabler.exit('product3');  
	Enabler.exit('product4');  
	Enabler.exit('product5');  
	Enabler.exit('product6'); 
}

function startBanner() 
{
	console.log("\nstartBanner\n\n");
	loadJS(getConfigAssetPath(),loadScripts);
}

function getConfigAssetPath()
{
	if(fbf.isLocal() || demo)
	{
		logging = true;
		return "config.js";
	}
	else
	{
		return dc["asset_config"].Url; 
	}
}

var numberArray = [];

function randomiseProductsAndReportingLabelsTogether()
{
	log("\nrandomiseProductsAndReportingLabelsTogether\n\n");
	getSequenceLength(mc_products.children.length);
	log("\nProduct order before shuffle: "+numberArray+"\n\n");
	shuffleArrayRandomly(numberArray);
	log("\nProduct order after shuffle: "+numberArray+"\n\n");
	reOrganiseProducts();
}

function reOrganiseProducts()
{
	var products = Array.prototype.slice.call(mc_products.children);

	for (var i = 0; i < numberArray.length; i++)
	{   
	  var prod = products[i];
	  mc_products.appendChild(products[numberArray[i]]);
	}  
}

function getSequenceLength(Number)
{
	for (var i = 0; i < Number; i++)
	{
		numberArray.push(i)
	}  
}

function shuffleArrayRandomly(array)
{    
	for (var i = array.length - 1; i > 0; i--)
	{
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

function loadScripts()
{
	if(demo == true)
    {   
    	loadSvgs();
  	}
  	else
  	{
    	loadJS([getAsset('asset_config')], loadSvgs);
  	}
}

function loadSvgs()
{    
	if(demo == true)
	{
		fbf.loadSvgs(setupAd); 
	}
	else
	{
		fbf.loadSvgs(setupAd, getAsset("dir_assets/svg.gz.js"));
	}
}

function reportConfig()
{
	for (key in config) {if(config.hasOwnProperty(key))log(key+" : "+config[key])};
}

function setupAd() 
{
    logging = fbf.isLocal();
	reportConfig();
    log(fbf.logDom(_root));   
    fbf.clean(_root);
    fbf.replaceSVGDefs();
    fbf.displayBlock(_root);
    _root.buttonMode = true;
    _root.style.cssText += "overflow:hidden;";   
    keyline = addKeylineTo(_root, WID, HEI, keylineConfig.colour, keylineConfig.thickness);
    setup();
}

function setup()
{
   	console.log('%c\nSCREW' + '%cFIX\n', 'color: #1C54A1; font-weight: bold', 'color: #E41B1D; font-style: italic; font-weight: bold')
	console.log('%c\n FREEEEEZE \n', 'background: #27C3D7; color: #FFFFFF')

	createSVGgradient();
	setUpfreeze();
    hideSections();
    randomiseProductsAndReportingLabelsTogether();
    setListeners();
    //startFlow();
}

function hideSections()
{
	fbf.displayNone(mc_intro, mc_bottombar, mc_products, mc_pipsandarrows, mc_frame, mc_cta, mc_bg_for_products);
	fbf.hide(mc_products, mc_introtext, svg_gradient);
}

function createSVGgradient()
{
	console.log("\ncreateSVGgradient\n\n");

	var svgns = "http://www.w3.org/2000/svg";

	var svg = document.createElementNS (svgns, "svg");
	var defs = document.createElementNS(svgns, 'defs');
	var gradient = document.createElementNS(svgns, 'linearGradient');
	var rect = document.createElementNS(svgns, 'rect');

	var stops =
	[
    	{
    	    "color": config.gradientColour1,
    	    "offset": "0%"
    	},{
    	    "color": config.gradientColour2,
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
	gradient.setAttribute('x2', '0');
	gradient.setAttribute('y1', '0');
	gradient.setAttribute('y2', '0.9');
	defs.appendChild(gradient);

	rect.setAttributeNS(null,  'fill', 'url(#Gradient)');
	rect.setAttributeNS(null,  'width', '100%');
	rect.setAttributeNS(null,  'height', '100%');

	svg.setAttributeNS(null, 'id','svg_gradient');
	svg.setAttributeNS(null, 'width', WID);
	svg.setAttributeNS(null, 'height', HEI);

	svg.appendChild(defs);
	svg.appendChild(rect);

	mc_frame.appendChild(svg);

	console.log(svg);
}

/*$$$$$$\ $$$$$$$\  $$$$$$$$\ $$$$$$$$\ $$$$$$$$\ $$$$$$$$\ 
$$  _____|$$  __$$\ $$  _____|$$  _____|\____$$  |$$  _____|
$$ |      $$ |  $$ |$$ |      $$ |          $$  / $$ |      
$$$$$\    $$$$$$$  |$$$$$\    $$$$$\       $$  /  $$$$$\    
$$  __|   $$  __$$< $$  __|   $$  __|     $$  /   $$  __|   
$$ |      $$ |  $$ |$$ |      $$ |       $$  /    $$ |      
$$ |      $$ |  $$ |$$$$$$$$\ $$$$$$$$\ $$$$$$$$\ $$$$$$$$\ 
\__|      \__|  \__|\________|\________|\________|\_______*/

var ctx,
thresholdSrcDATARAW,
imageOneSrcDATARAW, 
imageTwoSrcDATARAW,
thresholdCanvas,
thresholdctx,
finalOutputCanvasctx,
finalOutputDATA;

function getImageForCanvas(item)
{
 log("getImageForCanvas");
  var rainJpg;
   if(demo == true)
    {   
      rainJpg = item;
    }
    else
    {
      rainJpg = getAsset("dir_assets/"+item);
    }

    return rainJpg
}


function setUpfreeze()
{
	log("\nsetUpfreeze\n\n");

	fbf.hide(mc_intro);
    fbf.hide(mc_sectionbg);
    fbf.hide(mc_sectionbg_two);
    fbf.hide(mc_imageone,mc_imagetwo,mc_tolerance_map_image);

    createCanvas("imagePilage",900,250);
    createCanvas("threshold",WID,HEI);
    createCanvas("finaloutput",WID,HEI);
    ctx = $("imagePilage").getContext("2d");
    
    fbf.hide(mc_imageone,mc_imagetwo,mc_tolerance_map_image,$("imagePilage"),$("threshold"));

	//var getCorrectImage = document.getElementsByTagName("BODY")[0].children[2];3

	var getCorrectImage = new Image();
		//getCorrectImage.src = 'spritesheet0.jpg';
		getCorrectImage.src = getImageForCanvas('spritesheet0.jpg');

	getCorrectImage.onload = function()
	{
    	console.log("\n\nl o a d e d\n\n\n");

		console.log(getCorrectImage);
	
    	var getToleranceImage = mc_tolerance_map_image.children[0].style.backgroundPosition.split("px");
    	var imageOne = mc_imageone.children[0].style.backgroundPosition.split("px");
    	var imageTwo = mc_imagetwo.children[0].style.backgroundPosition.split("px");
	
    	//"spritesheet0.jpg"
		
    	log(getToleranceImage,imageOne,imageTwo);
		
    	ctx.drawImage(getCorrectImage, -1*getToleranceImage[0], -1*getToleranceImage[1], WID, HEI, 0, 0, WID, HEI);
    	ctx.drawImage(getCorrectImage, -1*imageOne[0],-1*imageOne[1], WID, HEI, WID,0, WID, HEI);
    	ctx.drawImage(getCorrectImage, -1*imageTwo[0],-1*imageTwo[1] ,WID, HEI, WID*2, 0, WID, HEI);
		
    	thresholdSrcDATARAW = ctx.getImageData(0, 0, WID, HEI);
    	imageOneSrcDATARAW = ctx.getImageData(WID,0,WID,HEI);
    	imageTwoSrcDATARAW = ctx.getImageData(WID*2,0,WID,HEI);
		
    	log(thresholdSrcDATARAW);
		
    	thresholdctx = $("threshold").getContext("2d");
    	finalOutputCanvasctx = $("finaloutput").getContext("2d");
		
    	thresholdSrcDATA = ctx.createImageData(WID,HEI);
    	imageOneSrcDATA = ctx.createImageData(WID,HEI);
    	imageTwoSrcDATA = ctx.createImageData(WID,HEI);
		
    	finalOutputDATA = finalOutputCanvasctx.createImageData(WID,HEI);

    	startFlow();
	};
 
}

var threshold = 55;
var minthreshold = 0;
var maxthreshold = 255;

function showToleranceMap(thresholdVal)
{
	threshold = thresholdVal;
	//so you go through the imageDATA which is a massive array of pixel data. For every pixel there are for values		
	//get the info from the threshold image
	var src = thresholdSrcDATARAW.data;
	var dst = thresholdSrcDATA.data;
		
	for (var i = 0; i < src.length; i += 4)
	{				
		if (src[i] >= threshold)
		{
			dst[i] = 255;
			dst[i+1] = 255;
			dst[i+2] = 255;
			dst[i+3] = 255;
				
			finalOutputDATA.data[i+0]=imageOneSrcDATARAW.data[i];
			finalOutputDATA.data[i+1]=imageOneSrcDATARAW.data[i+1];
			finalOutputDATA.data[i+2]=imageOneSrcDATARAW.data[i+2];
			finalOutputDATA.data[i+3]=imageOneSrcDATARAW.data[i+3];				
		} 				
		else
		{
			dst[i] = 0;
			dst[i+1] = 0;
			dst[i+2] = 0;
			dst[i+3] = 255;
				
			finalOutputDATA.data[i+0]=imageTwoSrcDATARAW.data[i];
			finalOutputDATA.data[i+1]=imageTwoSrcDATARAW.data[i+1];
			finalOutputDATA.data[i+2]=imageTwoSrcDATARAW.data[i+2];
			finalOutputDATA.data[i+3]=imageTwoSrcDATARAW.data[i+3];		
		}
	}

	thresholdctx.putImageData(thresholdSrcDATA, 0, 0);	
	finalOutputCanvasctx.putImageData(finalOutputDATA, 0,0);	
}

function createCanvas(nameOfCanvas,WID,HEI)
{
	log("\ncreateCanvas\n\n");

	var canvas_tray = document.createElement("canvas");
		canvas_tray.className = "do";
		canvas_tray.width = WID;
		canvas_tray.height = HEI;
		canvas_tray.id = nameOfCanvas;

	mc_canvas_house.appendChild(canvas_tray);
}

function setListeners()
{
	_root.addEventListener("click", handleClick);
	_root.addEventListener('mouseover', ad_rollOver, false);
	_root.addEventListener('mouseout', ad_rollOut, false); 
}

var prodCounter = -1;
var prodTotal = 0;
var delayText = 2;
var chosenCTA;

var pipsSetup =
{
	xOffset: (WID*0.5)-15,
	yOffset: 20,
	ArrowOffset: 28
};

var wakeUpBanner = false;

var products = "";

var config;

var screwFixRed = "#62b11a";
var screwFixRedDark = "#408f18";
var screwFixBlue = "#7fbb2d";
var screwFixBlueDark = "#60a50c";

var textSpacing = 0;

var chosenAccolade = [];
var chosenBottomBar;

/*$$$$$\   $$$$$$\  $$\   $$\ $$\   $$\ $$$$$$$$\ $$$$$$$\        $$$$$$$$\ $$\       $$$$$$\  $$\      $$\ 
$$  __$$\ $$  __$$\ $$$\  $$ |$$$\  $$ |$$  _____|$$  __$$\       $$  _____|$$ |     $$  __$$\ $$ | $\  $$ |
$$ |  $$ |$$ /  $$ |$$$$\ $$ |$$$$\ $$ |$$ |      $$ |  $$ |      $$ |      $$ |     $$ /  $$ |$$ |$$$\ $$ |
$$$$$$$\ |$$$$$$$$ |$$ $$\$$ |$$ $$\$$ |$$$$$\    $$$$$$$  |      $$$$$\    $$ |     $$ |  $$ |$$ $$ $$\$$ |
$$  __$$\ $$  __$$ |$$ \$$$$ |$$ \$$$$ |$$  __|   $$  __$$<       $$  __|   $$ |     $$ |  $$ |$$$$  _$$$$ |
$$ |  $$ |$$ |  $$ |$$ |\$$$ |$$ |\$$$ |$$ |      $$ |  $$ |      $$ |      $$ |     $$ |  $$ |$$$  / \$$$ |
$$$$$$$  |$$ |  $$ |$$ | \$$ |$$ | \$$ |$$$$$$$$\ $$ |  $$ |      $$ |      $$$$$$$$\ $$$$$$  |$$  /   \$$ |
\_______/ \__|  \__|\__|  \__|\__|  \__|\________|\__|  \__|      \__|      \________|\______/ \__/     \_*/

function startFlow()
{
	log("\nstartFlow\n\n");

    updateColor(mc_sectionbg,config.introbgColour);
    updateColor(mc_sectionframe,config.frameColour);
    updateColor(mc_product_1.children[1],config.nomTextColour);
    updateColor(mc_product_2.children[1],config.nomTextColour);
    updateColor(mc_product_3.children[1],config.nomTextColour);
    updateColor(mc_product_4.children[1],config.nomTextColour);
    updateColor(mc_product_5.children[1],config.nomTextColour);
    updateColor(mc_product_6.children[1],config.nomTextColour);

    _root.style.backgroundColor = config.productBGColour;
    chosenAccolade = config.introTextStore;

    bottomBarSetUp();
    showFrame();
    showIntro();
    fbf.hide(mc_intro);
    fbf.hide(mc_sectionbg);
    fbf.hide(mc_sectionbg_two);

    animateFreeze();
}

function introTextSetup()
{
    var tffont = "IntroFontGFX";

    for (var i = 0; i < chosenAccolade.length;  i++) 
    {
        if(i%2) {  var tf = TextField(tffont,chosenAccolade[i]["line"],chosenAccolade[i]["lineFontSize"],0,0,"center",config.introTextColour2);  } 
        else  { var tf = TextField(tffont,chosenAccolade[i]["line"],chosenAccolade[i]["lineFontSize"],0,0,"center",config.introTextColour1);  }
        mc_intro.appendChild(tf);
        TweenMax.set(tf,{y:chosenAccolade[i]["lineTopBuffer"]+textSpacing,x:centerMe(mc_intro.children[i])});
        textSpacing +=(chosenAccolade[i]["lineTopBuffer"]+getHeight(mc_intro.children[i]));
    }

    TweenMax.set(mc_intro,{x:"-=2"});
}

function centerMe(divID)
{
	var centerX = Math.round((WID*0.5)-(divID._("svg").getAttribute("width").split("px")[0]*0.5));
	return centerX
}

function getHeight(divID)
{
	var heightAbove = Math.round(divID._("svg").getAttribute("height").split("px")[0]);
	return heightAbove;
}

function updateColor(divToChange,colourToUse)
{
	var pathStore = divToChange.__("path");

	if(pathStore)
	{
		for (var i = pathStore.length - 1; i >= 0; i--)
		{
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
		target.display = true;
		target = target.parentNode;
	}
}

function showFrame()
{ 
	fbf.displayBlock(mc_frame);
}

function animateFreeze()
{
   window.requestAnimationFrame(bringTheFrost);
}

function bringTheFrost()
{
	if(threshold<maxthreshold)
	{
		showToleranceMap(threshold);

		if(fbf.isMobile())
		{
			threshold+=5;
		}
		else if(fbf.isIE())
		{
			threshold+=10;
		}
		else	
	 	{
	 		threshold++;
	 	}
	 	
	 	window.requestAnimationFrame(bringTheFrost);
	}
	else
	{
	 	log("we done freezing");
	 	fbf.show(mc_bg_for_products);
	 	fbf.displayBlock(mc_bg_for_products);
	 	TweenMax.from(mc_bg_for_products,1,{alpha:0,ease: Expo.easeOut});
	 	TweenMax.delayedCall(0.5,animateIntroOut);
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

/*$$$$$\  $$\   $$\ $$$$$$\ $$\      $$\  $$$$$$\ $$$$$$$$\ $$$$$$\  $$$$$$\  $$\   $$\ 
$$  __$$\ $$$\  $$ |\_$$  _|$$$\    $$$ |$$  __$$\\__$$  __|\_$$  _|$$  __$$\ $$$\  $$ |
$$ /  $$ |$$$$\ $$ |  $$ |  $$$$\  $$$$ |$$ /  $$ |  $$ |     $$ |  $$ /  $$ |$$$$\ $$ |
$$$$$$$$ |$$ $$\$$ |  $$ |  $$\$$\$$ $$ |$$$$$$$$ |  $$ |     $$ |  $$ |  $$ |$$ $$\$$ |
$$  __$$ |$$ \$$$$ |  $$ |  $$ \$$$  $$ |$$  __$$ |  $$ |     $$ |  $$ |  $$ |$$ \$$$$ |
$$ |  $$ |$$ |\$$$ |  $$ |  $$ |\$  /$$ |$$ |  $$ |  $$ |     $$ |  $$ |  $$ |$$ |\$$$ |
$$ |  $$ |$$ | \$$ |$$$$$$\ $$ | \_/ $$ |$$ |  $$ |  $$ |   $$$$$$\  $$$$$$  |$$ | \$$ |
\__|  \__|\__|  \__|\______|\__|     \__|\__|  \__|  \__|   \______| \______/ \__|  \_*/

function animateIntro()
{
	mc_intro.style.width = WID+"px";
	mc_intro.style.height = HEI+"px";

	fbf.show(mc_introtext,mc_introText_start);
	TweenMax.from(mc_introtext, 0.5, {y:"+=50", alpha:0, ease: Back.easeOut.config(2), delay:1});
	TweenMax.to(mc_introtext, 0.75, {delay:2.25, y:"-=100", ease: Back.easeIn.config(1), alpha:0});

	for (var i = 0; i < mc_introText_start.children.length; i++)
	{
		if(i<2)
		{
			TweenMax.from(mc_introText_start.children[i],0.5,{y:"+=20",alpha:0,ease: Back.easeOut.config(1),delay:3+(i*0.25)});
		}
		else
		{
			TweenMax.from(mc_introText_start.children[i],0.5,{y:"+=20",alpha:0,ease: Back.easeOut.config(1),delay:3.1+(i*0.25)});
		}
	}

	TweenMax.delayedCall(5.5, animateIntroOut);
}

function animateIntroOut()
{
	TweenMax.to(mc_introText_start, 0.25, {y:"+=150", alpha:0, ease: Power1.easeIn, onComplete:productSetup});

	showProductSection();
	//fbf.show(svg_gradient);
	//TweenMax.to(mc_stormbackground, 0.5, {alpha:0});
	bottomBarStart();
}

/*$$$$$\   $$$$$$\ $$$$$$$$\ $$$$$$$$\  $$$$$$\  $$\      $$\       $$$$$$$\   $$$$$$\  $$$$$$$\  
$$  __$$\ $$  __$$\\__$$  __|\__$$  __|$$  __$$\ $$$\    $$$ |      $$  __$$\ $$  __$$\ $$  __$$\ 
$$ |  $$ |$$ /  $$ |  $$ |      $$ |   $$ /  $$ |$$$$\  $$$$ |      $$ |  $$ |$$ /  $$ |$$ |  $$ |
$$$$$$$\ |$$ |  $$ |  $$ |      $$ |   $$ |  $$ |$$\$$\$$ $$ |      $$$$$$$\ |$$$$$$$$ |$$$$$$$  |
$$  __$$\ $$ |  $$ |  $$ |      $$ |   $$ |  $$ |$$ \$$$  $$ |      $$  __$$\ $$  __$$ |$$  __$$< 
$$ |  $$ |$$ |  $$ |  $$ |      $$ |   $$ |  $$ |$$ |\$  /$$ |      $$ |  $$ |$$ |  $$ |$$ |  $$ |
$$$$$$$  | $$$$$$  |  $$ |      $$ |    $$$$$$  |$$ | \_/ $$ |      $$$$$$$  |$$ |  $$ |$$ |  $$ |
\_______/  \______/   \__|      \__|    \______/ \__|     \__|      \_______/ \__|  \__|\__|  \_*/

var bottomBarIsRunning = false;

function bottomBarSetUp()
{
	getBottomBarChild();
	shuffleBottomBarChildren(bottomBarLobby);
}

var bottomBarLobby = [];
var bottomBarHouse = [];

function getBottomBarChild()
{
	for (var i = 0; i < mc_bottombar.children.length; i++)
	{
		bottomBarLobby.push(mc_bottombar.children[i]);
	}
}

function shuffleBottomBarChildren(arrayToPillage)
{
	var val = arrayToPillage.splice(Math.floor(Math.random()*arrayToPillage.length),1);
	bottomBarHouse.push(val);

	if(arrayToPillage.length<1)
	{

	}
	else
	{
		shuffleBottomBarChildren(arrayToPillage);
	}  
}

function animateChosenBottomBar(divID,delayAni)
{
	fbf.hide(mc_bottombar.children);
	fbf.show(mc_bottombar,divID);
	fbf.displayBlock(mc_bottombar);
	TweenMax.set(mc_bottombar,{alpha:1});

    for (var i = 0; i < divID.children.length; i++) 
    {     
        if(divID.children[i].getAttribute("data-type") == "flash.text::StaticText" )
        {
            TweenMax.from(divID.children[i],0.1,{alpha:0,delay:delayAni+(0.1*i),y:HEI*2,ease: Expo.easeOut});
        } 
        else
        {    
            TweenMax.from(divID.children[i], 0.25, {alpha:0, scale:2, delay:delayAni+(0.1*i)});
        }
    }

    TweenMax.delayedCall(5,returnToLogo);
}

function bottomBarStart()
{
	var barTally = Math.floor(Math.random()*bottomBarHouse.length);

	if(!bottomBarIsRunning)
	{
		bottomBarAnimation(Math.floor(Math.random()*bottomBarHouse.length));
		bottomBarIsRunning = true;
	}
}

function bottomBarAnimation(barIndex)
{
	var barTally = barIndex;
	fadeLogoOut(barTally);
}

function returnToLogo()
{
    fbf.show(mc_logo);
    TweenMax.to(mc_bottombar,0.5,{alpha:0});
    TweenMax.set(mc_logo,{alpha:0});
    TweenMax.to(mc_logo,0.5,{alpha:1,delay:0.5,onComplete:bottomBarStop});
}

function fadeLogoOut(barTally)
{
	TweenMax.set(mc_logo,{alpha:1});
	TweenMax.to(mc_logo,0.5,{alpha:0,onComplete:animateChosenBottomBar,onCompleteParams:[bottomBarHouse[barTally][0],1]});
}

function bottomBarStop()
{
	bottomBarIsRunning = false;
}

/*$$$$$\  $$$$$$$\   $$$$$$\  $$$$$$$\  $$\   $$\  $$$$$$\ $$$$$$$$\  $$$$$$\
$$  __$$\ $$  __$$\ $$  __$$\ $$  __$$\ $$ |  $$ |$$  __$$\\__$$  __|$$  __$$\
$$ |  $$ |$$ |  $$ |$$ /  $$ |$$ |  $$ |$$ |  $$ |$$ /  \__|  $$ |   $$ /  \__|
$$$$$$$  |$$$$$$$  |$$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |        $$ |   \$$$$$$\
$$  ____/ $$  __$$< $$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |        $$ |    \____$$\
$$ |      $$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |  $$\   $$ |   $$\   $$ |
$$ |      $$ |  $$ | $$$$$$  |$$$$$$$  |\$$$$$$  |\$$$$$$  |  $$ |   \$$$$$$  |
\__|      \__|  \__| \______/ \_______/  \______/  \______/   \__|    \______/

 $$$\           $$$$$$$\ $$$$$$\ $$$$$$$\   $$$$$$\  
$$ $$\          $$  __$$\\_$$  _|$$  __$$\ $$  __$$\ 
\$$$\ |         $$ |  $$ | $$ |  $$ |  $$ |$$ /  \__|
$$\$$\$$\       $$$$$$$  | $$ |  $$$$$$$  |\$$$$$$\  
$$ \$$ __|      $$  ____/  $$ |  $$  ____/  \____$$\ 
$$ |\$$\        $$ |       $$ |  $$ |      $$\   $$ |
 $$$$ $$\       $$ |     $$$$$$\ $$ |      \$$$$$$  |
 \____\__|      \__|     \______|\__|       \_____*/ 

var UItouched = false;

function productSetup()
{
	fbf.displayNone(mc_intro);
	prodTotal = mc_products.children.length;

	log("\nTotal number of products is: "+prodTotal+"\n\n");

	setUpPipsAndArrows();
	productAnimation();
	ctaSetup();
}

function productIn(mc,CTAType)
{
	TweenLite.set(CTAType,{alpha:1})
    showUpToRoot(CTAType);
    fbf.show(CTAType);

    if(mc.children[prodCounter]._('#mc_img') != undefined)
    {
        TweenLite.set(mc.children[prodCounter]._('#mc_img'),{scaleY:1,scaleX:1,alpha:1,transformOrigin:'50% 50%'});
        TweenLite.from(mc.children[prodCounter]._('#mc_img'),0.5,{scaleY:0,scaleX:0,alpha:0,rotation:1,ease:Back.easeOut.config(1.7)});
    };

    for (var i = 0; i < mc.children[prodCounter].children.length; i++)
    {
    	if(mc.children[prodCounter].children[i] != mc.children[prodCounter]._('#mc_img') && mc.children[prodCounter].children[i].id != "mc_price")
        {
            TweenLite.set(mc.children[prodCounter].children[i],{alpha:1});
            TweenLite.from(mc.children[prodCounter].children[i],0.5,{delay:0.5,alpha:0});
        }
        else if(mc.children[prodCounter].children[i].id == "mc_price")
        {

        }

    }
        
    TweenLite.from(CTAType,0.5,{delay:0.5,alpha:0})
}

function UIproductint(mc,CTAType)
{
	selectedPip(prodCounter);
	fbf.hide(mc.children);
	fbf.show(mc.children[prodCounter]);
	productIn(mc,CTAType);
}

function bringInProduct(mc,AmountOfProducts,gap,CTAType) 
{
   
    if(!wakeUpBanner)
    {
    	prodCounter++; 

    	if(prodCounter>mc_pips.children.length-1)
    	{
    		prodCounter = 0
    	};

        selectedPip(prodCounter);
        fbf.hide(mc.children);
        fbf.show(mc.children[prodCounter]);

        productIn(mc,CTAType);
          
        if(prodCounter<mc_pips.children.length-1)
        {
        	if(!UItouched)
        	{
        		TweenMax.delayedCall(gap,bringInProduct,[mc,AmountOfProducts,gap,CTAType]);
        	};
        } 
        else 
        {
        	prodCounterClean();   
        	//TweenMax.delayedCall(3,endRain);     
        }  
    }
}

function prodCounterClean()
{
	prodCounter = products.length-1;
}

function productAnimation()
{
	useDefaultClickThrough = false;
	fbf.show(mc_pipsandarrows);
	fbf.show(mc_barrier);
	showUpToRoot(mc_products);
	chosenCTA = mc_cta; 
	bringInProduct(mc_products,prodTotal,3,chosenCTA);  
}

function setUpPipsAndArrows()
{
	showUpToRoot(mc_pipsandarrows);

	var pip = mc_pip;  
	var pipWidth = mc_pip._width;
	var pipHeight = mc_pip._height;
	var gap = 15;

	for (var i = 0; i < prodTotal; i++)
	{
		var clonePip = pip.cloneNode(true);
		TweenLite.set(clonePip,{x:gap*i, y:10});
		clonePip.id = "pips"+i;
		mc_pips.appendChild(clonePip);    
  	}

  	mc_pips.removeChild(mc_pips.children[0]);

	for (var i = 0; i < mc_pips.children.length; i++)
	{
    	var path =  mc_pips.children[i]._('#mc_piphit')._("path");
    	path._index = i;
    	path.addEventListener("click", pipClick);
  	}

	var pipOffset = (gap*(prodTotal-1))*0.5;
	TweenMax.set(mc_pipsandarrows,{y:pipsSetup.yOffset});
	TweenLite.set(mc_pips,{x:pipsSetup.xOffset-pipOffset});
	TweenLite.set(mc_left_arrow,{x:(pipsSetup.xOffset-pipsSetup.ArrowOffset)});
	TweenLite.set(mc_right_arrow,{x:(pipsSetup.xOffset+pipsSetup.ArrowOffset+16)});

	TweenLite.set(mc_pips,{x:"-=1"});
}

function resetPips()
{ 
	for (var i = 0; i < mc_pips.children.length; i++)
	{    
		updateColor(mc_pips.children[i].children[0],config.pipColour);
		TweenMax.set(mc_pips.children[i].children[0],{alpha:0.5});  
	}
}

function selectedPip(prodCounter)
{ 
	if(prodCounter > mc_pips.children.length-1)
	{
    	prodCounter == mc_pips.children.length-1;
    };

	resetPips(); 
	updateColor(mc_pips.children[prodCounter].children[0],config.pipColour);
	TweenMax.set(mc_pips.children[prodCounter].children[0],{alpha:1});
}

function pipClick(event)
{
	event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	var target = event.target || event.srcElement;
	prodCounter = target._index;
	UIproductint(mc_products,chosenCTA);
	wakeUpBanner = true;
	UItouched = true;
	bottomBarStart();
}

/*$$$$\ $$\   $$\ $$$$$$$$\ $$$$$$$$\ $$$$$$$\   $$$$$$\   $$$$$$\ $$$$$$$$\ $$$$$$\  $$$$$$\  $$\   $$\ 
\_$$  _|$$$\  $$ |\__$$  __|$$  _____|$$  __$$\ $$  __$$\ $$  __$$\\__$$  __|\_$$  _|$$  __$$\ $$$\  $$ |
  $$ |  $$$$\ $$ |   $$ |   $$ |      $$ |  $$ |$$ /  $$ |$$ /  \__|  $$ |     $$ |  $$ /  $$ |$$$$\ $$ |
  $$ |  $$ $$\$$ |   $$ |   $$$$$\    $$$$$$$  |$$$$$$$$ |$$ |        $$ |     $$ |  $$ |  $$ |$$ $$\$$ |
  $$ |  $$ \$$$$ |   $$ |   $$  __|   $$  __$$< $$  __$$ |$$ |        $$ |     $$ |  $$ |  $$ |$$ \$$$$ |
  $$ |  $$ |\$$$ |   $$ |   $$ |      $$ |  $$ |$$ |  $$ |$$ |  $$\   $$ |     $$ |  $$ |  $$ |$$ |\$$$ |
$$$$$$\ $$ | \$$ |   $$ |   $$$$$$$$\ $$ |  $$ |$$ |  $$ |\$$$$$$  |  $$ |   $$$$$$\  $$$$$$  |$$ | \$$ |
\______|\__|  \__|   \__|   \________|\__|  \__|\__|  \__| \______/   \__|   \______| \______/ \__|  \_*/

function handleClick(event)
{
	log("\nhandleClick\n\n");
    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true; 
    var target = event.target || event.srcElement;
    var phase = event.eventPhase;

    if (useDefaultClickThrough)
    {
        clickLabel = defaultClickURL[0]["productLabel"];
        clickURL = defaultClickURL[0]["productURL"];
    }
    else
    {
    	var productIndexCounter = numberArray[prodCounter];
    	clickLabel = products[productIndexCounter]["productLabel"];
    	clickURL = products[productIndexCounter]["productURL"];
    }

    if (useDynamicExit && !fbf.isLocal && !demo) clickURL = dynamicExit;
    Enabler.exitOverride(clickLabel, clickURL);
    if (useTracker) trackClick(event.clientX, event.clientY, clickLabel, clickURL); 
}

function ctaSetup()
{
	var pathStore = mc_cta.__("path");
	pathStore[0].setAttribute("fill",screwFixRed);
	pathStore[1].setAttribute("fill",screwFixRedDark);
}

function ctaOn()
{
  var pathStore = mc_cta.__("path");
  pathStore[0].setAttribute("fill",screwFixBlue);
  pathStore[1].setAttribute("fill",screwFixBlueDark);
}

function ctaOff()
{
  var pathStore = mc_cta.__("path");
  pathStore[0].setAttribute("fill",screwFixRed);
  pathStore[1].setAttribute("fill",screwFixRedDark);
}

function endAnimation(){  nowOnEndscreen = true; }

ad_rollOver = function(e){ ctaOn(); }

ad_rollOut = function(e){ ctaOff(); }

function ignore(event){if(event!=null) event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;}

/*$$$$\ $$\   $$\ $$$$$$$$\ $$$$$$$$\ $$$$$$$\   $$$$$$\   $$$$$$\ $$$$$$$$\ $$$$$$\  $$$$$$\  $$\   $$\ 
\_$$  _|$$$\  $$ |\__$$  __|$$  _____|$$  __$$\ $$  __$$\ $$  __$$\\__$$  __|\_$$  _|$$  __$$\ $$$\  $$ |
  $$ |  $$$$\ $$ |   $$ |   $$ |      $$ |  $$ |$$ /  $$ |$$ /  \__|  $$ |     $$ |  $$ /  $$ |$$$$\ $$ |
  $$ |  $$ $$\$$ |   $$ |   $$$$$\    $$$$$$$  |$$$$$$$$ |$$ |        $$ |     $$ |  $$ |  $$ |$$ $$\$$ |
  $$ |  $$ \$$$$ |   $$ |   $$  __|   $$  __$$< $$  __$$ |$$ |        $$ |     $$ |  $$ |  $$ |$$ \$$$$ |
  $$ |  $$ |\$$$ |   $$ |   $$ |      $$ |  $$ |$$ |  $$ |$$ |  $$\   $$ |     $$ |  $$ |  $$ |$$ |\$$$ |
$$$$$$\ $$ | \$$ |   $$ |   $$$$$$$$\ $$ |  $$ |$$ |  $$ |\$$$$$$  |  $$ |   $$$$$$\  $$$$$$  |$$ | \$$ |
\______|\__|  \__|   \__|   \________|\__|  \__|\__|  \__| \______/   \__|   \______| \______/ \__|  \_*/

var _root = $('root');
	var mc_frame = $('mc_frame');
		var mc_sectionbg_two = $('mc_sectionbg_two');
		var mc_sectionbg = $('mc_sectionbg');
		var mc_freeze = $('mc_freeze');
			var mc_tolerance_map_image = $('mc_tolerance_map_image');
			var mc_imagetwo = $('mc_imagetwo');
			var mc_imageone = $('mc_imageone');
			var mc_canvas_house = $('mc_canvas_house');
			var mc_bg_for_products = $('mc_bg_for_products');
		var mc_intro = $('mc_intro');
			var mc_introtext = $('mc_introtext');
			var mc_introText_start = $('mc_introText_start');
		var mc_whitesurround = $('mc_whitesurround');
		var mc_sectionframe = $('mc_sectionframe');
	var mc_products = $('mc_products');
		var mc_product_1 = $('mc_product_1');
			var mc_img = $('mc_img');
			var mc_copy = $('mc_copy');
			var mc_price = $('mc_price');
				var mc_price_bg = $('mc_price_bg');
			var mc_saveshield = $('mc_saveshield');
				var mc_shieldbg = $('mc_shieldbg');
		var mc_product_2 = $('mc_product_2');
			var mc_img = $('mc_img');
			var mc_copy = $('mc_copy');
			var mc_price = $('mc_price');
				var mc_price_bg = $('mc_price_bg');
			var mc_saveshield = $('mc_saveshield');
				var mc_shieldbg = $('mc_shieldbg');
		var mc_product_3 = $('mc_product_3');
			var mc_img = $('mc_img');
			var mc_copy = $('mc_copy');
			var mc_price = $('mc_price');
				var mc_price_bg = $('mc_price_bg');
			var mc_saveshield = $('mc_saveshield');
		var mc_product_4 = $('mc_product_4');
			var mc_img = $('mc_img');
			var mc_copy = $('mc_copy');
			var mc_price = $('mc_price');
				var mc_price_bg = $('mc_price_bg');
			var mc_saveshield = $('mc_saveshield');
		var mc_product_5 = $('mc_product_5');
			var mc_img = $('mc_img');
			var mc_copy = $('mc_copy');
			var mc_price = $('mc_price');
				var mc_price_bg = $('mc_price_bg');
			var mc_saveshield = $('mc_saveshield');
		var mc_product_6 = $('mc_product_6');
			var mc_img = $('mc_img');
			var mc_copy = $('mc_copy');
			var mc_price = $('mc_price');
				var mc_price_bg = $('mc_price_bg');
			var mc_saveshield = $('mc_saveshield');
				var mc_shieldbg = $('mc_shieldbg');
	var mc_cta = $('mc_cta');
	var mc_bottombar = $('mc_bottombar');
		var mc_clickandcollect = $('mc_clickandcollect');
		var mc_overstores_nationwide = $('mc_overstores_nationwide');
		var mc_products_online = $('mc_products_online');
	var mc_logo = $('mc_logo');
	var mc_pipsandarrows = $('mc_pipsandarrows');
		var mc_barrier = $('mc_barrier');
		var mc_left_arrow = $('mc_left_arrow');
		var mc_right_arrow = $('mc_right_arrow');
		var mc_pips = $('mc_pips');
			var mc_pip = $('mc_pip');
				var mc_innerpip = $('mc_innerpip');
				var mc_piphit = $('mc_piphit');