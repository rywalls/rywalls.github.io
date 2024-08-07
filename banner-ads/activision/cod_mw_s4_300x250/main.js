var onov = (window.location.href.indexOf("http://ocean") == 0 || window.location.href.indexOf("https://ocean") == 0)
var weLocal = window.location.protocol === "file:" || window.location.hostname == "localhost"

var ad = {
	width: 300,
	height: 250
}

function startBanner() {
	loadSvgs()
}

function loadSvgs() {
	fbf.loadSvgs(setupAd)
}

function setupAd() {

	var pngSprites = document.getElementsByTagName("img")[0].complete
	var jpegSprites = document.getElementsByTagName("img")[1].complete

	console.log('png: ', pngSprites)
	console.log('jpeg: ', jpegSprites)

	logging = fbf.isLocal();
	fbf.clean(_root)
	fbf.replaceSVGDefs()
	fbf.displayBlock(_root)
	_root.buttonMode = true
	_root.style.cssText += "overflow:hidden;"
	stopIEWobble(window.navigator.userAgent)

	_root.style.backgroundColor = '#000000'
	addKeylineTo(_root, ad.width, ad.height, '#FFFFFF', 1)

	_root.addEventListener("click", handleClick)
	_root.addEventListener("mouseenter",ctaRollover)
	_root.addEventListener("mouseleave",ctaRollout)

	// duplicate foreground smoke
	// var smokeDuplicate = mc_foreground.children[0].cloneNode(true)
	// smokeDuplicate.id = 'foregroundSmoke2'
	// mc_foreground.appendChild(smokeDuplicate)

	//addSVGgradient(mc_foreground)

	hideSections()
	startFlow()
}

function stopIEWobble(typeOfBrowser) {
	var ua = typeOfBrowser
	if (ua.indexOf('MSIE ')  >=  0 || ua.indexOf('Trident/') >= 0 || ua.indexOf('Edge/') >= 0) {
	    _root.style.cssText +="-webkit-transform:rotateZ(0.00001deg);-moz-transform:rotateZ(0.00001deg);-ms-transform:rotateZ(0.00001deg);-o-transform:rotateZ(0.00001deg);transform:rotateZ(0.00001deg);"
	}
}

// function handleClick(event) {
// 	event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true; 
// 	var target = event.target || event.srcElement;
// 	var phase = event.eventPhase;

// 	Enabler.exit('default')
// }

function ctaRollover() {
	gsap.to(mc_button.children[1], {
		duration: 0.1,
		alpha: 0
	})
}

function ctaRollout() {
	gsap.to(mc_button.children[1], {
		duration: 0.1,
		alpha: 1
	})
}

function hideSections() {
	fbf.hide()
}

function startFlow() {
	gsap.delayedCall(0.75, animate)
}

function animate() {

	// fade down curtain
	gsap.to(mc_curtain, {duration: 1.25, alpha: 0})
	// create timeline for the animation
	var animationTimeline = gsap.timeline({defaults: {duration: 2, ease: 'power4.out'}})
	// background
	animationTimeline.from(mc_background, {scale: 1.25, transformOrigin: '50% 40%'})
	// foreground
	// animationTimeline.to(mc_foreground.children[0], {duration: 8, x: -100, ease: "power1.out"}, '<')
	// animationTimeline.from(mc_foreground.children[1], {duration: 8, x: -100, ease: "power1.out"}, '<')
	// animationTimeline.to(mc_foreground, {duration: 8, alpha: 0, ease: "power1.out"}, '<')
	// planes
	animationTimeline.from(mc_planes, {duration: 2.5, x: '-=30', y: '+=10'}, '<')
	animationTimeline.from(mc_character_price, {scale: 3, transformOrigin: '50% 30%'}, '<')
	animationTimeline.from(mc_character_gaz, {scale: 2, transformOrigin: '30% 20%'}, '<')
	animationTimeline.from(mc_character_roze, {scale: 2, transformOrigin: '70% 20%'}, '<')
	// cod logos
	animationTimeline.from(mc_cod_logos, {duration: 3, alpha: 0, ease: "power2.out"}, '<0.25')
	// season logo
	animationTimeline.from(mc_season_logo, {duration: 3, alpha: 0, scale: 0.925, transformOrigin: '50% 50%', ease: "power2.out", rotation:0.01}, '<')
	// bring in character flares
	animationTimeline.to(mc_character_roze.children[1], {duration: 0.8, alpha: 0}, '<0.5')
	animationTimeline.to(mc_character_price.children[1], {duration: 0.8, alpha: 0}, '<0.2')
	// button
	animationTimeline.from(mc_button, {alpha: 0, ease: "power2.out"}, ">-0.25")
}

function addSVGgradient(div) {
	// create svg stuff
	var svgns = "http://www.w3.org/2000/svg"
	var svg = document.createElementNS (svgns, "svg")
	var defs = document.createElementNS(svgns, 'defs')
	var gradient = document.createElementNS(svgns, 'linearGradient')
	var rect = document.createElementNS(svgns, 'rect')
	// settings
	var width = ad.width
	var height = 100
	// create div
	var svg_container_div = document.createElement('div')
		svg_container_div.id = div.id+"_svgGradientContainer"
		svg_container_div.setAttribute("class", "do")
		svg_container_div.className = "do"
		svg_container_div.style.width = ad.width + "px"
		svg_container_div.style.height = height + "px"

	var stops =	[{
		    "color": '#000000',
		    "offset": '0%',
		    "opacity": 0
		}, {
		    "color": '#000000',
		    "offset": '100%',
		    "opacity": 0.5
	}]

	for (var i = 0, length = stops.length; i < length; i++) {
		var stop = document.createElementNS(svgns, 'stop')
			stop.setAttribute('offset', stops[i].offset)
			stop.setAttribute('stop-color', stops[i].color)
			stop.setAttribute('stop-opacity', stops[i].opacity)
		gradient.appendChild(stop)
	}

	gradient.id = 'Gradient'

	gradient.setAttribute('x1', '0')
	gradient.setAttribute('x2', '0')

	gradient.setAttribute('y1', '0')
	gradient.setAttribute('y2', '1')

	defs.appendChild(gradient)
	rect.setAttributeNS(null, 'fill', 'url(#Gradient)')
	rect.setAttributeNS(null, 'width', '100%')
	rect.setAttributeNS(null, 'height', '100%')
	svg.setAttributeNS(null, 'id','svg_gradient')
	svg.setAttributeNS(null, 'width', ad.width)
	svg.setAttributeNS(null, 'height', height)
	svg.appendChild(defs)
	svg.appendChild(rect)
	svg_container_div.appendChild(svg)
	div.appendChild(svg_container_div)

	gsap.set(svg_container_div, {
		y: ad.height - height
	})
}

var _root = $('root');