var onov = (window.location.href.indexOf("http://ocean") == 0 || window.location.href.indexOf("https://ocean") == 0);
var weLocal = window.location.protocol === "file:" || window.location.hostname == "localhost" || window.location.hostname.indexOf("172.16.") == 0;

var useDefaultClickThrough = true,
	useDynamicExit = false,

	WID = 300,
	HEI = 600,

	current_fence = 0,
	fences = [],

	current_furniture = 0,
	furniture = [],

	current_plant = 0,
	plants = [],

	config,

	mouse_is_over = false,

	useParallax = true,

	defaultClickURL = [{ productLabel:"intro", productURL:"https://www.diy.com/" }];

function setExits()
{
	Enabler.exit('default');  Enabler.exit('intro');  Enabler.exit('product1');  Enabler.exit('product2');  Enabler.exit('product3');
}

function startBanner() 
{
    loadJS(getConfigAssetPath(), loadBQ);
}

/*\       $$$$$$\   $$$$$$\  $$$$$$$\
$$ |     $$  __$$\ $$  __$$\ $$  __$$\
$$ |     $$ /  $$ |$$ /  $$ |$$ |  $$ |
$$ |     $$ |  $$ |$$$$$$$$ |$$ |  $$ |
$$ |     $$ |  $$ |$$  __$$ |$$ |  $$ |
$$ |     $$ |  $$ |$$ |  $$ |$$ |  $$ |
$$$$$$$$\ $$$$$$  |$$ |  $$ |$$$$$$$  |
\________|\______/ \__|  \__|\______*/

function loadBQ()
{
	loadJS('BQ2019.js', loadScripts);
}

function getConfigAssetPath()
{
	if(weLocal || onov)
	{
		logging = true;
		return "config.js";
	}
	else
	{
		return dc["asset_config"].Url;
	}
}

function loadScripts()
{
	if(weLocal || onov)
    {   
		loadSvgs();
	}
	else
	{
		loadJS([getAsset('asset_config')], loadSvgs);
	}
}

function loadSvgs()
{    
	if(weLocal || onov)
	{
		fbf.loadSvgs(setupAd); 
	}
	else
	{
		fbf.loadSvgs(setupAd,getAsset("dir_assets/svg.gz.js"));
	}
}

function reportConfig()
{
	for (key in config) {if(config.hasOwnProperty(key))log(key+" : "+config[key])};
}

/*$$$$$\  $$$$$$$$\ $$$$$$$$\ $$\   $$\ $$$$$$$\
$$  __$$\ $$  _____|\__$$  __|$$ |  $$ |$$  __$$\
$$ /  \__|$$ |         $$ |   $$ |  $$ |$$ |  $$ |
\$$$$$$\  $$$$$\       $$ |   $$ |  $$ |$$$$$$$  |
 \____$$\ $$  __|      $$ |   $$ |  $$ |$$  ____/
$$\   $$ |$$ |         $$ |   $$ |  $$ |$$ |
\$$$$$$  |$$$$$$$$\    $$ |   \$$$$$$  |$$ |
 \______/ \________|   \__|    \______/ \_*/

function setupAd() 
{
	logging = fbf.isLocal();
	reportConfig();
	log(fbf.logDom(_root));
	fbf.clean(_root);
	fbf.replaceSVGDefs();
	fbf.displayBlock(_root);
	_root.buttonMode = true;
	_root.style.cssText += "overflow:hidden;";
	var keyline = addKeylineTo(_root, WID, HEI, "#000000", 1);
	setup();
}

function setup()
{
	arrangeSections();
	setListeners();

	/* ADD PRODUCT IMAGES INTO ARRAYS */
	setupProductSet(mc_products_fences, fences);
	setupProductSet(mc_products_furniture, furniture);
	setupProductSet(mc_products_pots , plants);

	hideSections();

	setupGarden(); /* PUTS EVERYTHING IN PLACE READY FOR SHOWTIME */

	parallax(mc_garden_parallax_section, mc_sky, 30);

	setupSky(mc_sky);
}

