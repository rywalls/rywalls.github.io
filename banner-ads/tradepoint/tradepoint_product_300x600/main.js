var onov = (window.location.href.indexOf("http://ocean") == 0 || window.location.href.indexOf("https://ocean") == 0);
var weLocal = window.location.protocol === "file:" || window.location.hostname == "localhost";

var keyline

var ad = {
	width: 300,
	height: 600
}

function startBanner() {
	// loadSvgs();
	setupAd();
}

function loadSvgs() {
	fbf.loadSvgs(setupAd);
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
	fbf.clean(_root);
	fbf.replaceSVGDefs();
	fbf.displayBlock(_root);
	_root.buttonMode = true;
	_root.style.cssText += "overflow:hidden;";
	// banner background colour
	_root.style.backgroundColor = '#FADC00';
	// add keyline
	keyline = addKeylineTo(_root, ad.width, ad.height, '#000000', 1);
	// add listeners
	addListeners();
	// hide sections
	hideSections();
	// start ad
	startFlow();
}

function addListeners() {
	_root.addEventListener("click", handleClick);
	_root.addEventListener("click", showEndscreen);
	_root.addEventListener("mouseenter", rollover);
	_root.addEventListener("mouseleave", rollout);
}

function hideSections() {
	fbf.hide(banner_frame1, banner_frame2, banner_frame3, banner_frame4, banner_frame5);
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
	animate();
}

var masterTl;
var buttonBackground, buttonText;
var allowButtonRollover = false;

function animate() {
	buttonBackground = banner_button.getElementsByTagName('path')[0]
	buttonText = banner_button.getElementsByTagName('path')[1]
	// master timeline
	masterTl = gsap.timeline({onComplete: function() { allowButtonRollover = true }});
	masterTl.add( function() { showFrame(banner_frame1) } );	
	masterTl.to(banner_curtain, {alpha: 0});
	masterTl.add( frame1(), '<' );
	masterTl.add( frame2(), '< 3' );
	masterTl.add( frame4(), '< 5' );
	masterTl.add( frame3(), '< 3' );
	masterTl.add( frame5(), '< 4' );
	// masterTl.add( end(), '>' );
}

function showFrame(frame) {
	fbf.show(frame);
}

function frame1() {
	// hand and coins
	var tl = gsap.timeline({});
	// hand image
	tl.from(banner_text_1, {alpha: 0, ease: 'power1.out', duration: 0.5}, '< 0.25')
	// tl.from(banner_football, {x: '-=' + 325, rotation: -250, transformOrigin: '50% 50%', y: '-=' + 300, ease: 'power1.in', duration: 0.65}, '> 0.25')
	// tl.to(banner_football, {x: '+=' + 300, rotation: 250, transformOrigin: '50% 50%', y: '-=' + 270, ease: 'power1.out', duration: 0.65}, '>')
	tl.to(banner_text_1, {y: '+=' + 4, ease: 'power1.out', duration: 0.05, yoyo: true, repeat: 1}, '<')

	return tl;
}

function frame2() {
	var tl = gsap.timeline({});
	tl.add( function() { showFrame(banner_frame2) } );
	tl.to(banner_frame1, {alpha: 0, duration: 0.25}, '<')
	tl.from(banner_hand, {x: '-=' + ad.width, ease: 'expo.inOut', duration: 0.6}, '<')
	tl.from(getPaths(banner_text_2)[0], {x: '+=' + ad.width, ease: 'back.out(1.1)', duration: 0.35}, '< 0.5')
	tl.from(getPaths(banner_text_2)[1], {x: '+=' + ad.width, ease: 'back.out(1.1)', duration: 0.35}, '< 0.05')
	tl.from(getPaths(banner_text_2)[2], {x: '+=' + ad.width, ease: 'back.out(1.1)', duration: 0.35}, '< 0.05')
	tl.to(banner_hand.children[0], {rotation: 4, transformOrigin: '100% 100%', ease: 'expo.out', duration: 0.4}, '> -0.5')
	tl.to(banner_hand.children[0], {rotation: 0, transformOrigin: '100% 100%', ease: 'expo.in', duration: 0.4}, '> -0.1')
	tl.to(banner_hand.children[0], {rotation: -2, transformOrigin: '0% 100%', ease: 'expo.out', duration: 0.25}, '>')
	tl.to(banner_hand.children[0], {rotation: 0, transformOrigin: '0% 100%', ease: 'expo.in', duration: 0.25}, '> -0.1')
	tl.to(getPaths(banner_text_2)[0], {x: '-=' + ad.width, ease: 'back.inOut(1.1)', duration: 0.35}, '> 1')
	tl.to(getPaths(banner_text_2)[1], {x: '-=' + ad.width, ease: 'back.inOut(1.1)', duration: 0.35}, '< 0.05')
	tl.to(getPaths(banner_text_2)[2], {x: '-=' + ad.width, ease: 'back.inOut(1.1)', duration: 0.35}, '< 0.05')
	tl.from(getPaths(banner_text_2)[3], {x: '+=' + ad.width, ease: 'back.inOut(1.1)', duration: 0.35}, '< 0.05')
	tl.from(getPaths(banner_text_2)[4], {x: '+=' + ad.width, ease: 'back.inOut(1.1)', duration: 0.35}, '< 0.05')

	return tl;
}

