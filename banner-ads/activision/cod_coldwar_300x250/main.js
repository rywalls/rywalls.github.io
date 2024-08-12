var dateColour = '#232323'

var buttonTF, dateTF, buttonFontSize, dateFontSize
var logoToUse = 'logo_standard'

var use2lines = ['fr', 'chfr', 'befr', 'no', 'fi', 'ru']

// set as pre ad, then later we'll check
// to see if the release date has passed
var beforeRelease = true
var forcePost = false

var ad = {
	width: 300,
	height: 250
}

var AdBase = function(init) {
    this.local = window.location.protocol === "file:" || window.location.hostname == "localhost"
    this.version = "0.0"
    this.init = init

    this.clickthrough = function(name) {
        if(typeof Enabler !== "undefined") {
        	if(weLocal || onov) {
        	} else {
				//Enabler.exitOverride(name ? name : 'default', BackgroundExit);
				Enabler.exit('default')
        	}
        }
    }

    this.getAsset = function(asset) {
        if(weLocal) return asset.local
        if(onov)  return asset.ov

		if(typeof Enabler !== "undefined") {
			return getAsset(asset.dc)
		}
    }
}

function Ad() {
	AdBase.call(this, "init")
	this.width = ad.width
	this.height = ad.height
}

Ad.prototype = Object.create(AdBase.prototype);
Ad.prototype.constructor = Ad;

var ad = new Ad();

function startBanner() {
	loadScripts()
}

function loadScripts() {
	loadJS(['config.js', 'coldwar.js'], loadSvgs)
}

function loadSvgs() {
	fbf.loadSvgs(setup, 'svg.gz.js')
}

function setup() {
	var keyline = addKeylineTo(root, ad.width, ad.height, '#666666', 1)

	root.display = true
	root.style.overflow = "hidden"
	root.buttonMode = true

	root.addEventListener("mouseenter", coldwar.buttonRollover)

	initialHide()

	var fontSizeToUse = '_' + ad.width + 'x' + ad.height

	coldwar.generalSetup()

	beforeRelease ? buttonFontSize = config.buttonFontSizes.pre[fontSizeToUse] : buttonFontSize = config.buttonFontSizes.post[fontSizeToUse]
	dateFontSize = config.dateFontSizes[fontSizeToUse]

	buttonText = beforeRelease ? config.button.pre : config.button.post
	if(use2lines.includes(config.lang)) buttonText = beforeRelease ? config.button.pre2lines : config.button.post2lines

	languageTweaks()
      
  if (config.lang == 'fi') {
    if (!beforeRelease) buttonText = config.button.post
  }

  if (config.lang == 'no') {
    if (!beforeRelease) buttonText = config.button.post
  }

	if(!beforeRelease) gsap.set(banner_button, {y: '-=15'})

	coldwar.configure()
	coldwar.createButton(buttonFontSize, buttonText)
	coldwar.createDate(dateFontSize)
	coldwar.setupLogo()

	coldwar.emergencyOverride()

	animate()
}

function languageTweaks() {
	//use this as a last resort to adjust button font sizes, etc.
	if(config.lang == 'uaear' || config.lang == 'ksaar') {
		gsap.set(banner_date, {y: '-=4'})
	}

  if(config.lang == 'ru') {
    if(beforeRelease) {
      gsap.set(banner_button, {y: '+=4'})
      gsap.set(banner_date, {y: '-=4'})
    }
  }

	if(config.lang == 'fr') {
    if(beforeRelease) {
      gsap.set(banner_button, {y: '-=-2'})
      gsap.set(banner_date, {y: '-=4'})
  }
}

if(config.lang == 'it') {
  if(beforeRelease) {
    gsap.set(banner_button, {y: '-=-1'})
    gsap.set(banner_date, {y: '-=3'})
  }
}

   	 if(config.lang == 'es') {
   if(beforeRelease) {
    gsap.set(banner_button, {y: '-=-3'})
    }}

   	 if(config.lang == 'nl') {
   if(beforeRelease) {
   gsap.set(banner_date, {y: '-=3'})
   }}

    if(config.lang == 'befr') {
   if(beforeRelease) {
  gsap.set(banner_button, {y: '-=-2'})
  gsap.set(banner_date, {y: '-=4'})
   }}

   	 if(config.lang == 'benl') {
   if(beforeRelease) {
  gsap.set(banner_date, {y: '-=3'})
   }}

    if(config.lang == 'se') {
   if(beforeRelease){
  gsap.set(banner_date, {y: '-=2'})
   }}

   	 if(config.lang == 'fi') {
   if(beforeRelease) {
  gsap.set(banner_date, {y: '-=9'})
   }}

   	 if(config.lang == 'no') {
   if(beforeRelease){
   gsap.set(banner_button, {y: '-=-3'})
  gsap.set(banner_date, {y: '-=2'})
   }}

   	 if(config.lang == 'pt') {
   if(beforeRelease) {
  gsap.set(banner_date, {y: '-=3'})
   }}

    if(config.lang == 'pt') {
   if(beforeRelease) {
  gsap.set(banner_date, {y: '-=3'})
   }}

    if(config.lang == 'chfr') {
   if(beforeRelease) {
  gsap.set(banner_button, {y: '-=-2'})
  gsap.set(banner_date, {y: '-=4'})
   }}

   	 if(config.lang == 'pl') {
   if(beforeRelease) {
  gsap.set(banner_date, {y: '-=3'})
   }}
}

function initialHide() {
	fbf.hide(banner_rating.children)
	fbf.hide(banner_cod_logo.children)
	fbf.hide(blizzard_text.children)
	fbf.hide(banner_button, banner_date)
	fbf.hide(banner_cod_logo)
}

var mainAnimationTL

function animate() {

	gsap.to(banner_curtain, {alpha: 0, duration: 2, ease: 'Power1.out'})

	// create timeline
	mainAnimationTL = gsap.timeline()
	mainAnimationTL.to(banner_cover, {alpha: 0, duration: 1.75, ease: 'Power1.out'})
	mainAnimationTL.from(banner_background, {scale: 2, transformOrigin: '30% 50%', ease: "power4.out", duration: 1.75}, '<')
	mainAnimationTL.add(coldwar.animateLogo, '< 0.3')
	mainAnimationTL.add(coldwar.animateDate, '< 0.5')
	mainAnimationTL.add(coldwar.animateButton, '> 0.5')
}

var _root = $('root')