function setListeners()
{
	//divID.addEventListener("click", bq.handleClick);
	bq.showUpToRoot(mc_button);

    //_root.addEventListener("click", handleClick);

    mc_button.addEventListener("click", handleClick);

    mc_button.addEventListener('mouseover', bq.ad_rollOver, false);
    mc_button.addEventListener('mouseout', bq.ad_rollOut, false);

	_root.addEventListener('mouseenter', function(){ mouse_is_over = true; } );
	_root.addEventListener('mouseleave', function(){ mouse_is_over = false; } );
}

function handleClick(event)
{
	console.log("\nhandleClick\n\n");

    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true; 
    var target = event.target || event.srcElement;
    var phase = event.eventPhase;

    if (useDefaultClickThrough)
    {
        clickLabel = defaultClickURL[0]["productLabel"];
        clickURL = defaultClickURL[0]["productURL"];
    }

    if (useDynamicExit && !fbf.isLocal && !demo) clickURL = dynamicExit;
    Enabler.exitOverride(clickLabel, clickURL);
}

function setInteractionListeners()
{
	_root.addEventListener('mouseenter', function()
    {
    	takeOutInstructionDialogue();
	});

    _root.addEventListener('mouseleave', function()
    {
		bringInInstructionDialogue();
	});
}

function arrangeSections()
{
	bq.setupIntroText(mc_intro_text);
	setupIntroTextSmall(mc_intro_text_small);

	var intro_text_width = mc_intro_text._width,
		intro_text_height = mc_intro_text._height;

	TweenMax.set(mc_intro_text, {x: (WID*0.5)-(intro_text_width*0.5)});
}

function hideSections()
{
	fbf.hide(mc_icons, mc_intro_text_small, mc_instruction_dialogue, mc_button);

	fbf.hide(fences, plants, furniture);
}

function setupSky(divID)
{
	var sky_div = document.createElement('div');
		sky_div.id = "sky_image_container";
		sky_div.className = "do";

	var sky_image = document.createElement('img');
		sky_image.setAttribute("src", getImageSRC("SKY.jpg"));
		sky_image.className = "do";
		sky_div.appendChild(sky_image);
		divID.appendChild(sky_div);

	sky_image.onload = function()
	{
		console.log("\nsky_image loaded. Continue...\n\n");

		var sky_image_width = 319;
	
		for (var i = 1 - 1; i >= 0; i--)
		{
			var a = i+1;
	
			var sky_image_clone = sky_image.cloneNode(true);
				sky_image_clone.id = "sky_image_container_clone_"+(a);
	
			divID.appendChild(sky_image_clone);
	
			TweenMax.set(sky_image_clone, {x: '+='+(a*sky_image_width)});
		}

		startFlow();
	}
}

function getImageSRC(item)
{
	var imageSRC;

	if(weLocal || onov)
    {   
		imageSRC = item;
    }
    else
    {
		imageSRC = getAsset("dir_assets/"+item);
    }

	log("\ngetImageForCanvas: "+imageSRC+"\n\n");

    return imageSRC;
}

