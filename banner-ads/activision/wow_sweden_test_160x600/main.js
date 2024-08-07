var onov = (window.location.href.indexOf("http://ocean") == 0 || window.location.href.indexOf("https://ocean") == 0);
var weLocal = window.location.protocol === "file:" || window.location.hostname == "localhost";
var keyline;

var usingIE = typeof window.document.documentMode !== 'undefined';

var ad = {width: 160, height: 600}

var gradIndex = 0;

var fontArray = [{boldFont: "QuadratSerialGFX"}]

var textStore = [
	{
		txt: 'Just like\nreal life\nexcept with\nnight elves\nand\ndragons.',
		size: 28,
		lineheight: 4,
		letterspacing: -1, 
		gradient: true,
		stroke: 0.7
	},
	{
		txt: 'Be a project\nmanager\nby day,\na death\nknight\nby night.',
		size: 26,
		lineheight: 9,
		letterspacing: -1, 
		gradient: true,
		stroke: 0.7
	},
	{
		txt: 'Try the\nnext big\ngame,\n18 years\nlater.',
		size: 34,
		lineheight: 9,
		letterspacing: -1, 
		gradient: true,
		stroke: 0.8
	},
	{
		txt: "Don't watch\nadventures.\nLive them.",
		size: 27,
		lineheight: 9,
		letterspacing: -1, 
		gradient: true,
		stroke: 0.7
	},
]

var textToUse = 1;

function startBanner() {
	loadScripts();
}

function loadScripts() {
	loadJS(['smoke.js'], setup);
}

var smokeCanvas;
var party;
var allowRollover = false;

function setup() {
	root.display = true;
	root.style.overflow = "hidden";
	root.addEventListener("click", handleClick);
	root.buttonMode = true;
	document.body.style.backgroundColor = '#000000';
	
	keyline = addKeylineTo(root, ad.width, ad.height, '#e3a853', 1);
	
	setupText();
	fbf.replaceSVGDefs();
	
	if( !usingIE ) applySVGTransforms();

	addStroke(mc_text.children[0].children[0], textStore[textToUse].stroke);

	divider_line.style.left = '50%';
	divider_line.style.transform = 'translateX(-50%)';
	divider_line.innerHTML = '';
	divider_line.style.backgroundColor = '#67b2d9';
	divider_line.style.background = 'linear-gradient(90deg, rgba(0,71,113,1) 0%, rgba(73,138,171,1) 25%, rgba(122,210,255,1) 50%, rgba(73,138,171,1) 75%, rgba(0,71,113,1) 100%)';
	mc_divider.style.overflow = 'hidden';

	mc_text.style.filter = "drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.25))";

	
	root.addEventListener('mouseover', rollover);
	root.addEventListener('mouseleave', rollout);
	
	setupSmoke();
	stopWobble();
	animate();
}

function stopWobble() {
    gsap.set(root, {rotation:0.015, force3D:true});
}

function setupSmoke() {
	smokeCanvas = document.createElement('canvas');
	smokeCanvas.classList.add('do');
	smokeCanvas.id = ('smoke-canvas');
	smokeCanvas.width = ad.width;
	smokeCanvas.height = ad.height;
	smokeCanvas.setAttribute('width', ad.width);
	smokeCanvas.setAttribute('height', ad.height);
	smokeCanvas.style.width = ad.width + 'px';
	smokeCanvas.style.height = ad.height + 'px';
	root.insertBefore(smokeCanvas, mc_background.nextSibling);

	var ctx = smokeCanvas.getContext('2d');
	party = smokemachine(ctx, [0, 0, 0])
}

function startSmoke() {
	party.start();
	allowSmoke = true;
	requestAnimationFrame(animateSmoke);
}

var allowSmoke = false;
var lastSmoke = Date.now();

