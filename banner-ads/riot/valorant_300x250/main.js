var onov = (window.location.href.indexOf("http://ocean") == 0 || window.location.href.indexOf("https://ocean") == 0);
var weLocal = window.location.protocol === "file:" || window.location.hostname == "localhost";

var ad = {
	width: 300,
	height: 250
}

var valorant = {
	colours: {
		navy:  '#0F1923',
		red:   '#FF4655',
		grey:  '#8B978F',
		white: '#ECE8E1',
		mint:  '#06ffc6'
	}
}

var isCTAdone = false;

function startBanner() {
	loadSvgs()
}

function loadSvgs() {
	fbf.loadSvgs(setupAd)
}

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
	console.log(fbf.logDom(_root));
	fbf.clean(_root)
	fbf.replaceSVGDefs()
	fbf.displayBlock(_root)
	_root.buttonMode = true
	_root.style.cssText += "overflow:hidden;"
	stopIEWobble(window.navigator.userAgent);
	

	_root.style.backgroundColor = valorant.colours.white
	keyline = addKeylineTo(_root, ad.width, ad.height, valorant.colours.red, 1) //<-- need to sort keyline

	setup()
}

function stopIEWobble(typeOfBrowser)
{
	var ua = typeOfBrowser;

	if (ua.indexOf('MSIE ')  >=  0 || ua.indexOf('Trident/') >= 0 || ua.indexOf('Edge/') >= 0) {
	    _root.style.cssText +="-webkit-transform:rotateZ(0.00001deg);-moz-transform:rotateZ(0.00001deg);-ms-transform:rotateZ(0.00001deg);-o-transform:rotateZ(0.00001deg);transform:rotateZ(0.00001deg);";
	} 
}

function setup() {
	// _root.addEventListener("click", handleClick)
	_root.addEventListener("click", handleClick);
	// setup button
	_root.addEventListener("mouseenter",cta_rollover);
	_root.addEventListener("mouseleave",cta_rollout);
	hideSections()
	startFlow()
}

function cta_rollover() {
	console.log("cta_rollover")
	if(isCTAdone){
		isCTAdone = false;
		for (var i = 1; i < mc_cta_bg.children.length; i++) {
		gsap.from(mc_cta_bg.children[i],{duration:0.25,delay:i*0.1,scaleX:0});
		}

		fbf.show(mc_cta.children[1],mc_cta.children[1].children[1],mc_cta.children[1].children[2])
		fbf.hide(mc_cta.children[1].children[0])
		gsap.from(mc_cta.children[1].children[1],{duration:0.5,x:"-=5",ease: "back.out(5)"});
		gsap.from(mc_cta.children[1].children[2],{duration:0.5,x:"+=5",ease: "back.out(5)"});
		gsap.delayedCall(0.5,finishCTA);
	}

	
	//mc_cta_bg._("path").setAttribute("fill","#ffffff");
	//mc_cta_text._("path").setAttribute("fill","#000000");
}

function cta_rollout() {
	console.log("cta_rollout");
	//mc_cta_bg._("path").setAttribute("fill","#000000");
	//mc_cta_text._("path").setAttribute("fill","#ffffff");
}

function hideSections() {
	fbf.hide(mc_characters,mc_valorant_logo,mc_cta,mc_rating,mc_riot,mc_smallprint,mc_pc_only,mc_intro);
}

/*$$$$$$\ $$\       $$$$$$\  $$\      $$\ 
$$  _____|$$ |     $$  __$$\ $$ | $\  $$ |
$$ |      $$ |     $$ /  $$ |$$ |$$$\ $$ |
$$$$$\    $$ |     $$ |  $$ |$$ $$ $$\$$ |
$$  __|   $$ |     $$ |  $$ |$$$$  _$$$$ |
$$ |      $$ |     $$ |  $$ |$$$  / \$$$ |
$$ |      $$$$$$$$\ $$$$$$  |$$  /   \$$ |
\__|      \________|\______/ \__/     \_*/
var flickBook;
var flickBookCounter = 0;

