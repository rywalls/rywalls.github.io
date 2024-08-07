var onov = (window.location.href.indexOf("http://ocean") == 0 || window.location.href.indexOf("https://ocean") == 0);
var weLocal = window.location.protocol === "file:" || window.location.hostname == "localhost";

/* CONTROLLING VARS */

var WID = 300, HEI = 600;

var use_canvas_effect = true,
	
	bring_in_elements = 1,

	stop_hand_magic = 10,

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
		consoleText: "AVAILABLE NOW",
		consoleTextFontSize: 24,
		lockupLetterSpacing: 1,
		consoleTextPaddingTop: 0,
		// TAGLINE
		taglineText: ["DRAGONS","ARE","UNLEASHED"],
		taglineFontSize: 40,
		taglineLetterSpacing: 1
	},
]

var territory = translations[0];

var keyline, onMobile, smokeInterval, smoke_count = 0, button_showing = false, button_animating = false, hand_magic_first_run = true, animate_hand_magic = true;

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
	eso.dynamicText(mc_platform_lockup_console_text, {text: territory.consoleText, fontSize: territory.consoleTextFontSize, letterSpacing: territory.lockupLetterSpacing, align: "center", paddingTop: territory.consoleTextPaddingTop});
	eso.setupHandMagic();

	if(use_tagline) eso.setupTagline(_root, {text: territory.taglineText, align: "center", fontSize: territory.taglineFontSize, letterSpacing: territory.taglineLetterSpacing, x: WID*0.5, y: 475});

	if(use_canvas_effect) eso.setupCanvasEffect();
	else startFlow();

	//eso.createSVGgradient(mc_artwork, {height: 175, offsetStop2: "90%", position: "bottom"});
}

function initialHide()
{
	fbf.hide(mc_rating.children, mc_elsweyr_logo, mc_platform_lockup, mc_button);
	
	//if(use_canvas_effect) fbf.hide(mc_background);
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
	TweenMax.from(mc_elsweyr_logo, 0.75, {rotation: 0.01, scale: 1.1, alpha: 0, delay: 0, ease: Power1.easeInOut});

	animateArtwork();
	TweenMax.delayedCall(bring_in_elements, animateContent);
}

function animateContent()
{
	TweenMax.delayedCall(stop_hand_magic, eso.stopHandMagic);

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

	// BUTTON
	TweenMax.from(mc_button, 0.5, {alpha: 0, delay: 0.25, ease: Power1.easeInOut, onComplete: buttonShowing});		
	// LOCKUP
	TweenMax.from(mc_platform_lockup, 0.5, {alpha: 0, delay: 0.25, ease: Power1.easeInOut});
}

function buttonShowing()
{
	eso.animateButton();
	button_showing = true;
}

function animateArtwork()
{
	// CURTAIN
	TweenMax.to(mc_curtain, 1.5, {alpha: 0, ease: Power2.easeOut});

	if(use_canvas_effect)
	{
		var backgroundCanvas = document.getElementById('backgroundCanvas');
		TweenMax.set(backgroundCanvas, {alpha: 0});

		TweenMax.to(backgroundCanvas, 1.5, {alpha: 0.35, yoyo: true, repeat: 20, ease: RoughEase.ease.config({ template:  Power0.easeNone, strength: 0.75, points: 10, taper: "none", randomize: true, clamp: false})});
		TweenMax.from(backgroundCanvas, 3, {rotation: 0.01, scale: 1.1, transformOrigin: "50% 50%", ease: Power1.easeOut});

		TweenMax.from(mc_foreground_elements, 3, {rotation: 0.01, scale: 1.2, ease: Power1.easeOut});
		TweenMax.from(mc_background, 3, {rotation: 0.01, scale: 1.1, transformOrigin: "50% 50%", ease: Power1.easeOut});
	}
	else
	{
		TweenMax.from(mc_foreground, 3, {rotation: 0.01, scale: 1.3, transformOrigin: "50% 50%", ease: Power1.easeOut});
		TweenMax.from(mc_background, 3, {rotation: 0.01, scale: 1.1, transformOrigin: "50% 50%", ease: Power1.easeOut});
	}
}

var _root = $('root');
	var mc_artwork = $('mc_artwork');
		var mc_background = $('mc_background');
		var mc_foreground_elements = $('mc_foreground_elements');
			var mc_foreground = $('mc_foreground');
			var mc_hand_magic = $('mc_hand_magic');
				var mc_hand_magic_right = $('mc_hand_magic_right');
				var mc_hand_magic_left = $('mc_hand_magic_left');
	var mc_footer = $('mc_footer');
		var mc_rating = $('mc_rating');
			var mc_rating_pegi = $('mc_rating_pegi');
		var mc_copyright = $('mc_copyright');
	var mc_platform_lockup = $('mc_platform_lockup');
		var mc_platform_logos_console = $('mc_platform_logos_console');
			var mc_steam = $('mc_steam');
			var mc_xbox = $('mc_xbox');
			var mc_ps4 = $('mc_ps4');
		var mc_platform_lockup_console_text = $('mc_platform_lockup_console_text');
	var mc_button = $('mc_button');
		var mc_smoke_effect = $('mc_smoke_effect');
			var mc_smoke = $('mc_smoke');
		var mc_button_background = $('mc_button_background');
		var mc_button_text = $('mc_button_text');
	var mc_elsweyr_logo = $('mc_elsweyr_logo');
	var mc_curtain = $('mc_curtain');