function animateSmoke(now) {
	var now = Date.now();
	var timeElapsed = now - lastSmoke;

	if(allowSmoke) {
		if(!lastSmoke || now - lastSmoke >= 1 * 100) {
			lastSmoke = now;
			party.addsmoke(gsap.utils.random(0, ad.width, 1), ad.height, 1);
		}

		requestAnimationFrame(animateSmoke);
	}
}

function stopSmoke() {
	allowSmoke = false;
}

var tl;

function animate() {
	tl = gsap.timeline({onComplete: stopSmoke})
	.set(mc_button.children[1], {alpha: 0})
	.call(startSmoke)
	.to(mc_fader, {alpha: 0, ease: 'power1.out', duration: 0.5})
	.from(mc_background, {x: -ad.width, scale: 1.4, transformOrigin: '50% 50%', rotation: 0.01, skewX: 0.01, ease: 'power1.out', duration: 10}, '<')
	.from(mc_text, {alpha: 0, y: '+=20', ease: 'power1.out', duration: 0.75}, '< 0.5')
	.from(divider_line, {width: 0, ease: 'power1.out', duration: 0.75}, '< 0.1')
	.from(mc_logo, {alpha: 0, rotation: 0.01, scale: 0.95, transformOrigin: '50% 50%', ease: 'power1.out', duration: 0.75}, '> 0.5')
	.from(mc_tagline, {alpha: 0, scale: 1.1, transformOrigin: '50% 50%', ease: 'power1.out', duration: 0.75}, '<')
	.from(mc_tagline.children[1], {x: '+=10', ease: 'power1.out', duration: 2}, '<')
	.from(mc_tagline.children[2], {x: '-=10', ease: 'power1.out', duration: 2}, '<')
	.from(mc_button, {alpha: 0, y: '+=40', transformOrigin: '50% 50%', ease: 'back.out(1.75)', duration: 1, onComplete: function() { allowRollover = true }}, '< 0.5')
}

function rollover(e) {
	if(allowRollover) {
		gsap.to(mc_button, {
			scale: 1.03,
			transformOrigin: '50% 50%',
			ease: 'power1.out',
			duration: 0.1
		})
		gsap.to(mc_button.children[1], {
			alpha: 1,
			ease: 'none',
			duration: 0.1
		})
	}
}

function rollout(e) {
	if(allowRollover) {
		gsap.to(mc_button, {
			scale: 1,
			transformOrigin: '50% 50%',
			ease: 'power1.out',
			duration: 0.1
		})
		gsap.to(mc_button.children[1], {
			alpha: 0,
			ease: 'none',
			duration: 0.1
		})
	}
}

/*$$$$$\$$\     $$\ $$\   $$\       $$$$$$$$\ $$\   $$\$$$$$$$$\
$$  __$$\$$\   $$  |$$$\  $$ |      \__$$  __|$$ |  $$ \__$$  __|
$$ |  $$ \$$\ $$  / $$$$\ $$ |         $$ |   \$$\ $$  |  $$ |
$$ |  $$ |\$$$$  /  $$ $$\$$ |         $$ |    \$$$$  /   $$ |
$$ |  $$ | \$$  /   $$ \$$$$ |         $$ |    $$  $$<    $$ |
$$ |  $$ |  $$ |    $$ |\$$$ |         $$ |   $$  /\$$\   $$ |
$$$$$$$  |  $$ |    $$ | \$$ |         $$ |   $$ /  $$ |  $$ |
\_______/   \__|    \__|  \__|         \__|   \__|  \__|  \_*/

// var accolades;