function startFlow() {
	setGrid()
	setLineLogo()
	//animate()
	flickBook = mc_intro.children[0];
	flickBookCounter = flickBook.children.length-1;
	gsap.from(mc_grid,{duration:1,alpha:0,y:"+=10"});
	gsap.delayedCall(0.75,letsGoToAnimationTown);
	
}

function letsGoToAnimationTown()
{
	fbf.show(mc_intro);
	gsap.from(mc_intro,{duration:0.25,alpha:0});
	animateGrid();
	animateIntro(flickBookCounter);
}

function animateIntro(flickCounter)
{
	
	if(flickCounter<0){
		animate()
	} else {
		if(flickCounter == 20)
		{
			mc_curtain._("path").setAttribute("fill","#FF4655");
			gridColorChange("#0F1923");
			//for (var i = 0; i < flickBook.children.length; i++) {
			
		}
		for (var i = 0; i < flickBook.children.length; i++) {
			fbf.hide(flickBook.children[i]);

		}
		fbf.show(flickBook.children[flickCounter]);
		gsap.delayedCall(0.02,animateIntro,[flickCounter-1]);
	}

}

function setGrid()
{
		// gsap.from(mc_grid.children[4],{duration:2,x:"-=18",delay:2});
	 // gsap.from(mc_grid.children[1],{duration:2,x:"-=18",delay:2});
	// gsap.from(mc_grid.children[2],{duration:2,y:293,delay:1});
	// gsap.from(mc_grid.children[4],{duration:1,y:220,delay:2});
	// gsap.from(mc_grid.children[5],{duration:1,y:220,delay:2});

	//mc_grid.children[9].style.overflow = "hidden";
	// gsap.from(mc_grid.children[9],{duration:1,scaleX:0,delay:2});
	// gsap.from(mc_grid.children[8],{duration:1,scaleX:0,delay:2});
	// gsap.from(mc_grid.children[7],{duration:1,scaleX:0,delay:2});
	// gsap.from(mc_grid.children[6],{duration:1,scaleX:0,delay:2});
	//gsap.set(mc_grid.children[5],{x:"+=18"});
	//gsap.set(mc_grid.children[4],{x:"-=18"});
	//gsap.set(mc_grid.children[1],{x:"-=18"});
	gsap.set(mc_grid_pointer,{y:"+=40"});
	gsap.set(mc_grid.children[6],{x:"-=14"});
	//gsap.set(mc_grid_pointer,{y:200});
}

function gridColorChange(colourChange)
{
	for (var i = 0; i < mc_grid.children.length; i++) {
		//Things[i]
		mc_grid.children[i]._("path").setAttribute("fill",colourChange);
	}
}

function setLineLogo()
{
	
	gsap.set(mc_val_outlinelogo,{alpha:0.3});
}

function animate() {
	gsap.to(mc_curtain,{duration:0.5,alpha:0});
	
	gsap.delayedCall(0.5,animateLogo);
	gridColorChange("#FF4655");
	//animateLogo()
	animateStoneBg()
	animateBGVs()
	animateOutlineLogo()
	animateRectangleKick()
	animateDtl(1.5)
		
	gsap.delayedCall(0.25,animateCharacter);
	gsap.delayedCall(1,animateFooter);
	gsap.delayedCall(2.25,animateCTA);
	
//	gsap.from(mc_rating, {
		
//	})
}

function animateFooter()
{
	console.log("animateFooter");
	fbf.show(mc_riot,mc_rating,mc_smallprint,mc_pc_only);
	gsap.from(mc_riot,{duration:1,alpha:0});
	gsap.from(mc_rating,{duration:1,alpha:0});
	gsap.from(mc_smallprint,{duration:1,alpha:0});
	gsap.from(mc_pc_only,{duration:1,alpha:0});
}

