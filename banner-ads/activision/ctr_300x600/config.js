console.log("load config");

var config = (function ()
{

var module = {};

module.releaseDate = new Date("June 21 2019 00:00:00 GMT+0100");

module.lang         = "uk";

module.rich         = true;
module.showIntroVid = false;
module.showAccolade = false;

module.chosenBtn    = "Purchase";
module.PS4          = true;

/*$$$$$\   $$$$$$\ $$$$$$$$\ $$$$$$$$\ 
$$  __$$\ $$  __$$\\__$$  __|$$  _____|
$$ |  $$ |$$ /  $$ |  $$ |   $$ |      
$$ |  $$ |$$$$$$$$ |  $$ |   $$$$$\    
$$ |  $$ |$$  __$$ |  $$ |   $$  __|   
$$ |  $$ |$$ |  $$ |  $$ |   $$ |      
$$$$$$$  |$$ |  $$ |  $$ |   $$$$$$$$\ 
\_______/ \__|  \__|  \__|   \______*/ 
console.log("date Store-----------------------------",WID,HEI);
module.dateStore =
[
  {
    Text:"AVAILABLE 21.06.19",
    //dateColour: "#FFFFFF",
    FontSize: 18, 
    LineHeight: 0,
    letterSpacing: 1, 
    useGradient: houseKeepDateGrad(),
    datePost: false, 
    dateEffect: false
       
  },
  {
    Text:"AVAILABLE NOW",
   // dateColour: "#FFFFFF",
    FontSize: 18, 
    LineHeight: 0,
    letterSpacing: 1,
    useGradient: houseKeepDateGrad(),
    datePost: true, 
    dateEffect: true     
  }
]

function houseKeepDateGrad()
{
  if(WID == 300 && HEI == 600)
  {
    return false;
  } else {
    return true;
  }
}

function houseKeepTagGrad()
{
  if(WID == 300 && HEI == 600)
  {
    return true;
  } else {
    return false;
  }
}


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
  buttonID: "btn_preorder",
  buttonText:'PRE-ORDER',
  letterSpacing: 1,
  lineHeight: 0,
  buttonFontSize: 16
},
{
  buttonID: "btn_buy",
  buttonText:'BUY NOW',
  letterSpacing: 1,
  lineHeight: 0,
  buttonFontSize: 16
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
  Text: 'START\nYOUR\nENGINES!', 
  FontSize: 60,
  LineHeight: 0,
  letterSpacing: 2, 
  useGradient: true
},
{
  Text: 'FULLY REMASTERED &\nREVVED UP TO THE MAX!', 
  FontSize: 20,
  LineHeight: 0,
  letterSpacing: 1,
  useGradient: houseKeepTagGrad()
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
}
]
   
return module;
})();