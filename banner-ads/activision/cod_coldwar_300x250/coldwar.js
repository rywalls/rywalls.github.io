var initLogoScale,
	initLogoY,
	vidreplayInitScale,
	ButtonSizeInfo,
	widthOfWebTextParent = []

var gradIndex = 0

var webFontUses = ['uaear', 'ksaar', 'ru', 'tch', 'hk']

var fontArray = [
	{ regularFont: "DessauProZukunftRegular_GFX" },
	{ blackFont:   "ArialBlackGFX" },
	{ arabicFont:  "MyriadArabicGFX"}
]

var svgNS = "http://www.w3.org/2000/svg"

var strapCounter = 0
var straplineWidPark = 0

var buttonAnimating = true

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)

function isIE() {
	ua = navigator.userAgent;
	/* MSIE used to detect old browsers and Trident used to detect newer ones*/
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1

	if(is_ie) {
		console.log("You're using Internet Explorer")
	}

	return is_ie
}

// IE includes fix
if (!Array.prototype.includes) {
	console.log('fix Array.prototype.includes')
	Object.defineProperty(Array.prototype, "includes", {
		enumerable: false,
		value: function(obj) {
		    var newArr = this.filter(function(el) {
		      return el == obj;
		    });
		    return newArr.length > 0;
		}
	});
}