function setupClickAreas()
{
	bq.showUpToRoot(mc_click_content);

	mc_icons.style.width = "0px";
	mc_icons.style.height = "0px";

	/* ADD EVENT LISTENERS TO EACH ICON BUTTON */
	for (var i = mc_icons.children.length - 1; i >= 0; i--)
	{
		var icon = mc_icons.children[i];
		icon.addEventListener("mouseenter", iconMouseover);
		icon.addEventListener("mouseleave", iconMouseleave);
	}

	var fence_click_elements = [mc_icon_fence, mc_click_area_fence];
	var furniture_click_elements = [mc_icon_furniture, mc_click_area_furniture];
	var pots_click_elements = [mc_icon_pot, mc_click_area_pots];

	for (var i = fence_click_elements.length - 1; i >= 0; i--)
	{
		fence_click_elements[i].addEventListener("click", function(event)
		{
			event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
			var target = event.target || event.srcElement;
			var phase = event.eventPhase;
	
			if(current_fence < fences.length-1)
			{
				current_fence++;
			}
			else
			{
				current_fence = 0;
			}
	
			toggleProduct(current_fence, fences, "swipe");
		});		
	}

	for (var i = furniture_click_elements.length - 1; i >= 0; i--)
	{
		furniture_click_elements[i].addEventListener("click", function(event)
		{
			event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
			var target = event.target || event.srcElement;
			var phase = event.eventPhase;
	
			if(current_furniture < furniture.length-1)
			{ current_furniture++; }
			else
			{ current_furniture = 0; }
	
			toggleProduct(current_furniture, furniture, "grow");
		});
	}

	for (var i = pots_click_elements.length - 1; i >= 0; i--)
	{
		pots_click_elements[i].addEventListener("click", function(event)
		{
			event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
			var target = event.target || event.srcElement;
			var phase = event.eventPhase;
	
			if(current_plant < plants.length-1)
			{ current_plant++; }
			else
			{ current_plant = 0; }
	
			toggleProduct(current_plant, plants, "drop");
		});
	}

	mc_click_area_random.addEventListener("click", function(event)
	{
		event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
		var target = event.target || event.srcElement;
		var phase = event.eventPhase;
	
		randomiseProducts({array: fences, current: "current_fence"}, {array: furniture, current: "current_furniture"}, {array: plants, current: "current_plant"});
	});	
}

function setupProductSet(divID, array)
{
	for (i = divID.children.length; i > 0; i--)
	{
		var product_image_div = divID.children[i-1].children[0];

		array.push(product_image_div);
	}
}

function iconMouseover()
{
	TweenMax.set(this, {scale: 1.1});
}

function iconMouseleave()
{
	TweenMax.set(this, {scale: 1});
}

function setupGarden()
{
	showFirst(fences);
	showFirst(furniture);
	showFirst(plants);
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
	animateIntro(1);

	//fbf.hide(mc_intro_text);
	//animateGarden(0);
}

function animateIntro(leaveTextDuration)
{
	console.log("\nanimateIntro\n\n");

	TweenMax.set(mc_frame_full, {alpha: 0, onComplete: function(){ fbf.hide(mc_frame_full); } });

	TweenMax.set(mc_frame_house, {scale: 4});

	var text_animation_speed = 0.75;

	var intro_text_lines = mc_intro_text.getElementsByTagName('g');

	for (var i = intro_text_lines.length - 1; i >= 0; i--)
	{
		var line = intro_text_lines[i];		
		TweenMax.from(line, text_animation_speed, {y: '+=10', alpha: 0, delay: i*0.25});
	}

	var text_finished_animating = (intro_text_lines.length*0.25)+text_animation_speed;
	TweenMax.delayedCall(text_finished_animating+leaveTextDuration, animateIntroOut);
}

function animateIntroOut()
{
	console.log("\nanimateIntroOut\n\n");

	TweenMax.to(mc_intro_text, 0.5, {alpha: 0});
	TweenMax.to(mc_frame_house, 1, {scale: 1, ease: Power4.easeInOut, transformOrigin: "0% 0%", delay: 0.5});
	//TweenMax.to(mc_frame_full, 1, {alpha: 0, delay: 0.5, onComplete: function(){ fbf.hide(mc_frame_full); }});

	animateGarden(1.5);
}

function animateGarden(delay)
{
	console.log("\nanimateGarden\n\n");

	fbf.show(mc_intro_text_small, mc_button);

	//TweenMax.to(mc_frame_full, 1, {alpha: 0, ease: Power3.easeOut, onComplete: function(){ fbf.hide(mc_frame_full); } });

	//TweenMax.from(mc_garden_content, 2, {scale: 1.1, transformOrigin: "50% 30%", ease: Power2.easeOut});

	var width_of_all_skies = getTotalWidth(mc_sky);

	TweenMax.to(mc_sky.children, 20, {x: '-='+(WID*0.5), ease: Power1.Out});	

	TweenMax.from(mc_intro_text_small, 0.75, {alpha: 0, delay: delay});

	TweenMax.from(mc_button, 0.75, {alpha: 0, delay: delay});

	TweenMax.delayedCall(delay+0.0, runthrough, [fences, 0.4]);
	TweenMax.delayedCall(delay+0.25, runthrough, [furniture, 0.4]);
	TweenMax.delayedCall(delay+0.5, runthrough, [plants, 0.4]);

	TweenMax.delayedCall(delay+3, bringInIcons);
	TweenMax.delayedCall(delay+2, bringInInstructionDialogue);

	TweenMax.delayedCall(delay+3.5, setInteractionListeners);
	TweenMax.delayedCall(delay+3.5, setupClickAreas);
}

