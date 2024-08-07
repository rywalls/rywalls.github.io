var config = (function (){

var module = {};

// RELEASE DATE
module.outDate = new Date("Oct 12 2018 00:00:00 GMT+0000");

module.lang = "uk";

module.rich = true;
module.showIntroVid = false; 
module.showAccolade = false; 
module.comradeArt = false;

module.chosenBtn = "btn_trailer";

module.exclusiveText       = "PLAY NEW CONTENT FIRST ON PS4<sup>TM</sup>";
module.exclusiveText2Lines = "PLAY NEW CONTENT\nFIRST ON PS4<sup>TM</sup>";
module.exclusiveText3Lines = "PLAY NEW\nCONTENT\nFIRST ON PS4<sup>TM</sup>";

module.specificAccolade = 2;

module.PS4 = true;

/*$$$$$\   $$$$$$\ $$$$$$$$\ $$$$$$$$\ 
$$  __$$\ $$  __$$\\__$$  __|$$  _____|
$$ |  $$ |$$ /  $$ |  $$ |   $$ |      
$$ |  $$ |$$$$$$$$ |  $$ |   $$$$$\    
$$ |  $$ |$$  __$$ |  $$ |   $$  __|   
$$ |  $$ |$$ |  $$ |  $$ |   $$ |      
$$$$$$$  |$$ |  $$ |  $$ |   $$$$$$$$\ 
\_______/ \__|  \__|  \__|   \______*/ 

module.dateStore =
[
{
  dateText:"12 OCTOBER",
  dateColour: "#FFFFFF",
  dateFontSize: 32,
  dateEffect: true,
  datePost: false,    
}
]

/*$$$$$\  $$\   $$\ $$$$$$$$\ $$$$$$$$\  $$$$$$\  $$\   $$\  $$$$$$\  
$$  __$$\ $$ |  $$ |\__$$  __|\__$$  __|$$  __$$\ $$$\  $$ |$$  __$$\ 
$$ |  $$ |$$ |  $$ |   $$ |      $$ |   $$ /  $$ |$$$$\ $$ |$$ /  \__|
$$$$$$$\ |$$ |  $$ |   $$ |      $$ |   $$ |  $$ |$$ $$\$$ |\$$$$$$\  
$$  __$$\ $$ |  $$ |   $$ |      $$ |   $$ |  $$ |$$ \$$$$ | \____$$\ 
$$ |  $$ |$$ |  $$ |   $$ |      $$ |   $$ |  $$ |$$ |\$$$ |$$\   $$ |
$$$$$$$  |\$$$$$$  |   $$ |      $$ |    $$$$$$  |$$ | \$$ |\$$$$$$  |
\_______/  \______/    \__|      \__|    \______/ \__|  \__| \_____*/ 

module.buttonStore =
[
{
  buttonID: "btn_trailer",
  buttonText:'WATCH TRAILER',
  letterSpacing: -3,
  buttonFontSize: 40,
  buttonFunction: 'watchClick',
  dateEffect: false,
  datePost: true,
},
{
  buttonID: "btn_learn",
  buttonText:'LEARN MORE',
  letterSpacing: -3,
  buttonFontSize: 30,
  buttonFunction: 'learnMoreClick',
  dateEffect: false,
  datePost: true,
}
]

/*$$$$$\ $$$$$$$$\ $$$$$$$\   $$$$$$\  $$$$$$$\  $$\       $$$$$$\ $$\   $$\ $$$$$$$$\ 
$$  __$$\\__$$  __|$$  __$$\ $$  __$$\ $$  __$$\ $$ |      \_$$  _|$$$\  $$ |$$  _____|
$$ /  \__|  $$ |   $$ |  $$ |$$ /  $$ |$$ |  $$ |$$ |        $$ |  $$$$\ $$ |$$ |      
\$$$$$$\    $$ |   $$$$$$$  |$$$$$$$$ |$$$$$$$  |$$ |        $$ |  $$ $$\$$ |$$$$$\    
 \____$$\   $$ |   $$  __$$< $$  __$$ |$$  ____/ $$ |        $$ |  $$ \$$$$ |$$  __|   
$$\   $$ |  $$ |   $$ |  $$ |$$ |  $$ |$$ |      $$ |        $$ |  $$ |\$$$ |$$ |      
\$$$$$$  |  $$ |   $$ |  $$ |$$ |  $$ |$$ |      $$$$$$$$\ $$$$$$\ $$ | \$$ |$$$$$$$$\ 
 \______/   \__|   \__|  \__|\__|  \__|\__|      \________|\______|\__|  \__|\______*/ 
  
module.straplineStore =
[
{
  strapText: 'ALWAYS BET\nON BLACK', 
  strapFontSize: 24,
  strapLineHeight: 0,
  strapColour: "#FFFFFF",
  dateEffect: false,
  datePost: true,
}
]

/*$$$$$\   $$$$$$\   $$$$$$\   $$$$$$\  $$\        $$$$$$\  $$$$$$$\  $$$$$$$$\  $$$$$$\  
$$  __$$\ $$  __$$\ $$  __$$\ $$  __$$\ $$ |      $$  __$$\ $$  __$$\ $$  _____|$$  __$$\ 
$$ /  $$ |$$ /  \__|$$ /  \__|$$ /  $$ |$$ |      $$ /  $$ |$$ |  $$ |$$ |      $$ /  \__|
$$$$$$$$ |$$ |      $$ |      $$ |  $$ |$$ |      $$$$$$$$ |$$ |  $$ |$$$$$\    \$$$$$$\  
$$  __$$ |$$ |      $$ |      $$ |  $$ |$$ |      $$  __$$ |$$ |  $$ |$$  __|    \____$$\ 
$$ |  $$ |$$ |  $$\ $$ |  $$\ $$ |  $$ |$$ |      $$ |  $$ |$$ |  $$ |$$ |      $$\   $$ |
$$ |  $$ |\$$$$$$  |\$$$$$$  | $$$$$$  |$$$$$$$$\ $$ |  $$ |$$$$$$$  |$$$$$$$$\ \$$$$$$  |
\__|  \__| \______/  \______/  \______/ \________|\__|  \__|\_______/ \________| \_____*/ 

module.accoladeStore =
[
{
  accolade:'',
  accoladeFontSize: 24,
  accoladeTitle:"",
  accoladeTitleFontRatioSize: 0.5,
  accoladeBuff:5,
},
{
  accolade:'',
  accoladeFontSize: 24,
  accoladeTitle:"",
  accoladeTitleFontRatioSize: 0.5,
  accoladeBuff:5,
},
{
  accolade:'',
  accoladeFontSize: 40,
  accoladeTitle:"",
  accoladeTitleFontRatioSize: 0.5,
  accoladeBuff:5,
}
]
   
return module;
})();