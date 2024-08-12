var onov = (window.location.href.indexOf("http://ocean") == 0 || window.location.href.indexOf("https://ocean") == 0);
var weLocal = window.location.protocol === "file:" || window.location.hostname == "localhost";

var keyline

var sh = {
	colours: {
		blue:  		'#4019ff',
		teal:   	'#00e6b8',
		deepblue:   '#0d2835',
		white: 		'#ffffff',
		lightteal: 	'#abf7e8',//'#bff9ed',
		lilac: 		'#e0e5f5'
	}
}

var ad = {
	width: 300,
	height: 600
}


function startBanner() {
	// loadScripts();
	setupAd();
};

// function loadScripts() {
//     // loadJS(['effect.js'], loadSvgs);
//     // loadJS(['effect.js'], setupAd);
// };

// function loadSvgs() {
// 	//fbf.loadSvgs(setupAd);
// };

/*$$$$$\  $$$$$$$$\ $$$$$$$$\ $$\   $$\ $$$$$$$\
$$  __$$\ $$  _____|\__$$  __|$$ |  $$ |$$  __$$\
$$ /  \__|$$ |         $$ |   $$ |  $$ |$$ |  $$ |
\$$$$$$\  $$$$$\       $$ |   $$ |  $$ |$$$$$$$  |
 \____$$\ $$  __|      $$ |   $$ |  $$ |$$  ____/
$$\   $$ |$$ |         $$ |   $$ |  $$ |$$ |
\$$$$$$  |$$$$$$$$\    $$ |   \$$$$$$  |$$ |
 \______/ \________|   \__|    \______/ \_*/

function setupAd() {
	
	logging = fbf.isLocal();
	fbf.clean(_root);
	fbf.replaceSVGDefs();
	fbf.displayBlock(_root);
	_root.buttonMode = true;
	_root.style.cssText += "overflow:hidden;";
	// banner background colour
	_root.style.backgroundColor = '#FFFFFF';

	fbf.hide(mc_musical_note_one,mc_musical_note_two,mc_musical_note_three)
	// add keyline
//	keyline = addKeylineTo(_root, ad.width, ad.height, "#000", 1); - no keyline wanted
	// add listeners
	addListeners();
	// hide sections
	hideSections();

	// start ad
	startFlow();
	
};

function setUpElements() //done this so we can update on the fly as client keeps changing mind on colours
{
	resetElements()
	//curtain
	changeColour(mc_curtain,sh.colours.lightteal);
 
	//initial bg (this will change through the animation)
	changeColour(mc_backgrounds,sh.colours.deepblue);

	//text and it's artifacts
	changeColour(mc_text_one,sh.colours.white);
    changeColour(mc_text_two,sh.colours.white);
    changeColour(mc_text_three,sh.colours.white);

	changeColour(mc_musical_note_one,sh.colours.teal);
	changeColour(mc_musical_note_two,sh.colours.teal);
	changeColour(mc_musical_note_three,sh.colours.teal);

	//cta elements
	changeColour(mc_cta_bgone,sh.colours.white);
	changeColour(mc_cta_bgtwo,sh.colours.teal);
	changeColour(mc_findoutmoretext.children[1],sh.colours.deepblue);
	changeColour(mc_findoutmoretext.children[0],sh.colours.deepblue);

	//footer elements
	changeColour(mc_footer_healthplan,sh.colours.white);
	changeColour(mc_fromonly,sh.colours.white);
	//logo (this will change through the animation)
	changeColour(mc_sh_logo_badge,sh.colours.teal);
	changeColour(mc_sh_logo_text,sh.colours.white);

		//setups
	for (var i = 0; i < mc_text_one.children.length-3; i++) {
		mc_text_one.children[i].style.display = "block";
		mc_text_one.children[i].style.overflow = "hidden";
		// gsap.to(mc_text_one.children[i].children[0],1,{ease: 'expo.in',y:"-=100"});
	}
	for (var i = 0; i < mc_text_two.children.length; i++) {
		mc_text_two.children[i].style.display = "block";
		mc_text_two.children[i].style.overflow = "hidden";
		// gsap.to(mc_text_one.children[i].children[0],1,{ease: 'expo.in',y:"-=100"});
					
	}

}

