var clickLabel,clickURL,imagesToLoad,fbWrapper,fb1Img,bgGlow,timeline,onov=0==window.location.href.indexOf("http://ocean")||0==window.location.href.indexOf("https://ocean"),weLocal="file:"===window.location.protocol||"localhost"==window.location.hostname||"127.0.0.1"==window.location.hostname||0==window.location.href.indexOf("http://192.168.1"),fallbackMode=window.document.documentMode,ad={width:300,height:250},useDefaultClickThrough=!0,useDynamicExit=!1,defaultClickURL=[{productLabel:"default",productURL:"https://www.diy.com/"}];function setExits(){Enabler.exit("default"),Enabler.exit("exit1"),Enabler.exit("exit2"),Enabler.exit("exit3"),Enabler.exit("exit4"),Enabler.exit("exit5")}function startBanner(){loadScripts()}function getConfigPath(){return weLocal||onov?"config.js":dc.asset_config.Url}function getImgPath(e){return weLocal||onov?e:"dir_assets/"+e}function loadScripts(){loadJS([getConfigPath()],loadImages)}var imgPaths=["bg-circle.svg","floorboards.jpg"],imgsLoaded=0;function loadImages(){imagesToLoad=imgPaths,fallbackMode&&(imagesToLoad=["fallback.jpg"]);for(var e=imagesToLoad.length-1;e>=0;e--){var t=new Image;t.addEventListener("load",imgIncrement,!1),t.src=getImgPath(imgPaths[e])}}function imgIncrement(e){e.target.removeEventListener("load",imgIncrement),console.log("loaded "+imagesToLoad[imgsLoaded]),++imgsLoaded===imagesToLoad.length&&(console.log("all images loaded"),setupAd())}var fbImgWidth=700,fbImgHeight=3935,fbImgScale=.1;function setupAd(){if(fbf.clean(_root),fbf.replaceSVGDefs(),fbf.displayBlock(_root),_root.buttonMode=!0,_root.style.cssText+="overflow:hidden;",addKeylineTo(_root,ad.width,ad.height,"#000000",1),hideSections(),setListeners(),fallbackMode){root.innerHTML="";var e=fbf.createDiv();e.style.background="url(fallback.jpg)",root.appendChild(e)}else{bgGlow=fbf.createImg("bg-circle.svg","438px","auto"),gsap.set(bgGlow,{x:ad.width/2-219,y:23}),root.insertBefore(bgGlow,mc_background.nextSibling);var t=fbf.createDiv();t.id="floorboards-house",(fbWrapper=fbf.createDiv()).id="floorboards-wrapper",fbWrapper.style.top="160px",fbWrapper.style.left="50%",fbWrapper.style.webkitTransform="perspective(3990px) scale("+fbImgScale+","+fbImgScale+") rotateX(87.5deg)",fbWrapper.style.webkitTransformStyle="initial";var e=fbf.createDiv();e.style.background="url(floorboards.jpg)",e.style.backgroundPosition="0px 0px",e.style.width=fbImgWidth+"px",e.style.height=fbImgHeight+"px",e.style.left=-(fbImgWidth/2)+"px",fbWrapper.appendChild(e),t.appendChild(fbWrapper),root.insertBefore(t,mc_txt_1.nextSibling);var o=fbf.createDiv();o.style.width="300px",o.style.height="200px",o.style.top="400px",o.style.backgroundImage="linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4))",root.insertBefore(o,t.nextSibling),startFlow()}}function setListeners(){fallbackMode||(_root.addEventListener("mouseover",rollover,!1),_root.addEventListener("mouseout",rollout,!1))}function rollover(e){moveFloorboards(),gsap.to(getPaths(mc_cta)[0],{fill:"#FF6600",duration:.1}),gsap.to(getPaths(mc_cta)[1],{fill:"#FFFFFF",duration:.1})}function rollout(e){gsap.to(getPaths(mc_cta)[0],{fill:"#FFFFFF",duration:.1}),gsap.to(getPaths(mc_cta)[1],{fill:"#FF6600",duration:.1})}function getPaths(e){return e.getElementsByTagName("path")}function hideSections(){fbf.hide()}function startFlow(){animate()}var firstRun=!0,loopCounter=0,repeatAnimation=1,utm=0;function animate(){var e=gsap.timeline();e.call(moveFloorboards),e.to(mc_curtain,{alpha:0,duration:.5}),e.from(mc_txt_1,{y:"+=30",ease:"power1.out",duration:2},"< 0.5"),e.from(getPaths(mc_txt_1)[0],{alpha:0,ease:"power1.out",duration:2},"<"),e.from(getPaths(mc_txt_1)[1],{scaleX:0,transformOrigin:"50% 50%",ease:"power1.out",duration:1.5},"<"),e.from(getPaths(mc_txt_1)[2],{alpha:0,duration:1},">"),e.from(bgGlow,{y:"+=100",duration:2},"< -0.5"),e.from([mc_cta,mc_legal],{alpha:0,ease:"power1.out",duration:.75},"< 1")}var firstMove=!0;function moveFloorboards(){if(!gsap.isTweening(fbWrapper.children[0])){var e=parseInt(fbWrapper.children[0].style.backgroundPosition.split(" ")[1].split("px")[0]);gsap.fromTo(fbWrapper.children[0],{backgroundPosition:"0px "+e+"px"},{backgroundPosition:"0px "+(e+5*fbImgHeight)+"px",ease:"power4.out",duration:13}),firstMove=!1}}function utmHousekeeping(e){(void 0==e||"undefined"==e)&&(e=0),clickLabel=products[e].productLabel,clickURL=products[e].productURL}function updatePathColor(e,t){e.setAttribute("fill",t)}var _root=$("root");