var defaultClickURL =
[
  {productLabel:"homepage6",productURL:"https://www.screwfix.com//"}
];

var products =
[
  {productLabel:"product_6_1",  productURL:"https://www.screwfix.com/"},
  {productLabel:"product_6_2",  productURL:"https://www.screwfix.com/"},
  {productLabel:"product_6_3",  productURL:"https://www.screwfix.com/"},
  {productLabel:"product_6_4",  productURL:"https://www.screwfix.com/"},
  {productLabel:"product_6_5",  productURL:"https://www.screwfix.com/"},
  {productLabel:"product_6_6",  productURL:"https://www.screwfix.com/"}
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