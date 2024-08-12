var gameIsOut;
var smokeHappening = false;
var buttonMinWidth = 200, buttonMinHeight = 30;
var buttonFontSize;
var dateFontSize;
var blizzard = false;

var arabicDateWidth = 114

var useSmoke = true;

var AdBase = function(init)
{
    this.local = window.location.protocol === "file:" || window.location.hostname == "localhost";
    this.version = "0.0";
    this.init = init;

    this.clickthrough = function(name)
    {
        // if(typeof EB !== "undefined")
        // {
            // name ? EB.clickthrough(name) : EB.clickthrough();
        // }
       // else 
        if(typeof Enabler !== "undefined")
        {
        	if(weLocal || onov)
        	{
        		console.log("%c\nmyAd.clickthrough%c (local or on Oceanview)\n\nIf this ad was live, Enabler.exitOverride would be called.\n\n", 'text-decoration: underline; color: #344CFF;', 'text-decoration: none;');
        	}
        	else
        	{
				//Enabler.exitOverride(name ? name : 'default', BackgroundExit);
				Enabler.exit('default');
        	}
        }
    }
    this.getAsset = function(asset)
    {
        if(weLocal) return asset.local;
        if(onov)  return asset.ov;
       //if(typeof EB !== "undefined" && ovversion == false)
       //{
       //    if(typeof asset.eb === "number")
       //    {
       //        return EB.getAssetUrl('', asset.eb);
       //    }else{
       //        return asset.eb;
       //    }
       //}else 
       if(typeof Enabler !== "undefined")
        {
          return getAsset(asset.dc);
        }
    }
};

function Ad()
{
	AdBase.call(this, "init");
	this.width = 300;
	this.height = 600;
}

Ad.prototype = Object.create(AdBase.prototype);
Ad.prototype.constructor = Ad;

var ad = new Ad();

function startBanner() 
{
	loadScripts();
}

function loadScripts()
{
	loadJS(['fbf.js', 'config.js', 'mw.js'], loadSvgs);
}

function loadSvgs()
{
	fbf.loadSvgs(begin);
}

function begin()
{
	console.log(fbf.logDom(_root));
	gameIsOut = config.launchDate.getTime() <= Date.now()
	gameIsOut = false

	var keyline = addKeylineTo(root, ad.width, ad.height, '#ffffff', 1)

	root.display = true
	root.style.overflow = "hidden"
	root.addEventListener("click", mw.handleClick)
	root.buttonMode = true

	mc_button.addEventListener("mouseenter", mw.onButtonOver)
	mc_button.addEventListener("mouseleave", mw.onButtonOut)

	initialHide()

	// FONT SIZES
	buttonFontSize = 20
	dateFontSize = 20

	if(!gameIsOut) {
		mw.addDate([ad.width/2, 344]) 
	} else { // POST AD ADJUSTMENTS
		TweenMax.set(mc_logo, {y: '+=37'})
		TweenMax.set(mc_button, {y: '-=13'})
	}

	mw.createButton()
	mw.addSVGgradient(mc_artwork, {height: 350, opacity2: 0.75, position: "bottom"})
	mw.addSVGshadow(mc_logo)

	if(!config.ps4)
	{
		mc_ps4.display = false
		mc_ps4_exclusive.display = false
		blizzard = config.blizzard
	}

	setupLang()
	languageTweaks()
	TweenMax.delayedCall(0.5, animate)
}

function initialHide() {
	fbf.hide(mc_blizzard, mc_playstation_plus)
}

function setupLang()
{
	if(usePEGI.includes(config.lang)) fbf.setLang(mc_rating, 'uk')
	else fbf.setLang(mc_rating, config.lang)

	if(config.lang=='ksaar'||config.lang=='uaear') fbf.setLang(mc_ps4_exclusive, 'ksa')
	else fbf.setLang(mc_ps4_exclusive, config.lang)
}

