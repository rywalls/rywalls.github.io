var keyline,onMobile,onov=0==window.location.href.indexOf("http://ocean")||0==window.location.href.indexOf("https://ocean"),weLocal="file:"===window.location.protocol||"localhost"==window.location.hostname,WID=160,HEI=600,use_canvas_effect=!1,bring_in_elements=1,use_tagline=!0,translations=[{territory:"uk",buttonText:"BUY NOW",buttonFontSize:17,buttonLetterSpacing:1,consoleText:["AVAILABLE","NOW"],consoleTextFontSize:24,lockupLetterSpacing:1,consoleTextPaddingTop:0,taglineText:["DRAGONS","ARE","UNLEASHED"],taglineFontSize:24,taglineLetterSpacing:1},],territory=translations[0],button_animating=!1;function startBanner(){loadESO()}function loadESO(){loadJS("ESO.js",loadSvgs)}function loadSvgs(){fbf.loadSvgs(onSVGload,"svg.gz.js")}function onSVGload(){eso.defaultsetup(),setup()}function setup(){initialHide(),eso.setListeners(),eso.setupRating(territory.territory),eso.setupButton(mc_button,{text:territory.buttonText,fontSize:territory.buttonFontSize,letterSpacing:territory.buttonLetterSpacing}),eso.dynamicText(mc_platform_lockup_console_text,{text:territory.consoleText,fontSize:territory.consoleTextFontSize,letterSpacing:territory.lockupLetterSpacing,align:"center",paddingTop:territory.consoleTextPaddingTop,lineHeight:25}),use_tagline&&eso.setupTagline(_root,{text:territory.taglineText,align:"center",fontSize:territory.taglineFontSize,letterSpacing:territory.taglineLetterSpacing,x:.5*WID,y:475}),use_canvas_effect?eso.setupCanvasEffect():startFlow(),eso.createSVGgradient(mc_artwork,{height:175,offsetStop2:"90%",position:"bottom"})}function initialHide(){fbf.hide(mc_rating.children,mc_elsweyr_logo,mc_platform_lockup,mc_button,mc_throb),use_canvas_effect&&fbf.hide(mc_background)}function startFlow(){fbf.show(mc_elsweyr_logo),TweenMax.from(mc_elsweyr_logo,.9,{rotation:.01,scale:.7,alpha:0,delay:0,ease:Power1.easeInOut}),animateArtwork(),TweenMax.delayedCall(bring_in_elements,animateContent)}function animateContent(){use_tagline?eso.animateTagline({speed:.3,delayBetween:.6,delay:.25,pauseOnLast:.5}):animateElements()}function animateElements(){fbf.show(mc_platform_lockup,mc_button),TweenMax.from(mc_button,.5,{alpha:0,delay:.25,ease:Power1.easeInOut,onComplete:eso.animateButton}),TweenMax.from(mc_platform_lockup,.5,{alpha:0,delay:.25,ease:Power1.easeInOut})}function animateArtwork(){if(TweenMax.to(mc_curtain,1.5,{alpha:0,ease:Power2.easeOut}),use_canvas_effect){var t=document.getElementById("foregroundCanvas"),e=document.getElementById("midgroundCanvas");document.getElementById("backgroundCanvas"),TweenMax.set(e,{rotation:.01,scale:1}),TweenMax.from(t,2.75,{rotation:.01,scale:1.4,transformOrigin:"60% 70%",ease:Power1.easeOut}),TweenMax.to(e,3,{rotation:.01,scale:1.1,transformOrigin:"50% 38%",ease:Power1.easeOut})}else throbbers(),TweenMax.from(mc_dude,2.75,{rotation:.01,scale:1.4,transformOrigin:"70% 10%",ease:Power1.easeOut}),TweenMax.to(mc_dragon,3,{rotation:.01,scale:1.1,transformOrigin:"20% 20%",ease:Power1.easeOut})}function throbbers(){fbf.show(mc_throb),TweenMax.from(mc_throb,3,{alpha:0})}var _root=$("root"),mc_artwork=$("mc_artwork"),mc_background=$("mc_background"),mc_artwork_tolerance_map=$("mc_artwork_tolerance_map"),mc_footer=$("mc_footer"),mc_rating=$("mc_rating"),mc_rating_pegi=$("mc_rating_pegi"),mc_copyright=$("mc_copyright"),mc_platform_lockup=$("mc_platform_lockup"),mc_platform_lockup_console_text=$("mc_platform_lockup_console_text"),mc_platform_logos_console=$("mc_platform_logos_console"),mc_xbox=$("mc_xbox"),mc_ps4=$("mc_ps4"),mc_button=$("mc_button"),mc_button_background=$("mc_button_background"),mc_button_text=$("mc_button_text"),mc_elsweyr_logo=$("mc_elsweyr_logo"),mc_curtain=$("mc_curtain"),mc_throb=$("mc_throb");