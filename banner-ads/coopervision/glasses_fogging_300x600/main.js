var onov = (window.location.href.indexOf("http://ocean") == 0 || window.location.href.indexOf("https://ocean") == 0);
var weLocal = window.location.protocol === "file:" || window.location.hostname == "localhost";

var ad = {
	width: 300,
	height: 600
}

function startBanner() {
	loadSvgs()
}

function loadSvgs() {
	fbf.loadSvgs(setupAd)
}

// required for dynamic svg stuff
var ns = "http://www.w3.org/2000/svg";

/*$$$$$\  $$$$$$$$\ $$$$$$$$\ $$\   $$\ $$$$$$$\
$$  __$$\ $$  _____|\__$$  __|$$ |  $$ |$$  __$$\
$$ /  \__|$$ |         $$ |   $$ |  $$ |$$ |  $$ |
\$$$$$$\  $$$$$\       $$ |   $$ |  $$ |$$$$$$$  |
 \____$$\ $$  __|      $$ |   $$ |  $$ |$$  ____/
$$\   $$ |$$ |         $$ |   $$ |  $$ |$$ |
\$$$$$$  |$$$$$$$$\    $$ |   \$$$$$$  |$$ |
 \______/ \________|   \__|    \______/ \_*/

function setupAd() {
	logging = fbf.isLocal()
	console.log(fbf.logDom(_root))
	fbf.clean(_root)
	fbf.replaceSVGDefs()
	fbf.displayBlock(_root)
	_root.buttonMode = true
	_root.style.cssText += "overflow:hidden;"
	stopIEWobble(window.navigator.userAgent)

	_root.style.backgroundColor = '#00B9D2'
	// keyline = addKeylineTo(_root, ad.width, ad.height, '#636466', 1)
	keyline = addKeylineTo(_root, ad.width, ad.height, '#BFBFBF', 1)

	// add blur filter to headline
	// ready to animate later on
	addBlur(banner_text.children[2])

	setup()
}

function stopIEWobble(typeOfBrowser) {
	var ua = typeOfBrowser

	if (ua.indexOf('MSIE ')  >=  0 || ua.indexOf('Trident/') >= 0 || ua.indexOf('Edge/') >= 0) {
	    _root.style.cssText +="-webkit-transform:rotateZ(0.00001deg);-moz-transform:rotateZ(0.00001deg);-ms-transform:rotateZ(0.00001deg);-o-transform:rotateZ(0.00001deg);transform:rotateZ(0.00001deg);"
	}
}

function setup() {
	// banner click
	_root.addEventListener("click", handleClick)
	// banner hover
	_root.addEventListener("mouseover", bannerRollover)
	_root.addEventListener("mouseleave", bannerRollout)

	hideSections()
	startFlow()
}

function hideSections() {
	fbf.hide(banner_image.children, banner_text)
}

/*$$$$$$\ $$\       $$$$$$\  $$\      $$\ 
$$  _____|$$ |     $$  __$$\ $$ | $\  $$ |
$$ |      $$ |     $$ /  $$ |$$ |$$$\ $$ |
$$$$$\    $$ |     $$ |  $$ |$$ $$ $$\$$ |
$$  __|   $$ |     $$ |  $$ |$$$$  _$$$$ |
$$ |      $$ |     $$ |  $$ |$$$  / \$$$ |
$$ |      $$$$$$$$\ $$$$$$  |$$  /   \$$ |
\__|      \________|\______/ \__/     \_*/

function startFlow() {
	animate()
}

function animate() {
	fbf.show(banner_image.children, banner_text)

	var timeline = gsap.timeline({repeat: 1, repeatDelay: 5})
	// animation started, so disable interactivity
	timeline.add( function(){ animationFinished = false } )
	// fade down curtain	
	timeline.to(banner_curtain, {duration: 1.25, alpha: 0, ease: "power2.out"})
	// scale down image
	timeline.from(banner_image, {duration: 1, scale: 1.5, transformOrigin: '50% 50%', ease: "power2.out"}, '<')
	// fade up fog
	timeline.from(banner_image.children[1], {duration: 1, alpha: 0, ease: "power2.inOut", onStart: fbf.show, onStartParams: [banner_image.children[1]]}, '<1.25')
	// animate in headline
	timeline.from(banner_text.children[2], {duration: 0.5, alpha: 0, ease: "power2.out"}, '>0.5')
	// animate headline blur
	timeline.to(blur, {duration: 0.2, attr: {stdDeviation: 2}}, '>1')
	// animate in text line 1
	timeline.from(banner_text.children[1], {duration: 1, alpha: 0, ease: "power2.out"}, '>1')
	// animate glasses
	timeline.to([banner_image.children[1], banner_image.children[2]], {duration: 0.75, alpha: 0, ease: "power2.out"}, '<')
	// animate contacts
	timeline.from(banner_contacts, {duration: 0.75, x: '+=250', ease: "power3.out"}, '<')
	// animate in text line 2
	timeline.from(banner_text.children[0], {duration: 1, alpha: 0, ease: "power2.out"}, '>1')
	// animate headline blur
	timeline.to(blur, {duration: 0.25, attr: {stdDeviation: 0}}, '>0.5')
	// animation finished, so enable interactivity
	timeline.add( function(){ animationFinished = true } )
}

var blur

function addBlur(element) {
	var svgElements = element.getElementsByTagName('svg')

	for (var i = svgElements.length - 1; i >= 0; i--) {
		// create filter element
		var filter = document.createElementNS(ns, "filter")
		filter.setAttribute("id", "f2")
		// create blur element
		blur = document.createElementNS(ns, "feGaussianBlur")
		blur.setAttribute("stdDeviation", "0")
		blur.setAttribute("result", "blur")
		// add blur to filter
		filter.appendChild(blur)
		// add filter to svg element
		svgElements[i].appendChild(filter)
		// assign filter to svg contents
		svgElements[i].getElementsByTagName('g')[0].setAttribute('filter', 'url(#f2)')
	}
}

var animationFinished = false

function bannerRollover(e) {
	if(animationFinished) {
		// animate headline blur
		gsap.to(blur, {duration: 0.2, attr: {stdDeviation: 2}})
	}
}

function bannerRollout(e) {
	if(animationFinished) {
		// animate headline blur
		gsap.to(blur, {duration: 0.25, attr: {stdDeviation: 0}})
	}
}

/*$$$$$\   $$$$$$\  $$\      $$\ 
$$  __$$\ $$  __$$\ $$$\    $$$ |
$$ |  $$ |$$ /  $$ |$$$$\  $$$$ |
$$ |  $$ |$$ |  $$ |$$\$$\$$ $$ |
$$ |  $$ |$$ |  $$ |$$ \$$$  $$ |
$$ |  $$ |$$ |  $$ |$$ |\$  /$$ |
$$$$$$$  | $$$$$$  |$$ | \_/ $$ |
\_______/  \______/ \__|     \_*/

var _root = $('root');