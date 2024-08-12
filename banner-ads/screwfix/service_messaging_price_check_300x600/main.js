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
	height: 600
}

function startBanner() {
	loadSvgs();
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
	_root.style.backgroundColor = '#FFFFFF';
	// add keyline
	var keyline = addKeylineTo(_root, ad.width, ad.height, screwfix.colours.blue, 1);
	// add click listener
	_root.addEventListener("click", handleClick);
	_root.addEventListener("mouseenter", rollover);
	_root.addEventListener("mouseout", rollout);
	// hide sections
	hideSections();
	// create animation
	setupAnimation();
	// start ad
	startFlow();
}

function hideSections() {
	fbf.hide(banner_bg_shape, banner_price_checked, banner_endscreen_text);
}

/*$$$$$$\ $$\       $$$$$$\  $$\      $$\ 
$$  _____|$$ |     $$  __$$\ $$ | $\  $$ |
$$ |      $$ |     $$ /  $$ |$$ |$$$\ $$ |
$$$$$\    $$ |     $$ |  $$ |$$ $$ $$\$$ |
$$  __|   $$ |     $$ |  $$ |$$$$  _$$$$ |
$$ |      $$ |     $$ |  $$ |$$$  / \$$$ |
$$ |      $$$$$$$$\ $$$$$$  |$$  /   \$$ |
\__|      \________|\______/ \__/     \_*/

// start loop count at 0
var loopCounter = 0;
// how many times to loop animation
var loopAmount = 3;
// master animation timeline
var masterTl;

function startFlow() {
	masterTl.play();
}

var carousel, icons;

function setupAnimation() {
	banner_shield.style.zIndex = '0'
	// set the icons
	icons = banner_price_checked.children;
	icons = [].slice.call(icons);
	icons.splice(0, 1);
	// set up icon carousel animation
	carousel = initCarousel(banner_price_checked, false);
	// enable checkmark animation
	checkmark_section_1.style.overflow = 'hidden';
	checkmark_section_2.style.overflow = 'hidden';
	// we create a master timeline and pause it ready to play later
	// we attach other smaller timelines to this master timeline
	// to break down the animation into smaller, managable chunks
	masterTl = gsap.timeline({paused: true});
	masterTl.add( hideSections );
	masterTl.add( intro() );
	masterTl.add( end(), '> 1' );
}

function intro() {
	var text_1_background = banner_text.children[1];

	var tl = gsap.timeline();
	// set things in place
	tl.set([text_1, text_1_background], {y: '+=' + (text_1._height / 2)});
	// fade down the curtain
	tl.to(banner_curtain, {duration: 0.5, alpha: 0});
	// bring in text 1
	tl.from(textLines(text_1)[0], {x: '-=' + ad.width, ease: 'power1.out', duration: 0.25}, '>');
	tl.from(textLines(text_1)[1], {x: '+=' + ad.width, ease: 'power1.out', duration: 0.25}, '<');
	tl.from(textLines(text_1)[2], {x: '-=' + ad.width, ease: 'power1.out', duration: 0.25}, '<');
	// move text 1 up
	tl.to([text_1, text_1_background], {y: '-=' + (text_1._height / 2), ease: 'power2.inOut', duration: 0.25}, '> 1');
	// bring in text 2
	tl.from(text_2, {y: '-=' + (text_2._height / 1.5), ease: 'power2.inOut', duration: 0.25}, '<');
	return tl;
}