function animateCTA()
{
	console.log("animateCTA");
	fbf.show(mc_cta);
	fbf.hide(mc_cta.children[1])
	//gsap.from(mc_cta,{duration:1,scale:1.2,ease: "power3.out"});
	for (var i = 0; i < mc_cta_bg.children.length; i++) {
		gsap.from(mc_cta_bg.children[i],{duration:0.25,delay:i*0.1,scaleX:0});
	}

	gsap.delayedCall(0.25,kinkCTAText);

	
	//gsap.from(mc_cta.children[1].children[2],{duration:0.25,delay:1,x:-10});
	// gsap.from(mc_cta_bg.children[0],{duration:0.25,scaleX:0,ease: "power3.out"});
	// gsap.from(mc_cta_bg.children[1],{duration:0.25,scaleX:0,ease: "power3.out"});
	// gsap.from(mc_cta_bg.children[2],{duration:0.25,scaleX:0,ease: "power3.out"});
	// gsap.from(mc_cta_bg.children[3],{duration:0.25,scaleX:0,ease: "power3.out"});
}

function kinkCTAText()
{
	// mc_cta.children[1].children[0]._("path").setAttribute("fill","#ECE8E1");
	// mc_cta.children[1].children[1]._("path").setAttribute("fill","#ECE8E1");
	// mc_cta.children[1].children[2]._("path").setAttribute("fill","#ECE8E1");

	fbf.show(mc_cta.children[1])
	fbf.hide(mc_cta.children[1].children[0])
	gsap.from(mc_cta.children[1].children[1],{duration:0.5,x:-5,ease: "back.out(5)"});
	gsap.from(mc_cta.children[1].children[2],{duration:0.5,x:+5,ease: "back.out(5)"});
	gsap.delayedCall(0.5,finishCTA);
}

function finishCTA()
{
	console.log("finishCTA");
	// mc_cta.children[1].children[0]._("path").setAttribute("fill","#FF4655");
	// mc_cta.children[1].children[1]._("path").setAttribute("fill","#FF4655");
	// mc_cta.children[1].children[2]._("path").setAttribute("fill","#FF4655");
	fbf.show(mc_cta.children[1].children[0])
	fbf.hide(mc_cta.children[1].children[1])
	fbf.hide(mc_cta.children[1].children[2])
	isCTAdone = true;
}

function animateCharacter()
{
	fbf.show(mc_characters);
	fbf.hide(mc_border);
	
	//duplicateCharacter(mc_choose_your_fighter)
	//mc_characters.children[0].style.overflow = "hidden";
//	mc_characters.children[1].style.overflow = "hidden";
	//mc_characters.children[0].style.height = "200px";
	//mc_characters.children[1].style.height = "250px";
	//gsap.from(mc_characters,{duration:0.25,scale:1.1,transformOrigin:"50% 20%"});
	//rotation:0.01,yoyo:true,repeat:-1, ease:Linear.easeNone, force3D:true
	gsap.set(mc_characters.children[0],{x:-10,rotation:0.01, force3D:true});
	gsap.from(mc_characters.children[0],{duration:0.25,x:-20,alpha:0,rotation:0.01, force3D:true});
	gsap.to(mc_characters.children[0],{duration:5,x:+10,delay:0.25,rotation:0.01, force3D:true});
	//gsap.from(mc_characters.children[1],{duration:0.5,x:+20,alpha:0});
	
}

function duplicateCharacter(divID)
{
	var divToClone = divID
	var clone = divToClone.cloneNode(true);
	divID.parentElement.appendChild(clone);
}

