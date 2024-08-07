var onov = (window.location.href.indexOf("http://ocean") == 0 || window.location.href.indexOf("https://ocean") == 0);
var weLocal = window.location.protocol === "file:" || window.location.hostname == "localhost" || window.location.hostname == "127.0.0.1" || window.location.href.indexOf("http://192.168.1") == 0;
var fallbackMode = window.document.documentMode;

var ad = {width: 300, height: 250};

var useDefaultClickThrough = true;
var useDynamicExit = false;

var clickLabel, clickURL;

var defaultClickURL = [{
    productLabel: 'default',
    productURL:'https://www.diy.com/'
}]

function setExits() {
  Enabler.exit('default');
  Enabler.exit('exit1');
  Enabler.exit('exit2');
  Enabler.exit('exit3');
  Enabler.exit('exit4');
  Enabler.exit('exit5');
}

function startBanner() {
    loadScripts();
}

/*\       $$$$$$\   $$$$$$\  $$$$$$$\
$$ |     $$  __$$\ $$  __$$\ $$  __$$\
$$ |     $$ /  $$ |$$ /  $$ |$$ |  $$ |
$$ |     $$ |  $$ |$$$$$$$$ |$$ |  $$ |
$$ |     $$ |  $$ |$$  __$$ |$$ |  $$ |
$$ |     $$ |  $$ |$$ |  $$ |$$ |  $$ |
$$$$$$$$\ $$$$$$  |$$ |  $$ |$$$$$$$  |
\________|\______/ \__|  \__|\______*/

function getConfigPath() {
    if(weLocal || onov) return 'config.js'
    else return dc['asset_config'].Url
}

function getImgPath(src) {
    if(weLocal || onov) return src
    else return "dir_assets/" + src
}

function loadScripts() {
    // loadJS([getConfigPath()], loadSvgs);
    loadJS([getConfigPath()], loadImages);
}

// function loadSvgs() {
//     if(weLocal || onov) fbf.loadSvgs(setupAd)
//     else fbf.loadSvgs(setupAd, getAsset("dir_assets/svg.gz.js"))
// }

// https://support.google.com/richmedia/answer/6084036?hl=en&ref_topic=6115224
var imgPaths = ['bg-circle.svg', 'floorboards.jpg'];
var imagesToLoad;
var imgsLoaded = 0;

function loadImages() {
    imagesToLoad = imgPaths;
    if(fallbackMode) imagesToLoad = ['fallback.jpg'];

    for (var i = imagesToLoad.length - 1; i >= 0; i--) {
        var img = new Image;
        img.addEventListener('load', imgIncrement, false);
        img.src = getImgPath(imgPaths[i]);
    }
}

function imgIncrement(e) {
    e.target.removeEventListener('load', imgIncrement);
    console.log('loaded ' + imagesToLoad[imgsLoaded])
    imgsLoaded++;

    if (imgsLoaded === imagesToLoad.length) {
    	console.log('all images loaded')
        setupAd();
    }
}

/*$$$$$\  $$$$$$$$\ $$$$$$$$\ $$\   $$\ $$$$$$$\
$$  __$$\ $$  _____|\__$$  __|$$ |  $$ |$$  __$$\
$$ /  \__|$$ |         $$ |   $$ |  $$ |$$ |  $$ |
\$$$$$$\  $$$$$\       $$ |   $$ |  $$ |$$$$$$$  |
 \____$$\ $$  __|      $$ |   $$ |  $$ |$$  ____/
$$\   $$ |$$ |         $$ |   $$ |  $$ |$$ |
\$$$$$$  |$$$$$$$$\    $$ |   \$$$$$$  |$$ |
 \______/ \________|   \__|    \______/ \_*/

var fbWrapper, fb1Img;
var fbImgWidth = 700;
var fbImgHeight = 3935;
var fbImgScale = 0.1;

var bgGlow;