function getTotalWidth(divID)
{
	var width = 0;

	for (var i = divID.children.length - 1; i >= 0; i--)
	{
		var w = divID.children[i]._width;
		width = width+w;
	}

	return width;
}

function bringInIcons()
{
	fbf.show(mc_icons);

	for (var i = mc_icons.children.length - 1; i >= 0; i--)
	{
		TweenMax.from(mc_icons.children[i], 0.35, {scale: 0, ease: Back.easeOut.config(2), delay: i*0.25});
	}
}

function bringInInstructionDialogue()
{
	console.log("\nbringInInstructionDialogue\n\n");

	if(!mouse_is_over)
	{
		fbf.show(mc_instruction_dialogue);
		fbf.displayBlock(mc_instruction_dialogue);

		TweenMax.killTweensOf(mc_instruction_dialogue);		
		TweenMax.fromTo(mc_instruction_dialogue, 1, {alpha: 0, y: 320}, {alpha: 1, y: 320, delay: 2, ease: Power2.easeOut});
	}
}

function takeOutInstructionDialogue()
{
	console.log("\ntakeOutInstructionDialogue\n\n");

	TweenLite.killTweensOf(mc_instruction_dialogue);
	TweenMax.to(mc_instruction_dialogue, 0.5, {y: 300, alpha: 0, ease: Power2.easeOut, onComplete: function(){ fbf.displayNone(mc_instruction_dialogue); }});
}

function showFirst(array)
{
	fbf.show(array[0]);
}

function runthrough(array, speed)
{
	for (var i = array.length - 1; i >= 0; i--)
	{
		TweenMax.delayedCall(i*speed, fbf.show, [array[i]]);
		TweenMax.delayedCall((i*speed)+speed, fbf.hide, [array[i]]);

		/* SHOW THE LAST ONE AGAIN */
		if(i == 0)
		{
			TweenMax.delayedCall(array.length*speed, fbf.show, [array[i]]);
		}
	}
}

function randomiseProducts()
{
	for (var i = arguments.length - 1; i >= 0; i--)
	{
		var array = arguments[i].array;
		var current = arguments[i].current;

		if(arguments[i].current == "current_fence")
		{
			TweenMax.set(array, {x: -160})
		};

		var random_number = Math.floor(Math.random() * array.length);

		showProduct(array, current, random_number);
	}
}

function showProduct(array, current_var_to_update, random_number)
{
	fbf.show(array); fbf.hide(array);

	fbf.show(array[random_number]);

	window[current_var_to_update] = random_number;
}

function toggleProduct(product_counter, array, animation)
{
	var new_product = product_counter;
	fbf.show(array[new_product]);

	var current_product = product_counter-1;

	if(animation=="grow")
	{
		if(product_counter > 0)
		{
			fbf.hide(array[current_product]);
		}
		else
		{
			fbf.hide(array[array.length-1]);
		}

		TweenMax.from(array[new_product], 0.25, {scale: 0.9, ease: Back.easeOut.config(2), transformOrigin: "50% 50%"});
	}
	else if(animation=="swipe")
	{
		fbf.hide(array);

		if(product_counter > 0)
		{
			fbf.show(array[current_product], array[new_product]);
		}
		else
		{
			fbf.show(array[array.length-1], array[new_product]);			
		}

		if(product_counter > 0)
		{
			TweenMax.fromTo(array[current_product], 0.25, {x: -160}, {x: -((WID*1.5)+20), ease: Power1.easeOut, onComplete: function(){ fbf.hide(array[current_product]); }});
			TweenMax.fromTo(array[new_product], 0.25, {x: -160+(WID+20)}, {x: -160, ease: Power1.easeOut});
		}
		else
		{
			TweenMax.fromTo(array[array.length-1], 0.25, {x: -160}, {x: -((WID*1.5)+20), ease: Power1.easeOut});
			TweenMax.fromTo(array[new_product], 0.25, {x: -160+(WID+20)}, {x: -160, ease: Power1.easeOut});
		}
	}
	else if(animation=="drop")
	{
		if(product_counter > 0)
		{
			fbf.hide(array[current_product]);
		}
		else
		{
			fbf.hide(array[array.length-1]);
		}

		TweenMax.from(array[new_product], 0.2, {y: '-=35', ease: Power1.easeIn});
	}
}