function animateGrid()
{
	console.log("animateGrid");
	//console.log("animateGrid");
	//gsap.from(mc_grid,{duration:0.5,scale:1.5,transformOrigin:"50% 50%",});
	gsap.to(mc_grid.children[4],{duration:2,x:"+=18",delay:2});
	gsap.to(mc_grid.children[6],{duration:2,x:"+=14",delay:2});
	gsap.to(mc_grid.children[1],{duration:2,x:"+=18",delay:2});
	gsap.to(mc_grid.children[8],{duration:2,y:"+=18",delay:3});
	gsap.to(mc_grid.children[5],{duration:2,x:"-=18",delay:3});
	gsap.to(mc_grid_pointer,{duration:2,y:"-=40",delay:2});
		//gsap.set(mc_grid_pointer,{y:"+=40"});
	// gsap.from(mc_grid.children[2],{duration:2,y:293,delay:1});
	// gsap.from(mc_grid.children[4],{duration:1,y:220,delay:2});
	// gsap.from(mc_grid.children[5],{duration:1,y:220,delay:2});
	//gsap.to(mc_grid_pointer,{duration:1,y:130,delay:2});
	//mc_grid.children[9].style.overflow = "hidden";
	// gsap.from(mc_grid.children[9],{duration:1,scaleX:0,delay:2});
	// gsap.from(mc_grid.children[8],{duration:1,scaleX:0,delay:2});
	// gsap.from(mc_grid.children[7],{duration:1,scaleX:0,delay:2});
	// gsap.from(mc_grid.children[6],{duration:1,scaleX:0,delay:2});

	//gsap.from(mc_grid_pointer,{duration:1,y:"-=80",delay:2});
}



function animateRectangleKick()
{
	console.log("animateRectangleKick");
	mc_rectanglekink.style.overflow = "hidden";
	gsap.from(mc_rectanglekink,{duration:1,height:"0px",delay:1});
}

function animateDtl(del)
{
	gsap.set(mc_defylimit_bug,{alpha:0});
	gsap.from(mc_defylimit_line,{duration:0.25,scaleX:0,delay:del});
	gsap.to(mc_defylimit_bug,{duration:0.25,alpha:1,delay:del+0.25,yoyo:"true"});
	gsap.from(mc_defylimit_bug,{duration:0.25,x:+10,delay:del+0.25});
	gsap.from(mc_defylimit_text,{duration:0.5,x:"-=5",alpha:0,delay:del+0.25, ease:"expo.out"});

}

function animateOutlineLogo()
{
	gsap.from(mc_val_outlinelogo,{duration:10,x:"+=100",rotation:0.01, force3D:true});
	
}

function animateStoneBg()
{
	console.log("animateStoneBg");
	gsap.from(mc_stone_bg,{duration:10,x:-100,rotation:0.01, force3D:true});
}

function animateBGVs()
{
	console.log("animateBGVs");
	gsap.from(mc_vleft_bg,{duration:0.5,x:-1150,y:-1650, ease: "slow(0.7, 0.7, false)",rotation:0.01, force3D:true});
	gsap.from(mc_vleft_mintbg,{duration:0.25,x:-1150,y:-1650, ease: "slow(0.7, 0.7, false)",rotation:0.01, force3D:true});
	//gsap.from(mc_vright_bg,{duration:1,x:+100});
	gsap.from(mc_vright_bg,{duration:0.7,x:+1120,y:-1550, ease: "slow(0.7, 0.7, false)",rotation:0.01, force3D:true/*ease: "back.out(1.1)"*/});
	gsap.from(mc_vright_mintbg,{duration:0.5,x:+1120,y:-1550, ease: "slow(0.7, 0.7, false)",rotation:0.01, force3D:true	/*ease: "back.out(1.1)"*/});
	gsap.from(mc_vright_redbg,{duration:0.25,x:+1120,y:-1550, ease: "slow(0.7, 0.7, false)",rotation:0.01, force3D:true	/*ease: "back.out(1.1)"*/});
}

function duplicate(element) {
	var newElement = element.cloneNode(true)
	newElement.id = element.id + '_copy'
	// element.parentNode.appendChild(newElement)
	element.parentNode.insertBefore(newElement, element)
	
	gsap.set(newElement.getElementsByTagName('path'), {
		fill: valorant.colours.mint
	})
}


