var onov = (window.location.href.indexOf("http://ocean") == 0 || window.location.href.indexOf("https://ocean") == 0);
var weLocal = window.location.protocol === "file:" || window.location.hostname == "localhost" || window.location.hostname == "127.0.0.1" || window.location.href.indexOf("http://192.168.1") == 0;
var isIE = window.document.documentMode;

var ad = {width: 300, height: 600};

var _root = $('root');

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

function loadScripts() {
    // loadJS([getConfigPath()], loadSvgs);
    // loadJS([getConfigPath()], loadImages);
    loadJS([getConfigPath()], setupAd);
}

// function loadSvgs() {
//     if(weLocal || onov) fbf.loadSvgs(setupAd)
//     else fbf.loadSvgs(setupAd, getAsset("dir_assets/svg.gz.js"))
// }

var imgPaths = ['box-front.svg', 'box-side.svg', 'box-top.svg'];
var imagesToLoad;
var imgsLoaded = 0;

function loadImages() {
    imagesToLoad = imgPaths;
    // if(fallbackMode) imagesToLoad = ['fallback.jpg'];

    for (var i = imagesToLoad.length - 1; i >= 0; i--) {
        var img = new Image;
        img.addEventListener('load', imgIncrement, false);
        img.src = getImgPath(imgPaths[i]);
    }
}

function getImgPath(src) {
    if(weLocal || onov) return src
    else return "dir_assets/" + src
}

