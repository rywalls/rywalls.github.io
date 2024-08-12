var config = (function (){
  var module = {};
  module.outDate = new Date("Nov 12 2018 00:00:00 GMT+0000");
  module.lang = "uk"; //"fr","it","de","es","pt","nl","befr","benl","nordics","at","chfr","chde","pl","ru","uaear","ksa","rsa","au";
  module.rich = true;
  module.showIntroVid = false; 
  module.showAccolade = false; 
  module.comradeArt = false;
  module.chosenBtn = "PreOrder"; //"PreOrder", "Trailer", "MP", "Zombies"
  //module.randomAccolade = false;
  module.specificAccolade = 2; // 0 = just randomize, then any number above will show only that accolade i.e. 1 = 1st accolade, 2 = 2nd accolade, etc

  ///////  DATE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  module.dateStore = [
                {
                    dateText:"12 OCTOBER", //"3<sup>RD</sup> NOVEMBER"
                    dateColour: "#FFFFFF",
                    dateFontSize: 32,
                    dateEffect: true,
                    datePost: false,
                    
                },
                {
                    dateText:"AVAILABLE NOW",
                    dateColour: "#FFFFFF",
                    dateFontSize: 24,
                    dateEffect: true,
                    datePost: true,
                   
                }
  ]

  ///////  STRAPLINE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  module.straplineStore = [
               {
                    strapText: 'EVERY SPECIALIST IS A WEAPON. CHOOSE WISELY.',//'THE DAY\nIS UPON US'-font should be 100 fort this,//"THE DAY IS UPON US" 
                    strapFontSize: 86,
                    strapLineHeight:-20,
                    strapColour: "#FFFFFF",
                    dateEffect: true,
                    datePost: false,
                },                  
              {
                    strapText:'A NEW ERA OF ZOMBIES HAVE AWOKEN',
                    strapFontSize: 100,
                    strapLineHeight:-20,
                    strapColour: "#FFFFFF",
                    dateEffect: true,
                    datePost: true,
                }
  ]

  ///////LETS BUILD A BUTTON////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
  - need to get the font info to put text button
  - need to build graphics of button
  - give it functionality
*/
  module.buttonStore = [
                    
                     {
                      buttonID: "btn_watch_trailer", 
                      buttonText:'WATCH REVEAL TRAILER',
                      buttonFontSize: 35,
                      buttonFunction: 'watchClick',
                      dateEffect: false,
                      datePost: false,
                     },
               
                    {
                      buttonID: "btn_preorder", 
                      buttonText:'PRE-ORDER NOW\nFOR BETA ACCESS',
                      buttonFontSize: 35,
                      buttonFunction: 'preOrderClick',
                      dateEffect: false,
                      datePost: false,
                     },
                    {
                      buttonID: "btn_buy", 
                      buttonText:'BUY NOW',
                      buttonFontSize: 40,
                      buttonFunction: 'buyNowClick',
                      dateEffect: true,
                      datePost: true,
                    },
                    {
                      buttonID: "btn_expand", 
                      buttonText:'EXPAND FOR TRAILER',
                      buttonFontSize: 35,
                      buttonFunction: 'ExpandForTrailerClick',

                    },
                    {
                      buttonID: "btn_learn", 
                      buttonText:'LEARN MORE',
                      buttonFontSize: 35,
                      buttonFunction: 'learnMoreClick',
                      dateEffect: false,
                      datePost: false,
       
                    },
                    {
                      buttonID: "btn_zombies", 
                      buttonText:'WATCH ZOMBIES TRAILER',
                      buttonFontSize: 35,
                      buttonFunction: 'watchClick',
                      dateEffect: false,
                      datePost: false,
       
                    },
                    {
                      buttonID: "btn_MP", 
                      buttonText:'WATCH MP TRAILER',
                      buttonFontSize: 35,
                      buttonFunction: 'watchClick',
                      dateEffect: false,
                      datePost: false,
       
                    }
    ]

  /////// ACCOLADES////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  module.accoladeStore = [
                 {
                    accolade:'“IT COULD BE THE\nFIRST-PERSON SHOOTER\nTHAT STEALS 2017”',
                    accoladeFontSize: 24,
                    accoladeTitle:"THE SUN",
                    accoladeTitleFontRatioSize: 0.5,
                    accoladeBuff:5,

                  },
                  {
                    accolade:'“IT’S SET TO BE\nONE OF THE BIGGEST\nRELEASES OF THE YEAR…”',
                    accoladeFontSize: 24,
                    accoladeTitle:"THE METRO",
                    accoladeTitleFontRatioSize: 0.5,
                    accoladeBuff:5,

                  },
                  {
                    accolade:'“DESTINY 2\nIS BEAUTIFUL”',
                    accoladeFontSize: 40,
                    accoladeTitle:"GQ",
                    accoladeTitleFontRatioSize: 0.5,
                    accoladeBuff:5,
                  }
  ]


    
    return module;
})();


//BUG IN FIREFOX LINE 265