function animateLogo() {
	var ease = "power3.out"
	fbf.show(mc_valorant_logo);
	gsap.from(mc_valorant_logo,{duration:0.5,alpha:0});
	//gsap.from(mc_valorant_logo,{duration:0.25,scale:1.1,transformOrigin:"50% 50%"});
	fbf.show(mc_valorant_logo.children)

	duplicate(logo_letter_1)
	duplicate(logo_letter_2)
	duplicate(logo_letter_3)
	duplicate(logo_letter_4)
	duplicate(logo_letter_5)
	duplicate(logo_letter_6)
	duplicate(logo_letter_7)
	duplicate(logo_letter_8)

	var logo = mc_valorant_logo
	// letter 1 (v)
	var letter1sections = logo_letter_1.getElementsByTagName('path')
	// letter 2 (a)
	var letter2sections = logo_letter_2.getElementsByTagName('path')
	// letter 3 (l)
	var letter3sections = logo_letter_3.getElementsByTagName('path')
	// letter 4 (o)
	var letter4sections = logo_letter_4.getElementsByTagName('path')
	// letter 5 (r)
	var letter5sections = logo_letter_5.getElementsByTagName('path')
	// letter 6 (a)
	var letter6sections = logo_letter_6.getElementsByTagName('path')
	// letter 7 (n)
	var letter7sections = logo_letter_7.getElementsByTagName('path')
	// letter 8 (t)
	var letter8sections = logo_letter_8.getElementsByTagName('path')

	// animate v
	var timeline1 = gsap.timeline()
		timeline1.from(letter1sections[1], {duration: 0.5, x: 20, scaleX: 3, ease: ease})
		timeline1.from(letter1sections[4], {duration: 0.5, x: -8, y: 10, ease: ease}, "<")
		timeline1.from(letter1sections[0], {duration: 0.5, x: -20, scaleX: 10, transformOrigin: '100% 0%', ease: ease}, "<")
		timeline1.from(letter1sections[2], {duration: 0.5, x: -40, scaleX: 10, transformOrigin: '100% 0%', ease: ease}, "-=0.25")	
	// animate a
	var timeline2 = gsap.timeline()
		timeline2.from(letter2sections[0], {duration: 0.5, x: -20, y: 25, ease: ease})
		timeline2.from(letter2sections[2], {duration: 0.5, scaleY: 0, ease: ease}, "-=0.2")
		timeline2.from(letter2sections[1], {duration: 0.3, scaleX: 0, scaleY: 0, transformOrigin: '100% 50%', ease: ease}, "-=0.3")
	// animate l
	var timeline3 = gsap.timeline()
		timeline3.from(letter3sections[0], {duration: 0.5, x: '+=10', scaleX: 1.2, ease: ease})
	// animate o
	var timeline4 = gsap.timeline()
		timeline4.from(letter4sections[0], {duration: 0.75, x: -2, scaleX: 1.1, transformOrigin: '100% 50%'})
		timeline4.from(letter4sections[1], {duration: 0.75, x: 2, scaleX: 1.1, transformOrigin: '0% 50%'}, "<")
	// animate r
	var timeline5 = gsap.timeline()
		timeline5.from(letter5sections[0], {duration: 0.5, x: '-=5', ease: "power3.out"})
	// animate a
	var timeline6 = gsap.timeline()
		timeline6.from(letter6sections[0], {duration: 0.5, x: 20, y: 25, ease: ease})
		timeline6.from(letter6sections[2], {duration: 0.5, scaleY: 0, ease: ease}, "-=0.3")
		timeline6.from(letter6sections[1], {duration: 0.3, scaleX: 0, scaleY: 0, transformOrigin: '0% 50%', ease: ease}, "-=0.3")
	// animate n
	var timeline7 = gsap.timeline()
		timeline7.set(letter7sections[1], {y: -30})
		timeline7.from(letter7sections[1], {duration: 0.5, x: '-=300', scaleX: 20, ease: ease})
		timeline7.to(letter7sections[1], {duration: 0.75, y: 0, ease: ease}, '+=0.25')
	// animate t
	var timeline8 = gsap.timeline()
		timeline8.from(letter8sections[2], {duration: 0.75, x: 30, scaleX: 2, ease: ease})
		timeline8.from(letter8sections[1], {duration: 0.5, y: -30, scaleY: 10, transformOrigin: '0% 100%', ease: ease}, '-=0.25')
		timeline8.from(letter8sections[0], {duration: 1.25, y: 30, scaleY: 10, ease: ease}, '-=0.5')

	// list sections to change colour to mint
	// var recolourSections = [letter1sections[0], letter3sections[0], letter4sections, letter6sections[0], letter6sections[2], letter7sections[1], letter8sections[0]]

	// gsap.set(recolourSections, {
	// 	fill: valorant.colours.mint
	// })

	// for (var i = recolourSections.length - 1; i >= 0; i--) {
	// 	gsap.set(recolourSections[i], {
	// 		fill: valorant.colours.navy,
	// 		delay: gsap.utils.random(0.2, 0.5)
	// 	})
	// }
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
	var mc_endscreen = $('mc_endscreen');
		var mc_stone_bg = $('mc_stone_bg');
		var mc_v = $('mc_v');
			var mc_vleft_redbg = $('mc_vleft_redbg');
			var mc_vright_redbg = $('mc_vright_redbg');
			var mc_vleft_mintbg = $('mc_vleft_mintbg');
			var mc_vright_mintbg = $('mc_vright_mintbg');
			var mc_vleft_bg = $('mc_vleft_bg');
			var mc_vright_bg = $('mc_vright_bg');
		var mc_defylimit_horizontal = $('mc_defylimit_horizontal');
			var mc_defylimit_bug = $('mc_defylimit_bug');
			var mc_defylimit_text = $('mc_defylimit_text');
			var mc_defylimit_line = $('mc_defylimit_line');
		var mc_val_outlinelogo = $('mc_val_outlinelogo');
		var mc_border_two = $('mc_border_two');
		var mc_characters = $('mc_characters');
			var mc_choose_your_fighter = $('mc_choose_your_fighter');
		var mc_valorant_logo = $('mc_valorant_logo');
			var logo_letter_8 = $('logo_letter_8');
			var logo_letter_7 = $('logo_letter_7');
			var logo_letter_6 = $('logo_letter_6');
			var logo_letter_5 = $('logo_letter_5');
			var logo_letter_4 = $('logo_letter_4');
			var logo_letter_3 = $('logo_letter_3');
			var logo_letter_2 = $('logo_letter_2');
			var logo_letter_1 = $('logo_letter_1');
		var mc_rating = $('mc_rating');
			var rating_english = $('rating_english');
				var pegi16_mc = $('pegi16_mc');
		var mc_pc_only = $('mc_pc_only');
		var mc_riot = $('mc_riot');
		var mc_smallprint = $('mc_smallprint');
			var mc_smlprint_uk = $('mc_smlprint_uk');
		var mc_cta = $('mc_cta');
			var mc_cta_bg = $('mc_cta_bg');
		var mc_rectanglekink = $('mc_rectanglekink');
	var mc_curtain = $('mc_curtain');
	var mc_grid = $('mc_grid');
		var mc_grid_smallsquare = $('mc_grid_smallsquare');
		var mc_grid_smallsquare = $('mc_grid_smallsquare');
		var mc_grid_smallsquare = $('mc_grid_smallsquare');
		var mc_grid_smallsquare = $('mc_grid_smallsquare');
		var mc_grid_smallsquare = $('mc_grid_smallsquare');
		var mc_grid_smallsquare = $('mc_grid_smallsquare');
		var mc_grid_smallsquare = $('mc_grid_smallsquare');
		var mc_grid_line = $('mc_grid_line');
		var mc_grid_line = $('mc_grid_line');
		var mc_grid_line = $('mc_grid_line');
		var mc_grid_line = $('mc_grid_line');
		var mc_grid_pointer = $('mc_grid_pointer');
	var mc_intro = $('mc_intro');
	var mc_border = $('mc_border');
