var initLogoScaleX,
	initLogoScaleY,
	initLogoY,
	vidreplayInitScale,
	ButtonSizeInfo,
	widthOfWebTextParent = [];
var gradIndex = 0;

var fontArray =
[
	{boldFont:   	"CCZoinksGFX"},
	{regularFont:	"CCZoinksGFX"}
]

var svgNS = "http://www.w3.org/2000/svg";

var strapCounter = 0;
var straplineWidPark = 0;

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

function isIE()
{
	ua = navigator.userAgent;
	/* MSIE used to detect old browsers and Trident used to newer ones*/
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;

	if(is_ie)
	{
		console.log("\nYou are in Internet Explorer\n\n");
	}	

	return is_ie; 
}

var octane = {

emergencyOverride:function()
{

},

generalSetup:function()
{
	log("generalSetup");
	fbf.clean(_root);
	fbf.replaceSVGDefs();
	fbf.displayBlock(_root);
	_root.buttonMode = true;

	document.getElementsByTagName("BODY")[0].style.overflow = "hidden";

	//if(transparentBanner) _root.style.cssText += "overflow:hidden;";
	if (typeof transparentBanner !== 'undefined') _root.style.cssText += "overflow:hidden;";
	else _root.style.cssText += "background-color:#000; overflow:hidden;";

	if (typeof useKeyline !== 'undefined') console.log("not adding keyline")
	else var keyline = addKeylineTo(_root, WID, HEI, '#f7db3f', keylineConfig.thickness);
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
	octane.injectCanvas("cv_strapline",WID,HEI,injectLoc);
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

///TEXT SHIZZLE
sortoutIntroText:function(textInfo,divID)
{
	log("sortoutIntroText");
	log(textInfo["Text"]);
	log(textInfo["Text"].split("\n"));			              
	//	var tfText = textInfo["strapText"];
		var lineBreaks = textInfo["Text"].split("\n");
		divID.innerHTML = "";
		var tffont = fontArray[0]["boldFont"];
		var letterSpacing = textInfo["letterSpacing"];
		var lineHeight = textInfo["LineHeight"];
		var tfFontSize = textInfo["FontSize"];
	
	for (var i = 0; i < lineBreaks.length; i++) {
		
		var tf = TextField(tffont, lineBreaks[i], tfFontSize, letterSpacing, lineHeight, "center", "#fff");
		divID.appendChild(tf);

		if( textInfo["useGradient"]) 
		{ 
			log("want it all shizam!");
			octane.addGradientToText(divID.children[i]);
			octane.getTheStrokeOn(divID.children[i],tfFontSize);
		}
		else 
		{ 
			 log("usual treatment");
			 octane.getTheStrokeOn(divID.children[i],tfFontSize);
		};

		var text_svg = divID.children[i];//.getElementsByTagName('svg')[0];
		var text_width = text_svg._width;
		var text_height = text_svg._height;
		log(text_svg);
		TweenMax.set(text_svg, {x: '-='+(text_width*0.5), y: '-='+(text_height*0.5)});
	}

},

sortoutStrapline:function(textInfo,divID)
{
	log("sortoutStrapline");
	log(textInfo["Text"]);
	divID.innerHTML = "";
	var tffont = fontArray[0]["boldFont"];
			              
		var tfText = textInfo["Text"];
		var letterSpacing = textInfo["letterSpacing"];
		var lineHeight = textInfo["LineHeight"];
		var tfFontSize = textInfo["FontSize"];
	
		var tf = TextField(tffont, tfText, tfFontSize, letterSpacing, lineHeight, "center", "#FFFFFF");
		divID.appendChild(tf);
	
		/* CENTER VERTICALLY AND HORIZONTALLY */
		var text_svg = divID.children[0];//.getElementsByTagName('svg')[0];
		var text_width = text_svg._width;
		var text_height = text_svg._height;
	
		log(text_svg);
		log(text_width);
		log(text_height);
	
		TweenMax.set(text_svg, {x: '-='+(text_width*0.5), y: '-='+(text_height*0.5)});

		if( textInfo["useGradient"]) 
		{ 
			log("want it all shizam!");
			
			octane.getTheStrokeOn(divID,tfFontSize);
			octane.addGradientToText(divID);
		}
		else 
		{ 
			 log("usual treatment");
			 octane.getTheStrokeOn(divID,tfFontSize);
		};
},

getTheStrokeOn:function(divID,fontSize)
{
	log("getTheStrokeOn");
	log(divID);
	var chars = divID.getElementsByTagName('use');
		log(chars);
	
		for (var i = chars.length - 1; i >= 0; i--)
		{
			chars[i].style.strokeWidth = fontSize*0.5;
			chars[i].style.stroke = "#000";
		}
		for (var i = 0; i < divID.children.length; i++) {
			octane.addTheDropBlack(divID.children[i],fontSize);
		}
},

addTheDropBlack:function(divID,fontSize)
{

	log("addTheDropBlack",divID);

	//get the svg node

	console.log("DIV", divID);
	console.log("gs", divID.__("g"));

	var toCloneArray = divID.__("g");



	for(var k = 0; k < toCloneArray.length; k++)
	{
		var toClone = toCloneArray[k];
		var clones = [];
		for (var j = 0; j < 4; j++)
		{
			var clone = toClone.cloneNode(true);
		    toClone.parentNode.insertBefore(clone, toClone);
		    clones.push(clone)
		    
			var chars = clone.getElementsByTagName('use');
			for (var i = chars.length - 1; i >= 0; i--)
			{	
				chars[i].style.strokeWidth = fontSize*2;
				chars[i].style.stroke = "#000";
				chars[i].style.fill = "#000";
			}
		}			
		TweenMax.set(clones[0],{y:"+=2"});
		TweenMax.set(clones[1],{x:"-=1"});
		TweenMax.set(clones[2],{x:"+=1"});
		TweenMax.set(clones[3],{y:"+=3"});

	}


},

addGradientToText:function(txt)
	{
		var lines = txt.__("svg");
		for (var i = 0; i < lines.length; i++) {
			createGradient(lines[i], 'MyGradient'+(gradIndex++), [{offset:'0%', 'stop-color':'#e98832'}, {offset:'50%', 'stop-color':'#feda32'}, {offset:'100%','stop-color':'#ffffff'}]);
			lines[i].setAttribute("fill", 'url('+location.href.split('#')[0]+'#MyGradient' + i + ')');
		}
	},

setupLogo:function(divID)
{
	log("setupLogo");
	fbf.hide(mc_logo_shine);

},




/*$$$$$\   $$$$$$\ $$$$$$$$\ $$$$$$$$\ 
$$  __$$\ $$  __$$\\__$$  __|$$  _____|
$$ |  $$ |$$ /  $$ |  $$ |   $$ |      
$$ |  $$ |$$$$$$$$ |  $$ |   $$$$$\    
$$ |  $$ |$$  __$$ |  $$ |   $$  __|   
$$ |  $$ |$$ |  $$ |  $$ |   $$ |      
$$$$$$$  |$$ |  $$ |  $$ |   $$$$$$$$\ 
\_______/ \__|  \__|  \__|   \______*/


setUpDateGFX:function(divID,textInfo,langChoice)
{
	//var dateNum = 1;
	//divID.innerHTML = "";

	log("sortoutDateText--------------------------------------------");
	log(textInfo);
	//log(textInfo[dateNum]["Text"].split("\n"));			              
	//	var tfText = textInfo["strapText"];
		//var lineBreaks = textInfo["strapText"].split("\n");
		//divID.innerHTML = "";
		var tffont = fontArray[0]["boldFont"];
		var letterSpacing = textInfo["letterSpacing"];
		var lineHeight = textInfo["LineHeight"];
		var tfFontSize = textInfo["FontSize"];
	    var textString = textInfo["Text"];//"HELLO\nWORLD!";//
	//    log(textString);
	//for (var i = 0; i < lineBreaks.length; i++) {
		
		var tf = TextField(tffont, textString, tfFontSize, letterSpacing, lineHeight, "center", "#FFFFFF");
		divID.appendChild(tf);

		if( textInfo["useGradient"]) 
		{ 
			log("want it all shizam!");
			octane.addGradientToText(divID.lastElementChild);
			octane.getTheStrokeOn(divID.lastElementChild,tfFontSize);
		}
		else 
		{ 
			 log("usual treatment");
			 octane.getTheStrokeOn(divID.lastElementChild,tfFontSize);
		};

		var text_svg = divID.lastElementChild;//.getElementsByTagName('svg')[0];
		var text_width = text_svg._width;
		var text_height = text_svg._height;
		log(text_svg);
		TweenMax.set(text_svg, {x: '-='+(text_width*0.5), y: '-='+(text_height*0.5)});

	    if(textInfo['dateEffect'] != undefined)
	    { 
			if(textInfo['datePost'])
			{
			  postDateElements.push(tf);
			} else {
			   preDateElements.push(tf);
			}
	    }	           
	//}
},

setUpDateWebFont:function(divID,textArray,langChoice)
{
	console.log("\nsetUpDateWebFont\n\n");

	console.log(textArray)

	//divID.innerHTML = "";

	for (var i = 0; i < textArray.length; i++)
	{
		strapCounter++;

	    var tffont = "Arial, Helvetica, tahoma, verdana, 宋体, SimSun, 华文细黑, STXihei, sans-serif;";
	    var tfText = textArray[i]['dateText'];
	    var tfSubText = textArray[i]['dateSupScript'];
	    var tfTextSize = textArray[i]['dateFontSize'];
	    var tfColor = textArray[i]['dateColour'];  
	    var tfDateEffect = textArray[i]['dateEffect'];
	    var dateBox = [];
		
		var webtextHouse = document.createElement("div");
			webtextHouse.id = "webfont_date_text_house_"+strapCounter;
			webtextHouse.className = "do";
				
			webtextHouse.style.width = WID+"px";
			webtextHouse.innerHTML = tfText;
		
			webtextHouse.style.color = "#FFFFFF";
			webtextHouse.style.fontSize = tfTextSize+"px";
			webtextHouse.style.textAlign = "center";
		
			divID.appendChild(webtextHouse);
		
		/* CENTER VERTICALLY AND HORIZONTALLY */
		var text_div = document.getElementById("webfont_date_text_house_"+strapCounter);
		var text_width = text_div._width;
		var text_height = text_div._height;
		
		TweenMax.set(text_div, {x: '-='+(text_width*0.5), y: '-='+(text_height*0.5)});

	    if(textArray[i]['dateEffect'] != undefined)
	    { 
			if(textArray[i]['datePost'])
			{
				postDateElements.push(webtextHouse);
			}
			else
			{
				preDateElements.push(webtextHouse);
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
	log("sortOutDateElements---------------------------------------------");
log(dateArrayPre);
log(dateArrayPost);
	if(gameIsOut){
	    fbf.displayNone(dateArrayPre);
	    fbf.displayBlock(dateArrayPost);
	} else {
	    fbf.displayBlock(dateArrayPre);
	    fbf.displayNone(dateArrayPost);
	}
},

addSVGShadow:function(svgID)
{
	svgID.style.cssText += "filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.5));-webkit-filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.5));-ms-filter: 'progid:DXImageTransform.Microsoft.Dropshadow(OffX=12, OffY=12, Color='#444')';filter: 'progid:DXImageTransform.Microsoft.Dropshadow(OffX=12, OffY=12, Color='#444')';";
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

animateButton:function(divID, wait)
{
	var button_background 			= mc_button_background;
	var button_background_height 	= mc_button_background.children[0]._height;
	var button_background_width 	= mc_button_background.children[0]._width;

	var button_text = mc_button_text;

	var start_clip 	= "rect("+(-button_background_height*0.5)+"px, "+(-button_background_width*0.5)+"px, "+(button_background_height*0.5)+"px, "+(-button_background_width*0.5)+"px)";
	var end_clip 	= "rect("+(-button_background_height*0.5)+"px, "+(button_background_width*0.5)+"px, "+(button_background_height*0.5)+"px, "+(-button_background_width*0.5)+"px)";

	TweenMax.fromTo(button_background, 0.5, {clip: start_clip}, {clip: end_clip, delay: wait, ease: Power3.easeIn});
	TweenMax.from(button_text, 0.25, {alpha: 0, delay: wait+0.5});
},

showChosenButton:function(chosenButton)
{
	fbf.show($(chosenButton));
},

rollover:function()
{
	
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

  octane.PS4ExclusiveTextFontSetup(PS4exclusiveText, text, letterSpacing, lineHeight, config.lang, fontSize);

},

PS4ExclusiveTextFontSetup:function(divID,text,letterSpacing,lineHeight,langChoice,fontSize)
{	    
	if(langChoice == "pl" || langChoice == "tch" || langChoice == "ru" || langChoice == "uaear" || langChoice == "ksaar" || langChoice == "tw")
	{	
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

		tf.parentNode.style.width = octane.fromRussiaWithLove(text.length*fontSize)+"px";

		divWidth = divID.offsetWidth;

		offeringTextDivWidth = tf.offsetWidth;

		TweenMax.set(tf, {x:"-="+(offeringTextDivWidth*0.5)});
		
	    octane.addSVGShadow(tf);
        
        console.log("\n\n WEB FONT OFFERING TEXT SETUP \n\n\n");
	}
	else
	{
		divID.innerHTML = ""; 
		divWidth = parseInt(divID.style.width.split("px")[0]);

		var tffont = fontArray[1]["introFont"];

	    var tf = TextField({normal:tffont},text,fontSize,letterSpacing,lineHeight,"center","#FFFFFF"); 
			tf.id = "text_intro";
			octane.addSVGShadow(tf);

		divID.appendChild(tf);

		divID.style.width = divID.children[0]._("svg").getAttribute("width");
		divWidth = parseInt(divID.style.width.split("px")[0]);

		divID.style.height = divID.children[0]._("svg").getAttribute("height");
		divHeight = parseInt(divID.style.height.split("px")[0]);

		TweenMax.set(divID.children[0],{x:(0-divWidth*0.5), y: (0-divHeight*0.5)});
	}

},

buttonFontSetup:function(divID, text, letterSpacing, lineHeight, fontSize, langChoice)
{
	divID.innerHTML ="";

	if(langChoice=="ru" || langChoice=="uaear" || langChoice=="ksa")
	{
		octane.buttonWebFontSetup(divID, text, letterSpacing, lineHeight, fontSize, langChoice);
	}
	else
	{
		var tffont = fontArray[0]["boldFont"];
			              
		var tfText = text;
		var letterSpacing = letterSpacing;
		var lineHeight = lineHeight;
		var tfFontSize = fontSize;
	
		var tf = TextField(tffont, tfText, tfFontSize, letterSpacing, lineHeight, "center", "#FFFFFF");
		divID.appendChild(tf);
	
		/* CENTER VERTICALLY AND HORIZONTALLY */
		var text_svg = divID.children[0];//.getElementsByTagName('svg')[0];
		var text_width = text_svg._width;
		var text_height = text_svg._height;

		log("0000000000 BUTTON SET UP");
		log(text_svg);
		log(text_width);
		log(text_height);
	
		TweenMax.set(text_svg, {x: '-='+(text_width*0.5), y: '-='+(text_height*0.5)});
		octane.addSVGShadow(tf);
	}
},

buttonWebFontSetup:function(divID, text, letterSpacing, lineHeight, fontSize, langChoice)
{
	console.log("%c\nbuttonWebFontSetup as territory is %c"+langChoice+"\n", 'font-weight: bold;', 'font-weight: regular;');

   	var tffont = "Arial, Helvetica, tahoma, verdana, 宋体, SimSun, 华文细黑, STXihei, sans-serif;";

	var webtextHouse = document.createElement("div");
		webtextHouse.id = "webfont_text_house";
		webtextHouse.className = "do";

	var widthOfParent = parseInt(divID.style.width.split("px")[0]);
	var heightOfParent = parseInt(divID.style.height.split("px")[0]);
	
	var tfText = text;
	var letterSpacing = letterSpacing;
	var lineHeight = lineHeight;
	var tfFontSize = fontSize;

	var textlineNumbers = tfText.split("<br />");

	webtextHouse.style.width = WID+"px";
	webtextHouse.innerHTML = tfText;

	webtextHouse.style.color = "#FFFFFF";
	webtextHouse.style.fontSize = tfFontSize+"px";
	webtextHouse.style.textAlign = "center";

	divID.appendChild(webtextHouse);

	/* CENTER VERTICALLY AND HORIZONTALLY */
	var text_div = document.getElementById('webfont_text_house');
	var text_width = text_div._width;
	var text_height = text_div._height;
	
	TweenMax.set(text_div, {x: '-='+(text_width*0.5), y: '-='+(text_height*0.5)});
},

/*$$$$$\  $$\   $$\ $$$$$$$$\ $$$$$$$$\  $$$$$$\  $$\   $$\        $$$$$$\ $$$$$$$$\ $$\   $$\ $$$$$$$$\ $$$$$$$$\ 
$$  __$$\ $$ |  $$ |\__$$  __|\__$$  __|$$  __$$\ $$$\  $$ |      $$  __$$\\__$$  __|$$ |  $$ |$$  _____|$$  _____|
$$ |  $$ |$$ |  $$ |   $$ |      $$ |   $$ /  $$ |$$$$\ $$ |      $$ /  \__|  $$ |   $$ |  $$ |$$ |      $$ |      
$$$$$$$\ |$$ |  $$ |   $$ |      $$ |   $$ |  $$ |$$ $$\$$ |      \$$$$$$\    $$ |   $$ |  $$ |$$$$$\    $$$$$\    
$$  __$$\ $$ |  $$ |   $$ |      $$ |   $$ |  $$ |$$ \$$$$ |       \____$$\   $$ |   $$ |  $$ |$$  __|   $$  __|   
$$ |  $$ |$$ |  $$ |   $$ |      $$ |   $$ |  $$ |$$ |\$$$ |      $$\   $$ |  $$ |   $$ |  $$ |$$ |      $$ |      
$$$$$$$  |\$$$$$$  |   $$ |      $$ |    $$$$$$  |$$ | \$$ |      \$$$$$$  |  $$ |   \$$$$$$  |$$ |      $$ |      
\_______/  \______/    \__|      \__|    \______/ \__|  \__|       \______/   \__|    \______/ \__|      \_*/	   

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
	    	cta_path.addEventListener("mouseover", octane.onCtaOver);
	    }
	    else
	    {
	    	console.log("\nThis is an Amazon creative so rollover on CTA is OFF\n\n");
	    }

	    cta_path.addEventListener("click", function(event){
	    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
	    var target = event.target || event.srcElement;
	    var phase = event.eventPhase;
	    octane.onCtaClicked(functionName);
	    
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
	octane.btnFlash($(whatbtn),target.parentNode.parentNode.id);
},

onCtaClicked:function(functionName) { log("\nonCtaClicked\n\n");  window[functionName](arguments); }

}