var defaultClickURL =
[
  {productLabel:"homepage6",productURL:"https://www.screwfix.com/landingpage/beatthefreeze/"}
];

var products =
[
  {productLabel:"product_6_1",  productURL:"https://www.screwfix.com/p/portable-fan-heater-2000w/340fh?_requestid=90641"},
  {productLabel:"product_6_2",  productURL:"https://www.screwfix.com/search?search=dewalt+phoenix+safety+boots+tan"},
  {productLabel:"product_6_3",  productURL:"https://www.screwfix.com/search?search=SCRUFFS+WORKER+PLUS+WORK+TROUSERS+BLACK"},
  {productLabel:"product_6_4",  productURL:"https://www.screwfix.com/p/delta-plus-vv750no-thermal-winter-work-gloves-black-large/2166r?_requestid=97659"},
  {productLabel:"product_6_5",  productURL:"https://www.screwfix.com/p/ring-rcb104-4a-car-battery-charger-12v/37258?_requestid=98081"},
  {productLabel:"product_6_6",  productURL:"https://www.screwfix.com/p/ring-rtc400-digital-tyre-inflator-12v/351fg"}
] 

var config = (function ()
{

  var module = {};

  module.gradientColour1 = "#6590a0";
  module.gradientColour2 = "#b5dbe6";//"#ffffff";//

  module.frameColour = "#1c54a2";//;"#005d94";
  module.introbgColour = "#FFFFFF";
  module.introTextColour1 = "#ffffff";
  module.introTextColour2 = "#ffffff";

  module.productBGColour = "#000000";
  module.nomTextColour = "#000000";
  module.pipColour = "#1c54a2";//"#d90000";//"#ffffff";

  module.introTextStore =
  [ 
    {
      line:'',
      lineFontSize: 124,
      lineTopBuffer: -8,                      
    },
    {
      line:'',
      lineFontSize: 64,           
      lineTopBuffer: -8,
    }    
  ]

return module;
})();