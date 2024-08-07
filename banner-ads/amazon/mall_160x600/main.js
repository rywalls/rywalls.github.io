var onov = (window.location.href.indexOf("http://ocean") == 0 || window.location.href.indexOf("https://ocean") == 0);
var weLocal = window.location.protocol === "file:" || window.location.hostname == "localhost";

var keyline

var amazon = {
	colours: {
		SquidInkBlue:  '#232F3E',
		CarrotOrange:  '#F56600',
		AlpineGrey:    '#EAEAEA' 
	}
}

var ad = {
	width: 160,
	height: 600
}

function startBanner() {
	setupAd();
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
	_root.style.backgroundColor = '#FFFFFF';
	// add keyline
	keyline = addKeylineTo(_root, ad.width, ad.height, '#BCBEC0', 1);
	// add listeners
	addListeners();
	// hide sections
	hideSections();
	// edit assets
	editAssets();
	// start ad
	startFlow();
}

function addListeners() {
	_root.addEventListener("click", handleClick);
	_root.addEventListener("mouseenter", rollover);
	_root.addEventListener("mouseleave", rollout);
}

function hideSections() {
	fbf.hide();
}

function editAssets() {
	// hacky way to remove black line around image
	Route1.children[0].style.width = (Route1._width - 1) + 'px';
	Route1.children[0].style.height = (Route1._height - 1) + 'px';
	Route_01_Locker.style.imageRendering = '-webkit-optimize-contrast'; // fixes blur in chrome
	
	gsap.set(banner_intro, {y: "-=50"});
	gsap.set(banner_logo,  {scale: 2, transformOrigin: "50% 50%"});
	gsap.set(banner_scene, {scale: 1.2, transformOrigin: "50% 50%", y: "-=30"});
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
var animationDefaults = {duration: 0.5};
var allowButtonRollover = false;

function animate() {
	buttonBackground = banner_button.getElementsByTagName('path')[0]
	buttonText = banner_button.getElementsByTagName('path')[1]

	gsap.set(banner_scene, {rotation: 0.05}); // stops pixel snapping in firefox

	// master timeline
	masterTl = gsap.timeline({onComplete: function() { allowButtonRollover = true }});
	masterTl.add( intro() );
	masterTl.add( middle(), '< 2.25');
	masterTl.add( end(), '>' );
}

function intro() {
	var tl = gsap.timeline({defaults: animationDefaults});
	tl.add( hideSections );
	tl.add( function() { fbf.show() });
	tl.fromTo(banner_curtain, {alpha: 1}, {alpha: 0, duration: 1}, '<');
	// Intro messaging animates in and Smile Logo
	tl.from(banner_intro, {alpha: 0, ease: 'power4.out', duration: 0.5}, '< 0.25');
	tl.from(banner_logo, {y:"+=30", alpha: 0, ease: 'power4.out', duration: 0.5}, '<');
	// Scene moves in and background begins to appear
	tl.from(banner_scene, {x: "-=150", transformOrigin: '50% 50%', ease: 'power1.inOut', duration: 1}, '< 1.25');
    tl.to(banner_intro, {x: "+=150", alpha:0, ease: 'power1.inOut', duration: 1, onComplete: displayBackground}, '<');
    // Scene scaling down
    tl.to(banner_scene, {scale: 1, y: "+=30", force3D:true, transformOrigin: '50% 50%', ease: 'power1.inOut', duration: 6}, '< 1');

	return tl;
}

function middle() {
	var tl = gsap.timeline({defaults: animationDefaults});
	tl.add( function() { fbf.hide() });
	// Main messaging animates in and Logo goes to original place
	tl.to(banner_logo,      {scale: 1, transformOrigin: '50% 50%', ease: 'expo.out', duration: 0.75}, '<');
	tl.from(getPaths(banner_messaging), {scale: 0, transformOrigin: '50% 50%', alpha: 0, ease: 'back.out(1.2)', stagger: 0.15, duration: 0.75}, '< 0.15');

	return tl;
}

function end() {
	var tl = gsap.timeline({defaults: animationDefaults});
	tl.add( function() { fbf.show() });
    // button animats in
    tl.from(banner_button,  {y:"+=30", alpha: 0, ease: 'back.out(1.2)', duration: 1}, '<');

	return tl;
}

function getPaths(el) {
	return el.getElementsByTagName('path');
}

var buttonAnimating = false;
function rollover(e) {
	if(allowButtonRollover && masterTl.progress() >= 1) {
		// button bounce
		if(!buttonAnimating) {
			buttonAnimating = true;
			// button up
			gsap.to(banner_button, {ease: "back.out(1.7)", transformOrigin: '50% 50%', scale: 1.1, duration: 0.25});
			// button down
			gsap.to(banner_button, {ease: "back.out(1.7)", transformOrigin: '50% 50%', scale: 1, duration: 0.25, delay: 0.25, onComplete: function() { buttonAnimating = false }});		
		}

		// scene animation
		var blocks = [Block_01, Block_02, Block_03];
		// kill any other tweens
		gsap.killTweensOf(banner_scene);
		gsap.killTweensOf(blocks);
		// scale scene up
		gsap.to(banner_scene, {scale: 1.25, x: 30, y: -25, transformOrigin: '50% 50%', ease: 'expo.out', duration: 0.5});
		// fade blocks up
		gsap.to(blocks, {alpha: 1, ease: 'expo.out', duration: 0.5});
	}
}

function rollout(e) {
	if(allowButtonRollover && masterTl.progress() >= 1) {
		// scene animation
		var blocks = [Block_01, Block_02, Block_03];
		// kill any other tweens
		gsap.killTweensOf(banner_scene);
		gsap.killTweensOf(blocks);
		// scale scene up
		gsap.to(banner_scene, {scale: 1, x: 0, y: 0, transformOrigin: '50% 50%', ease: 'expo.out', duration: 1});
		// fade blocks up
		gsap.to(blocks, {alpha: 0, ease: 'expo.out', duration: 1});
	}
}

function displayBackground() {
	var tl = gsap.timeline({defaults: animationDefaults});
	// illstration background appears
	tl.to(Block_01,         {alpha: 0, ease: 'power1.out', duration: 2}, '<');
    tl.to(Block_03,         {alpha: 0, ease: 'power1.out', duration: 2}, '< 0.25');
    tl.to(Block_02,         {alpha: 0, ease: 'power1.out', duration: 2}, '< 0.25');
    // tl.to(Block_04,         {alpha: 0, ease: 'power1.out', duration: 2}, '< 1');
    //tl.to(Block_05,         {alpha: 0, ease: 'power1.out', duration: 2}, '< 1');
    //tl.to(Block_06,         {alpha: 0, ease: 'power1.out', duration: 2}, '< 1');
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