function changeColour(divToChange,col)
{
	//console.log(divToChange);
	var elementToUpdate = divToChange.querySelectorAll("path")
	for (var i = elementToUpdate.length - 1; i >= 0; i--) {
		elementToUpdate[i].setAttribute('style', 'fill: '+col);
	}
}

function addListeners() {
	_root.addEventListener("click", handleClick);
	_root.addEventListener("mouseenter", rollover);
	_root.addEventListener("mouseleave", rollout);
};

function hideSections() {
	fbf.hide();
	
};

function stopWobble() {
	gsap.set(_root, {rotation:0.025,force3D:false});
};

/*$$$$$$\ $$\       $$$$$$\  $$\      $$\ 
$$  _____|$$ |     $$  __$$\ $$ | $\  $$ |
$$ |      $$ |     $$ /  $$ |$$ |$$$\ $$ |
$$$$$\    $$ |     $$ |  $$ |$$ $$ $$\$$ |
$$  __|   $$ |     $$ |  $$ |$$$$  _$$$$ |
$$ |      $$ |     $$ |  $$ |$$$  / \$$$ |
$$ |      $$$$$$$$\ $$$$$$  |$$  /   \$$ |
\__|      \________|\______/ \__/     \_*/

function startFlow(){
 	//setDateMessage();
 	ctaGood();
	// stopWobble();
	setUpElements();
	setupFrames();
	//animate();
};

var masterTl;
var buttonBackground, buttonText;
var allowButtonRollover = false;
var buttonScale;

function animate() {
	// master timeline
	masterTl = gsap.timeline({onComplete: function() { allowButtonRollover = true }});
	masterTl.add( startanimation() );
}

function setupFrames()
{
	//need to sort out each section
	startanimation();	
}

var adiv = document.getElementById('mydiv')
var leftpos = 0
var noteOneWobble = 1;
var noteTwoWobble = 1;
var noteThreeWobble = 1;
var upOne = 0;
var upTwo = 0;
var upThree = 0;
var note_oneX,note_twoX,note_threeX,note_oneY,note_twoY,note_threeY;
var noteOneStartX,noteTwoStartX,noteThreeStartX,noteOneStartY,noteTwoStartY,noteThreeStartY;
var loop = false;
var counter = 0;

function resetElements()
{
	//console.log(loop);
		if(!loop){
			noteOneStartX = mc_musical_note_one._x;
			noteTwoStartX = mc_musical_note_two._x;
			noteThreeStartX = mc_musical_note_three._x;
			noteOneStartY = mc_musical_note_one._y;
			noteTwoStartY = mc_musical_note_two._y;
			noteThreeStartY = mc_musical_note_three._y;
			loop = true;
		} else
		{
			note_oneX = noteOneStartX;
			note_twoX = noteTwoStartX;
			note_threeX = noteThreeStartX;
			note_oneY = noteOneStartY;
			note_twoY = noteTwoStartY;
			note_threeY = noteThreeStartY;
		}

		noteOneWobble = 0;
        noteTwoWobble = 0;
        noteThreeWobble = 0;
	    upOne=0;
	    upTwo = 0;
		upThree = 0;

		fbf.hide(mc_musical_note_one,mc_musical_note_two,mc_musical_note_three);

		//console.log(note_oneX,note_twoX,note_threeX,note_oneY,note_twoY,note_twoY)
		 gsap.set(mc_musical_note_one,{x:note_oneX,rotation:0,y:note_oneY});  
		 gsap.set(mc_musical_note_two,{x:note_twoX,rotation:0,y:note_twoY});
		 gsap.set(mc_musical_note_three,{x:note_threeX,rotation:0,y:note_threeY}); 

		 //jump ii
		// gsap.set(mc_i_text,{x:"+=50"});  
}