function parallax(div1, div2, intensity)
{
    console.log("%c\n useParallax: "+useParallax+" \n", 'background: #000000; color: #FFFFFF');

    if(useParallax)
    {
    	onmousemove = function (event)
    	{
      		event = event || window.event;

      		var x = event.clientX - (WID*0.5);

      		//console.log(x);

      		var obj 			= div1;
      		var parentObj 		= obj.parentNode,

      		containerWidth 		= parseInt( parentObj.offsetWidth ),
      		containerHeight 	= parseInt( parentObj.offsetHeight );

      		TweenMax.to(div1, 1, {x: -x/intensity, transformOrigin: "50% 50%", ease: Power2.easeOut, delay: 0.05});
      		TweenMax.to(div2, 1, {x: -x/(intensity*2.5), transformOrigin: "50% 50%", ease: Power2.easeOut, delay: 0.05});
    	}

  	}
}

function getOffset(el)
{
    var _x = 0;
    var _y = 0;

    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) )
    {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }

    return { top: _y, left: _x };
}

/*$$$$$\  $$$$$$$\   $$$$$$\  $$$$$$$\  $$\   $$\  $$$$$$\ $$$$$$$$\  $$$$$$\
$$  __$$\ $$  __$$\ $$  __$$\ $$  __$$\ $$ |  $$ |$$  __$$\\__$$  __|$$  __$$\
$$ |  $$ |$$ |  $$ |$$ /  $$ |$$ |  $$ |$$ |  $$ |$$ /  \__|  $$ |   $$ /  \__|
$$$$$$$  |$$$$$$$  |$$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |        $$ |   \$$$$$$\
$$  ____/ $$  __$$< $$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |        $$ |    \____$$\
$$ |      $$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |  $$\   $$ |   $$\   $$ |
$$ |      $$ |  $$ | $$$$$$  |$$$$$$$  |\$$$$$$  |\$$$$$$  |  $$ |   \$$$$$$  |
\__|      \__|  \__| \______/ \_______/  \______/  \______/   \__|    \______*/



/*$$$$$\ $$\     $$\ $$\   $$\  $$$$$$\  $$\      $$\ $$$$$$\  $$$$$$\  
$$  __$$\\$$\   $$  |$$$\  $$ |$$  __$$\ $$$\    $$$ |\_$$  _|$$  __$$\ 
$$ |  $$ |\$$\ $$  / $$$$\ $$ |$$ /  $$ |$$$$\  $$$$ |  $$ |  $$ /  \__|
$$ |  $$ | \$$$$  /  $$ $$\$$ |$$$$$$$$ |$$\$$\$$ $$ |  $$ |  $$ |      
$$ |  $$ |  \$$  /   $$ \$$$$ |$$  __$$ |$$ \$$$  $$ |  $$ |  $$ |      
$$ |  $$ |   $$ |    $$ |\$$$ |$$ |  $$ |$$ |\$  /$$ |  $$ |  $$ |  $$\ 
$$$$$$$  |   $$ |    $$ | \$$ |$$ |  $$ |$$ | \_/ $$ |$$$$$$\ \$$$$$$  |
\_______/    \__|    \__|  \__|\__|  \__|\__|     \__|\______| \_____*/ 

