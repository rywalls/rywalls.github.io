function _setup(t){Object.defineProperty(t.prototype,"visible",{get:function(){return"hidden"!=this.style.visibility},set:function(t){this.style.visibility=t?"inherit":"hidden"}}),Object.defineProperty(t.prototype,"display",{get:function(){return"none"!=this.style.display},set:function(t){this.style.display=t?"block":"none"}}),Object.defineProperty(t.prototype,"buttonMode",{get:function(){return"pointer"===this.style.cursor},set:function(t){this.style.cursor=t?"pointer":"auto"}}),Object.defineProperty(t.prototype,"mouseEnabled",{get:function(){return"none"!=this.style.pointerEvents},set:function(t){this.style.pointerEvents=t?"auto":"none"}}),Object.defineProperty(t.prototype,"transform",{get:getTransform,set:setTransform}),Object.defineProperty(t.prototype,"transformStyle",{get:getTransformStyle}),Object.defineProperty(t.prototype,"_x",{get:getX,set:setX}),Object.defineProperty(t.prototype,"_y",{get:getY,set:setY}),Object.defineProperty(t.prototype,"_rotation",{get:getRotation,set:setRotation}),Object.defineProperty(t.prototype,"_scaleX",{get:getScaleX,set:getScaleX}),Object.defineProperty(t.prototype,"_scaleY",{get:getScaleY,set:getScaleY}),Object.defineProperty(t.prototype,"_width",{get:getWidth,set:setWidth}),Object.defineProperty(t.prototype,"_height",{get:getHeight,set:setHeight}),Object.defineProperty(t.prototype,"numChildren",{get:function(){return this.children.length}}),Object.defineProperty(t.prototype,"scrollRect",{get:getScrollRect,set:setScrollRect}),t.prototype._=function(t){return this.querySelector(t)},t.prototype.__=function(t){return this.querySelectorAll(t)},t.prototype._t=function(t){return this.querySelector("[data-type='"+t+"']")},t.prototype.__t=function(t){return this.querySelectorAll("[data-type='"+t+"']")},t.prototype.cache=function(t){return void 0===t&&(t={}),t.x=this._x,t.y=this._y,t.scaleX=this._scaleX,t.scaleY=this._scaleY,t.rotation=this._rotation,t},t.prototype.childByIndex=function(t){return this.children[t]}}function getScrollRect(){return this._scrollRect}function setScrollRect(t){this._scrollRect=t;var e,r=t.x,n=t.y,i=t.width,s=t.height,o=this._("svg"),a=o.firstElementChild,l=a.children;void 0==l&&(l=a.childNodes);for(var _=0;_<l.length;_++){var h=l[_];if("clipPath"==h.tagName)return(e=h.firstElementChild).setAttributeNS(null,"x",r),e.setAttributeNS(null,"y",n),e.setAttributeNS(null,"width",i),e.setAttributeNS(null,"height",s),e}var f="http://www.w3.org/2000/svg",d=document.createElementNS(f,"clipPath");d.setAttributeNS(null,"id","clip"),(e=document.createElementNS(f,"rect")).setAttributeNS(null,"x",r),e.setAttributeNS(null,"y",n),e.setAttributeNS(null,"width",i),e.setAttributeNS(null,"height",s),d.appendChild(e),a.appendChild(d);var u=o.lastElementChild,c=u.children;void 0==c&&(c=u.childNodes);for(var _=0;_<c.length;_++)c[_].setAttributeNS(null,"clip-path","url(#clip)")}function getTransform(){var t={a:1,b:0,c:0,d:1,tx:0,ty:0},e=this.transformStyle;if(e&&"none"!=e){var r=(e=e.substring(e.indexOf("(")+1,e.lastIndexOf(")"))).split(",");t.a=parseFloat(r[0]),t.b=parseFloat(r[1]),t.c=parseFloat(r[2]),t.d=parseFloat(r[3]),t.tx=parseFloat(r[4]),t.ty=parseFloat(r[5])}return t}function getTransformStyle(){var t=document.defaultView.getComputedStyle(this,null);if(null==t)return null;var e=t.getPropertyValue("-webkit-transform")||t.getPropertyValue("-moz-transform")||t.getPropertyValue("-ms-transform")||t.getPropertyValue("-o-transform")||t.getPropertyValue("transform")||null;return"none"==e?null:e}function setTransform(t){var e="matrix("+t.a+","+t.b+","+t.c+","+t.d+","+t.tx+","+t.ty+")";this.style[getPropPrefix("transform")]=e}function concat(t,e){var r={a:1,b:0,c:0,d:1,tx:0,ty:0};return r.a=t.a*e.a+t.b*e.c,r.b=t.a*e.b+t.b*e.d,r.c=t.c*e.a+t.d*e.c,r.d=t.c*e.b+t.d*e.d,r.tx=t.tx1*e.a+t.ty1*e.c+e.tx2,r.ty=t.tx1*e.b+t.ty1*e.d+e.ty2,r}function decompose(t){var e=dtPoint(t,{x:0,y:1}),r=dtPoint(t,{x:1,y:0}),n=180/Math.PI*Math.atan2(e.y,e.x)-90,i=180/Math.PI*Math.atan2(r.y,r.x);return{translateX:t.tx,translateY:t.ty,scaleX:Math.sqrt(t.a*t.a+t.b*t.b),scaleY:Math.sqrt(t.c*t.c+t.d*t.d),skewX:n,skewY:i,rotation:i}}function getRotation(){var t=this.transform;return t.d,t.c,180/Math.PI*Math.atan2(t.b,t.a)}function setRotation(){}function getX(){return this.transform.tx}function getY(){return this.transform.ty}function setX(t){var e=this.transform;e.tx=t,this.transform=e}function setY(t){var e=this.transform;e.ty=t,this.transform=e}function getScaleX(){var t=this.transform;return Math.sqrt(t.a*t.a+t.b*t.b)}function getScaleY(){var t=this.transform;return Math.sqrt(t.c*t.c+t.d*t.d)}function setScaleX(t){}function setScaleY(t){}function setHeight(t){}function setWidth(t){}function getHeight(){var t=this.offsetHeight;return(isNaN(t)||!t)&&(t=parseFloat(this.style.height)),this._scaleY*t}function getWidth(){var t=this.offsetWidth;return(isNaN(t)||!t)&&(t=parseFloat(this.style.width)),this._scaleX*this.offsetWidth}function dtPoint(t,e){return{x:e.x*t.a+e.y*t.c,y:e.x*t.b+e.y*t.d}}function rotateMatrix(t,e){var r=Math.sin(e*=Math.PI/180),n=Math.cos(e),i=t.a,s=t.b,o=t.c,a=t.d,l=t.tx,_=t.ty;return t.a=i*n-s*r,t.b=i*r+s*n,t.c=o*n-a*r,t.d=o*r+a*n,t.tx=l*n-_*r,t.ty=l*r+_*n,t}function addDivKeyline(t,e,r,n,i){var s=document.createElement("div");return s.id="keyline",s.style.cssText="position:absolute;width:"+e+"px;height:"+r+"px;pointer-events:none;",s.innerHTML="<div class='do' style='width:100%; height:"+i+"px; top:0px; background-color:"+n+"'></div>"+("<div class='do' style='width:100%; height:"+i+"px; bottom: 0px; background-color:")+n+"'></div>"+("<div class='do' style='width:"+i+"px; height:100%; left:0px; background-color:")+n+"'></div>"+("<div class='do' style='width:"+i+"px; height:100%; right: 0px; background-color:")+n+"'></div>",t.appendChild(s)}function addKeylineTo(t,e,r,n,i){var s="http://www.w3.org/2000/svg",o=document.createElement("div");return o.className="do",o.style.width=e+"px",o.style.height=r+"px",o.style.pointerEvents="none",o.appendChild(createSVGRect(s,0,0,e,1,n)),o.appendChild(createSVGRect(s,0,r-1,e,1,n)),o.appendChild(createSVGRect(s,0,0,1,r,n)),o.appendChild(createSVGRect(s,e-1,0,1,r,n)),o.mouseEnabled=!1,o.mouseChildren=!1,t.appendChild(o),o}function createSVGRect(t,e,r,n,i,s){var o=document.createElementNS(t,"svg");o.setAttribute("style","pointer-events:none;left:"+e+"px;top:"+r+"px;-moz-transform:matrix(1,0,0,1,0,0);-ms-transform:matrix(1,0,0,1,0,0);-o-transform:matrix(1,0,0,1,0,0);-webkit-transform:matrix(1,0,0,1,0,0);transform:matrix(1,0,0,1,0,0);"),o.setAttribute("width",n),o.setAttribute("height",i),o.setAttribute("class","do"),o.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink");var a=document.createElementNS(t,"rect");return a.setAttribute("x",0),a.setAttribute("y",0),a.setAttribute("height",i),a.setAttribute("width",n),a.setAttribute("fill",s),a.setAttribute("style","pointer-events:none;"),o.appendChild(a),o}function supportsTransforms(){if(!window.getComputedStyle)return!1;var t,e=document.createElement("p"),r={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};for(var n in document.body.appendChild(e),r)void 0!==e.style[n]&&(e.style[n]="matrix(1,0,0,1,0,0)",t=window.getComputedStyle(e).getPropertyValue(r[n]));return document.body.removeChild(e),void 0!==t&&t.length>0&&"none"!==t}function getPropPrefix(t){var e,r,n=document.createElement("div").style;if(void 0!==n[t])return t;for(t=t.charAt(0).toUpperCase()+t.substr(1),e=["O","Moz","ms","Ms","webkit"],r=5;--r>-1&&void 0===n[e[r]+t];);return r>=0?(_prefix=3===r?"ms":e[r])+t:null}_setup(HTMLElement),_setup(SVGElement),window.logging=!1,window.debug=!1,window.console&&window.console.log?window.log=function(){if(this.logging){if(this.debug){var t=Array.prototype.slice.call(arguments);if(Error().stack){var e=Error().stack.split("\n")[2],r=e.substring(e.indexOf("at ")+3,e.lastIndexOf("(")-1);e=e.substring(e.lastIndexOf("/")+1,e.lastIndexOf(")")-2),t.push("	<["+r+"()::"+e+"]>")}Function.prototype.apply.call(console.log,console,t)}else Function.prototype.apply.call(console.log,console,arguments)}}:window.log={log:function(){}};var tweens=[];function to(t,e,r){var n=TweenLite.to(t,e,r);return tweens.push(n),n}var fbf=function(){var t={};function e(t){var e=document.createElement("div");return document.createTextNode(t),e.innerHTML=t,e}t.publicMethod=function(){},t.ajax=function(t,e,r){var n=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");void 0==r?r={type:"GET",async:!1,format:"text"}:(void 0==r.type&&(r.type="GET"),void 0==r.async&&(r.async=!1),void 0==r.format&&(r.format="text")),n.open(r.type||"GET",t,r.async||!1),r.async?(n.onreadystatechange=function(){4==n.readyState&&200==n.status?e&&e(n.response?n.response:n.responseText):4==n.readyState&&r.error&&r.error("error")},n.send(null)):(n.send(r.data),e&&e("xml"==r.format?n.responseXML:n.responseText))},t.loadSvgs=function(t,e){e=e||"svg.gz.js",fbf.ajaxBinary(e,function e(r){for(var n=$("svg_defs");n.firstChild;)n.removeChild(n.firstChild);var i=fbf.gunzip(r);document.createElement("div");var s=new DOMParser().parseFromString(i,"image/svg+xml").firstChild;s.id="defs_global",n.appendChild(s),t()})},t.loadModule=function(t,e,r){e?fbf.ajaxBinary(t,function t(e){r(fbf.gunzip(e))}):fbf.ajax(t,r)},t.ajaxBinary=function(t,e){var r=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");r.open("GET",t,!0),r.responseType="arraybuffer",r.onreadystatechange=function(){if(4==r.readyState&&200==r.status){var t=r.response?r.response:new VBArray(r.responseBody).toArray();if("object"==typeof t&&t.length){for(var n="",i=t.length,s=0;s<i;s++)n+=String.fromCharCode(t[s]);t=n}else if("object"==typeof t){for(var o=new Uint8Array(t),n="",i=o.length,s=0;s<i;s++)n+=String.fromCharCode(o[s]);t=n}for(var o=[],s=0;s<t.length;s++)o[s]=255&t.charCodeAt(s);e(o)}},r.send(null)},t.gunzip=function(t){if(31==t[0]&&139==t[1])var e=new Zlib.Gunzip(t).decompress();else e=t;for(var r="",n=0;n<e.length;n++)r+=String.fromCharCode(e[n]);return r},t.hide=function(){for(var t=0;t<arguments.length;t++)arguments[t].nodeType&&1==arguments[t].nodeType?arguments[t].visible=!1:arguments[t].length&&this.hide.apply(null,arguments[t])},t.show=function(){for(var t=0;t<arguments.length;t++)arguments[t].nodeType&&1==arguments[t].nodeType?arguments[t].visible=!0:arguments[t].length&&this.show.apply(null,arguments[t])},t.displayNone=function(){for(var t=0;t<arguments.length;t++)arguments[t].nodeType&&1==arguments[t].nodeType?arguments[t].display=!1:arguments[t].length&&this.displayNone.apply(null,arguments[t])},t.displayBlock=function(){for(var t=0;t<arguments.length;t++)arguments[t].nodeType&&1==arguments[t].nodeType?arguments[t].display=!0:arguments[t].length&&this.displayBlock.apply(null,arguments[t])},t.addListener=function(t,e,r,n,i,s){void 0===n&&(n=null),void 0===i&&(i=!1),void 0===s&&(s=!1);var o=function(t){if(null==n)i?r(t):r();else if(i){if(s){var e=n.concat(t);r.apply(null,e)}else r(n,t)}else s?r.apply(null,n):r(n)};t.addEventListener(e,o)},t.injectDiv=function(t,e,r){var n=document.createElement("div");return n.id=t,n.innerHTML=e,r.appendChild(n)};var r=[];for(var n in r.uk=["english"],r.nl=["dutch","english"],r.benl=["belgianDutch","dutch","english"],r.befr=["belgianFrench","french","english"],r.dk=["danish","english"],r.fi=["finnish","english"],r.sv=["swedish","english"],r.no=["norwegian","english"],r.uaeen=["english"],r.ksa=["arabic"],r.rsa=["southafrican","english"],r.au=["australian","english"],r.nz=["newz","english"],r.fr=["french"],r.it=["italian"],r.de=["german"],r.ch=["german"],r.at=["german"],r.es=["spanish"],r.pt=["portuguese"],r.pl=["polish"],r.uaear=["arabic"],r.ru=["russian"],r)r[n].push("default");t.setLang=function(t,e){if(t.length){for(var n=0;n<t.length;n++)this.setLang(t[n],e);return}for(var i=t.children.length,s=r[e],o=!1,a=0;a<s.length;a++){for(var l=s[a],n=0;n<i;n++){var _=t.children[n].id,h=_.indexOf("_"+l);-1!=h&&h==_.length-l.length-1?(this.show(t.children[n]),o=!0):this.hide(t.children[n])}if(o)break}},t.isMobile=function(){return/Mobi/.test(navigator.userAgent)},t.isIE=function(){var t=window.navigator.userAgent;return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0||t.indexOf("Edge/")>=0},t.isLocal=function(){return"file:"===window.location.protocol||"localhost"==window.location.hostname},t.replaceSVGDefs=function(t){var e=document.querySelectorAll("use");getPropPrefix("transform");for(var r=document.querySelector("defs"),n=0;n<e.length;n++){var i=e[n],s=i.getAttribute("xlink:href"),o=r.querySelector(s).cloneNode(!0),a=i.getAttribute("transform");a&&o.setAttribute("transform",a),i.parentNode.appendChild(o),i.parentNode.removeChild(i)}},t.replaceSVGDefs2=function(t){var e=document.querySelectorAll("use");document.querySelector("defs");for(var r=0;r<e.length;r++){var n=e[r],i=n.parentNode;i.removeChild(n),i.appendChild(n)}},t.traverseDom=function(t,e,r){if(void 0===r&&(r=0),!1!==e(t,r))for(t=t.firstChild,r++;t;)this.traverseDom(t,e,r),t=t.nextSibling},t.logDom=function(t){var e="";return this.traverseDom(t,function t(r,n){if(void 0===r.id||r.id.length<1||-1!==r.id.indexOf("instance")||"defs_global"==r.id)return!1;for(var i="";n--;)i+="	";return e+=i+"var "+r.id+" = $('"+r.id+"');\n",!0}),e},t.clean=function(t,e){void 0===e&&(e=!0);for(var r=0;r<t.childNodes.length;r++){var n=t.childNodes[r];8!==n.nodeType&&(3!==n.nodeType||/\S/.test(n.nodeValue))?1===n.nodeType&&this.clean(n,e):(t.removeChild(n),r--)}},t.getChildrenMatching=function(t,e){for(var r=t.children,n=[],i=0;i<r.length;i++){var s=r[i];void 0!==s.id&&-1!=s.id.indexOf(e)&&n.push(s)}return n},t.createVideo=function(t,e,r){log("setupVideodiv("+t+")");var n=document.createElement("video");n.id=t,n.width=e,n.height=r,n.preload="none",n.muted=!0,n.style.position="absolute";for(var i=3;i<arguments.length;i++){var s=arguments[i],o=s.substr(s.lastIndexOf(".")+1);n.appendChild(this.generateVideoSource(s,"video/"+o))}return n},t.generateVideoSource=function(t,e){var r=document.createElement("source");return r.src=t,r.type=e,r};var i=document.createElement("div");return i.id="listener",i.style.display="none",i.addEventListener("clickthrough",function t(e){console.log("handleClick",e)}),t}(),Rectangle=function(t,e,r,n){this.x=t,this.y=e,this.width=r,this.height=n};function gzip(){/** @license zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License */ (function(){"use strict";function t(t){throw t}var e=void 0,r=this;function n(t,n){var i,s=t.split("."),o=r;for((s[0]in o)||!o.execScript||o.execScript("var "+s[0]);s.length&&(i=s.shift());)s.length||n===e?o=o[i]?o[i]:o[i]={}:o[i]=n}var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array&&"undefined"!=typeof DataView;for(new(i?Uint8Array:Array)(256),d=0;256>d;++d)for(var s=d,o=7,s=s>>>1;s;s>>>=1)--o;function a(t,e,r){var n,i="number"==typeof e?e:e=0,s="number"==typeof r?r:t.length;for(n=-1,i=7&s;i--;++e)n=n>>>8^_[(n^t[e])&255];for(i=s>>3;i--;e+=8)n=(n=(n=(n=(n=(n=(n=(n=n>>>8^_[(n^t[e])&255])>>>8^_[(n^t[e+1])&255])>>>8^_[(n^t[e+2])&255])>>>8^_[(n^t[e+3])&255])>>>8^_[(n^t[e+4])&255])>>>8^_[(n^t[e+5])&255])>>>8^_[(n^t[e+6])&255])>>>8^_[(n^t[e+7])&255];return(4294967295^n)>>>0}var l=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,936918e3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],_=i?new Uint32Array(l):l;function h(){}function f(t){var e,r,n,s,o,a,l,_,h,f,d=t.length,u=0,c=Number.POSITIVE_INFINITY;for(_=0;_<d;++_)t[_]>u&&(u=t[_]),t[_]<c&&(c=t[_]);for(o=2,e=1<<u,r=new(i?Uint32Array:Array)(e),n=1,s=0;n<=u;){for(_=0;_<d;++_)if(t[_]===n){for(h=0,a=0,l=s;h<n;++h)a=a<<1|1&l,l>>=1;for(f=n<<16|_,h=a;h<e;h+=o)r[h]=f;++s}++n,s<<=1,o<<=1}return[r,u,c]}h.prototype.getName=function(){return this.name},h.prototype.getData=function(){return this.data},h.prototype.H=function(){return this.I},n("Zlib.GunzipMember",h),n("Zlib.GunzipMember.prototype.getName",h.prototype.getName),n("Zlib.GunzipMember.prototype.getData",h.prototype.getData),n("Zlib.GunzipMember.prototype.getMtime",h.prototype.H);var d,u,c=[];for(u=0;288>u;u++)switch(!0){case 143>=u:c.push([u+48,8]);break;case 255>=u:c.push([u-144+400,9]);break;case 279>=u:c.push([u-256+0,7]);break;case 287>=u:c.push([u-280+192,8]);break;default:t("invalid literal: "+u)}var p=function(){function e(e){switch(!0){case 3===e:return[257,e-3,0];case 4===e:return[258,e-4,0];case 5===e:return[259,e-5,0];case 6===e:return[260,e-6,0];case 7===e:return[261,e-7,0];case 8===e:return[262,e-8,0];case 9===e:return[263,e-9,0];case 10===e:return[264,e-10,0];case 12>=e:return[265,e-11,1];case 14>=e:return[266,e-13,1];case 16>=e:return[267,e-15,1];case 18>=e:return[268,e-17,1];case 22>=e:return[269,e-19,2];case 26>=e:return[270,e-23,2];case 30>=e:return[271,e-27,2];case 34>=e:return[272,e-31,2];case 42>=e:return[273,e-35,3];case 50>=e:return[274,e-43,3];case 58>=e:return[275,e-51,3];case 66>=e:return[276,e-59,3];case 82>=e:return[277,e-67,4];case 98>=e:return[278,e-83,4];case 114>=e:return[279,e-99,4];case 130>=e:return[280,e-115,4];case 162>=e:return[281,e-131,5];case 194>=e:return[282,e-163,5];case 226>=e:return[283,e-195,5];case 257>=e:return[284,e-227,5];case 258===e:return[285,e-258,0];default:t("invalid length: "+e)}}var r,n,i=[];for(r=3;258>=r;r++)n=e(r),i[r]=n[2]<<24|n[1]<<16|n[0];return i}();function g(e,r){switch(this.i=[],this.j=32768,this.d=this.f=this.c=this.n=0,this.input=i?new Uint8Array(e):e,this.o=!1,this.k=y,this.z=!1,(r||(r={},0))&&(r.index&&(this.c=r.index),r.bufferSize&&(this.j=r.bufferSize),r.bufferType&&(this.k=r.bufferType),r.resize&&(this.z=r.resize)),this.k){case v:this.a=32768,this.b=new(i?Uint8Array:Array)(32768+this.j+258);break;case y:this.a=0,this.b=new(i?Uint8Array:Array)(this.j),this.e=this.F,this.q=this.B,this.l=this.D;break;default:t(Error("invalid inflate mode"))}}i&&new Uint32Array(p);var v=0,y=1;g.prototype.g=function(){for(;!this.o;){var r=q(this,3);switch(1&r&&(this.o=!0),r>>>=1){case 0:var n=this.input,s=this.c,o=this.b,a=this.a,l=n.length,_=e,h=e,f=o.length,d=e;switch(this.d=this.f=0,s+1>=l&&t(Error("invalid uncompressed block header: LEN")),_=n[s++]|n[s++]<<8,s+1>=l&&t(Error("invalid uncompressed block header: NLEN")),_===~(h=n[s++]|n[s++]<<8)&&t(Error("invalid uncompressed block header: length verify")),s+_>n.length&&t(Error("input buffer is broken")),this.k){case v:for(;a+_>o.length;){if(_-=d=f-a,i)o.set(n.subarray(s,s+d),a),a+=d,s+=d;else for(;d--;)o[a++]=n[s++];this.a=a,o=this.e(),a=this.a}break;case y:for(;a+_>o.length;)o=this.e({t:2});break;default:t(Error("invalid inflate mode"))}if(i)o.set(n.subarray(s,s+_),a),a+=_,s+=_;else for(;_--;)o[a++]=n[s++];this.c=s,this.a=a,this.b=o;break;case 1:this.l(O,X);break;case 2:V(this);break;default:t(Error("unknown BTYPE: "+r))}}return this.q()};var b,m,x=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],w=i?new Uint16Array(x):x,S=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,258,258],C=i?new Uint16Array(S):S,k=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0],N=i?new Uint8Array(k):k,E=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],A=i?new Uint16Array(E):E,T=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],P=i?new Uint8Array(T):T,z=new(i?Uint8Array:Array)(288);for(b=0,m=z.length;b<m;++b)z[b]=143>=b?8:255>=b?9:279>=b?7:8;var I,M,O=f(z),G=new(i?Uint8Array:Array)(30);for(I=0,M=G.length;I<M;++I)G[I]=5;var X=f(G);function q(e,r){for(var n,i=e.f,s=e.d,o=e.input,a=e.c,l=o.length;s<r;)a>=l&&t(Error("input buffer is broken")),i|=o[a++]<<s,s+=8;return n=i&(1<<r)-1,e.f=i>>>r,e.d=s-r,e.c=a,n}function R(t,e){for(var r,n,i=t.f,s=t.d,o=t.input,a=t.c,l=o.length,_=e[0],h=e[1];s<h&&!(a>=l);)i|=o[a++]<<s,s+=8;return n=(r=_[i&(1<<h)-1])>>>16,t.f=i>>n,t.d=s-n,t.c=a,65535&r}function V(t){function e(t,e,r){var n,i,s,o=this.w;for(s=0;s<t;)switch(n=R(this,e)){case 16:for(i=3+q(this,2);i--;)r[s++]=o;break;case 17:for(i=3+q(this,3);i--;)r[s++]=0;o=0;break;case 18:for(i=11+q(this,7);i--;)r[s++]=0;o=0;break;default:o=r[s++]=n}return this.w=o,r}var r,n,s,o,a=q(t,5)+257,l=q(t,5)+1,_=q(t,4)+4,h=new(i?Uint8Array:Array)(w.length);for(o=0;o<_;++o)h[w[o]]=q(t,3);if(!i)for(o=_,_=h.length;o<_;++o)h[w[o]]=0;r=f(h),n=new(i?Uint8Array:Array)(a),s=new(i?Uint8Array:Array)(l),t.w=0,t.l(f(e.call(t,a,r,n)),f(e.call(t,l,r,s)))}function L(t){this.input=t,this.c=0,this.m=[],this.s=!1}g.prototype.l=function(t,e){var r=this.b,n=this.a;this.r=t;for(var i,s,o,a,l=r.length-258;256!==(i=R(this,t));)if(256>i)n>=l&&(this.a=n,r=this.e(),n=this.a),r[n++]=i;else for(a=C[s=i-257],0<N[s]&&(a+=q(this,N[s])),o=A[i=R(this,e)],0<P[i]&&(o+=q(this,P[i])),n>=l&&(this.a=n,r=this.e(),n=this.a);a--;)r[n]=r[n++-o];for(;8<=this.d;)this.d-=8,this.c--;this.a=n},g.prototype.D=function(t,e){var r=this.b,n=this.a;this.r=t;for(var i,s,o,a,l=r.length;256!==(i=R(this,t));)if(256>i)n>=l&&(l=(r=this.e()).length),r[n++]=i;else for(a=C[s=i-257],0<N[s]&&(a+=q(this,N[s])),o=A[i=R(this,e)],0<P[i]&&(o+=q(this,P[i])),n+a>l&&(l=(r=this.e()).length);a--;)r[n]=r[n++-o];for(;8<=this.d;)this.d-=8,this.c--;this.a=n},g.prototype.e=function(){var t,e,r=new(i?Uint8Array:Array)(this.a-32768),n=this.a-32768,s=this.b;if(i)r.set(s.subarray(32768,r.length));else for(t=0,e=r.length;t<e;++t)r[t]=s[t+32768];if(this.i.push(r),this.n+=r.length,i)s.set(s.subarray(n,n+32768));else for(t=0;32768>t;++t)s[t]=s[n+t];return this.a=32768,s},g.prototype.F=function(t){var e,r,n,s,o=this.input.length/this.c+1|0,a=this.input,l=this.b;return t&&("number"==typeof t.t&&(o=t.t),"number"==typeof t.A&&(o+=t.A)),n=2>o?(s=258*((r=(a.length-this.c)/this.r[2])/2)|0)<l.length?l.length+s:l.length<<1:l.length*o,i?(e=new Uint8Array(n)).set(l):e=l,this.b=e},g.prototype.q=function(){var t,e,r,n,s,o=0,a=this.b,l=this.i,_=new(i?Uint8Array:Array)(this.n+(this.a-32768));if(0===l.length)return i?this.b.subarray(32768,this.a):this.b.slice(32768,this.a);for(e=0,r=l.length;e<r;++e)for(t=l[e],n=0,s=t.length;n<s;++n)_[o++]=t[n];for(e=32768,r=this.a;e<r;++e)_[o++]=a[e];return this.i=[],this.buffer=_},g.prototype.B=function(){var t,e=this.a;return i?this.z?(t=new Uint8Array(e)).set(this.b.subarray(0,e)):t=this.b.subarray(0,e):(this.b.length>e&&(this.b.length=e),t=this.b),this.buffer=t},L.prototype.G=function(){return this.s||this.g(),this.m.slice()},L.prototype.g=function(){for(var r=this.input.length;this.c<r;){var n=new h,s=e,o=e,l=e,_=e,f=e,d=e,u=e,c=e,p=e,v=this.input,y=this.c;if(n.u=v[y++],n.v=v[y++],(31!==n.u||139!==n.v)&&t(Error("invalid file signature:"+n.u+","+n.v)),n.p=v[y++],8===n.p||t(Error("unknown compression method: "+n.p)),n.h=v[y++],c=v[y++]|v[y++]<<8|v[y++]<<16|v[y++]<<24,n.I=new Date(1e3*c),n.O=v[y++],n.N=v[y++],0<(4&n.h)&&(n.J=v[y++]|v[y++]<<8,y+=n.J),0<(8&n.h)){for(d=0,u=[];0<(f=v[y++]);)u[d++]=String.fromCharCode(f);n.name=u.join("")}if(0<(16&n.h)){for(d=0,u=[];0<(f=v[y++]);)u[d++]=String.fromCharCode(f);n.K=u.join("")}0<(2&n.h)&&(n.C=65535&a(v,0,y),n.C!==(v[y++]|v[y++]<<8)&&t(Error("invalid header crc16"))),s=v[v.length-4]|v[v.length-3]<<8|v[v.length-2]<<16|v[v.length-1]<<24,v.length-y-4-4<512*s&&(_=s),o=new g(v,{index:y,bufferSize:_}),n.data=l=o.g(),y=o.c,n.L=p=(v[y++]|v[y++]<<8|v[y++]<<16|v[y++]<<24)>>>0,a(l,e,e)!==p&&t(Error("invalid CRC-32 checksum: 0x"+a(l,e,e).toString(16)+" / 0x"+p.toString(16))),n.M=s=(v[y++]|v[y++]<<8|v[y++]<<16|v[y++]<<24)>>>0,(4294967295&l.length)!==s&&t(Error("invalid input size: "+(4294967295&l.length)+" / "+s)),this.m.push(n),this.c=y}this.s=!0;var b,m,x,w=this.m,S=0,C=0;for(b=0,m=w.length;b<m;++b)C+=w[b].data.length;if(i)for(b=0,x=new Uint8Array(C);b<m;++b)x.set(w[b].data,S),S+=w[b].data.length;else{for(b=0,x=[];b<m;++b)x[b]=w[b].data;x=Array.prototype.concat.apply([],x)}return x},n("Zlib.Gunzip",L),n("Zlib.Gunzip.prototype.decompress",L.prototype.g),n("Zlib.Gunzip.prototype.getMembers",L.prototype.G)}).call(this)}function TextField(t,e,r,n,i,s,o,a,l){if("string"==typeof t&&(h=!1),"object"==typeof t&&(h=!0),"string"!=typeof e&&(e=String(e)),!1!=h||fonts[t]){if(h){for(var _ in t)if(t.hasOwnProperty(_)&&!fonts[t[_]])throw"font "+t[_]+" not found"}}else throw"font "+t+" not found";var h,f=1/1024*r;for(s=s||"left",(a=a||div()).className="do";a.firstChild;)a.removeChild(a.firstChild);var d=!fbf.isIE();if(d){if(a.parentNode)var u=a.parentNode,c=a.nextSibling;document.body.appendChild(a);var p=a.style.visible||"visible";a.style.visible="hidden"}var g=svg();g.setAttribute("class","do"),g.className="do",g.setAttribute("fill",o||"#000000");var v=document.getElementById("defs_global");v=document.getElementById("svg_defs").firstElementChild;var y="http://www.w3.org/2000/svg",b=getFontSettings(h?t.normal:t,r,n,i),m=fonts[h?t.normal:t],x=m.ascent,w=m.descent,S=m.leading*f,C=0+.05*x*f,k=2,N=l||0,E=0,A=0,T=[],P=[],z=document.createElementNS(y,"g");T.push(z),S=(x+w)*.05*f;for(var I=-1,M=-1,O="matrix("+f+",0,0,"+f+",",G="matrix("+.5625*f+",0,0,"+.5625*f+",",X="normal",q=0,R=1,V=null,L=(x-w)*.05*f-(x-w)*.05*f*.5625,Y=0;Y<e.length;Y++){var j=e.charCodeAt(Y);if(h&&60==j&&48!=e.charCodeAt(Y+1)){if("/"===e.charAt(Y+1)){b=getFontSettings(h?t.normal:t,r,n,i),"sup"==X&&(C+=L),q=0,R=1,Y+=X.length+2,X="normal",V=null;continue}var B=e.indexOf(">",Y),X=e.substring(Y+1,B),D=X.length,F=X.indexOf(" ");if(-1!=F){var H=X.substring(F+1);-1!=H.indexOf("color")&&(V=(H=H.split("'"))[1]),X=X.substring(0,F)}"b"==X?b=getFontSettings(h?t.bold:t,r,n,i):"i"==X?q=-10:"sup"==X?(R=.5625,C-=L):"sub"==X&&(R=.5625),Y+=D+1;continue}if(10==j){M=Y,C+=S+i,k=2,P.push(A),A=0,g.appendChild(z),z=document.createElementNS(y,"g"),T.push(z),I=-1;continue}if((32==j||Y==e.length-1)&&l&&k>l){var Z=e.lastIndexOf(" ",Y-1);if(-1==Z)l=0;else{for(e=e.substr(0,Z)+"\n"+e.substr(Z+1),T.length=0,P.length=0;z.lastElementChild;)z.lastElementChild&&z.removeChild(z.lastElementChild);for(;g.lastElementChild;)g.removeChild(g.lastElementChild);Y=Z-1,Y=-1,k=2,C=0+.05*x*f,A=0,N=l||0,I=-1,z=document.createElementNS(y,"g"),T.push(z),b=getFontSettings(h?t.normal:t,r,n,i);continue}}if(v.querySelector(b.fontId+j)){var W=document.createElementNS(y,"use");V&&W.setAttribute("fill",V);var K=b.fontId+j;W.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",K);var J=I<<16|j;-1!=I&&b.kerningTable[J]&&(k+=b.kerningTable[J]*f*.05);var U=(1==R?O:G)+k+","+C+")";0!=q&&(U+=" skewX("+q+")"),W.setAttribute("transform",U),z.appendChild(W);var Q=b.advanceTable[j]*f*.05;1!=R&&(Q*=.5625),k+=Q+n,I=j,k>A&&(A=k),k>N&&(N=k)}}if(null==z.parentNode&&(g.appendChild(z),P.push(A)),E+=.05*b.descent*f+C,g.setAttribute("width",N+"px"),g.setAttribute("height",E+"px"),a.setAttribute("data-width",Math.ceil(N)),a.setAttribute("data-height",Math.ceil(E)),a.style.width=Math.ceil(N)+"px",a.style.height=Math.ceil(E)+"px",a.appendChild(g),"left"!=s){if("right"==s)for(var Y=0;Y<T.length;Y++)TweenLite.set(T[Y],{x:N-P[Y]});else if("center"==s||"middle"==s)for(var Y=0;Y<T.length;Y++)TweenLite.set(T[Y],{x:(N-P[Y])*.5-1})}return d&&(u?c?u.insertBefore(a,c):u.appendChild(a):a.parentNode.removeChild(a),a.style.visible=p),a}function TextField2(t,e,r,n,i,s,o,a){if(!fonts[t])throw"font "+t+" not found";var l=1/1024*r;for(s=s||"left",(a=a||div()).className="do";a.firstChild;)a.removeChild(a.firstChild);if(a.parentNode)var _=a.parentNode,h=a.nextSibling;document.body.appendChild(a);var f=a.style.visible||"visible";a.style.visible="hidden";var d=svg();d.setAttribute("class","do"),d.className="do",d.setAttribute("fill",o||"#000000");var u=document.getElementById("defs_global");u=document.getElementById("svg_defs").firstElementChild;var c="http://www.w3.org/2000/svg",p=fonts[t],g=p.ascent,v=p.descent,y=p.leading*l,b=2+.05*g*l,m=2,x=p.advance,w=p.kerning,S="#f"+p.id+"_",C=0,k=0,N=0,E=[],A=[],T=document.createElementNS(c,"g");E.push(T),y=(g+v)*.05*l;for(var P=-1,z="matrix("+l+",0,0,"+l+",",I=0;I<e.length;I++){var M=e.charCodeAt(I);if(10==M){b+=y+i,m=2,A.push(N),N=0,d.appendChild(T),T=document.createElementNS(c,"g"),E.push(T),P=-1;continue}if(u.querySelector(S+M)){var O=document.createElementNS(c,"use"),G=S+M;O.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",G);var X=P<<16|M;-1!=P&&w[X]&&(m+=w[X]*l*.05),O.setAttribute("transform",z+m+","+b+")"),T.appendChild(O),m+=x[M]*l*.05+n,P=M,m>N&&(N=m),m>C&&(C=m)}}if(null==T.parentNode&&(d.appendChild(T),A.push(N)),k+=.05*v*l+b,d.setAttribute("width",C+"px"),d.setAttribute("height",k+"px"),a.appendChild(d),"left"!=s){if("right"==s)for(var I=0;I<E.length;I++)TweenLite.set(E[I],{x:C-A[I]});else if("center"==s||"middle"==s)for(var I=0;I<E.length;I++)TweenLite.set(E[I],{x:(C-A[I])*.5})}return _?h?_.insertBefore(a,h):_.appendChild(a):a.parentNode.removeChild(a),console.log("vis",f),a.style.visible=f,a}function getFontSettings(t,e,r,n){var i=1/1024*e,s={},o=fonts[t];return s.ascent=o.ascent,s.descent=o.descent,s.height=(s.ascent+s.descent)*.05,s.offset=(1024-s.height)*i,s.leading=o.leading*i,s.ascent,s.advanceTable=o.advance,s.kerningTable=o.kerning,s.fontId="#f"+o.id+"_",s}gzip();