function imgIncrement(e) {
    e.target.removeEventListener('load', imgIncrement);
    imgsLoaded++;

    if (imgsLoaded === imagesToLoad.length) {
        startFlow();
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

var boxCarousel;

function setupAd() {
    fbf.clean(_root);
    fbf.replaceSVGDefs();
    fbf.displayBlock(_root);
    _root.buttonMode = true;
    _root.style.cssText += "overflow:hidden;";
    addKeylineTo(_root, ad.width, ad.height, '#000000', 1);

    if( !fbf.isMobile() ) {
        root.style.perspective = '50000px';
        root.style.webkitPerspective = '50000px';
    }
    
    var box1 = createBox();
    var box2 = createBox();
    var box3 = createBox();

    mc_graphics_container.appendChild(box1);
    mc_graphics_container.appendChild(box2);
    mc_graphics_container.appendChild(box3);

    mc_person.style.zIndex = '0';

    boxCarousel = createCarousel(mc_graphics_container, false);

    setListeners();
    loadImages();
}

function createCarousel(targetContainer, wrapAndOffset) {
    var children = targetContainer.children;
    children = [].slice.call(children);
    children.splice(0, 1);

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
        _value: 0,
        radius: 1,
        _radiusX: 110,
        _radiusY: 35
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
        var minScale = 0.8;
        var maxScale = 1;
        var scale = (y + 1) * 0.5;
        var scale = minScale + (maxScale - minScale) * scale;

        var minRotationX = 0;
        var maxRotationX = 20;
        var rotationX = lerp(-1, 1, (y + 1) * 0.5);
        var rotationX = minRotationX + (maxRotationX - minRotationX) * rotationX;

        var minRotationY = 0;
        var maxRotationY = 20;
        var rotationY = lerp(-1, 1, (x + 1) * 0.5);
        var rotationY = minRotationY + (maxRotationY - minRotationY) * rotationY;

        var minRotationZ = -15;
        var maxRotationZ = 20;
        var rotationZ = (y + 1) * 0.5// lerp(-1, 1, (y + 1) * 0.5);
        var rotationZ = minRotationZ + (maxRotationZ - minRotationZ) * rotationZ;

        var setX = x * radiusX * this.radius;
        var setY = y * radiusY * this.radius;
        var setZ = (y * radiusY * this.radius) * 10;

        if(isIE) gsap.set(item, {x: setX, y: setY, z: setZ, rotateZ: rotationZ, scale: scale});
        else gsap.set(item, {x: setX, y: setY, z: setZ, rotateX: rotationX, rotateY: rotationY, rotateZ: rotationZ, scale: scale});    

        if(y < 0) {
            item.style.zIndex = '-1';
        } else {
            item.style.zIndex = '1';
        }
    }

    carousel.update();
    return carousel;
}

function lerp(start, end, amt){
  return (1-amt)*start+amt*end
}

function setListeners() {
    _root.addEventListener('mouseover', rollover, false);
    _root.addEventListener('mouseout', rollout, false);
}


function createBox() {
    var boxWidth = 68;

    var container = fbf.createDiv();
    // container.style.width = '100px';
    // container.style.height = '100px';
    // container.style.top = 'calc(30% - 50px)';
    // container.style.left = 'calc(50% - 50px)';
    container.style.transformStyle = 'preserve-3d';

    container.style.webkitBackfaceVisibility = 'hidden';
    container.style.msBackfaceVisibility = 'hidden';
    container.style.backfaceVisibility = 'hidden';

    for (var i = 0; i < 5; i++) {
        var face = fbf.createDiv();
        face.style.top = '0';
        face.style.left = '0';
        face.style.width = boxWidth + 'px';
        face.style.height = boxWidth + 'px';
        face.style.backgroundColor = 'white';
        face.style.backgroundSize = 'cover';

        if(i == 0) { // FRONT
            face.style.transform = 'translateX(-50%) translateY(-50%)';
            face.style.backgroundImage = 'url(box-front.svg)';
        }

        if(i == 1) { // TOP
            face.style.webkitTransform = 'translateX(-50%) translateY(-50%) rotateX(-90deg)';
            face.style.MozTransform = 'translateX(-50%) translateY(-50%) rotateX(-90deg)';
            face.style.msTransform  = 'translateX(-50%) translateY(-50%) rotateX(-90deg)';
            face.style.OTransform  = 'translateX(-50%) translateY(-50%) rotateX(-90deg)';
            face.style.transform = 'translateX(-50%) translateY(-50%) rotateX(-90deg)';
            face.style.backgroundImage = 'url(box-top.svg)';
        }

        if(i == 2) { // BOTTOM
            face.style.webkitTransform = 'translateX(-50%) translateY(-50%) rotateX(90deg)';
            face.style.MozTransform = 'translateX(-50%) translateY(-50%) rotateX(90deg)';
            face.style.msTransform  = 'translateX(-50%) translateY(-50%) rotateX(90deg)';
            face.style.OTransform  = 'translateX(-50%) translateY(-50%) rotateX(90deg)';
            face.style.transform = 'translateX(-50%) translateY(-50%) rotateX(90deg)';
            face.style.transformOrigin = '0% 100%';
            face.style.backgroundImage = 'url(box-side.svg)';
        }

        if(i == 3) { // LEFT
            face.style.webkitTransform = 'translateX(-50%) translateY(-50%) rotateY(90deg)';
            face.style.MozTransform = 'translateX(-50%) translateY(-50%) rotateY(90deg)';
            face.style.msTransform  = 'translateX(-50%) translateY(-50%) rotateY(90deg)';
            face.style.OTransform  = 'translateX(-50%) translateY(-50%) rotateY(90deg)';
            face.style.transform = 'translateX(-50%) translateY(-50%) rotateY(90deg)';
            face.style.backgroundImage = 'url(box-side.svg)';
        }

        if(i == 4) { // RIGHT
            face.style.webkitTransform = 'translateX(-50%) translateY(-50%) rotateY(-90deg)';
            face.style.MozTransform = 'translateX(-50%) translateY(-50%) rotateY(-90deg)';
            face.style.msTransform  = 'translateX(-50%) translateY(-50%) rotateY(-90deg)';
            face.style.OTransform  = 'translateX(-50%) translateY(-50%) rotateY(-90deg)';
            face.style.transform = 'translateX(-50%) translateY(-50%) rotateY(-90deg)';
            face.style.transformOrigin = '100% 100%';
            face.style.backgroundImage = 'url(box-side.svg)';
        }

        container.appendChild(face);
    }

    return container;
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

function animate() {
    var tl = gsap.timeline();
    tl.to(mc_curtain, {alpha: 0, duration: 1});
    tl.from(mc_graphics_container, {scale: 1.1, rotation: 0.05, force3D: true, ease: 'power1.out', duration: 4}, '<')
    tl.call(spinCarousel, false, '<');
    tl.from(mc_txt_1, {alpha: 0, y: '+=10', duration: 0.4, ease: 'power1.out'}, '< 0.75');
    tl.from(getPaths(mc_txt_2), {alpha: 0, duration: 0.4, stagger: 0.3, ease: 'power1.out'}, '> 0.1');
    tl.from(mc_cta, {alpha: 0, duration: 0.4, ease: 'power1.out'}, '> 0.1');

}

function spinCarousel() {
    if( !gsap.isTweening(boxCarousel) ) {
        gsap.to(boxCarousel, {value: '-=1', duration: 10, ease: 'power1.out'});
    }
}

 /*$$$$\ $$$$$$$$\ $$\   $$\ $$$$$$$$\ $$$$$$$\  
$$  __$$\\__$$  __|$$ |  $$ |$$  _____|$$  __$$\ 
$$ /  $$ |  $$ |   $$ |  $$ |$$ |      $$ |  $$ |
$$ |  $$ |  $$ |   $$$$$$$$ |$$$$$\    $$$$$$$  |
$$ |  $$ |  $$ |   $$  __$$ |$$  __|   $$  __$$< 
$$ |  $$ |  $$ |   $$ |  $$ |$$ |      $$ |  $$ |
 $$$$$$  |  $$ |   $$ |  $$ |$$$$$$$$\ $$ |  $$ |
 \______/   \__|   \__|  \__|\________|\__|  \_*/

function utmHousekeeping(prodNum) {
    if(prodNum == undefined || prodNum =="undefined") { prodNum = 0} 
    clickLabel = products[prodNum]["productLabel"];
    clickURL = products[prodNum]["productURL"];
}

function rollover(e) {
    gsap.to(getPaths(mc_cta)[0], {fill: '#FFFFFF', duration: 0.05});
    gsap.to(getPaths(mc_cta)[2], {fill: '#FF6600', duration: 0.05});
    // gsap.to(getPaths(mc_cta)[1], {fill: '#FFFFFF', duration: 0.1});
    spinCarousel();
}

function rollout(e) {
    gsap.to(getPaths(mc_cta)[0], {fill: '#FF6600', duration: 0.05});
    gsap.to(getPaths(mc_cta)[2], {fill: '#FFFFFF', duration: 0.05});
    // gsap.to(getPaths(mc_cta)[0], {fill: '#FFFFFF', duration: 0.1});
    // gsap.to(getPaths(mc_cta)[1], {fill: '#FF6600', duration: 0.1});
}

function getPaths(el) {
    return el.getElementsByTagName('path');
}

function updatePathColor(path, colourToUse) {
    path.setAttribute("fill", colourToUse);
}