function end() {
	var tl = gsap.timeline();
	tl.add( function() { fbf.show(banner_price_checked) })
	// bring down the background shape
	tl.from(banner_bg_shape, {y: -ad.height, duration: 0.3, ease: 'power1.inOut', onStart: function() { fbf.show(banner_bg_shape) }});
	// bring in shield
	tl.from(banner_price_checked, {scale: 0, rotation: -100, alpha: 0, duration: 0.25, ease: 'expo.out'}, '> 0.2')
	// animate checkmark
	tl.from(checkmark_section_1, {duration: 0.1, ease: 'power1.inOut', height: 0}, '> 0.2');
	tl.from(checkmark_section_2, {duration: 0.15, ease: 'power1.inOut', height: 0}, '>');
	// makes the icons come from the center
	tl.from(icons, {alpha: 0, duration: 0.25}, '> 0.25');
	tl.to(carousel, {_radiusMultiplier: 1, duration: 0.25}, '<');
	tl.to(carousel, {value: -1, duration: 17, ease: 'power2.out', onStart: function() {
		// shake icons
		shakeIcons();
		// stop the icon shake later
		gsap.delayedCall(this._dur * 0.5, function() { allowShake = false });
	}}, '<');
	// bring in endscreen text
	tl.from(banner_endscreen_text, {scaleY: 0, transformOrigin: '50% 50%', duration: 0.35, ease: "back.out(1.7)", onStart: fbf.show, onStartParams: [banner_endscreen_text]}, '< 1')
	return tl;
}

function shakeIcons() {
	for (var i = 0; i < icons.length; i++) {
		gsap.set(icons[i], {rotation: 0.05, force3D: true});
		shake(icons[i]);
	}
}

var allowShake = true;

function shake(el) {
	if(allowShake) {
		gsap.to(el, {
			rotation: gsap.utils.random(-10, 10, 5),
			duration: 0.25,
			yoyo: true,
			repeat: 1,
			onComplete: shake,
			onCompleteParams: [el],
			ease: 'power1.inOut'
		});
	}
}

function textLines(textElement) {
	return textElement.getElementsByTagName('path');
}

function rollover(e) {
	
}

function rollout(e) {
	
}

function initCarousel(targetContainer, wrapAndOffset) {
	// var children = targetContainer.children;
	// convert nodelist to array
	// children = [].slice.call(children);
	// take the first child out of the spin
	// children.splice(0, 1);

	var children = icons;

	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		if(wrapAndOffset) {
			gsap.set(child, {x: child._width * -0.5, y: child._height * -0.5});
			var wrapper = div();
			wrapper.className = "do";
			wrapper.appendChild(child);
			children[i] = wrapper;
			targetContainer.appendChild(wrapper);
		}
	}

	var carousel = {
		container:targetContainer,
		children:children,
		_value:0,
		_radiusMultiplier:0,
		_radiusX:130,
		_radiusY:130
	};

	Object.defineProperty(carousel, "value", {get: function(){return this._value;}, set:function(val){this._value = val; this.update()}});
	carousel.update = function() {
		for (var i = 0; i < this.children.length; i++) {
			var child = this.children[i];			
			this.setItemFromAngle(child, this._value + (i/this.children.length));
		}
	}
	carousel.setItemFromAngle = function(item, angle) {
		var angleX = angle;
		var angleY = angle;

		var x = Math.sin(angleX * Math.PI * 2);
		var y = Math.cos(angleY * Math.PI * 2);

		//these are in the -1 to 1 range
		var radiusX = this._radiusX;
		// var minRadX = radiusX - 75;
		var minRadX = radiusX;
		// var maxRadX = radiusX + 50;
		var maxRadX = radiusX;
		var radiusY = this._radiusY;
		var ratio = (y + 1) * 0.5;
		radiusX = minRadX + (maxRadX - minRadX) * ratio;

		//these are in the -1 to 1 range
		var minScale = 1;
		var maxScale = 1;
		var scale = (y + 1) * 0.5;
		var scale = minScale + (maxScale - minScale) * scale;

		var setX = x * radiusX * this._radiusMultiplier;
		var setY = y * radiusY * this._radiusMultiplier;

		gsap.set(item, {x: setX, y: setY, scale: scale});

		// if(y < 0) child.style.display = 'none';
		// else child.style.display = 'block';

		if(y < 0) {
			item.style.zIndex = '-1';
		} else {
			item.style.zIndex = '1';
		}
	}

	carousel.update();
	return carousel;
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