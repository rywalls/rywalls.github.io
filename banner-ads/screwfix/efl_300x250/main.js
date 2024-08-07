var onov = (window.location.href.indexOf("http://ocean") == 0 || window.location.href.indexOf("https://ocean") == 0);
var weLocal = window.location.protocol === "file:" || window.location.hostname == "localhost";

var screwfix = {
	colours: {
		blue:  '#0053A0',
		red:   '#EC1d25'
	}
}

var ad = {
	width: 300,
	height: 250
}

var ad_variation = 'white'
//var ad_variation = 'blue'

function startBanner() {
	loadSvgs()
}

function loadSvgs() {
	fbf.loadSvgs(setupAd)
}

/*$$$$$\  $$$$$$$$\ $$$$$$$$\ $$\   $$\ $$$$$$$\
$$  __$$\ $$  _____|\__$$  __|$$ |  $$ |$$  __$$\
$$ /  \__|$$ |         $$ |   $$ |  $$ |$$ |  $$ |
\$$$$$$\  $$$$$\       $$ |   $$ |  $$ |$$$$$$$  |
 \____$$\ $$  __|      $$ |   $$ |  $$ |$$  ____/
$$\   $$ |$$ |         $$ |   $$ |  $$ |$$ |
\$$$$$$  |$$$$$$$$\    $$ |   \$$$$$$  |$$ |
 \______/ \________|   \__|    \______/ \_*/

function setupAd() {
	fbf.clean(_root)
	fbf.replaceSVGDefs()
	fbf.displayBlock(_root)
	_root.buttonMode = true
	_root.style.cssText += "overflow:hidden;"
	_root.style.backgroundColor = '#FFFFFF'
	// add keyline
	var keyline = addKeylineTo(_root, ad.width, ad.height, screwfix.colours.blue, 1)
	// add click listener
	_root.addEventListener("click", handleClick)
	_root.addEventListener("mouseenter", rollover)
	_root.addEventListener("mouseout", rollout)
	// hide sections
	hideSections()
	// start ad
	startFlow()
}

function hideSections() {
	fbf.hide(banner_headline.children, banner_screwfix_logo.children, banner_caption)
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
	// setup variation
	if(ad_variation == 'white') {
		gsap.set(headline_1.getElementsByTagName('path'), {fill: screwfix.colours.red})
		gsap.set(banner_caption.getElementsByTagName('path'), {fill: screwfix.colours.blue})
	} else {
		// banner background colour
		_root.style.backgroundColor = screwfix.colours.blue
		gsap.set(banner_bottom_bar.getElementsByTagName('path'), {fill: screwfix.colours.blue})		
	}

	animate()
}

function animate() {
	var logo_y = banner_screwfix_logo._y
	var text_y = banner_headline._y

	var introTimeline = gsap.timeline({delay: 0.5})
	// bring down curtain
	introTimeline.to(banner_curtain, {alpha: 0, ease: 'power2.out', duration: 0.75, onStart: function() {
		timeline.play()
	}})

	var timeline = gsap.timeline({repeat: 1, repeatDelay: 5, paused: true})
	timeline.add( function(){ fbf.hide(headline_1) } )
	// set stuff in position
	timeline.set(banner_screwfix_logo, {y: 72})
	timeline.set(banner_headline, {y: 92})
	// bring in large image
	timeline.from(banner_large_image, {scale: 1.2, transformOrigin: '50% 50%', duration: 5, ease: 'power2.out'}, '<')
	// screwfix logo and headline
	timeline.from(screwfix_logo_white, {alpha: 0, ease: 'power2.out', onStart: fbf.show, onStartParams: [screwfix_logo_white], duration: 0.75}, '< 0.25')
	timeline.from(headline_2, {alpha: 0, ease: 'power2.out', onStart: fbf.show, onStartParams: [headline_2], duration: 0.75}, '<')
	// hide large image
	timeline.to(banner_large_image, {alpha: 0, duration: 0.5, ease: 'power2.out'}, '> 2')
	// move logo and text into place
	timeline.to(banner_screwfix_logo, {y: logo_y, ease: 'power2.inOut', duration: 0.4}, '<')
	timeline.to(banner_headline, {y: text_y, ease: 'power2.inOut', duration: 0.4}, '<')

	if(ad_variation == 'white') {
		// turn logo to colour
		timeline.from(screwfix_logo_colour, {alpha: 0, duration: 0.5, onStart: fbf.show, onStartParams: [screwfix_logo_colour]}, '<')
		timeline.to(screwfix_logo_white, {alpha: 0, duration: 0.5}, '<')
		// turn headline red
		timeline.to(headline_2.getElementsByTagName('path'), {fill: screwfix.colours.red}, '<')
	}

	// fade in images
	timeline.from(banner_images.children, {alpha: 0, stagger: 0.2, ease: 'power3.out', duration: 1}, '< 0.2')
	// change headline
	timeline.to(headline_2, {x: '-=' + 150, ease: 'power2.inOut', duration: 0.5}, '> 0.5')
	timeline.from(headline_1, {x: '+=' + 150, ease: 'power2.inOut', onStart: fbf.show, onStartParams: [headline_1], duration: 0.5}, '<')
	// 
	timeline.from(banner_caption, {alpha: 0, ease: 'power2.out', onStart: fbf.show, onStartParams: [banner_caption], duration: 0.75}, '>')
}

function rollover(e) {
	//gsap.to(banner_cta.getElementsByTagName('path'), {fill: screwfix.colours.red, duration: 0.1})
}

function rollout(e) {
	//gsap.to(banner_cta.getElementsByTagName('path'), {fill: screwfix.colours.blue, duration: 0.1})	
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