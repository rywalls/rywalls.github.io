//destiny branding
var initLogoScaleX;
var initLogoScaleY;
var initLogoY;
var vidreplayInitScale;
var ButtonSizeInfo;

var fontArray = [
					{buttonFont:"buttonTextGFX"}, //= fontArray[0]["buttonFont"]
					{dateFont:"dateFontGFX", dateKerning:0.05},	  //= fontArray[1]["dateKerning"]//fontArray[1]["dateFont"]//Math.floor(tfTextSize*0.15)
					{straplineFont:"dateFontGFX"} //= fontArray[2]["straplineFont"]
				]



var svgNS = "http://www.w3.org/2000/svg"; //svginfo

var strapCounter = 0;
var straplineWidPark = 0;

var python = {	
	//Should I add an empty emergency function here so we can overide stuff?

	emergencyOverride:function(){
	/*incase anything needs to be updated - this gets called after all things loaded*/
	//console.log("99999999999999999999999999999999999999999999999999999999999999999999THIS IS python");
	log("python.emergencyOverride");
	},

	stopIEWobble:function (typeOfBrowser){
	  log("stopIEWobble");
	   var ua = typeOfBrowser;
	    if (ua.indexOf('MSIE ')  >=  0 || ua.indexOf('Trident/') >= 0 || ua.indexOf('Edge/') >= 0) {
	    _root.style.cssText +="-webkit-transform:rotateZ(0.00001deg);-moz-transform:rotateZ(0.00001deg);-ms-transform:rotateZ(0.00001deg);-o-transform:rotateZ(0.00001deg);transform:rotateZ(0.00001deg);";
	  }  
	},
	sortVideoLogo:function(divID,divToClone)
	{
	  log("--------------------------------------------------------sortVideoLogo");
	  var vidwatermark = divToClone.cloneNode(true);
	  vidwatermark.id = "vidwatermark";
	  divID.innerHTML = "";
	  divID.appendChild(vidwatermark);

	 var xVidLogoPos = parseInt(divID.children[0].style.width.split("px")[0]);
	 var yVidLogoPos = parseInt(divID.children[0].style.height.split("px")[0]);

	  TweenMax.set(divID.children[0],{x:-xVidLogoPos,y:-yVidLogoPos});
	  TweenMax.set(divID.children[0],{x:0,y:0});
	  //mc_vid_logo
	},
	//-----------------------------------------------------------------FONT IN DIVS
	straplineFontSetup:function(divID,textArray,langChoice) //how to centre this
	  {
	     log("------------STRAPLINE----------------------------------------------------");	     
	     log(langChoice);
	     if(langChoice == "pl" || langChoice == "ru" || langChoice == "uaear")
	     {
	     	log("SHOULD BE GOING THROUGH THIS ONE --------------------------------------------------------------");
	     	 python.webFontRouteSetup(divID,textArray,"straplineText",langChoice);
	     } 
	     else
	     {
	     	 divID.innerHTML = ""; 
		    // divID.style.backgroundColor = "#aa0000";
		     divWidth = parseInt(divID.style.width.split("px")[0]);
		     for (var i = 0; i < textArray.length; i++) {
		           // textArray[i]
		           strapCounter++;
		            var tffont = fontArray[2]["straplineFont"];
		            var tfText = textArray[i]['strapText'];
		            var tfTextSize = textArray[i]['strapFontSize'];
		            var tfLineHeight = textArray[i]['strapLineHeight'];
		            var tfColor = textArray[i]['strapColour'];   
		            var tfDateEffect = textArray[i]['dateEffect'];     
		            var tf = TextField(tffont,tfText,tfTextSize,0,tfLineHeight,"center",tfColor);   
		            tf.id = "text_"+strapCounter;  
		             divID.appendChild(tf); 
		            if(textArray[i]['dateEffect'] != undefined)
		            { 
		                if(textArray[i]['datePost'])
		                {
		                  postDateElements.push(tf);
		                } else {
		                   preDateElements.push(tf);
		                }
		            }
		            tf._x = -Math.round(parseInt(tf._("svg").getAttribute("width"))) * 0.5;
		            tf._y = -Math.round(parseInt(tf._("svg").getAttribute("height"))) * 0.5;
		            log(tfDateEffect);
		     }
	     } 

	    
	  },

	  	AccoladeFontSetup:function(divID,textArray,langChoice,inbetween) //how to centre this
	  {
	     log("------------STRAPLINE----------------------------------------------------");	     
	     log(langChoice);
	     if(langChoice == "pl" || langChoice == "ru" || langChoice == "uaear")
	     {
	     	log("SHOULD BE GOING THROUGH THIS ONE --------------------------------------------------------------");
	     	 python.webFontRouteSetup(divID,textArray,"straplineText",langChoice);
	     } 
	     else
	     {
	     	 divID.innerHTML = ""; 
		    // divID.style.backgroundColor = "#aa0000";
		     divWidth = parseInt(divID.style.width.split("px")[0]);
		     for (var i = 0; i < textArray.length; i++) {
		           // textArray[i]
		           strapCounter++;
		            var tffont 				= "arvofontGFX";

		            var tfText 				= textArray[i]['strapText'];
		            var tfTextSize 			= textArray[i]['strapFontSize'];
		            var tfLineHeight 		= textArray[i]['strapLineHeight'];
		            var tfColor 			= textArray[i]['strapColour'];   
		            //
		            var tfAuthText 			= textArray[i]['strapTextAuthor'];
		            var tfAuthTextFtSize 	= textArray[i]['strapTextAuthorFontSize'];
		            var tfAuthTextColour 	= textArray[i]['strapTextAuthorColour'];



		            var tfDateEffect = textArray[i]['dateEffect'];     
		            var tf = TextField(tffont,tfText,tfTextSize,0,tfLineHeight,"center",tfColor);   
		            var tfa = TextField(tffont,tfAuthText,tfAuthTextFtSize,0,tfLineHeight,"center",tfAuthTextColour);   
		            tf.id = "text_"+strapCounter;  
		             tfa.id = "text_author_"+strapCounter;
		             divID.appendChild(tf); 
		             divID.appendChild(tfa);
		            if(textArray[i]['dateEffect'] != undefined)
		            { 
		                if(textArray[i]['datePost'])
		                {
		                  postDateElements.push(tf);
		                } else {
		                   preDateElements.push(tf);
		                }
		            }
		            tf._x = -Math.round(parseInt(tf._("svg").getAttribute("width"))) * 0.5;
		            tf._y = -Math.round(parseInt(tf._("svg").getAttribute("height"))) * 0.5;

		            tfa._x = -Math.round(parseInt(tfa._("svg").getAttribute("width"))) * 0.5;
		           if(inbetween)
		           {
		           		tfa._y = tf._y*0.4;
		           } else 
		           {
		           	    tfa._y = -tf._y;//-Math.round(parseInt(tfa._("svg").getAttribute("height"))) * 0.5;
		          
		           }

		          log(tfDateEffect);

		            python.addSVGShadow(tf._("svg"));
		            python.addSVGShadow(tfa._("svg"));
		     }
	     } 

	    
	  },

	 webFontRouteSetup:function(divID,textArray,nameForBox,langChoice)
	 {
	 		log("webFontRoute");
		    divID.innerHTML = "";
			var tffont = "Arial,'Helvetica Neue',Helvetica,sans-serif;";
			// console.log("------------------------------------------------"+tfText);
		  for (var i = 0; i < textArray.length; i++) 
		  {
		           var webtextHouse = document.createElement("div");
		        		webtextHouse.id = nameForBox+"_"+i;		        		
		           var tfText = textArray[i]['strapText'];
		           var tfFontSize = textArray[i]['strapFontSize'];
		           var tfLineHeight = textArray[i]['strapLineHeight'];
		           var tfDateEffect = textArray[i]['dateEffect'];  
		           var widthOfParent = parseInt(divID.style.width.split("px")[0]);
		           if(langChoice == "uaear")
		           {
		           	  var heightOfParent = parseInt(divID.style.height.split("px")[0])+20;
		           	} else 
		           	{
		           	  var heightOfParent = parseInt(divID.style.height.split("px")[0]);
		           	}
		               	webtextHouse.id = nameForBox+"_"+i;
						webtextHouse.style.cssText = "/*background-color:#990000;*/ color:#fff;width:"+(widthOfParent*4)+"px; height:"+(heightOfParent)+"px; left:-"+(widthOfParent*2)+"px; line-height:"+tfFontSize+"px; top:-"+(heightOfParent*1.5)+"px;position:absolute; font-family:"+tffont+" text-align:center; font-weight:bold; font-size:"+tfFontSize+"px;";
					
						webtextHouse.innerHTML +=tfText;
						divID.appendChild(webtextHouse);

		           if(textArray[i]['dateEffect'] != undefined)
		            { 
		               if(textArray[i]['datePost'])
		             	 {
		                postDateElements.push(webtextHouse);
		                } else {
		                 preDateElements.push(webtextHouse);
		            	}
		      	     }	
		          log(tfDateEffect);
		     }
	 },
	//-----------------------------------------------------------------BUTTON MANAGEMENT
	buttonFontSetup:function(divID,btnArray,langChoice)
		{
	         divID.innerHTML ="";
	          var tffont = "buttonTextGFX";
	          if(langChoice == "pl"   ) { python.buttonPolishWebFontRouteSetup(divID,btnArray,"buttonText",langChoice); } else 
	          if(langChoice == "ru"   ) { python.buttonRussianWebFontRouteSetup(divID,btnArray,"buttonText",langChoice); } else
	          if(langChoice == "uaear") { python.buttonArabicWebFontRouteSetup(divID,btnArray,"buttonText",langChoice); } else 
	          {

	          	for (var i = 0; i < btnArray.length; i++) {			              
			                 var tfText = btnArray[i]['buttonText'];
			                 var tfFontSize = btnArray[i]['buttonFontSize'];
			                 var btnFunction = btnArray[i]['buttonFunction'];
			                 var btnDateDeets = btnArray[i]['dateEffect'];
			                 var btnDatePost = btnArray[i]['datePost'];
			                 var btnID = btnArray[i]['buttonID'];           
			             if(langChoice == "de" || langChoice == "at" || langChoice == "chde")
			             {
			             	 var tf = TextField(tffont,tfText,tfFontSize,0,-5,"center","#ffffff");
			             	 python.createBtn(divID,tf,tfFontSize*0.5,tfFontSize*0.4,btnID,"255,153,0,1"/*rgba for #FF9900*/,"29,29,27,0.9"/*rgba for #1d1d1b*/,btnFunction,btnDateDeets,btnDatePost,python.howmanylines(tfText),false);
			      
			             } else {
			             	 var tf = TextField(tffont,tfText,tfFontSize,0,-5,"left","#ffffff");
			             	 python.createBtn(divID,tf,tfFontSize*0.5,tfFontSize*0.4,btnID,"255,153,0,1"/*rgba for #FF9900*/,"29,29,27,0.9"/*rgba for #1d1d1b*/,btnFunction,btnDateDeets,btnDatePost,python.howmanylines(tfText),false);
			      
			             }			       
	        	    }
	          }
		},


    buttonPolishWebFontRouteSetup:function(divID,btnArray,nameForBox,langChoice)
	 {
	 		log("PolishFontRoute");
		    divID.innerHTML = "";
   			var tffont = "Arial, Helvetica, tahoma, verdana, 宋体, SimSun, 华文细黑, STXihei, sans-serif;";
			//var tffont = "Arial,'Helvetica Neue',Helvetica,sans-serif;";
		  for (		var i = 0; i < btnArray.length; i++	) 
		  {
		            var webtextHouse = document.createElement("div");
		        	    webtextHouse.id = nameForBox+"_"+i;		        		
		            var widthOfParent = parseInt(divID.style.width.split("px")[0]);
		            var heightOfParent = parseInt(divID.style.height.split("px")[0]);

		           	var tfText = btnArray[i]['buttonText'];
			        var tfFontSize = btnArray[i]['buttonFontSize'];
			        var btnFunction = btnArray[i]['buttonFunction'];
			        var btnDateDeets = btnArray[i]['dateEffect'];
			        var btnDatePost = btnArray[i]['datePost'];
			        var btnID = btnArray[i]['buttonID'];
			        var textlineNumbers = tfText.split("<br />");
			            // var widestLineOfText = Math.max(textlineNumbers)
			        var lineLength = python.findLongWord(textlineNumbers);		
 					var widthLength = ((lineLength.length*tfFontSize)*1); 
		            var heightLength = (textlineNumbers.length*tfFontSize);
		             	webtextHouse.id = nameForBox+"_"+i;
		             	webtextHouse.style.width = (widthLength)+"px";
						webtextHouse.style.height = (heightLength)+"px";
						webtextHouse.className = "do";

						webtextHouse.innerHTML +='<div class="do" width="'+((widthLength))+'px" height="'+(heightLength)+'px" style="color:#fff;font-family:'+tffont+';font-size:'+tfFontSize+'px;">'+tfText+'</div>';
		        		    				//(divID,btnCont,btnPadX,btnPadY,divIdName,edgeColor,btnBgColor,btnFunction,btnDate,btnDateInfo,lineNO,spread,langChoice)
		        		python.createBtn(divID,webtextHouse,tfFontSize*1,tfFontSize*0.7,btnID,"255,153,0,1"/*rgba for #FF9900*/,"29,29,27,0.9"/*rgba for #1d1d1b*/,btnFunction,btnDateDeets,btnDatePost,textlineNumbers.length,false,langChoice);
		    }
	 },

	 buttonRussianWebFontRouteSetup:function(divID,btnArray,nameForBox,langChoice)
	 {
	 		log("-------------------------------------------------------------------------------------------------------------------------------------------");
	 		log("RussianFontRoute");
		    divID.innerHTML = "";
   			var tffont = "Arial, Helvetica, tahoma";
			//var tffont = "Arial,'Helvetica Neue',Helvetica,sans-serif;";
		 
			for (var i = 0; i < btnArray.length; i++) 
			{
				log(btnArray[i]);
 					 var webtextHouse = document.createElement("div");		                        		
		             var widthOfParent = parseInt(divID.style.width.split("px")[0]);
		             var heightOfParent = parseInt(divID.style.height.split("px")[0]);

		            var tfText = btnArray[i]['buttonText'];
			        var tfFontSize = btnArray[i]['buttonFontSize'];
			        var btnFunction = btnArray[i]['buttonFunction'];
			        var btnDateDeets = btnArray[i]['dateEffect'];
			        var btnDatePost = btnArray[i]['datePost'];
			        var btnID = btnArray[i]['buttonID'];
			        var textlineNumbers = tfText.split("<br />");
			            // var widestLineOfText = Math.max(textlineNumbers)
			        var lineLength = python.findLongWord(textlineNumbers);		
 					var widthLength = ((lineLength.length*tfFontSize)*0.6); 
		            var heightLength = (textlineNumbers.length*tfFontSize);
		             	webtextHouse.id = nameForBox+"_"+i;
		             	webtextHouse.style.width = (widthLength)+"px";
						webtextHouse.style.height = (heightLength)+"px";
						webtextHouse.className = "do";
				        webtextHouse.innerHTML +='<div class="do" width="'+(widthLength)+'px" height="'+(heightLength)+'px" style="color:#fff;font-family:'+tffont+';font-size:'+tfFontSize+'px;">'+tfText+'</div>';
						//webtextHouse.innerHTML +='<div class="do" width="'+((widthLength))+'px" height="'+(heightLength)+'px" style="color:#fff;font-family:'+tffont+';font-size:'+tfFontSize+'px;">'+tfText+'</div>';
		    			python.createBtn(divID,webtextHouse,tfFontSize*1,tfFontSize*0.7,btnID,"255,153,0,1"/*rgba for #FF9900*/,"29,29,27,0.9"/*rgba for #1d1d1b*/,btnFunction,btnDateDeets,btnDatePost,textlineNumbers.length,false,langChoice);
			}

	 },



	 buttonArabicWebFontRouteSetup:function(divID,btnArray,nameForBox,langChoice)
	 {
	 		log("ArabicFontRoute");
		    divID.innerHTML = "";
   			var tffont = "Arial, Helvetica, tahoma, verdana, 宋体, SimSun, 华文细黑, STXihei, sans-serif;";
			//var tffont = "Arial,'Helvetica Neue',Helvetica,sans-serif;";





		  for (		var i = 0; i < btnArray.length; i++	) 
		  {
		            var webtextHouse = document.createElement("div");
		        	    webtextHouse.id = nameForBox+"_"+i;		        		
		            var widthOfParent = parseInt(divID.style.width.split("px")[0]);
		            var heightOfParent = parseInt(divID.style.height.split("px")[0]);

		           	var tfText = btnArray[i]['buttonText'];
			        var tfFontSize = btnArray[i]['buttonFontSize'];
			        var btnFunction = btnArray[i]['buttonFunction'];
			        var btnDateDeets = btnArray[i]['dateEffect'];
			        var btnDatePost = btnArray[i]['datePost'];
			        var btnID = btnArray[i]['buttonID'];
			        var textlineNumbers = tfText.split("<br />");
			            // var widestLineOfText = Math.max(textlineNumbers)
			        var lineLength = python.findLongWord(textlineNumbers);		
 					var widthLength = ((lineLength.length*tfFontSize)*0.4); 
		            var heightLength = (textlineNumbers.length*tfFontSize);
		             	webtextHouse.id = nameForBox+"_"+i;
		             	webtextHouse.style.width = (widthLength)+"px";
						webtextHouse.style.height = (heightLength)+"px";
						webtextHouse.className = "do";

						webtextHouse.innerHTML +='<div class="do" width="'+((widthLength))+'px" height="'+(heightLength)+'px" style="color:#fff;font-family:'+tffont+';font-size:'+tfFontSize+'px;">'+tfText+'</div>';
		        		    				//(divID,btnCont,btnPadX,btnPadY,divIdName,edgeColor,btnBgColor,btnFunction,btnDate,btnDateInfo,lineNO,spread,langChoice)
		        		python.createBtn(divID,webtextHouse,tfFontSize*1,tfFontSize*0.7,btnID,"255,153,0,1"/*rgba for #FF9900*/,"29,29,27,0.9"/*rgba for #1d1d1b*/,btnFunction,btnDateDeets,btnDatePost,textlineNumbers.length,false,langChoice);
		    }
	 },


	findLongWord:function(array)
    {
    	       var longestLine = "";
    	        array.forEach(function(word) {if(word.length > longestLine.length) {longestLine = word;}});
    	        return longestLine;
    },

	howmanylines:function(textString)
		{
		 // log("------------howmanylines---------------------"+textString);
		  var textLines = textString.split("\n");
		  // log("------------howmanylines---------------------"+textLines.length);
		   return textLines.length;
		},

 	findWidth:function(divID)
		{
		    var tfWid = Math.floor(divID.children[0].getAttribute("width").split("px")[0]);
		    return tfWid;
		},


		createBtn:function(divID,btnCont,btnPadX,btnPadY,divIdName,edgeColor,btnBgColor,btnFunction,btnDate,btnDateInfo,lineNO,spread,langChoice)
		{
		   
		log("CREATE BTN------------: "+divID,btnCont,btnPadX,btnPadY,divIdName,edgeColor,btnBgColor,btnFunction,btnDate,btnDateInfo,lineNO,spread);
	  	   var heightOfAccolade = parseInt(btnCont.children[0].getAttribute("height").split("px")[0]);					//log(heightOfAccolade);
		   var totalHeight = Math.floor(parseInt(heightOfAccolade));													//log(totalHeight);
		   var totalWidth = python.findWidth(btnCont);																	//log(totalWidth);
		   var heightBtn = Math.round((btnCont.children[0].getAttribute("height").split("px")[0]))+(btnPadY*2);
		   var widthBtn  = Math.floor((Math.round((btnCont.children[0].getAttribute("width").split("px")[0]))+(btnPadX*2.5)+(totalHeight))*0.98);
		   python.webFontButtonTidy(langChoice,divID,btnCont,btnPadX,btnPadY,totalWidth,totalHeight);
		   var newBtnHouse = document.createElement('div');
		       newBtnHouse.id = divIdName.toString();
		       newBtnHouse.className = "do";
		       newBtnHouse.style.width = widthBtn+"px";
		       newBtnHouse.style.height = heightBtn+"px";

		   divID.appendChild(newBtnHouse);
	       if(btnDate != undefined)  {  python.storeDateEffectDivs(btnDateInfo,newBtnHouse)  }
		   //log(lineNO);
		   newBtnHouse.appendChild(btnCont);
		   btnCont.style.marginLeft=btnPadX+"px";  
		   btnCont.style.marginTop=btnPadY-(btnPadY*0.1)+"px";  

		   var btnTriangle = python.tidyTriangle(lineNO,btnPadX,btnPadY,totalWidth);
		   var btnBox = python.drawSVGButtonBox(widthBtn,heightBtn,btnBgColor,edgeColor);
		   var nameOfFlash = newBtnHouse.id+'_flash';
		   var btnRollOverGFX = python.drawSVGButtonBoxFlash(nameOfFlash,widthBtn,heightBtn,edgeColor);
		   python.buildGFXforBTN(newBtnHouse,widthBtn,heightBtn,btnBox,btnTriangle,btnRollOverGFX);
		  
		   if(langChoice == "uaear")
		   {
		   	TweenMax.set(tri,{x:"-="+btnPadX*1.9});
		   		TweenMax.set(newBtnHouse.children[0],{x:"-="+btnPadX*0.5});
		   } else if(langChoice == "ru"){
		   	//TweenMax.set(tri,{x:"-="+btnPadX*1.79, y:"+="+btnPadX*0.15, scale:0.5});
		   }

		  TweenMax.set(newBtnHouse,{x:-(newBtnHouse.style.width.split("px")[0])*0.5,y:-(newBtnHouse.style.height.split("px")[0])*0.5});   
		  TweenMax.set(nameOfFlash,{alpha:0});
		  python.giveButtonAction(newBtnHouse.id,nameOfFlash,btnFunction);
		  if(spread) spreadOutButtons(mc_button,heightBtn*2);
	 },

	
	drawSVGButtonBox:function(widthBtn,heightBtn,btnBgColor,edgeColor)
	{
		var btnBoxSVG =	'<svg width="'+widthBtn+'" height="'+heightBtn+'"><rect width="'+widthBtn+'" height="'+heightBtn+'" style="fill:rgba('+btnBgColor+');stroke-width:10;stroke:rgba('+edgeColor+')" /></svg>';
		return btnBoxSVG;
	},
	drawSVGButtonBoxFlash:function(nameOfFlash,widthBtn,heightBtn,edgeColor)
	{
		var btnBoxSVGFlash = '<div id="'+nameOfFlash+'" style="position:absolute;top:0;width:'+widthBtn+'px; height:'+heightBtn+'px;display:block;"><svg width="'+widthBtn+'" height="'+heightBtn+'"><rect width="'+widthBtn+'" height="'+heightBtn+'" style="fill:rgba('+edgeColor+');" /></svg></div>';
		return btnBoxSVGFlash;
	},
	tidyTriangle:function(lineNO,btnPadX,btnPadY,totalWidth)
	{
		var triangleShizzle;  						 //triangle size,				triangle margin top,								triangle margin left
		if(lineNO == 1)  {    var triangleSize = (Math.floor((btnPadX)*1.2));   var triPrms = [triangleSize,triangleSize+(btnPadY*1.7),totalWidth+(btnPadX*1.9)]; } else
		if(lineNO == 2)  {    var triangleSize = (Math.floor((btnPadX)*2));     var triPrms = [triangleSize,triangleSize+(btnPadY*2.5),totalWidth+(btnPadX*2.5)]; } else
		if(lineNO == 3)  {    var triangleSize = (Math.floor((btnPadX)*2.5));   var triPrms = [triangleSize,triangleSize+(btnPadY*3.5),totalWidth+(btnPadX*3.2)]; } else
						 {    var triangleSize = (Math.floor((btnPadX)*0.88));  var triPrms = [triangleSize,triangleSize+(btnPadY*1.22),totalWidth+(btnPadX*2)];  }		
		triangleShizzle = '<div id="tri" style="width:'+triPrms[0]+'px; height:'+triPrms[0]+'px; margin-top:-'+(triPrms[1])+'px; margin-left:'+(triPrms[2])+'px;"><svg height="'+triPrms[0]+'" width="'+triPrms[0]+'"><polygon points="0,0 0,'+triPrms[0]+' '+triPrms[0]+','+(triPrms[0]*0.5)+'" style="fill:#ffffff;"/></svg></div>';
		return triangleShizzle;
	},
	buildGFXforBTN:function(newBtnHouse,widthBtn,heightBtn,btnBox,btnTriangle,btnRollOverGFX)
	{
		 newBtnHouse.innerHTML+='<div style="width:'+widthBtn+'px; height:'+heightBtn+'px;display:block;">'+btnBox+'</div>';
		 newBtnHouse.innerHTML+=btnTriangle;  
		 newBtnHouse.innerHTML+=btnRollOverGFX;
	},
	storeDateEffectDivs:function(btnDateInfo,newBtnHouse)
	{
		if(btnDateInfo)	{ postDateElements.push(newBtnHouse); } 
		else {            preDateElements.push(newBtnHouse);  }
	},
	webFontButtonTidy:function(langChoice,divID,btnCont,btnPadX,btnPadY,totalWidth,totalHeight)
	{
		if(langChoice == "uaear") {
		 	TweenMax.set(divID,{y:"+=1"});
		 	 var widthBtn  = Math.floor((Math.round((btnCont.children[0].getAttribute("width").split("px")[0]))+(btnPadX*2)+(totalWidth))*0.35);
		 } else if(langChoice == "ru") {
		 	TweenMax.set(divID,{y:"-=1"});
		 	var widthBtn  = Math.floor((Math.round((btnCont.children[0].getAttribute("width").split("px")[0]))+(btnPadX*2)+(totalWidth))*0.35);
		 } else {
		  	
		 }
	},
	spreadOutButtons:function(divID,gapYBetween)
		{
		  for (var i = 0; i < divID.children.length; i++) {
		    TweenMax.set(divID.children[i],{y:gapYBetween*i});
		  }
		},

	giveButtonAction:function(btn,nameOfTrigger,functionName)
	  {
	     log("setUpButton",btn);
	     if(btn._hasClickHandler) return;
	     
	    log(btn);
	    log(nameOfTrigger);
	    log(functionName);

	    var cta_path = $(btn)._("#"+nameOfTrigger).lastChild._("rect");
	    log(cta_path);
	   
	     cta_path.mouseEnabled = true;
	     cta_path.buttonMode = true;
	     cta_path.addEventListener("mouseover", python.onCtaOver);
	     cta_path.addEventListener("click", function(event){
	        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true; ////log("main click", window.clickTag);
	        var target = event.target || event.srcElement;
	        var phase = event.eventPhase;
	        python.onCtaClicked(functionName);
	     });
	     
	     btn._hasClickHandler = true;
	  },

   onCtaOver:function(event) 
	   {
	      log("onCtaOver");
	      event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true; ////log("main click", window.clickTag);
	      var target = event.target || event.srcElement;
	      var phase = event.eventPhase;
	      var whatbtn = target.parentNode.parentNode.parentNode.id;//parentNode
	      log(whatbtn);
	      python.btnFlash($(whatbtn),target.parentNode.parentNode.id);
	  },

 	btnFlash:function(btn,btnflashGFX)
	  {
	    log(btn);
	    log(btnflashGFX);

	    TweenMax.set(btnflashGFX,{alpha:0});
	    TweenMax.from(btnflashGFX,0.25,{alpha:1});
	  },

	onCtaClicked:function(functionName) { log("onCtaClicked");  window[functionName](arguments); },
	//-----------------------------------------------------------------DATE MANAGEMENT
	setUpDateGFX:function(divID,textArray,langChoice)
	{
	  log("-----------------------------------------------------------setUpDateGFX");
	  		  divID.innerHTML = "";
	   for (var i = 0; i < textArray.length; i++) {
	           // textArray[i]
	            strapCounter++;
	            var tffont = fontArray[1]["dateFont"];
	            var tfText = textArray[i]['dateText'];
	            var tfSubText = textArray[i]['dateSupScript'];
	            var tfTextSize = textArray[i]['dateFontSize'];
	            var tfColor = textArray[i]['dateColour'];;//textArray[i]['strapColour'];   
	            var tfDateEffect = textArray[i]['dateEffect'];  
	            log(tfText);
	      
	        	if(langChoice == "pl" || langChoice == "ru" || langChoice == "uaear"){
	        		var tffont = "Arial,'Helvetica Neue',Helvetica,sans-serif;";
	        		var tf = document.createElement("div");
	        		 if(langChoice == "uaear")
	        		 {
	        		 	divID.style.width = (tfTextSize)+"px";
	        		 }       		 	
	        		 else
	        		 {
	        		 	divID.style.width = (tfText.length*tfTextSize)+"px";
	        		 }
	        	
	        		divID.style.cssText +="text-align:center;";
	        		 tf.setAttribute("width",divID.style.width);
	           		 tf.setAttribute("height",divID.style.height);
	           		 tf.className = "do";
	           		 tf.style.cssText += "font-size:"+tfTextSize+"px; font-family:"+tffont+"; font-weight:bold;color:"+tfColor+";";
	           		 if(langChoice == "uaear"){
 						 tf.style.cssText += "top:-"+(tfTextSize*2)+"px";
	           		 }else{
	           		 	 tf.style.cssText += "letter-spacing:"+(tfTextSize*0.15)+"px;left:-45%;margin-left:10%;top:-"+(tfTextSize*0.8)+"px";
	           		 }
	           		
	           		 tf.innerHTML = tfText;
	           		// tf._x = -Math.round(parseInt(tf.getAttribute("width"))) * 0.5;
	           		 divID.appendChild(tf);  
	           		 python.addSVGShadow(tf);
	        	}else{
	        		
	           	//	 var tf = TextField({font:tffont, normal:tffont},tfText,tfTextSize,Math.floor(tfTextSize*0.15),0,"center",tfColor); 

	           		     var tf = TextField({normal:tffont},tfText,tfTextSize,Math.floor(tfTextSize*fontArray[1]["dateKerning"]),0,"center",tfColor); 
	           		     tf.id = "text_"+strapCounter;
	           		     divID.appendChild(tf);    	            
	          		     tf._x = -Math.round(parseInt(tf._("svg").getAttribute("width"))) * 0.5;
	           			 tf._y = -Math.round(parseInt(tf._("svg").getAttribute("height"))) * 0.5;
	           			 python.addSVGShadow(tf._("svg"));
	           			
	      		}
	           
	            log(tfDateEffect);

	            if(textArray[i]['dateEffect'] != undefined)
	            { 
	                if(textArray[i]['datePost'])
	                {
	                  postDateElements.push(tf);
	                } else {
	                   preDateElements.push(tf);
	                }
	            }
	           
	     }
	

	},
	sortOutDateElements:function(dateArrayPre,dateArrayPost)
	{
	  log("---------------------------------------sortOutDatesElements");
	 log(dateArrayPre);// = []; //store elements that are pre Date
	 log(dateArrayPost);
	   if(out){
	        fbf.displayNone(dateArrayPre);
	        fbf.displayBlock(dateArrayPost);
	   } else {
	         fbf.displayBlock(dateArrayPre);
	        fbf.displayNone(dateArrayPost);
	    }
	  log("----------------------------------------------------");
	},

	addSVGShadow:function(svgID)
	{
		log("-------------------------------     addSVGShadow "+svgID);
		 svgID.style.cssText += "filter: drop-shadow(2px 2px 2px rgba(0,0,0,1));-webkit-filter: drop-shadow(2px 2px 2px rgba(0,0,0,1));-ms-filter: 'progid:DXImageTransform.Microsoft.Dropshadow(OffX=12, OffY=12, Color='#444')';filter: 'progid:DXImageTransform.Microsoft.Dropshadow(OffX=12, OffY=12, Color='#444')';";
	},

	//CREATE SHADOW
	createShadowGlow:function(divID,w,h,injectLoc)
	{
		log("-------------------------------------createShadowGlow");
		log(divID._x);		log(divID._y);		log(divID._scaleX);		log(w);
		python.injectCanvas("cv_strapline",WID,HEI,injectLoc);
		  var canvas = document.getElementById('cv_strapline');
	      var ctx = canvas.getContext('2d');
	      var centerX = canvas.width / 2;
	      var centerY = canvas.height / 2;
	      var radius = WID*divID._scaleX;
	      var ctx = canvas.getContext('2d');

			var x = Math.round(divID._x),
			    y = Math.round(divID._y),
			    innerRadius = Math.floor((w*divID._scaleX)*0.1),
			    outerRadius = Math.floor(w*divID._scaleX)*1.5,
			    radius = Math.floor(w*divID._scaleX*1.5);

			var gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
			gradient.addColorStop(0, 'rgba(0,0,0,0.8)');
			gradient.addColorStop(0.5, 'rgba(0,0,0,0)');
			ctx.fillStyle = gradient;
			ctx.arc(x, y, radius, 0, 2 * Math.PI);
			ctx.fill();			

		canvas.style.cssText+="-ms-filter: blur(2px); filter:progid:DXImageTransform.Microsoft.Blur(pixelradius='2', shadowopacity='0.0');";
	},

	
	//CANVAS FX
	createCanvas:function()
	{
		/*<canvas id="myCanvas" width="200" height="100"></canvas>*/
		python.injectCanvas("cv_strapline",WID,HEI,_root);
		$('cv_strapline').style.cssText = "display:block;width:300px;height:250px;position:absolute;z-index:1000;top:0;";
		var c = document.getElementById("cv_strapline");
		var ctx = c.getContext("2d");
		var svgdata = $("mc_date")._("svg");
		log(svgdata);
		var DOMURL = window.URL || window.webkitURL || window;

		var img = new Image();
		var svg = new Blob([svgdata], {type: 'image/svg+xml'});
		var url = DOMURL.createObjectURL(svg);
		log(url);
		log(img);
		log(svg);
	
		log(ctx);
		img.onload = function() {
		  ctx.drawImage(img, 0, 0);
		  DOMURL.revokeObjectURL(url);
		}

		img.src = url;		
	},
	injectCanvas:function(id,width,height,whereToPut) 
	{
		log("injectCanvas");
		var newCanvas = document.createElement('canvas');
		newCanvas.id = id, newCanvas.className = "do",	newCanvas.width = width, newCanvas.height = height;		
		var locationFornewCanvas = python.findMyLocInDom(whereToPut);
		_root.insertBefore(newCanvas, _root.childNodes[locationFornewCanvas])
		return newCanvas;
	},

	findMyLocInDom:function(divID)
	{
		var location;
		var arrayOfDom = divID.parentNode.children;
		for (var i = 0; i <arrayOfDom.length; i++) {
			if(arrayOfDom[i].id == divID.id)
			{
				location = i+1;
			}
		}	
		return location;
	},
	/*----------------------------------ENDSCREEN ANIMATION*/
	fadeDownAndDisplayNone:function(divID)
	{
	  log("fadeDownAndDisplayNone: "+divID);
	  TweenMax.to(divID,1,{alpha:0,onComplete:fbf.displayNone,onCompleteParams:[divID]});
	},

	// animatePS4:function(divID)
	// {
	//     log("animatePS4: "+divID);
	//     fbf.show(divID);
	//     TweenMax.from(divID,0.5,{alpha:0});
	// },
	animateLogo:function(divID,wait) 
	{
	   log("animateLogo: "+divID);
	    fbf.show(divID);
	    var initialScale = divID._scaleX;
	    TweenMax.set(divID,{alpha:0});
	    TweenMax.to(divID,0.1,{alpha:1,delay:wait});
	    TweenMax.from(divID,0.2,{scale:initialScale*3, ease: Back.easeOut.config(1),delay:wait});
	},

	animateDate:function(divID,wait)
	{
	    log("animateDate: "+divID);
	    fbf.show(divID);
   	    var initialScale = divID._scaleX;
	TweenMax.from(mc_date,1,{alpha:0, scale:initialScale*1.1, ease:Power1.easeOut, delay:wait});
	},

	animateSimpleFadeUp:function(divID,wait)
	{
		fbf.show(divID);
	    TweenMax.from(divID,0.5,{alpha:0, delay:wait});
	},

	animateStrap:function(divID,wait)
	{
	   log("animateStrap: "+divID);
	    fbf.show(divID);
	    var initialScale = divID._scaleX;  
	    TweenMax.set(divID,{alpha:0});
	    TweenMax.set(divID,{alpha:1,delay:wait});
	   TweenMax.from(divID,0.2,{scale:initialScale*5,ease: Expo.easeOut,delay:wait});
	   TweenMax.to(divID,0.1,{scale:initialScale*0.98,delay:wait+0.2});
	   if($('cv_strapline')){
	    log("000000000000000000000000000000000000000000000000000")
	    TweenMax.from($('cv_strapline'),4,{alpha:0});
	  };
	  // TweenMax.to(divID,0.1,{scale:initialScale*1.02,delay:wait+0.3});
	   TweenMax.to(divID,0.1,{scale:initialScale*1,delay:wait+0.4});
	},

	animateRating:function(divID,wait)
	{ 
	    log("animateRating: "+divID);
	    fbf.show(divID);
	    TweenMax.from(divID,0.5,{alpha:0,delay:wait});
	},

    animateBackgroundResp:function(divID,wait,transformPerc)
	{
		log("animateBackground: "+divID);
	    fbf.show(divID);
	    TweenMax.set(divID);
	    fbf.show(divID);
	    var initialScale = divID._scaleX;   
	    TweenMax.from(divID,3,{scale:initialScale*2,ease: Expo.easeOut,delay:wait,transformOrigin:transformPerc});
	},

	animateBackground:function(divID,wait,transformPerc)
	{
	   // log("animateBackground: "+divID);
		fbf.show(divID);
	   	TweenMax.from(divID,4,{transformOrigin: transformPerc, scale:1.5, ease: Expo.easeOut, delay:wait});
	},

	animateForeground:function(divID,wait,transformPerc)
	{
	    //log("animateForeground: "+divID);
		fbf.show(divID);
	    TweenMax.from(divID,4,{transformOrigin: transformPerc, scale:2, ease: Expo.easeOut, delay:wait});

	},

	btnGrow:function(divID,wait)
	{
		log("btnGrow");
		TweenMax.set(divID, {scaleX:0, scaleY:0});
		TweenMax.to(divID, 0.5, {scaleY:1, ease: Back.easeOut, delay: wait});
		TweenMax.to(divID, 0.1, {scaleX:0.05, ease: Expo.easeOut, delay: wait});
		TweenMax.to(divID, 0.5, {scaleX:1, ease: Expo.easeOut, delay: wait+0.4});
	    TweenMax.set(divID.children[3],{alpha:1});
	    TweenMax.to(divID.children[3],0.5,{alpha:0, ease: Elastic.easeIn.config(2, 0.2), delay: wait +0.3});
	},

	animateButton:function(divID,wait)
	{
	  log("animateButton: "+divID);
	  TweenMax.set(divID,{alpha:0, transformOrigin:"50% 50%"});
	  TweenMax.set(divID,{alpha:1,delay:wait});
	  TweenMax.delayedCall(wait,python.btnGrow,[divID,0]);
	 // log("divID.children[3]:"+ divID.children[3]); //target.parentNode.parentNode.id //divID,divID.children[3]
	},

	showChosenButton:function(chosenButton)
    {
	  	fbf.show($(chosenButton));
	}


}

