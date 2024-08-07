var onov = (window.location.href.indexOf("http://ocean") == 0 || window.location.href.indexOf("https://ocean") == 0);
var weLocal = window.location.protocol === "file:" || window.location.hostname == "localhost";

/* CONTROLLING VARS */

var WID = 160, HEI = 600;

var use_canvas_effect = false,
	
	bring_in_elements = 1,

	use_tagline = true;

/* TRANSLATIONS */

var translations =
[
	/* 0 */
	{
		territory: "uk",
		// BUTTON
		buttonText: "BUY NOW",
		buttonFontSize: 17,
		buttonLetterSpacing: 1,
		// LOCKUP
		consoleText: ["AVAILABLE","NOW"],
		consoleTextFontSize: 24,
		lockupLetterSpacing: 1,
		consoleTextPaddingTop: 0,
		// TAGLINE
		taglineText: ["DRAGONS","ARE","UNLEASHED"],
		taglineFontSize: 24,
		taglineLetterSpacing: 1
	},
]

var territory = translations[0];

var keyline, onMobile, button_animating = false;

function startBanner(){ loadESO(); }
function loadESO(){ loadJS('ESO.js', loadSvgs); }
function loadSvgs(){ fbf.loadSvgs(onSVGload, "svg.gz.js"); }
function onSVGload(){ eso.defaultsetup(); setup(); }

function setup()
{
	initialHide();

	eso.setListeners();
	eso.setupRating(territory.territory);
	eso.setupButton(mc_button, {text: territory.buttonText, fontSize: territory.buttonFontSize, letterSpacing: territory.buttonLetterSpacing});
	eso.dynamicText(mc_platform_lockup_console_text, {text: territory.consoleText, fontSize: territory.consoleTextFontSize, letterSpacing: territory.lockupLetterSpacing, align: "center", paddingTop: territory.consoleTextPaddingTop, lineHeight: 25});

	if(use_tagline) eso.setupTagline(_root, {text: territory.taglineText, align: "center", fontSize: territory.taglineFontSize, letterSpacing: territory.taglineLetterSpacing, x: WID*0.5, y: 475});

	if(use_canvas_effect) eso.setupCanvasEffect();
	else startFlow();

	eso.createSVGgradient(mc_artwork, {height: 175, offsetStop2: "90%", position: "bottom"});
}

function initialHide()
{
	fbf.hide(mc_rating.children, mc_elsweyr_logo, mc_platform_lockup, mc_button, mc_throb);
	
	if(use_canvas_effect) fbf.hide(mc_background);
}

/*$$$$$$\ $$\       $$$$$$\  $$\      $$\ 
$$  _____|$$ |     $$  __$$\ $$ | $\  $$ |
$$ |      $$ |     $$ /  $$ |$$ |$$$\ $$ |
$$$$$\    $$ |     $$ |  $$ |$$ $$ $$\$$ |
$$  __|   $$ |     $$ |  $$ |$$$$  _$$$$ |
$$ |      $$ |     $$ |  $$ |$$$  / \$$$ |
$$ |      $$$$$$$$\ $$$$$$  |$$  /   \$$ |
\__|      \________|\______/ \__/     \_*/

function startFlow()
{
	fbf.show(mc_elsweyr_logo);
	TweenMax.from(mc_elsweyr_logo, .9, {rotation: 0.01, scale: .7, alpha: 0, delay: 0, ease: Power1.easeInOut});

	animateArtwork();
	TweenMax.delayedCall(bring_in_elements, animateContent);
}

function animateContent()
{
	if(use_tagline)
	{
		eso.animateTagline({speed: 0.3, delayBetween: 0.6, delay: 0.25, pauseOnLast: 0.5});
	}
	else
	{
		animateElements();	
	}	
}