function frame3() {
	var tl = gsap.timeline({});
	tl.add( function() { showFrame(banner_frame3) } );
	tl.to(banner_frame4, {alpha: 0, duration: 0.25}, '<')
	tl.from(banner_badge, {scale: 0, transformOrigin: '50% 100%', ease: 'back.out(4)', duration: 0.6}, '< 0.2')
	tl.from(banner_badge, {rotationY: 180, transformOrigin: '50% 50%', ease: 'back.out(1)', duration: 0.6}, '< 0.1')
	tl.from(getPaths(banner_text_3), {x: '+=' + ad.width, ease: 'back.out(1.1)', stagger: 0.05, duration: 0.35}, '< 0.25')	

	// tl.to(banner_badge, {scale: 1.2, transformOrigin: '50% 100%', ease: 'back.inOut(1.5)', yoyo: true, repeat: 1, duration: 0.4}, '> 0.75')

	return tl;
}

function frame4() {
	var tl = gsap.timeline({});
	tl.add( function() { showFrame(banner_frame4) } );
	tl.to(banner_frame2, {alpha: 0, duration: 0.25}, '<')
	// tl.to(banner_badge, {scale: 0, transformOrigin: '50% 100%', ease: 'back.in(1.5)', duration: 0.25})
	tl.from(banner_hand_2, {x: '+=' + ad.width, y: '-=100', rotation: 25, transformOrigin: '100% 100%', ease: 'expo.inOut', duration: 0.6}, '<')
	// tl.to(banner_text_3, {alpha: 0, ease: 'power1.out', duration: 0.2}, '<')	
	tl.from(getPaths(banner_text_4), {x: '+=' + ad.width, ease: 'back.out(1.1)', stagger: 0.05, duration: 0.35}, '< 0.2')

	return tl;
}

function frame5() {
	var tl = gsap.timeline({});
	tl.add( function() { showFrame(banner_frame5) } );
	tl.to(banner_frame3, {alpha: 0, duration: 0.25}, '<')
	tl.from(banner_card_end, {x: '-=' + ad.width, y: '+=200', rotation: '+=40', transformOrigin: '0% 50%', ease: 'expo.inOut', duration: 0.6}, '<')
	tl.from(getPaths(banner_text_5), {x: '+=' + ad.width, ease: 'back.out(1.1)', stagger: 0.05, duration: 0.35}, '> 0.2')
	
	return tl;
}

function end() {
	var tl = gsap.timeline();
	return tl;
}

function getPaths(el) {
	return el.getElementsByTagName('path');
}

function showEndscreen(e) {
	masterTl.progress(1);
}

function rollover(e) {
	// if(allowButtonRollover && masterTl.progress() >= 1) {		
		gsap.set(buttonBackground, {fill: '#FFFFFF'});
		gsap.set(buttonText, {fill: '#000000'});
	// }
}

function rollout(e) {
	// if(allowButtonRollover) {
		gsap.set(buttonBackground, {fill: '#000000'});
		gsap.set(buttonText, {fill: '#FFFFFF'});
	// }	
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