function setupAd() {
    fbf.clean(_root);
    fbf.replaceSVGDefs();
    fbf.displayBlock(_root);
    _root.buttonMode = true;
    _root.style.cssText += "overflow:hidden;";
    addKeylineTo(_root, ad.width, ad.height, '#000000', 1);

    // hide elements
    hideSections();
    // set up interaction
    setListeners();

    if(fallbackMode) {
        root.innerHTML = '';
        var img = fbf.createDiv();
        img.style.background = 'url(fallback.jpg)';
        root.appendChild(img);
    } else {
        bgGlow = fbf.createImg('bg-circle.svg', '438px', 'auto');
        gsap.set(bgGlow, {x: (ad.width/2) - (438/2), y: 23})
        root.insertBefore(bgGlow, mc_background.nextSibling);

        var fbHouse = fbf.createDiv();
        fbHouse.id = 'floorboards-house';

        fbWrapper = fbf.createDiv();
        fbWrapper.id = 'floorboards-wrapper';
        fbWrapper.style.top = '160px';
        fbWrapper.style.left = '50%';
        fbWrapper.style.webkitTransform = 'perspective(3990px) scale(' + fbImgScale + ',' + fbImgScale + ') rotateX(87.5deg)';
        fbWrapper.style.webkitTransformStyle = 'initial';
        
        var img = fbf.createDiv();
        img.style.background = 'url(floorboards.jpg)';
        img.style.backgroundPosition = '0px 0px';
        img.style.width = fbImgWidth + 'px';
        img.style.height = fbImgHeight + 'px';
        img.style.left = -(fbImgWidth / 2) + 'px';
        fbWrapper.appendChild(img);

        fbHouse.appendChild(fbWrapper);
        root.insertBefore(fbHouse, mc_txt_1.nextSibling);

        var grad = fbf.createDiv();
        grad.style.width = '300px';
        grad.style.height = '200px';
        grad.style.top = '400px';
        
        grad.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4))';
        root.insertBefore(grad, fbHouse.nextSibling);

        startFlow();
    }
}

function setListeners() {
    if(!fallbackMode) {
        _root.addEventListener('mouseover', rollover, false);
        _root.addEventListener('mouseout', rollout, false);
    }

    _root.addEventListener("click", handleClick);
}

function rollover(e) {
    moveFloorboards();
    gsap.to(getPaths(mc_cta)[0], {fill: '#FF6600', duration: 0.1});
    gsap.to(getPaths(mc_cta)[1], {fill: '#FFFFFF', duration: 0.1});
}

function rollout(e) {
    gsap.to(getPaths(mc_cta)[0], {fill: '#FFFFFF', duration: 0.1});
    gsap.to(getPaths(mc_cta)[1], {fill: '#FF6600', duration: 0.1});
}

function getPaths(el) {
    return el.getElementsByTagName('path');
}

function handleClick(event) {
    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true
    var target = event.target || event.srcElement
    var phase = event.eventPhase

    if(useDefaultClickThrough) {
        clickLabel = defaultClickURL[0]["productLabel"];
        clickURL = defaultClickURL[0]["productURL"];
    } else {
        if(product_count==1) {
            clickLabel = products[0]["productLabel"];
            clickURL = products[0]["productURL"];
        } else {
            clickLabel = products[productOrder[current_product-1]-1]["productLabel"];
            clickURL = products[productOrder[current_product-1]-1]["productURL"];
        }
    }

    if (useDynamicExit && !fbf.isLocal && !demo) clickURL = dynamicExit;
    Enabler.exitOverride(clickLabel, clickURL);
}

function hideSections() {
    fbf.hide();
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

var firstRun = true;
var loopCounter = 0, repeatAnimation = 1;
var timeline;
var utm = 0;

function animate() {
    var tl = gsap.timeline();
    tl.call(moveFloorboards);
    tl.to(mc_curtain, {alpha: 0, duration: 0.5});
    tl.from(mc_txt_1, {y: '+=30', ease: 'power1.out', duration: 2}, '< 0.5');
    tl.from(getPaths(mc_txt_1)[0], {alpha: 0, ease: 'power1.out', duration: 2}, '<');
    tl.from(getPaths(mc_txt_1)[1], {scaleX: 0, transformOrigin: '50% 50%', ease: 'power1.out', duration: 1.5}, '<');
    tl.from(getPaths(mc_txt_1)[2], {alpha: 0, duration: 1}, '>');
    tl.from(bgGlow, {y: '+=100', duration: 2}, '< -0.5');
    tl.from([mc_cta, mc_legal], {alpha: 0, ease: 'power1.out', duration: 0.75}, '< 1');
}

var firstMove = true;

function moveFloorboards() {
    if (!gsap.isTweening(fbWrapper.children[0])) {
        var currentBgY = parseInt(fbWrapper.children[0].style.backgroundPosition.split(' ')[1].split('px')[0]);
        var toY = currentBgY + (fbImgHeight * 5);

        gsap.fromTo(fbWrapper.children[0], {backgroundPosition: '0px ' + currentBgY + 'px'}, {backgroundPosition: '0px ' + toY + 'px', ease: 'power4.out', duration: 13});

        firstMove = false;
    }
}

function utmHousekeeping(prodNum) {
    if(prodNum == undefined || prodNum =="undefined") { prodNum = 0} 
    clickLabel = products[prodNum]["productLabel"];
    clickURL = products[prodNum]["productURL"];
}

function updatePathColor(path, colourToUse) {
    path.setAttribute("fill", colourToUse);
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