function setupDescriptions()
{
	var description_1_div = mc_nom_1_description,
		description_2_div = mc_nom_2_description,
		description_3_div = mc_nom_3_description;

	var description_1 = products[0].description;
	var description_2 = products[1].description;
	var description_3 = products[2].description;

	bq.dynamicDescription(description_1_div, description_1);
	bq.dynamicDescription(description_2_div, description_2);
	bq.dynamicDescription(description_3_div, description_3);
}

function setupPrices()
{
	var price_1_div = mc_nom_1_price,
		price_2_div = mc_nom_2_price,
		price_3_div = mc_nom_3_price;

	var price_1 = products[0].price;
	var price_2 = products[1].price;
	var price_3 = products[2].price;

	bq.dynamicPrice(price_1_div, price_1);
	bq.dynamicPrice(price_2_div, price_2);
	bq.dynamicPrice(price_3_div, price_3);
}


function setupIntroTextSmall(divToPutTextIn, contains_question)
{
	var tfFont = "GoodHome_Bold_GFX";

	var text = introTextSmall[0].text;
	var size = introTextSmall[0].size;
	var lineHeight = introTextSmall[0].lineHeight;
	var colour1 = introTextSmall[0].colour1;
	var colour2 = introTextSmall[0].colour2;
	var colourOrder = introTextSmall[0].colourOrder;

	divToPutTextIn.innerHTML = "";

	var intro_text_tf = TextField(tfFont, text, size, 0, lineHeight, "left", colour1);
		intro_text_tf.id = "intro_text_tf";
	
	divToPutTextIn.appendChild(intro_text_tf);

	var intro_text_lines = divToPutTextIn.getElementsByTagName('g');

	for (var i = intro_text_lines.length - 1; i >= 0; i--)
	{
		var line = divToPutTextIn.getElementsByTagName('g')[i];
	
		if(colourOrder[i]==1)
		{
			bq.updateColor(line, colour1);
		}
		else
		{
			bq.updateColor(line, colour2);
		}
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
	var mc_garden_content = $('mc_garden_content');
		var mc_sky = $('mc_sky');
		var mc_garden_parallax_section = $('mc_garden_parallax_section');
			var mc_products_fences = $('mc_products_fences');
				var mc_fence_3 = $('mc_fence_3');
				var mc_fence_2 = $('mc_fence_2');
				var mc_fence_1 = $('mc_fence_1');
			var mc_grass = $('mc_grass');
			var mc_products_furniture = $('mc_products_furniture');
				var mc_furniture_5 = $('mc_furniture_5');
				var mc_furniture_4 = $('mc_furniture_4');
				var mc_furniture_3 = $('mc_furniture_3');
				var mc_furniture_2 = $('mc_furniture_2');
				var mc_furniture_1 = $('mc_furniture_1');
			var mc_products_pots = $('mc_products_pots');
				var mc_pot_5 = $('mc_pot_5');
				var mc_pot_4 = $('mc_pot_4');
				var mc_pot_3 = $('mc_pot_3');
				var mc_pot_2 = $('mc_pot_2');
				var mc_pot_1 = $('mc_pot_1');
		var mc_instruction_dialogue = $('mc_instruction_dialogue');
	var mc_frame = $('mc_frame');
		var mc_frame_house = $('mc_frame_house');
			var mc_intro_text_small = $('mc_intro_text_small');
	var mc_intro_text = $('mc_intro_text');
	var mc_logo = $('mc_logo');
	var mc_click_content = $('mc_click_content');
		var mc_click_areas = $('mc_click_areas');
			var mc_click_area_random = $('mc_click_area_random');
			var mc_click_area_pots = $('mc_click_area_pots');
			var mc_click_area_furniture = $('mc_click_area_furniture');
			var mc_click_area_fence = $('mc_click_area_fence');
		var mc_button = $('mc_button');
		var mc_icons = $('mc_icons');
			var mc_icon_pot = $('mc_icon_pot');
			var mc_icon_furniture = $('mc_icon_furniture');
			var mc_icon_fence = $('mc_icon_fence');
	var mc_frame_full = $('mc_frame_full');