function languageTweaks() {
	if(config.lang=="uaear") TweenMax.set(buttonText, {y: '+=3'})

	// DATE WERE 5px TOO FAR TO THE LEFT FOR ANYTHING BUT ARABIC...
	if(config.lang=="uaear"||config.lang=="ksaar") {

	} else {
		if(!gameIsOut) TweenMax.set(date, {x: '+=5'})
	}
}

function animate()
{
	TweenMax.to(mc_darth_fader,			1.5,	{alpha:0, delay:0.1, onComplete:fbf.displayNone, onCompleteParams:[mc_darth_fader]});

	TweenMax.from(mc_price, 			2, 		{scale: 3, rotation: 0.05, transformOrigin: "50% 30%"});
	TweenMax.from(mc_bg, 				2,		{scale: 2.5, rotation: 0.05, transformOrigin: "50% 30%"});

	TweenMax.from(mc_logo, 				2, 		{alpha: 0, scale: 3.5, rotation: 0.05, transformOrigin: "0% -50%"});

	TweenMax.from(mc_button,			0.5,	{alpha: 0, scale: 1.15, delay: 2.5, onStart:fbf.show, onStartParams:[mc_button]});
	TweenMax.from(mc_rating,			0.5,	{alpha: 0, delay: 3, onStart:fbf.show, onStartParams:[mc_rating]});

	if(config.lang=='es'){ TweenMax.from(mc_playstation_plus, 0.5, {alpha: 0, delay: 3, onStart:fbf.show, onStartParams:[mc_playstation_plus]}) }
	if(config.ps4){ TweenMax.from(mc_ps4_exclusive, 0.5, {alpha: 0, delay: 3}) }
	if(blizzard){ fbf.show(mc_blizzard); TweenMax.from(mc_blizzard, 0.5, {alpha: 0, delay: 3, onStart:fbf.show, onStartParams:[mc_rating]}) }
	if(!gameIsOut){ fbf.hide(date); TweenMax.delayedCall(2, mw.animateDate) }
	if(useSmoke){ mw.animateSmoke(); TweenMax.delayedCall(8, mw.stopSmoke) } else { fbf.hide(mc_smoke) }
}

var _root = $('root');
	var mc_artwork = $('mc_artwork');
		var mc_bg = $('mc_bg');
		var mc_price = $('mc_price');
		var mc_smoke = $('mc_smoke');
	var mc_logo = $('mc_logo');
	var mc_rating = $('mc_rating');
		var rating_german = $('rating_german');
		var rating_australian = $('rating_australian');
			var aus_ma_fifteen = $('aus_ma_fifteen');
		var rating_russian = $('rating_russian');
		var rating_southafrican = $('rating_southafrican');
		var rating_arabic = $('rating_arabic');
		var mc_rating_uae = $('mc_rating_uae');
		var rating_chinese = $('rating_chinese');
		var rating_english = $('rating_english');
	var mc_ps4_exclusive = $('mc_ps4_exclusive');
		var mc_ps4_exclusive_arabic = $('mc_ps4_exclusive_arabic');
		var mc_ps4_exclusive_spanish = $('mc_ps4_exclusive_spanish');
		var mc_ps4_exclusive_russian = $('mc_ps4_exclusive_russian');
		var mc_ps4_exclusive_polish = $('mc_ps4_exclusive_polish');
		var mc_ps4_exclusive_german = $('mc_ps4_exclusive_german');
		var mc_ps4_exclusive_italian = $('mc_ps4_exclusive_italian');
		var mc_ps4_exclusive_french = $('mc_ps4_exclusive_french');
		var mc_ps4_exclusive_english = $('mc_ps4_exclusive_english');
	var mc_playstation_plus = $('mc_playstation_plus');
		var mc_playstation_plus_background = $('mc_playstation_plus_background');
		var mc_playstation_plus_text = $('mc_playstation_plus_text');
			var plus_spanish = $('plus_spanish');
	var mc_blizzard = $('mc_blizzard');
		var mc_blizzard_logo = $('mc_blizzard_logo');
		var mc_blizzard_text = $('mc_blizzard_text');
	var mc_button = $('mc_button');
	var mc_ps4 = $('mc_ps4');
	var mc_darth_fader = $('mc_darth_fader');