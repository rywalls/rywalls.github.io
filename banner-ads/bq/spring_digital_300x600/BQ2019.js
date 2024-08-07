/*

This BQ2019.js contains fixes to the issue found in Firefox where dynamic text wasn't
being rendered properly.

._width & ._height are now used instead of clientWidth and clientHeight.

For this to 

*/

console.log("%c\n BQ2019.js loaded \n", 'background-color: #FF6600; color: white;');

var UI_disabled = true;
var UI_touched = false;

var bq = {	

startUp: function(whatToSay)
{
	log(whatToSay);
},

setupProductImages: function()
{
	var image_1_div = mc_nom_1_image;
	var image_2_div = mc_nom_2_image;
	var image_3_div = mc_nom_3_image;

	if(products[0].arrangeImage == "infront")
	{
		console.log("\nNOM 1 image should be in front of frame\n\n");
		image_1_div.style.zIndex = 20;
	}

	if(products[1].arrangeImage == "infront")
	{
		console.log("\nNOM 2 image should be in front of frame\n\n");
		image_2_div.style.zIndex = 21;
	}

	if(products[2].arrangeImage == "infront")
	{
		console.log("\nNOM 3 image should be in front of frame\n\n");
		image_3_div.style.zIndex = 22;
	}
},

hideBadges: function()
{
	var badges = mc_badges.children;

	for (var i = mc_badges.children.length - 1; i >= 0; i--)
	{
		TweenMax.to(mc_badges.children[i], 0.25, {alpha: 0});
	}
},

showBadge: function(badge_to_show)
{	
	if(badge_to_show == "new")
	{
		fbf.show(mc_badge_NEW);
		TweenMax.to(mc_badge_NEW, 0.25, {alpha: 1});
	}

	if(badge_to_show == "when_its_gone")
	{
		fbf.show(mc_badge_WHEN_ITS_GONE);
		TweenMax.to(mc_badge_WHEN_ITS_GONE, 0.25, {alpha: 1});
	}

		if(badge_to_show == "4_for_10")
	{
		fbf.show(mc_badge_4_FOR_10);
		TweenMax.to(mc_badge_4_FOR_10, 0.25, {alpha: 1});
	}
},

setupIntroText: function(divToPutTextIn, gap, contains_question)
{
	var tfFont = "GoodHome_Bold_GFX";

	var text = introText[0].text;
	var size = introText[0].size;
	var lineHeight = introText[0].lineHeight;
	var colour1 = introText[0].colour1;
	var colour2 = introText[0].colour2;
	var colourOrder = introText[0].colourOrder;

	divToPutTextIn.innerHTML = "";

	if(contains_question)
	{
		if(WID==120&&HEI==600 || WID==160&&HEI==600)
		{
			var split_text = text.split("?");
			split_text[0] = split_text[0]+"?"; /* ADD QUESTION MARK BACK ON */
			split_text[1] = split_text[1].substring(1); /* REMOVE LINE BREAK FROM START OF NEXT PARAGRAPH */
	
			var question_tf = TextField(tfFont, split_text[0], size, 0, lineHeight, "center", colour1);
				question_tf.id = "question_tf";
			
			var intro_text_tf = TextField(tfFont, split_text[1], size, 0, lineHeight, "center", colour2);
				intro_text_tf.id = "non_question_tf";
		
			divToPutTextIn.appendChild(question_tf);	
			divToPutTextIn.appendChild(intro_text_tf);
	
			var height_of_question = question_tf._height;
			var height_of_text = non_question_tf._height;
			

			TweenMax.set(non_question_tf, {y: height_of_question + gap});

			var question_tf_width = question_tf._width;
			var intro_text_tf_width = intro_text_tf._width;

			TweenMax.set(divToPutTextIn, {x: WID*0.5});
			TweenMax.set(question_tf, {x: -(question_tf_width*0.5)});
			TweenMax.set(intro_text_tf, {x: -(intro_text_tf_width*0.5)});
		}
		else
		{	
			var split_text = text.split("?");
			split_text[0] = split_text[0]+"?"; /* ADD QUESTION MARK BACK ON */
			split_text[1] = split_text[1].substring(1); /* REMOVE LINE BREAK FROM START OF NEXT PARAGRAPH */
	
			var question_tf = TextField(tfFont, split_text[0], size, 0, lineHeight, "left", colour1);
				question_tf.id = "question_tf";
			
			var intro_text_tf = TextField(tfFont, split_text[1], size, 0, lineHeight, "left", colour2);
				intro_text_tf.id = "non_question_tf";
		
			divToPutTextIn.appendChild(question_tf);
			divToPutTextIn.appendChild(intro_text_tf);
	
			var height_of_question = question_tf._height;
			var height_of_text = non_question_tf._height;
	
			TweenMax.set(non_question_tf, {y: height_of_question + gap});
			log("----------------------------------------------------------------------");
			log(height_of_question);
			log(height_of_text);
			log("----------------------------------------------------------------------")
		}
	}
	else
	{
		if(WID==120&&HEI==600 || WID==160&&HEI==600)
		{
			var intro_text_tf = TextField(tfFont, text, size, 0, lineHeight, "center", colour1);
				intro_text_tf.id = "intro_text_tf";
		
			divToPutTextIn.appendChild(intro_text_tf);

			var intro_text_tf_width = intro_text_tf._width;

			TweenMax.set(divToPutTextIn, {x: (WID*0.5)-(intro_text_tf_width*0.5)});
		}
		else
		{
			var intro_text_tf = TextField(tfFont, text, size, 0, lineHeight, "left", colour1);
				intro_text_tf.id = "intro_text_tf";
		
			divToPutTextIn.appendChild(intro_text_tf);
		}
	}

	var intro_text_lines = divToPutTextIn.getElementsByTagName('g');

	for (var i = intro_text_lines.length - 1; i >= 0; i--)
	{
		var line = divToPutTextIn.getElementsByTagName('g')[i];
	
		if(colourOrder[i]==1)
		{
			bq.updateColor(line, colour1);
		}
		else
		{
			bq.updateColor(line, colour2);
		}
	}


},

dynamicPrice: function (div, price)
{
	var tfFont = "GoodHome_Bold_GFX";

	var pricefontsize = 32;

	if(WID==300 && HEI==600)	{ pricefontsize = 32;}
	if(WID==300 && HEI==250)	{ pricefontsize = 26;}
	if(WID==728 && HEI==90) 	{ pricefontsize = 28;}
	if(WID==970 && HEI==250) 	{ pricefontsize = 34;}
	if(WID==320 && HEI==480) 	{ pricefontsize = 28;}

	var includesDecimal = false;

	var price_tf;

	div.innerHTML = "";

	var split_price;

	if(price.indexOf(".")!=-1)
	{
		includesDecimal = true;
		split_price = price.split(".");
		split_price[1] = "."+split_price[1];
	}
	else if(price.indexOf("_")!=-1)
	{
		includesDecimal = true;
		split_price = price.split("_");	
		split_price[1] = " "+split_price[1];		
	}

	if(includesDecimal)
	{
		if(WID==120&&HEI==600 || WID==160&&HEI==600)
		{
			price_tf 	= TextField({normal:tfFont}, "<sup>£</sup>"+split_price[0]+"<sub>"+split_price[1]+"</sub>", pricefontsize, -1, 0, "center", "#FFFFFF", null, WID);
		}
		else
		{
			price_tf 	= TextField({normal:tfFont}, "<sup>£</sup>"+split_price[0]+"<sub>"+split_price[1]+"</sub>", pricefontsize, -1, 0, "right", "#FFFFFF");		
		}
	
		price_tf.id = div.id+"_tf";
		div.appendChild(price_tf);
	}
	else
	{
		if(WID==120&&HEI==600 || WID==160&&HEI==600)
		{
			price_tf = TextField({normal:tfFont}, "<sup>£</sup>"+price, pricefontsize, -1, 0, "center", "#FFFFFF", null, WID);
		}
		else
		{
			price_tf = TextField({normal:tfFont}, "<sup>£</sup>"+price, pricefontsize, -1, 0, "right", "#FFFFFF");			
		}

		price_tf.id = div.id+"_tf";	
		div.appendChild(price_tf);
	}

	var price_width = price_tf._width;
	var price_height = price_tf.getElementsByTagName("g")[0].getBBox().height;

	if(WID == 728 && HEI == 90 || WID == 970 && HEI == 250)
	{

	}
	else
	{
		if(WID==120&&HEI==600 || WID==160&&HEI==600)
		{
			TweenMax.set(div, {x: 0});
		}
		else
		{
			TweenMax.set(price_tf, {x: -price_width});
		}
	}
},

createAdditionalText: function(divID, product, font_size)
{
	/* FOR IF EXTRA TEXT IS NEEDED UNDER THE PRICE. E.G. 'PER PACK' */
	var div = document.createElement('div');
		div.id = product.productLabel+"_additional_text";

	var tfFont = "GoodHome_Bold_GFX";
	var fontsize = font_size;

	div.innerHTML = "";

	var additional_text_tf = TextField(tfFont, product.additional, fontsize, 0, -2, "left", "#FFFFFF");
		additional_text_tf.id = div.id+"_tf";

	div.appendChild(additional_text_tf);

	var price_height = divID.children[1]._height;

	TweenMax.set(div, {x: 4, y: (price_height*0.5)+14});

	divID.appendChild(div);
},

dynamicDescription: function (div, description)
{
	var tfFont = "GoodHome_Bold_GFX";

	var fontsize = 12;

	div.innerHTML = "";

	if(WID==300 && HEI==600){ fontsize = 14 }
	if(WID==300 && HEI==250){ fontsize = 12 }
	if(WID==970 && HEI==250){ fontsize = 20 }
	if(WID==320 && HEI==480){ fontsize = 15 }

	if(WID==728&&HEI==90 || WID==970&&HEI==250)
	{
		var description_tf = TextField(tfFont, description, fontsize, 0, -2, "left", "#FFFFFF");
			description_tf.id = div.id+"_tf";

		div.appendChild(description_tf);

		var description_width = description_tf._width;
	}
	else if(WID==120&&HEI==600 || WID==160&&HEI==600)
	{
		var description_tf = TextField(tfFont, description, fontsize, 0, -2, "center", "#FFFFFF", null, WID);
			description_tf.id = div.id+"_tf";

		div.appendChild(description_tf);
	
		TweenMax.set(description_tf, {x: 0});
	}
	else
	{
		var description_tf = TextField(tfFont, description, fontsize, 0, -2, "right", "#FFFFFF");
			description_tf.id = div.id+"_tf";

		div.appendChild(description_tf);

		//var description_width = description_tf._width;

		var description_width = div.children[0]._width;
	
		TweenMax.set(description_tf, {x: -description_width});
	}
},

dynamicRangeDescription: function (div, description, font_size, alignment)
{
	var tfFont = "GoodHome_Bold_GFX";

	var fontsize = font_size;

	div.innerHTML = "";

	var description_tf = TextField(tfFont, description, fontsize, 0, -2, alignment, "#FFFFFF");
		description_tf.id = div.id+"_tf";

	div.appendChild(description_tf);

	var description_width = description_tf._width;

	var description_svg = description_tf.getElementsByTagName("svg")[0];
	
	if(alignment=="center")
	{
		TweenMax.set(description_tf, {x: -description_width*0.5});
	}
	else if(alignment == "right")
	{
		TweenMax.set(description_tf, {x: -description_width});
	}
	else
	{
		TweenMax.set(description_tf, {x: 0});
	}
		
	
},

dynamicBenefits: function(div, benefits, size)
{
	var tfFont = "GoodHome_Bold_GFX";

	div.innerHTML = "";

	for (var i = benefits.length - 1; i >= 0; i--)
	{
		var benefit = benefits[i];

		var benefit_tf = TextField(tfFont, benefit, size, 0, -2, "center", "#FFFFFF");
			benefit_tf.id = "benefit_"+(i+1)+"_tf";

		div.appendChild(benefit_tf);

		var benefit_width = benefit_tf._width;

		TweenMax.set(benefit_tf, {x: -(benefit_width*0.5)});
	}
},

animateBenefits: function(divID)
{
	var benefits = divID.children;
	var benefitsFavourite = products[0].benefitsFavourite;

	var delay_between_benefits = 3;

	for (var i = benefits.length+1 - 1; i >= 0; i--)
	{
		// BENEFIT 1 IS ALREADY SHOWING, SO START AT 2

		if(i==0)
		{
			fbf.show(divID.children[i]);
			TweenMax.set(divID.children[i], {alpha: 0});

			TweenMax.to(divID.children[i], 0.75, {alpha: 1, ease:Expo.easeInOut});
			TweenMax.to(divID.children[i], 0.75, {alpha: 0, ease:Expo.easeInOut, delay: delay_between_benefits});
		}
		else if(i==benefits.length) // SHOW THE FAVOURITE ONE AGAIN WHEN ALL IS FINISHED
		{
			fbf.show(divID.children[benefitsFavourite]);
			TweenMax.set(divID.children[benefitsFavourite], {alpha: 0});

			TweenMax.to(divID.children[benefitsFavourite], 0.75, {alpha: 1, ease:Expo.easeInOut, delay: (i*delay_between_benefits)+0.75});
		}
		else
		{
			fbf.show(divID.children[i]);
			TweenMax.set(divID.children[i], {alpha: 0});

			TweenMax.to(divID.children[i], 0.75, {alpha: 1, ease:Expo.easeInOut, delay: (i*delay_between_benefits)+0.75});
			TweenMax.to(divID.children[i], 0.75, {alpha: 0, ease:Expo.easeInOut, delay: (i*delay_between_benefits)+delay_between_benefits});
		}
	}
},

detectSwipe: function(id, func)
{
	var swipe_det =
	{
		sX: 0,
		sY: 0,
		eX: 0,
		eY: 0,
		active:false
	}

	var directions = Object.freeze
	({
		UP: 'u',
		DOWN: 'd',
		RIGHT: 'r',
		LEFT: 'l'
	})

	var deltaMin = 75;
	var swipe_direction = null;

	addEventListener('touchstart', function(e)
	{
		var t = e.touches[0]
		swipe_det.sX = t.screenX
		swipe_det.sY = t.screenY
	}, false)

	addEventListener('touchmove', function(e)
	{
		var t = e.touches[0]
		swipe_det.eX = t.screenX
		swipe_det.eY = t.screenY
		swipe_det.active = true
	}, false)

	addEventListener('touchend', function(e)
	{
		if(!swipe_det.active)return;
		swipe_det.active = false
		
		var deltaX = swipe_det.eX - swipe_det.sX
		var deltaY = swipe_det.eY - swipe_det.sY

		if (deltaX * deltaX + deltaY * deltaY < deltaMin * deltaMin) return

		if (Math.abs(deltaX) > Math.abs(deltaY))
		  swipe_direction = deltaX > 0 ? directions.RIGHT : directions.LEFT
		else
		  swipe_direction = deltaY > 0 ? directions.UP : directions.DOWN

		if (swipe_direction && typeof func === 'function') func(id, swipe_direction)

	  	swipe_direction = null	  	

	}, false)
},

detectFirefox: function()
{
	var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1 || navigator.userAgent.toLowerCase().indexOf('fennec') > -1;
	return isFirefox;
},

onSwipe: function(id, swipe_direction)
{
	switch(swipe_direction)
	{
		case "u": console.log("\nSWIPED ↓\n\n"); break;
		case "d": console.log("\nSWIPED ↑\n\n"); break;

		case "l": 

			if (!UI_disabled)
			{
				console.log("\nSWIPED ←\n\n");
				arrowRightClick(event);
			}

	    break;

		case "r":
	      
			if (!UI_disabled)
			{			
				console.log("\nSWIPED →\n\n");
				arrowLeftClick(event);
			}			

	    break;
	}
},

createGradientBackground: function(div, colour1, colour2)
{
	div.innerHTML = "";

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
	gradient.setAttribute('gradientTransform', 'rotate(-20)');
	defs.appendChild(gradient);

	rect.setAttributeNS(null,  'fill', 'url(#Gradient)');
	rect.setAttributeNS(null,  'width', '100%');
	rect.setAttributeNS(null,  'height', '100%');

	svg.setAttributeNS(null, 'id','svg_gradient');
	svg.setAttributeNS(null, 'width', WID);
	svg.setAttributeNS(null, 'height', HEI);

	svg.appendChild(defs);
	svg.appendChild(rect);

	div.appendChild(svg);
},

hideFrameExtension: function()
{
	fbf.hide(frame_extension_right, frame_extension_bottom);
},

extendFrame: function(divID, WID, HEI)
{
	var frame_colour = divID._("path").getAttribute('fill');//	getElementsByTagName('svg')[0].children[0].children[0].getAttribute('fill');
	var svgns = "http://www.w3.org/2000/svg";

	var frame_extension_right = document.createElementNS(svgns, 'svg');
		frame_extension_right.setAttributeNS(null, 'id','frame_extension_right');
		frame_extension_right.setAttributeNS(null, 'width', WID+20);
		frame_extension_right.setAttributeNS(null, 'height', HEI+20);

	var frame_extension_bottom = document.createElementNS(svgns, 'svg');
		frame_extension_bottom.setAttributeNS(null, 'id','frame_extension_bottom');
		frame_extension_bottom.setAttributeNS(null, 'width', (WID*2)+20);
		frame_extension_bottom.setAttributeNS(null, 'height', HEI+20);

	var rect_right = document.createElementNS(svgns, 'rect');
		rect_right.setAttributeNS(null, 'fill', frame_colour);
		rect_right.setAttributeNS(null, 'width', '100%');
		rect_right.setAttributeNS(null, 'height', '100%');

	var rect_bottom = document.createElementNS(svgns, 'rect');
		rect_bottom.setAttributeNS(null, 'fill', frame_colour);
		rect_bottom.setAttributeNS(null, 'width', '100%');
		rect_bottom.setAttributeNS(null, 'height', '100%');

	frame_extension_right.appendChild(rect_right);
	frame_extension_bottom.appendChild(rect_bottom);

	divID.appendChild(frame_extension_right);
	divID.appendChild(frame_extension_bottom);

	if(WID==120&&HEI==600 || WID==160&&HEI==600)
	{
		TweenMax.set(frame_extension_right, {x: WID, y: 0});
		TweenMax.set(frame_extension_bottom, {x: 0, y: -30});
	}
	else
	{
		TweenMax.set(frame_extension_right, {x: WID, y: 0});
		TweenMax.set(frame_extension_bottom, {x: 0, y: -30});
	}
},

updateColor:function(path, colourToUse)
{
	path.setAttribute("fill",colourToUse);
},

buttonON: function(divID)
{
	var paths = divID.__("path");
	var button_background = paths[0];//divID.getElementsByTagName('g')[0].children[0];
	var button_text = paths[1];//divID.getElementsByTagName('g')[0].children[1];
	bq.updateColor(button_background, "#FFFFFF");
	bq.updateColor(button_text, "#FF6600");
},

buttonOFF: function(divID)
{
	var paths = divID.__("path");
	var button_background = paths[0];//divID.getElementsByTagName('g')[0].children[0];
	var button_text = paths[1];//divID.getElementsByTagName('g')[0].children[1];
	bq.updateColor(button_background, "#FF6600");
	bq.updateColor(button_text, "#FFFFFF");
},

disableUI: function()
{
	UI_disabled = true;
},

enableUI: function()
{
	UI_disabled = false;
},

ad_rollOver: function(e)
{
	bq.buttonON(mc_button);  
},
ad_rollOut: function(e)
{
	bq.buttonOFF(mc_button);
},

setListeners: function(divID)
{
	divID.addEventListener("click", bq.handleClick);
	divID.addEventListener('mouseover', bq.ad_rollOver, false);
    divID.addEventListener('mouseout', bq.ad_rollOut, false);
},

showUpToRoot: function(mc) 
{
	var target = mc;

	while(target)
	{
		target.visible = true;
		target.display = true;
		target = target.parentNode;
	}
},

handleClick: function(event)
{
	console.log("\nhandleClick\n\n");

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
    	if(product_count==1)
    	{
    		clickLabel = products[0]["productLabel"];
			clickURL = products[0]["productURL"];
    	}
    	else
    	{
    		clickLabel = products[current_product-1]["productLabel"];
			clickURL = products[current_product-1]["productURL"];
    	}
    }

    if (useDynamicExit && !fbf.isLocal && !demo) clickURL = dynamicExit;
    Enabler.exitOverride(clickLabel, clickURL);
},

animateIntro:function(time)
{
	console.log("animateIntro"+time);
},

fadeOut:function(mc,wait)
{
	bq.showUpToRoot(mc);
	TweenLite.to(mc,0.5,{alpha:0,delay:wait});
},

fadeIn:function(mc,wait)
{
	bq.showUpToRoot(mc);
	TweenLite.set(mc,{alpha:0});
	TweenLite.to(mc,0.5,{alpha:1,delay:wait});
}

}