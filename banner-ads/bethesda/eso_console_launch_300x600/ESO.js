var tffont = "Garamond_Premiere_Pro_Semibold_GFX";

var ctx,thresholdSrcDATARAW,imageOneSrcDATARAW,thresholdCanvas,thresholdctx,foregroundCanvasctx,backgroundCanvasctx,finalOutputDATA;

var eso =
{
	defaultsetup: function()
	{
		logging = false;
		fbf.clean(_root);
		fbf.replaceSVGDefs();
		fbf.displayBlock(_root);
		_root.buttonMode = true;
		fbf.show(_root);
	
		_root.style.cssText += "background-color:#FFF";
		_root.style.cssText += "background-color:#000; overflow:hidden;";
		keyline = addKeylineTo(_root, WID, HEI, '#000000', 1);
		onMobile = fbf.isMobile();
	},

	addShadow: function(divID)
	{
		divID.style.cssText += " box-shadow: -0px 0px 2px 5px #00000033;";
	},

	setListeners: function()
	{
		_root.addEventListener("mouseenter", eso.adRollover);
		_root.addEventListener("mouseleave", eso.adRollout);
	},

	setupRating: function(territory)
	{
		if(territory=="uk") fbf.show(mc_rating_pegi)
	},

	setupButton: function(div, settings)
	{
		var button_text = "BUTTON TEXT", font_size = 20, letter_spacing = 0, line_height = 0, text_colour = "#000000";

		if(!settings){ }
		else
		{
			if(settings.text) button_text = settings.text
			if(settings.fontSize) font_size = settings.fontSize
			if(settings.letterSpacing) letter_spacing = settings.letterSpacing
			if(settings.lineHeight) line_height = settings.lineHeight
			if(settings.textColour) text_colour = settings.textColour
		}

		var div_to_append = document.getElementById(div.id+"_text");

		var tf =TextField({normal:tffont}, button_text, font_size, letter_spacing, line_height, "center", text_colour);
		
		div_to_append.innerHTML = "";
		div_to_append.appendChild(tf);

		var textWidth = tf._width, textHeight = tf._height;

		TweenMax.set(tf, {x: '-='+(textWidth*0.5), y: '-='+(textHeight*0.5)});

		// SHIMMER OVERLAY

		var buttonWidth = parseInt(mc_button_background.style.width, 10);
		var buttonHeight = parseInt(mc_button_background.style.height, 10);

		var button_overlay = document.createElement("div");
		    button_overlay.id = "button_overlay";
			button_overlay.setAttribute("class", "do");
			button_overlay.className = "do";
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
		shine.children[0].style.height = buttonHeight+"px";

		button_overlay.appendChild(shine);
		mc_button.appendChild(button_overlay);

		eso.resetButtonShine();

		TweenMax.set(button_overlay, {y: '-='+buttonHeight*0.5, x: '-='+buttonWidth*0.5, alpha: 0.25});
	},

	resetButtonShine: function()
	{
		button_animating = false;
		var button_shine_width = button_shine._width;
		TweenMax.set(button_shine, {x: -(button_shine_width*2)});
	},

	animateButton: function()
	{
		var buttonWidth = parseInt(mc_button_background.style.width, 10);
		
		if(!button_animating)
		{
			button_animating = true;
			TweenMax.to(button_shine, 0.5, {x: buttonWidth, ease: Power2.easeInOut, onComplete: eso.resetButtonShine});
		}
	},

	setupHandMagic: function()
	{
		eso.startHandMagic();

		_root.addEventListener("mouseenter", eso.adRollover);
		_root.addEventListener("mouseleave", eso.adRollout);
	},

	startHandMagic: function()
	{	
		var hand_magic_left = mc_hand_magic_left;
		var hand_magic_right = mc_hand_magic_right;

		animate_hand_magic = true;

		smokeInterval = setInterval(function()
		{
			if(animate_hand_magic)
			{
				eso.createNewSmoke(hand_magic_left, {scale: 0.3});
				eso.createNewSmoke(hand_magic_right, {scale: 0.3});
			}
		}, 300);
	},

	stopHandMagicFirstRun()
	{
		animate_hand_magic = false;
	},

	stopHandMagic: function()
	{
		animate_hand_magic = false;
		clearInterval(smokeInterval);	
	},

	createNewSmoke: function(div, settings)
	{
		var newsmoke = mc_smoke.cloneNode(true);

		var scale = 1, rotate = [-70, 70], randomX = eso.numberBetween(-20, 20), randomY = eso.numberBetween(30, 50);

		if(settings)
		{
			if(settings.scale) scale = settings.scale
		}

		div.appendChild(newsmoke);
		TweenMax.set(newsmoke, {x: 0, y: 0, scale: scale});

		newsmoke.style.visibility = "visible";

		var rotationRandom = rotate[Math.floor(Math.random() * rotate.length)];

		TweenMax.set(newsmoke, {alpha: 0, scale: 0, x: 0, y: 0});
		TweenMax.to(newsmoke, 0.5, {alpha: 0.8, scale: scale});

		TweenMax.to(newsmoke, 2, {x: randomX, y: '-='+randomY, rotation: rotationRandom, ease: Power1.easeInOut});
		TweenMax.to(newsmoke, 0.75, {delay: 1.25, alpha: 0, scale: 0, ease: Power1.easeOut, onComplete: eso.removeSmoke, onCompleteParams:[newsmoke]});
	},

	removeSmoke: function(smoke)
	{
		smoke.parentNode.removeChild(smoke);
	},

	numberBetween: function(min, max)
	{
    	return Math.floor(Math.random() * (max - min + 1) + min);
	},

	dynamicText: function(div, settings)
	{
		var text = "CONSOLE TEXT", text_align = "left", font_size = 20, letter_spacing = 0, line_height = 0, text_colour = "#FFFFFF", padding_top = 0;

		if(!settings){ }
		else
		{
			if(settings.text) button_text = settings.text
			if(settings.align) text_align = settings.align
			if(settings.fontSize) font_size = settings.fontSize
			if(settings.letterSpacing) letter_spacing = settings.letterSpacing
			if(settings.lineHeight) line_height = settings.lineHeight
			if(settings.textColour) text_colour = settings.textColour
			if(settings.paddingTop) padding_top = settings.paddingTop
		}

		var tf =TextField({normal:tffont}, button_text, font_size, letter_spacing, line_height, text_align, text_colour);
		
		div.innerHTML = "";
		div.appendChild(tf);

		if(text_align=="center"){ var textWidth = tf._width, textHeight = tf._height; TweenMax.set(tf, {x: '-='+(textWidth*0.5), y: '+='+padding_top}); }
		else if(text_align=="right"){ var textWidth = tf._width, textHeight = tf._height; TweenMax.set(tf, {x: '-='+textWidth, y: '+='+padding_top}); }
	},

	setupTagline: function(div, settings)
	{
		var text = ["DRAGONS","ARE","UNLEASHED"], text_align = "left", font_size = 20, letter_spacing = 0, text_colour = "#FFFFFF", x = WID*0.5, y = HEI *0.5;

		if(!settings){ }
		else
		{
			if(settings.text) text = settings.text
			if(settings.align) text_align = settings.align
			if(settings.fontSize) font_size = settings.fontSize
			if(settings.letterSpacing) letter_spacing = settings.letterSpacing
			if(settings.textColour) text_colour = settings.textColour
			if(settings.x) x = settings.x
			if(settings.y) y = settings.y
		}

		var tagline_container = document.createElement('div');
			tagline_container.id = "taglineContainer";
			tagline_container.setAttribute("class", "do");
			tagline_container.className = "do";

		div.appendChild(tagline_container);
		TweenMax.set(tagline_container, {x: x, y: y});

		for (i = 0; i < text.length; i++)
		{
			var tf =TextField({normal:tffont}, text[i], font_size, letter_spacing, 0, text_align, text_colour);
			tagline_container.appendChild(tf);

			if(text_align=="center"){ var textWidth = tf._width, textHeight = tf._height; TweenMax.set(tf, {x: '-='+(textWidth*0.5)}); }
			else if(text_align=="right"){ var textWidth = tf._width, textHeight = tf._height; TweenMax.set(tf, {x: '-='+textWidth}); }

			TweenMax.set(tf, {alpha: 0});
		}
	},

	animateTagline: function(settings)
	{
		var speed = 0.25, delayBetween = 0.5, delay = 0, pauseOnLast = 0;
		var lines = document.getElementById('taglineContainer').children;

		if(!settings){ }
		else
		{
			if(settings.speed) speed = settings.speed
			if(settings.delayBetween) delayBetween = settings.delayBetween
			if(settings.delay) delay = settings.delay
			if(settings.pauseOnLast) pauseOnLast = settings.pauseOnLast
		}

		for (var i = lines.length - 1; i >= 0; i--)
		{
			var line = lines[i];
			TweenMax.from(line, 0.25, {scale: 8, transformOrigin: "50% 50%", ease: Power1.easeOut, delay: delay+(i*delayBetween)});
			TweenMax.to(line, 0.25, {alpha: 1, ease: Power1.easeOut, delay: delay+(i*delayBetween)});
			
			if(i!=(lines.length-1))
			{
				TweenMax.to(line, 0.25, {alpha: 0, scale: 0, transformOrigin: "50% 50%", ease: Power1.easeOut, delay: delay+((i+1)*delayBetween)});
			}
			else
			{
				TweenMax.to(line, 0.5, {alpha: 0, transformOrigin: "50% 50%", ease: Power1.easeOut, delay: delay+pauseOnLast+((i+1)*delayBetween), onComplete: animateElements});
			}
		}
	},

	setupCanvasEffect: function(div, settings)
	{
		var canvas_house = document.createElement('div');
			canvas_house.id = "canvas_house";
			canvas_house.setAttribute("class", "do");
			canvas_house.className = "do";

		mc_artwork.insertBefore(canvas_house, mc_foreground_elements)

		//mc_artwork.appendChild(canvas_house);

		eso.createCanvas("imagesContainer", {width: WID, height: HEI});
		//eso.createCanvas("threshold");
		eso.createCanvas("backgroundCanvas");
		//eso.createCanvas("midgroundCanvas");
		//eso.createCanvas("foregroundCanvas");

		ctx = $("imagesContainer").getContext("2d");

		//fbf.hide($("imagesContainer"),$("threshold"));
		TweenMax.set($("imagesContainer"), {y: HEI+20});

		var spritesheet = new Image();
			spritesheet.src = 'spritesheet0.jpg';

		spritesheet.onload = function()
		{
			var artworkImage = mc_background.style.backgroundPosition.split("px");
		
			ctx.drawImage(spritesheet,-1*artworkImage[0],-1*artworkImage[1],WID,HEI,0,0,WID,HEI);

			imageOneSrcDATARAW = ctx.getImageData(0,0,WID,HEI);

			backgroundCanvasctx = $("backgroundCanvas").getContext("2d");
		
			imageOneSrcDATA = ctx.createImageData(WID,HEI);
		
			backgroundOutputDATA = backgroundCanvasctx.createImageData(WID,HEI);

			eso.drawOnCanvases();

			startFlow();
		}
	},

	createCanvas: function(canvasID, settings)
	{
		var width = WID, height = HEI, append = "canvas_house";

		if(settings)
		{
			if(settings.width) width = settings.width
			if(settings.height) height = settings.height
		}
	
		var canvas_tray = document.createElement("canvas");
			canvas_tray.className = "do";
			canvas_tray.width = width;
			canvas_tray.height = height;
			canvas_tray.id = canvasID;
	
		document.getElementById(append).appendChild(canvas_tray);
	},

	drawOnCanvases: function(thresholdVal)
	{
		var src = imageOneSrcDATARAW.data;
		
		for (var i = 0; i < src.length; i += 4)
		{	
				backgroundOutputDATA.data[i+0]=imageOneSrcDATARAW.data[i]+70;
				backgroundOutputDATA.data[i+1]=imageOneSrcDATARAW.data[i+1]+25;
				backgroundOutputDATA.data[i+2]=imageOneSrcDATARAW.data[i+2]+25;
				backgroundOutputDATA.data[i+3]=imageOneSrcDATARAW.data[i+3];
		}
	
		backgroundCanvasctx.putImageData(backgroundOutputDATA, 0,0);	
	},

	createSVGgradient: function(div, settings)
	{
		var colour1 = "#000000", colour2 = "#000000", width = WID, height = HEI, position = "top",
			offsetStop1 = "0%", offsetStop2 = "100%";

		if(settings)
		{
			if(settings.colour1) colour1 = settings.colour1
			if(settings.colour2) colour2 = settings.colour2
			if(settings.width) width = settings.width
			if(settings.height) height = settings.height
			if(settings.position) position = settings.position
			if(settings.offsetStop1) offsetStop1 = settings.offsetStop1
			if(settings.offsetStop2) offsetStop2 = settings.offsetStop2
		}

		var svg_container_div = document.createElement('div');
			svg_container_div.id = div.id+"_svg_container";
			svg_container_div.setAttribute("class", "do");
			svg_container_div.className = "do";
			svg_container_div.style.width = width+"px";
			svg_container_div.style.height = height+"px";			

		var svgns = "http://www.w3.org/2000/svg";

		var svg = document.createElementNS (svgns, "svg");
		var defs = document.createElementNS(svgns, 'defs');
		var gradient = document.createElementNS(svgns, 'linearGradient');
		var rect = document.createElementNS(svgns, 'rect');

		var stops =
		[
			{
			    "color": colour1,
			    "offset": offsetStop1,
			    "opacity": "0"
			},{
			    "color": colour2,
			    "offset": offsetStop2,
			    "opacity": "1"
			}
		];

		for (var i = 0, length = stops.length; i < length; i++)
		{
			// Create a <stop> element and set its offset based on the position of the for loop.
			var stop = document.createElementNS(svgns, 'stop');
			stop.setAttribute('offset', stops[i].offset);
			stop.setAttribute('stop-color', stops[i].color);
			stop.setAttribute('stop-opacity', stops[i].opacity);
			// Add the stop to the <lineargradient> element.
			gradient.appendChild(stop);
		}

		// Apply the <lineargradient> to <defs>
		gradient.id = 'Gradient';
		gradient.setAttribute('x1', '0');
		gradient.setAttribute('x2', '0');
		gradient.setAttribute('y1', '0');
		gradient.setAttribute('y2', '1');
		defs.appendChild(gradient);

		// Setup the <rect> element.
		rect.setAttributeNS(null,  'fill', 'url(#Gradient)');
		rect.setAttributeNS(null,  'width', '100%');
		rect.setAttributeNS(null,  'height', '100%');

		// Assign an id, classname, width and height
		svg.setAttributeNS(null, 'id','svg_gradient');
		svg.setAttributeNS(null, 'width', width);
		svg.setAttributeNS(null, 'height', height);

		// Add the <defs> and <rect> elements to <svg>
		svg.appendChild(defs);
		svg.appendChild(rect);

		svg_container_div.appendChild(svg);
		div.appendChild(svg_container_div);

		if(position=="bottom") TweenMax.set(svg_container_div, {y: HEI-height});
	},

	adRollover: function()
	{
		eso.animateButton();

		if(!animate_hand_magic)
		{
			eso.startHandMagic();			
		}
	},

	adRollout: function()
	{
		eso.stopHandMagic();
	},
}