function animateElements()
{
	fbf.show(mc_platform_lockup, mc_button);

	// LOGO
	//TweenMax.from(mc_elsweyr_logo, 0.5, {alpha: 0, delay: 0, ease: Power1.easeInOut});
	// BUTTON
	TweenMax.from(mc_button, 0.5, {alpha: 0, delay: 0.25, ease: Power1.easeInOut, onComplete: eso.animateButton});		
	// LOCKUP
	TweenMax.from(mc_platform_lockup, 0.5, {alpha: 0, delay: 0.25, ease: Power1.easeInOut});

}


function animateArtwork()
{
	// CURTAIN
	TweenMax.to(mc_curtain, 1.5, {alpha: 0, ease: Power2.easeOut});

	if(use_canvas_effect)
	{
		var foregroundCanvas = document.getElementById('foregroundCanvas');
		var midgroundCanvas = document.getElementById('midgroundCanvas');
		var backgroundCanvas = document.getElementById('backgroundCanvas');

	  	TweenMax.set(midgroundCanvas,{rotation:0.01, scale: 1});

		TweenMax.from(foregroundCanvas, 2.75, {rotation:0.01, scale: 1.4, transformOrigin: "60% 70%", ease: Power1.easeOut});
		TweenMax.to(midgroundCanvas, 3, {rotation:0.01, scale: 1.1, transformOrigin: "50% 38%", ease: Power1.easeOut});

		/*TweenMax.from(foregroundCanvas, 3.25, {scale: 1.6, transformOrigin: "60% 70%", ease: Power1.easeOut});
		TweenMax.from(midgroundCanvas, 3.25, {scale: 1.25, transformOrigin: "50% 38%", ease: Power1.easeOut});
		TweenMax.from(backgroundCanvas, 3.25, {scale: 1.1, transformOrigin: "50% 40%", ease: Power1.easeOut});*/
	}
	else
	{
		//TweenMax.from(mc_artwork, 2, {scale: 1.15, transformOrigin: "50% 50%", ease: Power1.easeOut});
		//TweenMax.from(mc_landscape, 2, {rotation:0.01,scale: 1.15, transformOrigin: "50% 50%", ease: Power1.easeOut});
		throbbers();
		TweenMax.from(mc_dude, 2.75, {rotation:0.01, scale: 1.4, transformOrigin: "70% 10%", ease: Power1.easeOut});
	    // TweenMax.from(mc_dragon, 3, {rotation:0.01, scale: .8, transformOrigin: "20% 20%", ease: Power1.easeOut});
	    TweenMax.to(mc_dragon, 3, {rotation:0.01, scale: 1.1, transformOrigin: "20% 20%", ease: Power1.easeOut});
	}
}


function throbbers()
{
	fbf.show(mc_throb);
	// TweenMax.from(mc_dragon, 3, {rotation:0.01, scale: 0.95, transformOrigin: "0% 25%", ease: Power1.easeOut});
	TweenMax.from(mc_throb, 3, {alpha:0});
	//mc_throb
}

var _root = $('root');
	var mc_artwork = $('mc_artwork');
		var mc_background = $('mc_background');
		var mc_artwork_tolerance_map = $('mc_artwork_tolerance_map');
	var mc_footer = $('mc_footer');
		var mc_rating = $('mc_rating');
			var mc_rating_pegi = $('mc_rating_pegi');
		var mc_copyright = $('mc_copyright');
	var mc_platform_lockup = $('mc_platform_lockup');
		var mc_platform_lockup_console_text = $('mc_platform_lockup_console_text');
		var mc_platform_logos_console = $('mc_platform_logos_console');
			var mc_xbox = $('mc_xbox');
			var mc_ps4 = $('mc_ps4');
	var mc_button = $('mc_button');
		var mc_button_background = $('mc_button_background');
		var mc_button_text = $('mc_button_text');
	var mc_elsweyr_logo = $('mc_elsweyr_logo');
	var mc_curtain = $('mc_curtain');
	var mc_throb = $('mc_throb');