function startanimation()
{
	console.log("startanimation");
	
	counter++;

	var tl = gsap.timeline({repeat:2,repeatDelay:3});
//tl.to(mc_curtain,0.5,{opacity:1},">3")
	//intro
	//fbf.hide(mc_text_three);
	tl.to(mc_curtain,1,{opacity:0,onStart:setUpElements});
	//had it with your doctors music in----------------------------------------------
	tl.from(mc_text_one.children[0].children[0],0.75,{ease: 'expo.inOut',y:"+=200",onComplete:playNoteOne},"<0.1");
	tl.from(mc_text_one.children[1].children[0],0.75,{ease: 'expo.inOut',y:"+=200"},"<0.1");
	tl.from(mc_text_one.children[2].children[0],0.75,{ease: 'expo.inOut',y:"+=200"},"<0.1");
	//musical notes
	
   //had it with your doctors music out----------------------------------------------
	tl.to(mc_text_one.children[0].children[0],0.75,{ease: 'expo.inOut',y:"-=200"},">2");
	tl.to(mc_text_one.children[1].children[0],0.75,{ease: 'expo.inOut',y:"-=200"},"<");
	tl.to(mc_text_one.children[2].children[0],0.75,{ease: 'expo.inOut',y:"-=200"},"<");
	//Jump the queue-------------------------------------------------------------------
	tl.from(mc_text_two.children[0].children[0],0.75,{ease: 'expo.inOut',y:"+=200"},"<0.1");
	tl.from(mc_text_two.children[1].children[0],0.75,{ease: 'expo.inOut',y:"+=200",onStart:secondFrame,onComplete:clearMe},"<0.1");

	tl.to(mc_text_two.children[0],1,{ease: 'expo.inOut',x:"+=50"},">0.5");
	tl.to(mc_text_two.children[1],1,{ease: 'expo.inOut',x:"+=50"},"<");


	tl.from(mc_text_three,1,{ease: 'expo.inOut',x:"-=50"},"<")
	
	tl.to(mc_text_two,0.1,{opacity:0},"<0.4")
	tl.from(mc_text_three,0.1,{opacity:0,onStart:thirdFrame},"<0.15")
	 


 	//jump i 
 	// tl.from(mc_i_text,0.5,{scaleY:1.1,ease: 'expo.In',y:"-=200"},">0.5")
 	// tl.to(mc_i_text,0.25,{scaleY:0.7})
 	// tl.to(mc_i_text,0.5,{scaleY:1,ease: "back.out(1.7)"},">0.1")

 	//jump ii
 	tl.from(mc_i_text,0.5,{ease: 'expo.In',y:"-=300",x:"+=100",rotation:"+=80"},">0.5")
 //	tl.to(mc_i_text,0.5,{ease: 'expo.Out',y:"+=150",x:"-=50"},">0.5")
 	tl.to(mc_i_text,0.25,{scaleY:0.7})
 	tl.to(mc_i_text,0.5,{scaleY:1,ease: "back.out(1.7)",rotation:"-=5"},">0.1")
 	tl.to(mc_i_text,0.5,{ease: "back.out(1.7)",rotation:"+=5"})

   return tl;
}



var musicNoteOneStop; 
var musicNoteTwoStop;
var musicNoteThreeStop;
 
 function secondFrame()
 {
 	// changeBG(sh.colours.lilac)
 	// changeColour(mc_sh_logo_badge,sh.colours.teal);

 }

 function thirdFrame()
 {
 	// changeBG(sh.colours.teal)
 	// changeColour(mc_sh_logo_badge,sh.colours.white);
 }

 function changeBG(colorChoice)
 {
 	changeColour(mc_backgrounds,colorChoice);
 }

function playNoteOne()
{
	musicNoteOneStop = requestAnimationFrame(moveNoteOne)
	fbf.show(mc_musical_note_one);
	gsap.delayedCall(0.5,playNoteTwo);
	gsap.delayedCall(1,playNoteThree);
}

