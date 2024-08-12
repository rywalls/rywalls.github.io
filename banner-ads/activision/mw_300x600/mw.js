var svgns = "http://www.w3.org/2000/svg";

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

var webFontUses = ['uaear', 'ksaar', 'ksa', 'ru', 'tch']
var usePEGI = ['uk', 'fr', 'it', 'es', 'nl', 'befr', 'benl', 'at', 'chde', 'chfr', 'pl', 'nordics', 'pt', 'sea',]

function isIE() {
	ua = navigator.userAgent;
	/* MSIE used to detect old browsers and Trident used to newer ones*/
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;

	return is_ie; 
}

var mw = {

emergencyOverride:function(){

},

stopIEWobble:function (typeOfBrowser){
	var ua = typeOfBrowser;

	if (ua.indexOf('MSIE ')  >=  0 || ua.indexOf('Trident/') >= 0 || ua.indexOf('Edge/') >= 0) {
	    _root.style.cssText +="-webkit-transform:rotateZ(0.00001deg);-moz-transform:rotateZ(0.00001deg);-ms-transform:rotateZ(0.00001deg);-o-transform:rotateZ(0.00001deg);transform:rotateZ(0.00001deg);";
	}  
},

createButton:function (paddingSides, paddingTopBottom)
{
	var fontSize = buttonFontSize
	var useWebFont = webFontUses.includes(config.lang)

	// ADD TEXT
	if(!gameIsOut) var buttonText = config.buttonPre
	else var buttonText = config.buttonPost

	var weight = 'normal'
	if(config.lang=='ru'||config.lang=='tch') weight = 'bold'

	mw.dynamicText(mc_button, buttonText, {id: 'buttonText', fontWeight: weight, webFont: useWebFont, fontSize: fontSize, colour: '#E1E1E1', align: 'center', gutDIV: true})

	var buttonPaddingSides = 50, buttonPaddingTopBottom = Math.round(fontSize/2)

	if(paddingSides !== undefined) buttonPaddingSides = paddingSides
	if(paddingTopBottom !== undefined) buttonPaddingTopBottom = paddingTopBottom

	// ADD BACKGROUND
	var buttonText = document.getElementById('buttonText'),
		// ROUND UP TO NEAREST EVEN NUMBER, THIS FIXED ISSUE WITH INCONSISTENT BORDER THICKNESS ON BACKGROUND
		buttonTextWidth = 2 * Math.round(buttonText._width / 2),
		buttonTextHeight = 2 * Math.round(buttonText._height / 2);
		buttonText.style.zIndex = 100;

	if(config.lang=='ru') var buttonWidth = buttonTextWidth+20, buttonHeight = buttonTextHeight+12
	else var buttonWidth = buttonTextWidth+buttonPaddingSides, buttonHeight = buttonTextHeight+buttonPaddingTopBottom

	if(buttonWidth<buttonMinWidth) buttonWidth = buttonMinWidth
	if(buttonHeight<buttonMinHeight) buttonHeight = buttonMinHeight

	var buttonBackground = document.createElement('div');
		buttonBackground.id = "buttonBackground";
		buttonBackground.className = "do";
		buttonBackground.setAttribute("class", "do");
		buttonBackground.style.background = "#262829"//"rgba(0,0,0,.7)";
		buttonBackground.style.border = "solid 1px #FFFFFF";
		buttonBackground.style.width = buttonWidth+"px";
		mc_button.style.width = buttonWidth+"px";
		buttonBackground.style.height = buttonHeight+"px";
		mc_button.style.width = buttonWidth+"px";
		mc_button.style.height = buttonHeight+"px";

		mc_button.appendChild(buttonBackground);

		//TweenMax.set(buttonBackground, {x: -(buttonWidth*0.5), y: -(buttonHeight*0.5)-1})
		TweenMax.set(mc_button, {x: '-='+buttonWidth*0.5, y: '-='+buttonHeight*0.5, transformOrigin: '50% 50%'})
		TweenMax.set(buttonText, {x: '+='+buttonWidth*0.5, y: '+='+((buttonHeight*0.5)+1)})
},

addDate:function (position) {

	var useWebFont = webFontUses.includes(config.lang)

	if(config.lang=='uaear'||config.lang=='ksaar'||config.lang=='ksa') {

		// SPECIAL DATE SO USING SVG CODE FROM CONFIG
		var dateContainer = document.createElement('div')
			dateContainer.id = 'date'
			dateContainer.className = 'do'
			dateContainer.classList.add('do')
			dateContainer.innerHTML = arabicDate
			dateContainer.style.width = arabicDateWidth+'px'
			dateContainer.style.height = arabicDateWidth/3+'px'

			_root.appendChild(dateContainer)

			TweenMax.set(dateContainer, {x: 0, y: 0})
			TweenMax.set(dateContainer, {x: position[0]-(arabicDateWidth/2), y: position[1]-((arabicDateWidth/3)*0.5)})
	} else {
		// DATE FONT SUPPORTS RUSSIAN
		if(config.lang=='ru') useWebFont = false

		if(ad.width==120&&ad.height==600) var dateText = config.dateNarrow, spaceLetters = Math.round(dateFontSize/4)
		else var dateText = config.date, spaceLetters = Math.round(dateFontSize/2)

		var weight = 'normal'
		if(config.lang=='tch'){ weight = 'bold' }

		mw.dynamicText(_root, dateText, {
			id: 'date', 
			font: 'EurostileExtBla_GFX', 
			fontSize: dateFontSize, 
			fontWeight: weight,
			colour: '#E1E1E1', 
			align: 'center', 
			x: position[0], 
			y: position[1], 
			webFont: useWebFont, 
			letterspacing: spaceLetters
		})
	}

	fbf.hide(date)
},

animateDate:function () {
	fbf.show(date)
	TweenMax.from(date, 1, {alpha: 0})
},

dynamicText:function (div, text, settings)
{
	var tfFont = "Bio_Sans_Bold_GFX", fontsize = 12, xposition = 0, yposition = 0, align = "left", letterspacing = 0, lineheight = 0,
		colour = "#FFFFFF", id = div.id+"_dynamic_text_tf", gutDIV = false, fullWidth = false, webFont = false, fontWeight = 'normal';

	if(settings.font) tfFont = settings.font
	if(settings.align) align = settings.align
	if(settings.fontSize) fontsize = settings.fontSize
	if(settings.letterspacing) letterspacing = settings.letterspacing
	if(settings.lineheight) lineheight = settings.lineheight
	if(settings.x) xposition = settings.x
	if(settings.y) yposition = settings.y
	if(settings.colour) colour = settings.colour
	if(settings.id) id = settings.id
	if(settings.gutDIV) gutDIV = settings.gutDIV
	if(settings.fullWidth) fullWidth = settings.fullWidth
	if(settings.webFont) webFont = settings.webFont
	if(settings.fontWeight) fontWeight = settings.fontWeight

	if(gutDIV) div.innerHTML = "";

	if(webFont) {

		console.log("Dynamic text (web font)\n"+text)

		tfFont = "Arial, Helvetica, tahoma, verdana, 宋体, SimSun, 华文细黑, STXihei, sans-serif"

		var textContainer = document.createElement('div')
			textContainer.id = id
			textContainer.className = 'do'
			textContainer.classList.add('do')
			textContainer.innerHTML = text
			textContainer.style.fontFamily = tfFont
			textContainer.style.fontWeight = fontWeight
			textContainer.style.fontSize = fontsize+'px'
			textContainer.style.color = '#FFFFFF'
			textContainer.style.whiteSpace = 'nowrap'
			textContainer.style.letterSpacing = letterspacing+'px'

		div.appendChild(textContainer)

		var textWidth = parseInt(getComputedStyle(textContainer).width,10)
		var textHeight = parseInt(getComputedStyle(textContainer).height,10)

		if(align=="center") TweenMax.set(textContainer, {x: xposition-Math.round(textWidth/2), y: yposition-Math.round(textHeight/2)})

	} else {

		console.log("Dynamic text (normal font)\n"+text)

		if(fullWidth) var tf = TextField({normal:tfFont}, text, fontsize, letterspacing, lineheight, "center", colour, null, WID)
		else var tf = TextField({normal:tfFont}, text, fontsize, letterspacing, lineheight, align, colour)
		
		tf.id = id;
	
		div.appendChild(tf);
				
		var text_width = tf._width, text_height = tf._height;
	
		if(fullWidth)
		{
			TweenMax.set(tf, {y: yposition});
		}
		else
		{
			if(align=="center") TweenMax.set(tf, {x: xposition-(text_width*0.5), y: -(text_height*0.5)+yposition})
		}

	}
},

animateSmoke: function(setX)
{
	var xPos = ad.width
	if(setX) xPos = setX

	smokeHappening = true
	TweenMax.set(mc_smoke, {alpha: 1})
	var toClone = mc_smoke.firstElementChild;
	TweenMax.set(toClone, {transformOrigin:"50% 50%"});
	var count = 50;
	for(var i = 0; i < count; i++)
	{
		var clone = toClone.cloneNode(true);
		toClone.parentNode.appendChild(clone);
	
		TweenMax.set(clone, {x:-50 + (xPos + 100) * Math.random(), y: 100 * Math.random(), rotation:360 * Math.random(), alpha:0.75});
		TweenMax.to(clone, 3 + Math.random() * 2, {x:"-=225", y:"-=225", alpha:0, repeat:3, rotation:"-="+(Math.random()*25), delay:Math.random()*3})
	
		if(i==(count-1)) {
			TweenMax.to(clone, 3 + Math.random() * 2, {x:"-=225", y:"-=225", alpha:0, repeat:3, rotation:"-="+(Math.random()*25), delay:Math.random()*3, onComplete: mw.stopSmoke})
		}
	}
	toClone.parentNode.removeChild(toClone);
	TweenMax.fromTo(mc_smoke, 0.5, {alpha:0}, {alpha:1});
},

stopSmoke: function()
{
	TweenMax.to(mc_smoke, 3, {alpha: 0})
},

addSVGshadow:function (element, r, d) {

		var svg = element.getElementsByTagName('svg')[0]
		var defs = svg.getElementsByTagName('defs')[0]

		var radius = 2, deviation = 3

		if(r !== undefined) radius = r
		if(d !== undefined) deviation = d
	
		if(defs==undefined || defs==null) {
			var newdefs = document.createElementNS(svgns, 'defs')
			svg.appendChild(newdefs)
			defs = svg.getElementsByTagName('defs')[0]
		}
	
		// OUTER GLOW
		var shadowFilter = document.createElementNS(svgns, 'filter')
			shadowFilter.id = "shadowFilter"
		var filterThicken = document.createElementNS(svgns, 'feMorphology')
			filterThicken.setAttribute("operator", "dilate")
			filterThicken.setAttribute("radius", radius)
			filterThicken.setAttribute("in", "SourceAlpha")
			filterThicken.setAttribute("result", "thicken")
		var filterBlur = document.createElementNS(svgns, 'feGaussianBlur')
			filterBlur.setAttribute("in", "thicken")
			filterBlur.setAttribute("stdDeviation", deviation)
			filterBlur.setAttribute("result", "blurred")
		var filterMerge = document.createElementNS(svgns, 'feMerge')
		var filterMergeNode1 = document.createElementNS(svgns, 'feMergeNode')
		var filterMergeNode2 = document.createElementNS(svgns, 'feMergeNode')
			filterMergeNode2.setAttribute("in", "SourceGraphic")
	
		shadowFilter.appendChild(filterThicken)
		shadowFilter.appendChild(filterBlur)
		
		filterMerge.appendChild(filterMergeNode1)
		filterMerge.appendChild(filterMergeNode2)
		shadowFilter.appendChild(filterMerge)
	
		defs.appendChild(shadowFilter)	
	
		var use = svg.getElementsByTagName('use')[0]
			use.setAttributeNS(null,  'filter', 'url(#shadowFilter)');		
},

addSVGgradient: function(div, settings)
{
	var colour1 = "#000000", colour2 = "#000000", width = ad.width, height = ad.height, position = "top",
		offsetStop1 = "0%", offsetStop2 = "100%", id = 1, opacity1 = "0", opacity2 = "1", yPos = 0;

	if(settings)
	{
		if(settings.colour1) colour1 = settings.colour1
		if(settings.colour2) colour2 = settings.colour2
		if(settings.width) width = settings.width
		if(settings.height) height = settings.height
		if(settings.position) position = settings.position
		if(settings.offsetStop1) offsetStop1 = settings.offsetStop1
		if(settings.offsetStop2) offsetStop2 = settings.offsetStop2
		if(settings.id) id = settings.id
		if(settings.opacity1) opacity1 = settings.opacity1
		if(settings.opacity2) opacity2 = settings.opacity2
	}
	var svg_container_div = document.createElement('div');
		svg_container_div.id = div.id+"_svg_container"+id;
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
		    "opacity": opacity1
		},{
		    "color": colour2,
		    "offset": offsetStop2,
		    "opacity": opacity2
		}
	];
	for (var i = 0, length = stops.length; i < length; i++)
	{
		var stop = document.createElementNS(svgns, 'stop');
		stop.setAttribute('offset', stops[i].offset);
		stop.setAttribute('stop-color', stops[i].color);
		stop.setAttribute('stop-opacity', stops[i].opacity);
		gradient.appendChild(stop);
	}
	gradient.id = 'Gradient_'+id;
	gradient.setAttribute('x1', '0');
	gradient.setAttribute('x2', '0');
	if(position=="top")
	{
		gradient.setAttribute('y1', '1');
		gradient.setAttribute('y2', '0');
	}
	else
	{
		gradient.setAttribute('y1', '0');
		gradient.setAttribute('y2', '1');
	}
	defs.appendChild(gradient);
	rect.setAttributeNS(null,  'fill', 'url(#Gradient_'+id+')');
	rect.setAttributeNS(null,  'width', '100%');
	rect.setAttributeNS(null,  'height', '100%');
	svg.setAttributeNS(null, 'id','svg_gradient_'+id);
	svg.setAttributeNS(null, 'width', width);
	svg.setAttributeNS(null, 'height', height);
	svg.appendChild(defs);
	svg.appendChild(rect);
	svg_container_div.appendChild(svg);
	div.appendChild(svg_container_div);

	if(position=="bottom") TweenMax.set(svg_container_div, {y: ad.height-height})
},

onButtonOver:function (e) {
	TweenMax.to(buttonBackground, 0.25, {css:{borderColor:"#262829"}});
	TweenMax.to(buttonBackground, 0.1, {css:{backgroundColor:"#e1e1e1"}});
	if(webFontUses.includes(config.lang)) TweenMax.to(buttonText, 0.25, {color: "#262829"});
	else TweenMax.to(mc_button.getElementsByTagName('svg')[0], 0.25, {fill: "#262829"});
},

onButtonOut:function (e) {
	TweenMax.to(buttonBackground, 0.25, {css:{borderColor:"#e1e1e1"}});
	TweenMax.to(buttonBackground, 0.1, {css:{backgroundColor:"#262829"}});
	if(webFontUses.includes(config.lang)) TweenMax.to(buttonText, 0.25, {color: "#e1e1e1"});
	else TweenMax.to(mc_button.getElementsByTagName('svg')[0], 0.25, {fill: "#e1e1e1"});
},

handleClick:function (e)
{
	if(config.showIntroVid) video_intro.pause()
	ad.clickthrough()
},

}