function applySVGTransforms(){
	var test = /(-?\d+\.?\d*\s-?\d+\.?\d*)/g;
	var accolade = accolades[0];
	var svg = accolade._('svg');
	var gs = svg.__("g");

	var lineX = 0;
	var lineY = 0;

	for (var i = 0; i < gs.length; i++) {
		var g = gs[i];
		var transform = g.getAttribute('transform');
		var values = transform ? transform.replace('matrix(', '').replace(')', '').split(',') : null;
		if(!g.id){
			// we are a line
			lineX = values ? parseFloat(values[4]) : 0;
			lineY = values ? parseFloat(values[5]) : 0;
			g.removeAttribute('transform');
			continue;
		}
		var scale = parseFloat(values[0]);
		var dx = parseFloat(values[4]);
		var dy = parseFloat(values[5]);
		g.removeAttribute('transform');

		var path = g._('path');
		if(!path) continue;
		var d = path.getAttribute('d');

		var result = null;
		var result = d.replace(test, function(match, group) {
			var xy = group.split(" ");
			var x = parseFloat(xy[0]);
			var y = parseFloat(xy[1]);
			x *= scale;
			y *= scale;
			x += dx + lineX;
			y += dy + lineY;
			return x + ' ' + y;
		  });
		path.setAttribute('d', result);
	}
}

function setupText() {
	sortoutAccolades(textStore[textToUse], mc_text);
}

function sortoutAccolades(textInfo,divID) {
	accolades = [];
	divID.innerHTML = "";
		//so we need to get the text, render it in a div , centralise it, and such
		// for (var i = 0; i < textInfo.length; i++) {
			var accoladeBox = document.createElement("DIV");
			accoladeBox.id = "accolade_"+i;
			divID.appendChild(accoladeBox);

			var tfText = textInfo["txt"];
			var letterSpacing = textInfo["letterspacing"];
			var lineHeight = textInfo["lineheight"];
			var tfFontSize = textInfo["size"];
			var tfStrokeWidth = textInfo["stroke"];

			var accolade = TextField(fontArray[0]["boldFont"], tfText, tfFontSize, letterSpacing, lineHeight, "center", "#f1cb5f");
			accolades.push(accolade);
			$(accoladeBox.id).appendChild(accolade);						
		// }

		for (var i = 0; i < divID.children.length; i++) {
			gsap.set(divID.children[i].children[0], {x: '-='+(divID.children[i].children[0]._width*0.5), y: '-='+(divID.children[i].children[0]._height*0.5)});

			// getTheStrokeOn(divID.children[i].children[0], tfStrokeWidth);
		    if(!usingIE) addGradientToText(divID.children[i].children[0]);		
		}
}

function addStroke(divID, strokeWidth) {
	var chars = divID.getElementsByTagName('path');

	for (var i = chars.length - 1; i >= 0; i--) {
		chars[i].style.strokeWidth = strokeWidth;
		chars[i].style.stroke = "#754813";
	}
}

function createGradient(svg,id,stops) {
	var svgNS = svg.namespaceURI;
	var grad  = document.createElementNS(svgNS, 'linearGradient');
	grad.setAttribute('id', id);
	grad.setAttribute('x1',"0%");
	grad.setAttribute('y1',"0%");
	grad.setAttribute('x2',"100%");
	grad.setAttribute('y2',"0%");
	grad.setAttribute('gradientUnits', "userSpaceOnUse");
	for (var i=0;i<stops.length;i++){
		var attrs = stops[i];
		var stop = document.createElementNS(svgNS,'stop');
		for (var attr in attrs){
			if (attrs.hasOwnProperty(attr)) stop.setAttribute(attr,attrs[attr]);
		}
		grad.appendChild(stop);
	}
	var defs = svg.querySelector('defs') ||	svg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild);
	defs.appendChild(grad)
	return grad;
}

function addGradientToText(txt) {
	var lines = txt.__("svg");
	for (var i = 0; i < lines.length; i++) {
		createGradient(
			lines[i],
			'MyGradient'+(gradIndex++),
			[
				{offset:'0%', 'stop-color':'#e0ad4f'},
				{offset:'25%', 'stop-color':'#f4d766'},
				{offset:'50%', 'stop-color':'#f7e7a4'},
				{offset:'75%', 'stop-color':'#f4d766'},
				{offset:'100%','stop-color':'#e0ad4f'}
			]
		);
		lines[i].setAttribute("fill", 'url('+location.href.split('#')[0]+'#MyGradient' + i + ')');
	}
}