function playNoteTwo()
{
		fbf.show(mc_musical_note_two);
	musicNoteTwoStop = requestAnimationFrame(moveNoteTwo)
}

function playNoteThree()
{
		fbf.show(mc_musical_note_three);
	musicNoteThreeStop = requestAnimationFrame(moveNoteThree)
}

function moveNoteOne(timestamp){
	 noteOneWobble++;
	 upOne++;
    leftpos = Math.sin(noteOneWobble*0.025)*noteOneWobble*0.5
   // gsap.set(mc_musical_note_one,{x:leftpos+100,rotation:leftpos,y:"-="+leftpos*0.025
    gsap.set(mc_musical_note_one,{x:leftpos+note_oneX,rotation:leftpos,y:"-="+upOne*0.05});  
    if(mc_musical_note_one._y < -50){cancelAnimationFrame(musicNoteOneStop)} else {
    	 requestAnimationFrame(moveNoteOne) // call requestAnimationFrame again to animate next frame
   }  
 }

function moveNoteTwo(timestamp){
	 noteTwoWobble++;
	 upTwo++;
    leftpos = Math.sin(noteTwoWobble*0.06)*noteTwoWobble
   // gsap.set(mc_musical_note_one,{x:leftpos+100,rotation:leftpos,y:"-="+leftpos*0.025
    gsap.set(mc_musical_note_two,{x:leftpos+note_twoX,rotation:leftpos,y:"-="+upTwo*0.06});  
    if(mc_musical_note_two._y < -50){cancelAnimationFrame(musicNoteTwoStop)} else {
    	 requestAnimationFrame(moveNoteTwo) // call requestAnimationFrame again to animate next frame
   }  
 }

 function moveNoteThree(timestamp){
	 noteThreeWobble++;
	 upThree++;
    leftpos = Math.sin(noteThreeWobble*0.07)*noteThreeWobble
   // gsap.set(mc_musical_note_one,{x:leftpos+100,rotation:leftpos,y:"-="+leftpos*0.025
    gsap.set(mc_musical_note_three,{x:leftpos+note_threeX,rotation:leftpos,y:"-="+upThree*0.07});  
    if(mc_musical_note_three	._y < -50){cancelAnimationFrame(musicNoteThreeStop)} else {
    	 requestAnimationFrame(moveNoteThree) // call requestAnimationFrame again to animate next frame
   }  
 }

// call requestAnimationFrame and pass into it animation function




function upNote()
{
	gsap.to(mc_musical_note_one,3,{y:"-=200",ease: 'expo.inOut'})
}

function animateTextOneIn()
{
	
	//var textLines = mc_text_one.children[0].children[0].children[0];
	//console.log(mc_text_one.children[0].children[0]);

	for (var i = 0; i < mc_text_one.children.length-2; i++) {
		mc_text_one.children[i].style.display = "block";
		mc_text_one.children[i].style.overflow = "hidden";
		 gsap.to(mc_text_one.children[i].children[0],1,{ease: 'expo.in',y:"-=100"});
					
	}

}

function clearMe()
{
		for (var i = 0; i < mc_text_two.children.length; i++) {
		mc_text_two.children[i].style.display = "block";
		mc_text_two.children[i].style.overflow = "visible";
		// gsap.to(mc_text_one.children[i].children[0],1,{ease: 'expo.in',y:"-=100"});
					
	}
}

function ctaGood()
{
	//buttonScale = mc_button._scaleX;
	allowButtonRollover = true;
}

function rollover(e) {
    if(allowButtonRollover) {
      fbf.hide(mc_cta_bgtwo,mc_findoutmoretext.children[1])
      fbf.show(mc_cta_bgone,mc_findoutmoretext.children[0])
 
     }
}

function rollout(e) {
    if(allowButtonRollover) {
    	fbf.hide(mc_cta_bgone,mc_findoutmoretext.children[0])
       fbf.show(mc_cta_bgtwo,mc_findoutmoretext.children[1])

    }
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