var coldwar = {

	emergencyOverride:function() {

	},
	
	generalSetup:function() {
		// set pre or post
		if(forcePost != true) {
			beforeRelease = Date.now() <= config.launchDate.getTime()
		} else {
			beforeRelease = false
		}
		
		// check if logo exists, then set scale
		if (typeof banner_cod_logo !== 'undefined') {
			initLogoScale = banner_cod_logo._scaleX
		}
	},

	configure:function() {
		// check if rating exists
		if (typeof banner_cod_logo !== 'undefined') {
			logoToUse = 'logo_' + config.logo
		}
		// check if rating exists
		if (typeof banner_rating !== 'undefined') {
			if(config.rating != '') fbf.show($('rating_' + config.rating))
		}
		// check if rating exists
		if (typeof banner_cod_logo !== 'undefined') {
			fbf.show($('logo_' + config.logo))
		}
		// check if sony branding exists
		if (typeof sony_tag !== 'undefined') {
			fbf.show($('sony_tag_' + config.sony))
		}
		// check if blizzard branding exists
		if (typeof blizzard_text !== 'undefined') {
			fbf.show($('blizzard_text_' + config.blizzard))
		}
	},

	setupLogo:function() {
		console.log(logoToUse)
		var logo = $(logoToUse).children[0]
		logo.id = 'logo_main'

		var logo2 = logo.cloneNode(true)
		logo2.id = 'logo_duplicate_1'

		var logo3 = logo.cloneNode(true)
		logo3.id = 'logo_duplicate_2'

		var logo4 = logo.cloneNode(true)
		logo4.id = 'logo_duplicate_3'

		$(logoToUse).appendChild(logo2)
		$(logoToUse).appendChild(logo3)
		$(logoToUse).appendChild(logo4)

		gsap.set(logo2, {x: '-=3'})
		gsap.set(logo3, {x: '+=2'})
		gsap.set(logo4, {x: '+=3', y: '-=2'})

		fbf.hide(logo2, logo3, logo4)
	},

	createButton:function(fontSize, text) {
		banner_button.innerHTML = ''

		var useWebFont = webFontUses.includes(config.lang)

		var colour = '#FFFFFF', font, letterSpacing

		lineHeight = 0

		if (typeof buttonLineHeight !== 'undefined') {
			lineHeight = buttonLineHeight
		}
		
		if(!useWebFont) {		
			buttonTF = TextField(fontArray[0]["regularFont"], text, fontSize, 0, lineHeight, "center", colour)
		} else {
			tfFont = "Arial, Helvetica, tahoma, verdana, 宋体, SimSun, 华文细黑, STXihei, sans-serif"

			var buttonTF = document.createElement('div')
				buttonTF.id = 'date'
				buttonTF.className = 'do'
				buttonTF.classList.add('do')
				buttonTF.style.fontFamily = tfFont
				if(config.lang == 'ru') buttonTF.style.fontWeight = 'normal'
				else buttonTF.style.fontWeight = 'bold'
				buttonTF.style.fontSize = fontSize + 'px'
				buttonTF.style.color = '#FFFFFF'
				buttonTF.innerHTML = text
				// tf.style.width = arabicDateWidth+'px'
				// tf.style.height = arabicDateWidth/3+'px'

				banner_button.style.width = ad.width + 'px'
				if(config.lang == 'uaear' || config.lang == 'ksaar') buttonTF.style.direction = 'rtl'
				buttonTF.style.textAlign = 'center'
				buttonTF.style.transform = 'translate(-50%, -50%)'
		}

		buttonTF.id = 'button_text'
		// add text to button
		banner_button.appendChild(buttonTF)

		if(!useWebFont) {
			var textHeight = buttonTF._height
			var textWidth = buttonTF._width

			var lineCount = buttonTF.getElementsByTagName('g').length
	
			// we want to get the height of 1 line of text, not all
			var textHeight1line = textHeight / lineCount
	
			var bgWidth = Math.round(textWidth + (textHeight1line * 1.4))
			var bgHeight = Math.round(textHeight + (textHeight1line * 0.7))
		} else {
			var textWidth = buttonTF.getBoundingClientRect().width
			var textHeight = buttonTF.getBoundingClientRect().height

			var bgWidth = Math.round(textWidth + 25)
			var bgHeight = Math.round(textHeight + 10)
		}

		// create background
		var buttonBackground = document.createElement('div')
		buttonBackground.id = "button_background"
		buttonBackground.className = "do"
		buttonBackground.setAttribute("class", "do")
		buttonBackground.style.background = "#000000"
		buttonBackground.style.width = bgWidth + "px"
		buttonBackground.style.height = bgHeight + "px"

		var barHeight = Math.round(bgHeight / 14)
		if(barHeight > 2) barHeight = 2

		// add top bar
		var topBar = document.createElement('div')
		topBar.id = "button_bar_top"
		topBar.className = "do"
		topBar.setAttribute("class", "do")
		topBar.style.background = "#000000"
		topBar.style.width = bgWidth + "px"
		topBar.style.height = barHeight + "px"

		// add bottom bar
		var bottomBar = document.createElement('div')
		bottomBar.id = "button_bar_bottom"
		bottomBar.className = "do"
		bottomBar.setAttribute("class", "do")
		bottomBar.style.background = "#000000"
		bottomBar.style.width = bgWidth + "px"
		bottomBar.style.height = barHeight + "px"

		// add background to button
		banner_button.insertBefore(buttonBackground, buttonTF)
		banner_button.appendChild(topBar)
		banner_button.appendChild(bottomBar)

		if(!useWebFont) {
			gsap.set(buttonTF, {x: '-=' + textWidth / 2, y: '-=' + textHeight / 2})
		}

		gsap.set(buttonBackground, {x: '-=' + bgWidth / 2, y: '-=' + bgHeight / 2})
		gsap.set(topBar, {x: '-=' + bgWidth / 2, y: '-=' + Math.round((bgHeight / 2) + 1 + barHeight)})
		gsap.set(bottomBar, {x: '-=' + bgWidth / 2, y: '+=' + Math.round((bgHeight / 2) + 1)})
	},

	createDate:function(fontSize) {
		banner_date.innerHTML = ''

		var useWebFont = webFontUses.includes(config.lang)

		if (typeof dateText !== 'undefined') {
			var text = dateText
		} else {
			var text = (beforeRelease ? config.date : '')
		}
		
		var colour = '#FFFFFF', font

		var dateTF

		var lineHeight = -8

		if (typeof dateLineHeight !== 'undefined') {
			lineHeight = dateLineHeight
		}

		if(!useWebFont) {		
			dateTF = TextField(fontArray[1]["blackFont"], text, fontSize, 0, lineHeight, "center", dateColour)
		} else {
			tfFont = "Arial, Helvetica, tahoma, verdana, 宋体, SimSun, 华文细黑, STXihei, sans-serif"

			var dateTF = document.createElement('div')
				dateTF.id = 'date'
				dateTF.className = 'do'
				dateTF.classList.add('do')
				dateTF.style.fontFamily = tfFont
				dateTF.style.fontWeight = 'bold'
				if(config.lang == 'tch') dateTF.style.fontWeight = 900
				dateTF.style.fontSize = fontSize + 'px'
				dateTF.style.color = dateColour
				dateTF.innerHTML = text

				banner_date.style.width = ad.width + 'px'
				if(config.lang == 'uaear' || config.lang == 'ksaar') dateTF.style.direction = 'rtl'
				dateTF.style.textAlign = 'center'
				dateTF.style.transform = 'translate(-50%, -100%)'
		}
		 
		dateTF.id = 'date_text'
		banner_date.appendChild(dateTF)

		if(ad.width == 300 && ad.height == 600 || ad.width == 300 && ad.height == 1050 || ad.width == 120 && ad.height == 600 || ad.width == 320 && ad.height == 480) {
			banner_date.style.filter = 'drop-shadow(-2px -2px 4px rgba(0, 0, 0, 1))'
			banner_date.style.webkitFilter = 'drop-shadow(-2px -2px 4px rgba(0, 0, 0, 1))'
		}

		if(!useWebFont) {
			var textHeight = dateTF._height
			var textWidth = dateTF._width

			gsap.set(dateTF, {x: '-=' + textWidth / 2, y: '-=' + textHeight})
		}
 	},

	animateLogo:function() {
		var logoDuplicates = [$('logo_duplicate_1'), $('logo_duplicate_2'), $('logo_duplicate_3')]

		fbf.show(banner_cod_logo, logoDuplicates)
		
		var logoTimeline = gsap.timeline()
		logoTimeline.set(logoDuplicates, {alpha: 0})
		logoTimeline.from(banner_cod_logo, {alpha: 0, rotation: 0.1, scale: initLogoScale - 0.2,transformOrigin: '0% 50%', ease: "power4.out", duration: 2})
		// logoTimeline.from(logo_section_2, {alpha: 0, x: '-=30', ease: "power2.in", duration: 0.75}, '< 0.5')
		// logoTimeline.from(logo_section_3, {alpha: 0, x: '+=30', ease: "power2.in", duration: 0.75}, '<')

		logoTimeline.set($('logo_duplicate_1'), {alpha: 1}, '0.75')
		// logoTimeline.set($('logo_main'), {alpha: 0}, '<')

		logoTimeline.set($('logo_duplicate_2'), {alpha: 1}, '< 0.05')
		logoTimeline.set([$('logo_duplicate_1'), $('logo_main')], {alpha: 0}, '<')

		logoTimeline.set($('logo_duplicate_3'), {alpha: 1}, '< 0.02')
		logoTimeline.set($('logo_duplicate_2'), {alpha: 0}, '<')

		logoTimeline.set($('logo_main'), {alpha: 1}, '< 0.02')
		logoTimeline.set($('logo_duplicate_3'), {alpha: 0}, '<')
	},

	animateButton:function() {
		fbf.show(banner_button)
		var buttonTimeline = gsap.timeline()
		buttonTimeline.from('#button_bar_top', {scaleX: 0, backgroundColor: '#FFFFFF', ease: 'Power1.inOut', duration: 0.4}, '<')
		buttonTimeline.from('#button_bar_bottom', {scaleX: 0, backgroundColor: '#FFFFFF', transformOrigin: '100% 0%', ease: 'Power1.inOut', duration: 0.4}, '<')
		buttonTimeline.from('#button_background', {scaleX: 0, transformOrigin: '50% 0%', ease: 'Power1.inOut', duration: 0.25}, '< 0.25')
		buttonTimeline.from('#button_text', {alpha: 0, ease: 'Power1.inOut', duration: 0.5},'< 0.25')
		buttonTimeline.add( function() { buttonAnimating = false } )
	},

	buttonRollover:function(event) {
		if(!buttonAnimating) {
			buttonAnimating = true
			var buttonTimeline = gsap.timeline()
			buttonTimeline.fromTo('#button_bar_top', {scaleX: 1, backgroundColor: '#000000'}, {scaleX: 0, backgroundColor: '#FFFFFF', transformOrigin: '100% 0%', ease: 'Power1.in', duration: 0.4}, '<')
			buttonTimeline.fromTo('#button_bar_bottom', {scaleX: 1, backgroundColor: '#000000'}, {scaleX: 0, backgroundColor: '#FFFFFF', transformOrigin: '0% 0%', ease: 'Power1.in', duration: 0.4}, '<')
			buttonTimeline.fromTo('#button_bar_top', {scaleX: 0, backgroundColor: '#FFFFFF'}, {scaleX: 1, backgroundColor: '#000000', transformOrigin: '0% 0%', ease: 'Power1.out', duration: 0.4}, '>')
			buttonTimeline.fromTo('#button_bar_bottom', {scaleX: 0, backgroundColor: '#FFFFFF'}, {scaleX: 1, backgroundColor: '#000000', transformOrigin: '100% 0%', ease: 'Power1.out', duration: 0.4}, '<')
			buttonTimeline.add( function() { buttonAnimating = false } )
		}

	},

	animateDate:function() {
		fbf.show(banner_date)
		var buttonTimeline = gsap.timeline()
		buttonTimeline.from('#date_text', {alpha: 0, ease: 'Power1.inOut', duration: 0.5},'< 0.25')
	},

	flipbook:function(callback) {
		if(currentFrame < (frameCount - 1)) {
			// request another frame
			requestAnimationFrame(coldwar.flipbook)

			// calc elapsed time since last loop
			now = Date.now()
			elapsed = now - then	    

			// if enough time has elapsed, draw the next frame
			if (elapsed > fpsInterval) {
				// Get ready for next frame by setting then=now, but also adjust for your
				// specified fpsInterval not being a multiple of RAF's interval (16.7ms)
				then = now - (elapsed % fpsInterval)
				// Put your drawing code here
				currentFrame++
				fbf.show(banner_intro_sequence.children[currentFrame])
			}
		} else {
			// reset the video
			fbf.hide(banner_intro_sequence.children)
			currentFrame = 0
			mainAnimationTL.play()
		}
	}
}