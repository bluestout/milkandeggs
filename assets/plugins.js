/***************** https://cdn.myshopapps.com/iwish/iwishlist.js *************************/
var iWishCnt=0,iWishlistmain={},iWishsync=!1,iWishUrl="https://iwish.myshopapps.com/ajax/";if(void 0===iwishWrapperClass)var iwishWrapperClass="form";if(void 0===iWishVarSelector)var iWishVarSelector="[name=id]";if(void 0===iWishQtySelector)var iWishQtySelector="[name=quantity]";if(void 0===iWishSelectClass)var iWishSelectClass="#product-select, .single-option-selector, .single-option-selector__radio, select[id|='product-select'], select[id|='product-variants-option'], select[id|='variant-listbox-option']";function iWishPost(i,s){method="post";var e=document.createElement("form");for(var t in e.setAttribute("method",method),e.setAttribute("action",i),s)if(s.hasOwnProperty(t)){var n=document.createElement("input");n.setAttribute("type","hidden"),n.setAttribute("name",t),n.setAttribute("value",s[t]),e.appendChild(n)}document.head.appendChild(e),e.submit()}function getSession(){"undefined"!=typeof Storage&&(""==iwish_cid&&"true"==localStorage.iWishsync&&(localStorage.removeItem("iWishlistmain"),localStorage.removeItem("iWishCnt"),localStorage.removeItem("iWishsync")),localStorage.iWishlistmain&&(iWishlistmain=JSON.parse(localStorage.getItem("iWishlistmain"))),localStorage.iWishCnt&&!isNaN(localStorage.iWishCnt)&&(iWishCnt=parseInt(localStorage.iWishCnt)),localStorage.iWishsync&&0<parseInt(iwish_cid)&&"true"==localStorage.iWishsync&&(iWishsync=!0),localStorage.setItem("iWishsync",iWishsync))}function pushToSession(){"undefined"!=typeof Storage&&("undefined"!==iWishlistmain&&localStorage.setItem("iWishlistmain",JSON.stringify(iWishlistmain)),"undefined"!==iWishCnt&&localStorage.setItem("iWishCnt",iWishCnt))}function isInWishlist(i,s){return void 0!==iWishlistmain[i]&&null!=s&&0<=iWishlistmain[i].indexOf(s)}function syncWithServer(){var i=JSON.stringify(iWishlistmain);jQuery.ajax({url:iWishUrl+"syncWishlist.php",data:{shop:iwish_shop,cId:iwish_cid,iwishlist:i},dataType:"jsonp",jsonpCallback:"iWishSyncCallback",success:function(i){console.log(JSON.stringify(i)),jQuery.extend(iWishlistmain,i.jsonDt),iWishCnt=i.iwishCnt,pushToSession(),jQuery(".iWishCount").html(iWishCnt),console.log("iWishsync done :: "+JSON.stringify(iWishlistmain)),iWishsync=!0,localStorage.setItem("iWishsync",iWishsync),"undefined"!=typeof iWishsyncFn&&"function"==typeof iWishsyncFn&&iWishsyncFn()},error:function(i,s,e){}})}function checkIwish(i,s){var e=i.find(".iWishAdd"),t=e.attr("data-product"),n=isInWishlist(t,s);console.log("checkIwish "+t+" :: "+s),n?e.addClass("iwishAdded").html(iwish_added_txt):e.removeClass("iwishAdded").html(iwish_add_txt),"undefined"!=typeof iWishSelectChangeFn&&"function"==typeof iWishSelectChangeFn&&iWishSelectChangeFn(e)}function iwish_addOnly(i,s,e,t){if(void 0===iWishlistmain[i]&&(iWishlistmain[i]=[]),console.log("Adding "+i+" :: "+s),iWishlistmain[i].indexOf(s)<0&&(iWishlistmain[i].push(s),iWishCnt++,pushToSession(),jQuery(".iWishCount").html(iWishCnt),0<parseInt(iwish_cid))){var n=1;t.parents(iwishWrapperClass).find(iWishQtySelector).length&&(n=t.parents(iwishWrapperClass).find(iWishQtySelector).val()),jQuery.ajax({url:iWishUrl+"iwishAdd.php",data:{shop:iwish_shop,cId:iwish_cid,pId:i,vId:s,pTitle:e,qty:n},dataType:"jsonp",jsonpCallback:"iWishAddCallback",success:function(i){},error:function(i,s,e){}})}}function iwish_add(i,s){var e=i.attr("data-product");if(i.hasClass("iwishAdded")||null==s||null==e)return!1;if(iwish_addOnly(e,s,i.attr("data-pTitle"),i),0<=iWishlistmain[e].indexOf(s)&&(i.addClass("iwishAdded").html(iwish_added_txt),""==iwish_cid)){var t=i.parents(iwishWrapperClass);t.find(".iWishLoginMsg").fadeIn(500),setTimeout(function(){t.find(".iWishLoginMsg").fadeOut()},6e3)}"undefined"!=typeof iWishAddFn&&"function"==typeof iWishAddFn&&iWishAddFn()}function iwish_addCollection(i,s){var e=i.attr("data-product");if(i.hasClass("iwishAdded")||null==s||null==e)return!1;iwish_addOnly(e,s,i.attr("data-pTitle"),i),0<=iWishlistmain[e].indexOf(s)&&i.addClass("iwishAdded").html(iwish_added_txt_col),"undefined"!=typeof iWishaddCollFn&&"function"==typeof iWishaddCollFn&&iWishaddCollFn()}function iwish_remove(i,s,e){var t=!1;if(pId=i.attr("data-product"),void 0===iWishlistmain[pId])return t;console.log("iwish remove :: "+s);var n=iWishlistmain[pId].indexOf(s);0<=n&&(iWishlistmain[pId].splice(n,1),0<iWishCnt&&iWishCnt--,jQuery(".iWishCount").html(iWishCnt),pushToSession(),0==(e=e||!1)&&i.removeClass("iwishAdded"),0<parseInt(iwish_cid)&&jQuery.ajax({url:iWishUrl+"iwishRemove.php",data:{shop:iwish_shop,cId:iwish_cid,pId:pId,vId:s},dataType:"jsonp",jsonpCallback:"iWishRemoveCallback",success:function(i){},error:function(i,s,e){}}),t=!0);return"undefined"!=typeof iWishRemoveFn&&"function"==typeof iWishRemoveFn&&iWishRemoveFn(),t}function iwish_initQV(){setTimeout(function(){if(0<jQuery(iwish_qvWrapper+":visible").find(".iWishAdd").length){var i=jQuery(iwish_qvWrapper+":visible").find(iWishVarSelector).val();""!=i&&checkIwish(jQuery(iwish_qvWrapper+":visible").find(iwishWrapperClass),i),"undefined"!=typeof iWishQvFn&&"function"==typeof iWishQvFn&&iWishQvFn()}else iwish_initQV()},300)}function iwish_updateQty(i,s){jQuery.ajax({url:iWishUrl+"iwishUpdateQty.php",data:{shop:iwish_shop,cId:iwish_cid,iwishpQty:s,vId:i},dataType:"jsonp",jsonpCallback:"iWishUpdateQtyCallback",success:function(i){},error:function(i,s,e){}}),"undefined"!=typeof iwishUpdateQtyFn&&"function"==typeof iwishUpdateQtyFn&&iwishUpdateQtyFn()}function iwishInit(){var i=!!jQuery.fn.on;if(iwish_pro_template){var s=jQuery(".iWishAdd:visible").parents(iwishWrapperClass),e=s.find(iWishVarSelector).val();""!=e&&checkIwish(s,e)}jQuery(".iWishCount").html(iWishCnt),0<parseInt(iwish_cid)&&(iWishsync||(console.log("Sync Need to be done"),syncWithServer())),"undefined"!=typeof iwish_qvButton&&"undefined"!=typeof iwish_qvWrapper&&(i?jQuery("body").on("click",iwish_qvButton,function(){iwish_initQV()}):jQuery("body").delegate(iwish_qvButton,"click",function(){iwish_initQV()})),i?jQuery(document).on("change",iWishSelectClass,function(){selectedClass=jQuery(this).parents(iwishWrapperClass),setTimeout(function(){var i=selectedClass.find(iWishVarSelector).val();""!=i?checkIwish(selectedClass,i):selectedClass.removeClass("iwishAdded").html(iwish_add_txt)},400)}):jQuery(document).delegate(iWishSelectClass,"change",function(){selectedClass=jQuery(this).parents(iwishWrapperClass),setTimeout(function(){var i=selectedClass.find(iWishVarSelector).val();""!=i?checkIwish(selectedClass,i):selectedClass.removeClass("iwishAdded").html(iwish_add_txt)},400)}),"undefined"!=typeof iWishinitFn&&"function"==typeof iWishinitFn&&iWishinitFn(),jQuery(".iwishRemoveBtn").click(function(){if(jQuery(this).hasClass("iwishRemoved"))return!1;var i=jQuery(this).attr("data-variant");return iwish_remove(jQuery(this),i,!0)&&(jQuery(this).addClass("iwishRemoved"),jQuery(this).parents(".iwishItem").remove(),jQuery(".iwishMsgSuccess").show(),setTimeout(function(){jQuery(".iwishMsgSuccess").fadeOut(),0==iWishCnt&&jQuery(".iwishMsgInfo").fadeIn()},3e3)),!1}),jQuery("input[name=iwishProQuantity]").change(function(){var i=jQuery(this),s=parseInt(i.val()),e=i.parents(".iwishItem").find(iWishVarSelector).val();0<parseInt(iwish_cid)&&(0<s?(iwish_updateQty(e,s),i.parents(".iwishItem").find("[name=quantity]").val(s),i.addClass("iwishProQtyAdded"),setTimeout(function(){i.removeClass("iwishProQtyAdded")},2e3),i.parents(".iwishItem").find(".iwishQtyMsg").fadeIn().delay(3e3).fadeOut()):(i.val(1).addClass("iwishProQtyError"),setTimeout(function(){i.removeClass("iwishProQtyError")},1e3)))})}getSession(),window.addEventListener?window.addEventListener("load",iwishInit,!0):window.attachEvent?window.attachEvent("onload",iwishInit):window.onload=iwishInit;



/************ currencies.js *********************/
var Currency = {
  rates: {"USD":1.0,"EUR":1.13123,"GBP":1.29856,"CAD":0.754847,"ARS":0.0278603,"AUD":0.723254,"BRL":0.264269,"CLP":0.00146516,"CNY":0.143868,"CYP":0.397899,"CZK":0.0434808,"DKK":0.151589,"EEK":0.0706676,"HKD":0.127698,"HUF":0.00350822,"ISK":0.00805664,"INR":0.0138245,"JMD":0.00791546,"JPY":0.00880531,"LVL":1.57329,"LTL":0.320236,"MTL":0.293496,"MXN":0.0490098,"NZD":0.679037,"NOK":0.117537,"PLN":0.263374,"SGD":0.725176,"SKK":21.5517,"SIT":175.439,"ZAR":0.0696009,"KRW":0.000883292,"SEK":0.110087,"CHF":0.993956,"TWD":0.0324901,"UYU":0.0306564,"MYR":0.238289,"BSD":1.0,"CRC":0.00160928,"RON":0.242906,"PHP":0.018842,"AED":0.272294,"VEB":0.000100125,"IDR":6.76313e-05,"TRY":0.182947,"THB":0.0303493,"TTD":0.148502,"ILS":0.27073,"SYP":0.00194175,"XCD":0.370032,"COP":0.000312126,"RUB":0.0149012,"HRK":0.152419,"KZT":0.00266584,"TZS":0.000436409,"XPT":836.297,"SAR":0.266667,"NIO":0.0309713,"LAK":0.00011693,"OMR":2.60078,"AMD":0.00204932,"CDF":0.00061919,"KPW":0.00111103,"SPL":6.0,"KES":0.00973148,"ZWD":0.00276319,"KHR":0.000247669,"MVR":0.0646129,"GTQ":0.12973,"BZD":0.495906,"BYR":4.67138e-05,"LYD":0.71461,"DZD":0.00842626,"BIF":0.000552539,"GIP":1.29856,"BOB":0.144735,"XOF":0.00172455,"STD":4.64332e-05,"NGN":0.0027544,"PGK":0.30722,"ERN":0.0666667,"MWK":0.00137469,"CUP":0.0377358,"GMD":0.0201601,"CVE":0.0102587,"BTN":0.0138245,"XAF":0.00172455,"UGX":0.000268302,"MAD":0.104826,"MNT":0.000390128,"LSL":0.0696009,"XAG":14.1395,"TOP":0.444149,"SHP":1.29856,"RSD":0.00957118,"HTG":0.0137911,"MGA":0.000277461,"MZN":0.0163069,"FKP":1.29856,"BWP":0.0929097,"HNL":0.0412171,"PYG":0.000168568,"JEP":1.29856,"EGP":0.0558392,"LBP":0.00066335,"ANG":0.558754,"WST":0.385631,"TVD":0.723254,"GYD":0.00477848,"GGP":1.29856,"NPR":0.0086,"KMF":0.00229939,"IRR":2.38e-05,"XPD":1117.49,"SRD":0.134119,"TMM":5.71308e-05,"SZL":0.0696009,"MOP":0.123978,"BMD":1.0,"XPF":0.00947969,"ETB":0.0356434,"JOD":1.41044,"MDL":0.0587074,"MRO":0.0027897,"YER":0.00399438,"BAM":0.578388,"AWG":0.558659,"PEN":0.295289,"VEF":0.100125,"SLL":0.000119483,"KYD":1.21951,"AOA":0.00322276,"TND":0.343712,"TJS":0.106162,"SCR":0.0734238,"LKR":0.00567505,"DJF":0.00562716,"GNF":0.000109575,"VUV":0.00881855,"SDG":0.021084,"IMP":1.29856,"GEL":0.37302,"FJD":0.471762,"DOP":0.0200301,"XDR":1.3828,"MUR":0.0287385,"MMK":0.000623104,"LRD":0.00633076,"BBD":0.5,"ZMK":8.40094e-05,"XAU":1210.85,"VND":4.29105e-05,"UAH":0.0359244,"TMT":0.285654,"IQD":0.000841453,"BGN":0.578388,"KGS":0.014317,"RWF":0.00113433,"BHD":2.65957,"UZS":0.000120995,"PKR":0.00744996,"MKD":0.0184172,"AFN":0.0131393,"NAD":0.0696009,"BDT":0.0119284,"AZN":0.589404,"SOS":0.00172315,"QAR":0.274725,"PAB":1.0,"CUC":1.0,"SVC":0.114286,"SBD":0.124635,"ALL":0.00906143,"BND":0.725176,"KWD":3.28468,"GHS":0.204385,"ZMW":0.0840094,"XBT":5407.27,"NTD":0.0337206,"BYN":0.467138,"CNH":0.144021,"MRU":0.027897,"STN":0.0464332,"VES":0.0153016},
  convert: function(amount, from, to) {
    return (amount * this.rates[from]) / this.rates[to];
  }
};

/*********************** jquery.currencies.js *************************/
/*
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+(m.path):"";var g=m.domain?"; domain="+(m.domain):"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};

/*
 * Currency tools
 *
 * Copyright (c) 2015 Caroline Schnapp (mllegeorgesand@gmail.com)
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */


if(typeof Currency==="undefined"){var Currency={}}Currency.cookie={configuration:{expires:365,path:"/",domain:window.location.hostname},name:"currency",write:function(a){jQuery.cookie(this.name,a,this.configuration)},read:function(){return jQuery.cookie(this.name)},destroy:function(){jQuery.cookie(this.name,null,this.configuration)}};Currency.moneyFormats={USD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} USD"},EUR:{money_format:"&euro;{{amount}}",money_with_currency_format:"&euro;{{amount}} EUR"},GBP:{money_format:"&pound;{{amount}}",money_with_currency_format:"&pound;{{amount}} GBP"},CAD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} CAD"},ALL:{money_format:"Lek {{amount}}",money_with_currency_format:"Lek {{amount}} ALL"},DZD:{money_format:"DA {{amount}}",money_with_currency_format:"DA {{amount}} DZD"},AOA:{money_format:"Kz{{amount}}",money_with_currency_format:"Kz{{amount}} AOA"},ARS:{money_format:"${{amount_with_comma_separator}}",money_with_currency_format:"${{amount_with_comma_separator}} ARS"},AMD:{money_format:"{{amount}} AMD",money_with_currency_format:"{{amount}} AMD"},AWG:{money_format:"Afl{{amount}}",money_with_currency_format:"Afl{{amount}} AWG"},AUD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} AUD"},BBD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} Bds"},AZN:{money_format:"m.{{amount}}",money_with_currency_format:"m.{{amount}} AZN"},BDT:{money_format:"Tk {{amount}}",money_with_currency_format:"Tk {{amount}} BDT"},BSD:{money_format:"BS${{amount}}",money_with_currency_format:"BS${{amount}} BSD"},BHD:{money_format:"{{amount}}0 BD",money_with_currency_format:"{{amount}}0 BHD"},BYR:{money_format:"Br {{amount}}",money_with_currency_format:"Br {{amount}} BYR"},BZD:{money_format:"BZ${{amount}}",money_with_currency_format:"BZ${{amount}} BZD"},BTN:{money_format:"Nu {{amount}}",money_with_currency_format:"Nu {{amount}} BTN"},BAM:{money_format:"KM {{amount_with_comma_separator}}",money_with_currency_format:"KM {{amount_with_comma_separator}} BAM"},BRL:{money_format:"R$ {{amount_with_comma_separator}}",money_with_currency_format:"R$ {{amount_with_comma_separator}} BRL"},BOB:{money_format:"Bs{{amount_with_comma_separator}}",money_with_currency_format:"Bs{{amount_with_comma_separator}} BOB"},BWP:{money_format:"P{{amount}}",money_with_currency_format:"P{{amount}} BWP"},BND:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} BND"},BGN:{money_format:"{{amount}} Ð»Ð²",money_with_currency_format:"{{amount}} Ð»Ð² BGN"},MMK:{money_format:"K{{amount}}",money_with_currency_format:"K{{amount}} MMK"},KHR:{money_format:"KHR{{amount}}",money_with_currency_format:"KHR{{amount}}"},KYD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} KYD"},XAF:{money_format:"FCFA{{amount}}",money_with_currency_format:"FCFA{{amount}} XAF"},CLP:{money_format:"${{amount_no_decimals}}",money_with_currency_format:"${{amount_no_decimals}} CLP"},CNY:{money_format:"&#165;{{amount}}",money_with_currency_format:"&#165;{{amount}} CNY"},COP:{money_format:"${{amount_with_comma_separator}}",money_with_currency_format:"${{amount_with_comma_separator}} COP"},CRC:{money_format:"&#8353; {{amount_with_comma_separator}}",money_with_currency_format:"&#8353; {{amount_with_comma_separator}} CRC"},HRK:{money_format:"{{amount_with_comma_separator}} kn",money_with_currency_format:"{{amount_with_comma_separator}} kn HRK"},CZK:{money_format:"{{amount_with_comma_separator}} K&#269;",money_with_currency_format:"{{amount_with_comma_separator}} K&#269;"},DKK:{money_format:"{{amount_with_comma_separator}}",money_with_currency_format:"kr.{{amount_with_comma_separator}}"},DOP:{money_format:"RD$ {{amount}}",money_with_currency_format:"RD$ {{amount}}"},XCD:{money_format:"${{amount}}",money_with_currency_format:"EC${{amount}}"},EGP:{money_format:"LE {{amount}}",money_with_currency_format:"LE {{amount}} EGP"},ETB:{money_format:"Br{{amount}}",money_with_currency_format:"Br{{amount}} ETB"},XPF:{money_format:"{{amount_no_decimals_with_comma_separator}} XPF",money_with_currency_format:"{{amount_no_decimals_with_comma_separator}} XPF"},FJD:{money_format:"${{amount}}",money_with_currency_format:"FJ${{amount}}"},GMD:{money_format:"D {{amount}}",money_with_currency_format:"D {{amount}} GMD"},GHS:{money_format:"GH&#8373;{{amount}}",money_with_currency_format:"GH&#8373;{{amount}}"},GTQ:{money_format:"Q{{amount}}",money_with_currency_format:"{{amount}} GTQ"},GYD:{money_format:"G${{amount}}",money_with_currency_format:"${{amount}} GYD"},GEL:{money_format:"{{amount}} GEL",money_with_currency_format:"{{amount}} GEL"},HNL:{money_format:"L {{amount}}",money_with_currency_format:"L {{amount}} HNL"},HKD:{money_format:"${{amount}}",money_with_currency_format:"HK${{amount}}"},HUF:{money_format:"{{amount_no_decimals_with_comma_separator}}",money_with_currency_format:"{{amount_no_decimals_with_comma_separator}} Ft"},ISK:{money_format:"{{amount_no_decimals}} kr",money_with_currency_format:"{{amount_no_decimals}} kr ISK"},INR:{money_format:"Rs. {{amount}}",money_with_currency_format:"Rs. {{amount}}"},IDR:{money_format:"{{amount_with_comma_separator}}",money_with_currency_format:"Rp {{amount_with_comma_separator}}"},ILS:{money_format:"{{amount}} NIS",money_with_currency_format:"{{amount}} NIS"},JMD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} JMD"},JPY:{money_format:"&#165;{{amount_no_decimals}}",money_with_currency_format:"&#165;{{amount_no_decimals}} JPY"},JEP:{money_format:"&pound;{{amount}}",money_with_currency_format:"&pound;{{amount}} JEP"},JOD:{money_format:"{{amount}}0 JD",money_with_currency_format:"{{amount}}0 JOD"},KZT:{money_format:"{{amount}} KZT",money_with_currency_format:"{{amount}} KZT"},KES:{money_format:"KSh{{amount}}",money_with_currency_format:"KSh{{amount}}"},KWD:{money_format:"{{amount}}0 KD",money_with_currency_format:"{{amount}}0 KWD"},KGS:{money_format:"Ð»Ð²{{amount}}",money_with_currency_format:"Ð»Ð²{{amount}}"},LVL:{money_format:"Ls {{amount}}",money_with_currency_format:"Ls {{amount}} LVL"},LBP:{money_format:"L&pound;{{amount}}",money_with_currency_format:"L&pound;{{amount}} LBP"},LTL:{money_format:"{{amount}} Lt",money_with_currency_format:"{{amount}} Lt"},MGA:{money_format:"Ar {{amount}}",money_with_currency_format:"Ar {{amount}} MGA"},MKD:{money_format:"Ð´ÐµÐ½ {{amount}}",money_with_currency_format:"Ð´ÐµÐ½ {{amount}} MKD"},MOP:{money_format:"MOP${{amount}}",money_with_currency_format:"MOP${{amount}}"},MVR:{money_format:"Rf{{amount}}",money_with_currency_format:"Rf{{amount}} MRf"},MXN:{money_format:"$ {{amount}}",money_with_currency_format:"$ {{amount}} MXN"},MYR:{money_format:"RM{{amount}} MYR",money_with_currency_format:"RM{{amount}} MYR"},MUR:{money_format:"Rs {{amount}}",money_with_currency_format:"Rs {{amount}} MUR"},MDL:{money_format:"{{amount}} MDL",money_with_currency_format:"{{amount}} MDL"},MAD:{money_format:"{{amount}} dh",money_with_currency_format:"Dh {{amount}} MAD"},MNT:{money_format:"{{amount_no_decimals}} &#8366",money_with_currency_format:"{{amount_no_decimals}} MNT"},MZN:{money_format:"{{amount}} Mt",money_with_currency_format:"Mt {{amount}} MZN"},NAD:{money_format:"N${{amount}}",money_with_currency_format:"N${{amount}} NAD"},NPR:{money_format:"Rs{{amount}}",money_with_currency_format:"Rs{{amount}} NPR"},ANG:{money_format:"&fnof;{{amount}}",money_with_currency_format:"{{amount}} NA&fnof;"},NZD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} NZD"},NIO:{money_format:"C${{amount}}",money_with_currency_format:"C${{amount}} NIO"},NGN:{money_format:"&#8358;{{amount}}",money_with_currency_format:"&#8358;{{amount}} NGN"},NOK:{money_format:"kr {{amount_with_comma_separator}}",money_with_currency_format:"kr {{amount_with_comma_separator}} NOK"},OMR:{money_format:"{{amount_with_comma_separator}} OMR",money_with_currency_format:"{{amount_with_comma_separator}} OMR"},PKR:{money_format:"Rs.{{amount}}",money_with_currency_format:"Rs.{{amount}} PKR"},PGK:{money_format:"K {{amount}}",money_with_currency_format:"K {{amount}} PGK"},PYG:{money_format:"Gs. {{amount_no_decimals_with_comma_separator}}",money_with_currency_format:"Gs. {{amount_no_decimals_with_comma_separator}} PYG"},PEN:{money_format:"S/. {{amount}}",money_with_currency_format:"S/. {{amount}} PEN"},PHP:{money_format:"&#8369;{{amount}}",money_with_currency_format:"&#8369;{{amount}} PHP"},PLN:{money_format:"{{amount_with_comma_separator}} zl",money_with_currency_format:"{{amount_with_comma_separator}} zl PLN"},QAR:{money_format:"QAR {{amount_with_comma_separator}}",money_with_currency_format:"QAR {{amount_with_comma_separator}}"},RON:{money_format:"{{amount_with_comma_separator}} lei",money_with_currency_format:"{{amount_with_comma_separator}} lei RON"},RUB:{money_format:"&#1088;&#1091;&#1073;{{amount_with_comma_separator}}",money_with_currency_format:"&#1088;&#1091;&#1073;{{amount_with_comma_separator}} RUB"},RWF:{money_format:"{{amount_no_decimals}} RF",money_with_currency_format:"{{amount_no_decimals}} RWF"},WST:{money_format:"WS$ {{amount}}",money_with_currency_format:"WS$ {{amount}} WST"},SAR:{money_format:"{{amount}} SR",money_with_currency_format:"{{amount}} SAR"},STD:{money_format:"Db {{amount}}",money_with_currency_format:"Db {{amount}} STD"},RSD:{money_format:"{{amount}} RSD",money_with_currency_format:"{{amount}} RSD"},SCR:{money_format:"Rs {{amount}}",money_with_currency_format:"Rs {{amount}} SCR"},SGD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} SGD"},SYP:{money_format:"S&pound;{{amount}}",money_with_currency_format:"S&pound;{{amount}} SYP"},ZAR:{money_format:"R {{amount}}",money_with_currency_format:"R {{amount}} ZAR"},KRW:{money_format:"&#8361;{{amount_no_decimals}}",money_with_currency_format:"&#8361;{{amount_no_decimals}} KRW"},LKR:{money_format:"Rs {{amount}}",money_with_currency_format:"Rs {{amount}} LKR"},SEK:{money_format:"{{amount_no_decimals}} kr",money_with_currency_format:"{{amount_no_decimals}} kr SEK"},CHF:{money_format:"SFr. {{amount}}",money_with_currency_format:"SFr. {{amount}} CHF"},TWD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} TWD"},THB:{money_format:"{{amount}} &#xe3f;",money_with_currency_format:"{{amount}} &#xe3f; THB"},TZS:{money_format:"{{amount}} TZS",money_with_currency_format:"{{amount}} TZS"},TTD:{money_format:"${{amount}}",money_with_currency_format:"${{amount}} TTD"},TND:{money_format:"{{amount}}",money_with_currency_format:"{{amount}} DT"},TRY:{money_format:"{{amount}}TL",money_with_currency_format:"{{amount}}TL"},UGX:{money_format:"Ush {{amount_no_decimals}}",money_with_currency_format:"Ush {{amount_no_decimals}} UGX"},UAH:{money_format:"â‚´{{amount}}",money_with_currency_format:"â‚´{{amount}} UAH"},AED:{money_format:"Dhs. {{amount}}",money_with_currency_format:"Dhs. {{amount}} AED"},UYU:{money_format:"${{amount_with_comma_separator}}",money_with_currency_format:"${{amount_with_comma_separator}} UYU"},VUV:{money_format:"${{amount}}",money_with_currency_format:"${{amount}}VT"},VEF:{money_format:"Bs. {{amount_with_comma_separator}}",money_with_currency_format:"Bs. {{amount_with_comma_separator}} VEF"},VND:{money_format:"{{amount_no_decimals_with_comma_separator}}&#8363;",money_with_currency_format:"{{amount_no_decimals_with_comma_separator}} VND"},XBT:{money_format:"{{amount_no_decimals}} BTC",money_with_currency_format:"{{amount_no_decimals}} BTC"},XOF:{money_format:"CFA{{amount}}",money_with_currency_format:"CFA{{amount}} XOF"},ZMW:{money_format:"K{{amount_no_decimals_with_comma_separator}}",money_with_currency_format:"ZMW{{amount_no_decimals_with_comma_separator}}"}};Currency.formatMoney=function(b,g){if(typeof Shopify.formatMoney==="function"){return Shopify.formatMoney(b,g)}if(typeof b=="string"){b=b.replace(".","")}var f="";var e=/\{\{\s*(\w+)\s*\}\}/;var a=g||"${{amount}}";function c(h,i){return(typeof h=="undefined"?i:h)}function d(m,k,l,j){k=c(k,2);l=c(l,",");j=c(j,".");if(isNaN(m)||m==null){return 0}m=(m/100).toFixed(k);var n=m.split("."),i=n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+l),h=n[1]?(j+n[1]):"";return i+h}switch(a.match(e)[1]){case"amount":f=d(b,2);break;case"amount_no_decimals":f=d(b,0);break;case"amount_with_comma_separator":f=d(b,2,".",",");break;case"amount_no_decimals_with_comma_separator":f=d(b,0,".",",");break}return a.replace(e,f)};Currency.currentCurrency="";Currency.format="money_with_currency_format";Currency.convertAll=function(c,b,a,d){jQuery(a||"span.money").each(function(){if(jQuery(this).attr("data-currency")===b){return}if(jQuery(this).attr("data-currency-"+b)){jQuery(this).html(jQuery(this).attr("data-currency-"+b))}else{var e=0;var f=Currency.moneyFormats[c][d||Currency.format]||"{{amount}}";var g=Currency.moneyFormats[b][d||Currency.format]||"{{amount}}";if(f.indexOf("amount_no_decimals")!==-1){e=Currency.convert(parseInt(jQuery(this).html().replace(/[^0-9]/g,""),10)*100,c,b)}else{if(c==="JOD"||c=="KWD"||c=="BHD"){e=Currency.convert(parseInt(jQuery(this).html().replace(/[^0-9]/g,""),10)/10,c,b)}else{e=Currency.convert(parseInt(jQuery(this).html().replace(/[^0-9]/g,""),10),c,b)}}var h=Currency.formatMoney(e,g);jQuery(this).html(h);jQuery(this).attr("data-currency-"+b,h)}jQuery(this).attr("data-currency",b)});this.currentCurrency=b;this.cookie.write(b)};



/* ********************************************************************
BOLD HELPER FUNCTIONS
Contains helper tools for integrating Bold Apps with AJAX-based themes

Last modified: 2016-09-29
******************************************************************** */

var BOLD = BOLD || {};
BOLD.language = BOLD.language || {};
BOLD.helpers = BOLD.helpers || {};

var Bold = BOLD.helpers;

BOLD.helpers.cleanCart = function(cart){
  /* Make sure we have an object to clean. If the is_clean flag is set, our work is already done and we don't need to re-scrub */
  if(typeof(cart)!=='object' || cart.is_clean) return cart;

  /* Hold on to a copy of the base cart, just in case. We don't care about any functions or other extensions stuffed into the object, so stringify/parse is a fast way to deep-clone the object. */
  BOLD.rawCart = JSON.parse(JSON.stringify(cart));

  cart.bold_original_total = cart.total_price;

  var cart_total = 0, cart_items = 0;
  cart.is_recurring = cart.is_recurring || false;

  /* First pass: Set all the properties on the item object that we can. We will set combo line prices in the second pass */
  for(var item in cart.items){
    /* Set the item's line property */
    cart.items[item].line = parseInt(item) + 1;

    /* Some themes add JS functionality to the cart. Only worry about the objects. */
    if(typeof(cart.items[item])!=='object') continue;

    /* For consistency, clean all properties first (moving all interesting property fields out of the item.properties object and into an item.Bold object). */
    BOLD.helpers.cleanProperties(cart.items[item]);

    /* Check to see if we need to set the cart as recurring */
    if(!cart.is_recurring)
      cart.is_recurring = BOLD.helpers.isRecurringItem(cart.items[item]);

    /* Check for RO discount. Requires V2 RO to get the discount percentage for Options */
    BOLD.helpers.setMultiplier(cart.items[item]);

    /* Check for a quantity multiplier. This could come from BTM or Builder.  */
    BOLD.helpers.setRatio(cart.items[item]);

    /* Apply any discounts */
    BOLD.helpers.setPriceSingle(cart.items[item]);

    /* Adjust the count of items in the cart appropriately */
    cart_items += BOLD.helpers.getDisplayQuantity(cart.items[item]);

  }

  /* Second pass: Calculate price with options, set the true price */
  for(var item in cart.items){
    cart_total += BOLD.helpers.setPriceWithOptions(cart, cart.items[item]);
  }

  window['mixed_cart'] = cart.is_recurring;
  cart.total_price = cart_total;
  cart.item_count = cart_items;
  cart.is_clean = true;

  BOLD.cart = cart;
  return(cart);
};

BOLD.helpers.cleanProperties = function(item){
  /* Move all hidden properties into a Bold sub-object for later reference, then create the formatted properties display */
  item.Bold = item.Bold || {};
  item.formatted_properties = "";
  if(item.properties) {
    for(var property in item.properties){
      if( (property.slice(0,1) == '_' && property.slice(1,2) !='_' ) || property == 'master_builder' || property == 'builder_id' || property == 'builder_info' || property == 'frequency_type' || property == 'frequency_type_text' || property == 'frequency_num' || property == 'group_id' || property == 'discounted_price' || item.properties[property] == ""){
        var clean_prop_name = property;
        if(clean_prop_name.slice(0,1) == '_') clean_prop_name = clean_prop_name.replace('_', '');

        /* Save the property to a Bold object on the item so that we can reference it if we need to, then delete the property. */
        item.Bold[clean_prop_name] = item.properties[property];

        /* Was the builder_id/master_builder/builder_info prefixed with an underscore? Take note, in case we need to rebuild the real properties object later */
        if(property === 'builder_id' || property === 'master_builder' || property === 'builder_info'){
          item.builder_id_in_checkout = true;
        }

        delete item.properties[property];
      }
    }
    /* Set the formatted variables based on the item's properties */
    item.formatted_properties = BOLD.helpers.propertiesDisplay(item.properties);
    item.bold_recurring_desc = BOLD.helpers.recurringDisplay(item.Bold);
    item.formatted_recurring_desc = BOLD.helpers.recurringFormattedDisplay(item.Bold);

    /* If the item has a builder_id, set up shorthands for our Product Options/Builder properties */
    if(item.Bold.builder_id){
      item.builder_id = item.Bold.builder_id;
      item.builder_type = (item.Bold.master_builder ? 'bold-master' : 'bold-hidden');
      item.is_master = (item.Bold.master_builder ? true : false);
      item.is_hidden = (item.Bold.master_builder ? false : true);
    }
    if(item.Bold.builder_info){
      item.builder_info = item.Bold.builder_info.split('~~');
      item.builder_image_alt = item.builder_info[0];
      item.builder_image_src = item.builder_info[1];
      item.url = '/apps/productbuilder/' + item.builder_info[2];
    }
  }

  return item.properties;
};

BOLD.helpers.getTrueProperties = function(item){
/* Returns the combination of the item's Bold object (which contains the hidden properties) and the visible item.properties */
  var trueProperties = JSON.parse(JSON.stringify(item.properties)); // Clone the properties
  for(var hiddenprop in item.Bold){
    var prefix = '_';
    if( (hiddenprop==='master_builder' || hiddenprop==='builder_id' || hiddenprop==='builder_info') && item.builder_id_in_checkout)
      prefix = '';
    trueProperties[prefix + hiddenprop] = item.Bold[hiddenprop];
  }
  return trueProperties;
};

BOLD.helpers.isRecurringItem = function(item){
  if(typeof(item.Bold)!=='object') BOLD.helpers.cleanProperties(item);
  return (!isNaN(parseInt(item.Bold.frequency_num)))
};

BOLD.helpers.setMultiplier = function(item){
  if(typeof(item.Bold)!=='object') BOLD.helpers.cleanProperties(item);
  /* Check for RO discount. Requires V2 RO to get the discount percentage for Options */
  var discount_multiplier = 100.00;
  if (item.Bold && item.Bold.ro_discount_percentage){
    discount_multiplier -= parseFloat(item.Bold.ro_discount_percentage);
  }
  item.discount_multiplier = discount_multiplier *= 0.01;
  return item.discount_multiplier;
};

BOLD.helpers.setRatio = function(item){
  if(typeof(item.Bold)!=='object') BOLD.helpers.cleanProperties(item);
  /* Check for a quantity multiplier. This could come from BTM or Builder */
  item.qty_ratio = item.qty_ratio || 1;
  item.true_qty = item.true_qty || item.quantity;

  if(item.Bold && item.Bold.btm_ratio){
    item.qty_ratio *= parseInt(item.Bold.btm_ratio);
    item.is_btm = true;
  }
  if(item.Bold && item.Bold.bold_ratio){
    item.qty_ratio *= parseInt(item.Bold.bold_ratio);
  }
  /* Special case: one-time charges */
  if(item.Bold.options_one_time_charge){
    item.quantity = 1;
    item.true_qty = item.qty_ratio;
    return item.qty_ratio;
  }

  if(item.qty_ratio != 1){
    item.quantity = item.true_qty / item.qty_ratio;
  }

  return item.qty_ratio;
};

BOLD.helpers.setPriceSingle = function(item){
  if(typeof(item.Bold)!=='object') BOLD.helpers.cleanProperties(item);
  item.original_price = item.original_price || item.price;
  item.price = item.original_price; // Make sure we're doing math starting with the right base price

  if(item.discounts.length){
    for(var i=0; i<item.discounts.length; i++){
      item.price -= item.discounts[i].amount;
    }
  }

  if(item.discount_multiplier && item.discount_multiplier != 1){
    item.price = Math.round(item.price * item.discount_multiplier);
    item.line_price = item.price * item.quantity;
  }
  if(item.qtyRatio && item.qtyRatio != 1){
    item.price = item.price * item.qty_ratio;
  }
  if(item.Bold.bold_priced_option){
    // This is a line added by the Options Validator and should not count against our javascripted total
    item.price = 0;
    item.line_price = 0;
  }

  return item.line_price;
};

BOLD.helpers.setPriceWithOptions = function(cart, base_item){
  if(typeof base_item.price === 'undefined') return 0;
  if(typeof(base_item.Bold)!=='object') BOLD.helpers.cleanProperties(base_item);
  if(!base_item.original_price) BOLD.helpers.setPriceSingle(base_item);

  if(base_item.Bold.builder_id && ! base_item.Bold.master_builder)
    return 0;

  var total_price = base_item.price, one_time_charges = 0, builder_id = base_item.Bold.builder_id;

  if(!isNaN(parseInt(base_item.Bold.priced_options_count))){
    for(i = 0; i < parseInt(base_item.Bold.priced_options_count); i++){
      if(isNaN(parseInt(base_item.Bold['extra_price_' + i])))
        continue;

      var extra_price = parseInt(base_item.Bold['extra_price_' + i]);
      var multiplier = parseInt(base_item.Bold['qty_ratio_' + i] || 1);
      var is_onetime = base_item.Bold['one_time_charge_' + i] || false;

      if(is_onetime)
        one_time_charges += extra_price * multiplier;
      else
        total_price += extra_price * multiplier;

    }// End of extra price loop

    //Quick run through the cart to set the associated builder_id sub-products to $0
    for(var item in cart.items){
      if(typeof(cart.items[item].Bold)!=='object') BOLD.helpers.cleanProperties(cart.items[item]);

      if(cart.items[item].Bold.builder_id == builder_id && !cart.items[item].Bold.master_builder){
        cart.items[item].original_price = cart.items[item].original_price || cart.items[item].price;
        cart.items[item].price = 0;
        cart.items[item].line_price = 0;
      }
    }// End of price reset loop
  }// End of item-with-validation check

  else if(base_item.Bold.master_builder && base_item.Bold.builder_id){
    total_price = 0;
    for(var item in cart.items){
      if(typeof(cart.items[item].Bold)!=='object') BOLD.helpers.cleanProperties(cart.items[item]);

      if(cart.items[item].Bold.builder_id == builder_id){
        if(cart.items[item].Bold.options_one_time_charge)
          one_time_charges += cart.items[item].price * cart.items[item].qty_ratio;
        else
          total_price += cart.items[item].price * cart.items[item].qty_ratio;
      }
      /* Now that the price has been transferred to the base product, remove the price from the linked option */
      if(cart.items[item].Bold.builder_id == base_item.Bold.builder_id && !cart.items[item].Bold.master_builder){
        cart.items[item].price = 0;
        cart.items[item].line_price = 0;
      }
    }
  }
  base_item.one_time_charges = one_time_charges;
  base_item.price = total_price;
  base_item.line_price_without_one_time_charges = base_item.price * base_item.quantity;
  base_item.line_price = base_item.line_price_without_one_time_charges + base_item.one_time_charges;
  base_item.formatted_onetime_desc = BOLD.helpers.onetimeDisplay(one_time_charges);

  return base_item.line_price;
};

BOLD.helpers.getDisplayQuantity = function(item){
  if(typeof(item.Bold)!=='object') BOLD.helpers.cleanProperties(item);
  if(typeof(item.qty_ratio)==='undefined') BOLD.helpers.setRatio(item);

  if(item.builder_type === 'bold-master' || !item.builder_id)
    return item.quantity;
  else
    return 0;
}

BOLD.helpers.updateQtyBoxes = function(){
  /* First make sure all ratio information is properly set */
  jQuery.each(jQuery('[data-bold-ratio]'), function(index, obj){
    if(parseInt(jQuery(obj).data('bold-ratio')) != 1){
      /* The quantity displayed and the quantity passed to checkout are separate - create a hidden input with the true quantity */
      if(jQuery(obj).find('[name="updates[]"]').length && !jQuery(obj).find('.bold-true-quantity').length){
        jQuery(obj).find('[name="updates[]"]').addClass('bold-display-quantity').removeAttr('name').parent().append('<input type="hidden" name="updates[]" class="bold-true-quantity">');
      }
    }
  });

  /* Now loop through all rows that have nonstandard quantity behaviour and set the correct quantity */
  jQuery.each(jQuery('[data-bold-ratio]:not(.bold-hidden), .bold-master'), function(index, obj){
    var multiplier = parseInt(jQuery(obj).data('bold-ratio')) || 1;

    /* Find the base quantity value that we're basing the update on */
    var baseQty;
    if(jQuery(obj).find('.bold-display-quantity').length){
      baseQty = parseInt(jQuery(obj).find('.bold-display-quantity').val());
    }
    else{
      baseQty = parseInt(jQuery(obj).find('[name^=updates]').val());
    }
    if(isNaN(baseQty)) return; /* Abort this round if there's no base quantity to be found */

    /* Loop through all matching builder IDs to update. The name=updates will always hold the true quantity, a display-quantity (if it exists) will hold a 'faked' quantity based on the ratio */
    var components = jQuery(obj).closest('form').find('[data-bold-id=' + jQuery(obj).data('bold-id') + ']');
    if(components.length){
      jQuery.each(jQuery(components), function(cindex, component){
        var multiplier = parseInt(jQuery(component).data('bold-ratio')) || 1;

        if(jQuery(component).hasClass('bold-one-time-charge')){
          jQuery(component).find('[name*="updates"]').val(multiplier);
          jQuery(component).find('.bold-display-quantity').val(1);
        }else{
          jQuery(component).find('[name*="updates"]').val(multiplier * baseQty);
          jQuery(component).find('.bold-display-quantity').val(baseQty);
        }
      });
    }
    else{
      /* No builder ID, so we just have to worry about the multiplier ratio on this line */
      jQuery(obj).find('[name*="updates"]').val(multiplier * baseQty);
      jQuery(obj).find('.bold-display-quantity').val(baseQty);
    }
  });
};

BOLD.helpers.removeBuilder = function(builder_id, success_callback, error_callback){
  if(typeof(builder_id) !== 'undefined')
    BOLD.helpers.getCart(function(cart){ BOLD.helpers.removeItemWithOptions(cart, builder_id, success_callback, error_callback) });
}

BOLD.helpers.validatePricedOptions = function(cart, callback){
  if(!cart.is_clean){
    cart = BOLD.helpers.cleanCart(cart);
  }

  var master_id_array = [];
  for(var item in cart.items){
    if(cart.items[item].Bold && cart.items[item].Bold.master_builder && cart.items[item].Bold.builder_id){
      master_id_array.push(cart.items[item].Bold.builder_id);
    }
  }

  //Now that we have the full list of masters, check to make sure everything with a builder ID can find a master product
  var orphan_builder_id_array = [];
  for(var item in cart.items){
    if(cart.items[item].Bold && cart.items[item].Bold.builder_id && !master_id_array.includes(cart.items[item].Bold.builder_id)){
      orphan_builder_id_array.push(cart.items[item].Bold.builder_id);
    }
  }

  if(orphan_builder_id_array.length){
    var index = 0;
    BOLD.helpers.removeMultipleBuilders(orphan_builder_id_array, callback);
    return;
  }
  if(typeof callback === 'function'){
    callback(cart);
  }
};
BOLD.helpers.removeMultipleBuilders = function(builder_id_array, callback, index){
  if(typeof index === 'undefined'){
    index = 0;
  }
  if(!builder_id_array[index]){
    if(typeof callback === 'function') BOLD.helpers.getCart(callback);
    return;
  }
  BOLD.helpers.removeBuilder(builder_id_array[index], function(){
    BOLD.helpers.removeMultipleBuilders(builder_id_array, callback, index + 1);
  });
};

BOLD.helpers.removeItemWithOptions = function(cart, builder_id, success_callback, error_callback){
  BOLD.helpers.updateItemWithOptions(cart, builder_id, 0, success_callback, error_callback);
}

BOLD.helpers.upateBuilder = function(builder_id, qty, success_callback, error_callback){
  if(typeof(builder_id) !== 'undefined')
    BOLD.helpers.getCart(function(cart){ BOLD.helpers.updateItemWithOptions(cart, builder_id, qty, success_callback, error_callback) });
}

BOLD.helpers.updateItemWithOptions = function(cart, builder_id, qty, success_callback, error_callback){

  if(cart && !cart.isClean) BOLD.helpers.cleanCart(cart);

  var datastr = '';
  for(var i in cart.items){
    /* Inspect each cell for any undefined and skip. */
    if(typeof(cart.items[i].quantity)==='undefined') continue;

    if(datastr.length > 1) datastr += '&';
    if(builder_id && cart.items[i].properties && (cart.items[i].properties.builder_id == builder_id || cart.items[i].properties._builder_id == builder_id || cart.items[i].builder_id == builder_id) ){
      var line_qty = qty;

      if(cart.items[i].options_one_time_charge && qty) line_qty = 1;
      if(cart.items[i].qty_ratio) line_qty *= cart.items[i].qty_ratio;

      if(line_qty > 1000000) {
        console.error('Update aborted: Updating quantities would put the product quantity over Shopify\'s 1,000,000 quantity limit.');
        if(typeof(error_callback)==='function') error_callback();
        return false;
      }
      datastr += 'updates[]=' + line_qty;
    }
    else
      if (cart.items[i].true_qty)
        datastr += 'updates[]=' + cart.items[i].true_qty;
      else
        datastr += 'updates[]=' + cart.items[i].quantity;
  }

  var params = {
    data: datastr,
    dataType: 'json',
    url:'/cart/update.js',
    method:"POST",
    success: function(data) {
      if(typeof(success_callback)==='function')
        success_callback(data);
      else if(typeof(Shopify.onCartUpdate)==='function')
        Shopify.onCartUpdate(data)
        },
    error: function(t, e) {
      if(typeof(error_callback)==='function')
        error_callback(t, e);
      else if(typeof(Shopify.onError)==='function')
        Shopify.onError(t, e);
    }
  };
  jQuery.ajax(params);

}

BOLD.helpers.propertiesDisplay = function(properties){
  if(typeof(properties) !== "object")
    return "";

  var property_desc = '<div class="bold-properties">';
  for(var key in properties){
    property_desc += '<div class="bold_option_line"><span class="bold_option_title">' + key + '</\span><span class="bold_option_seperator">: </\span><span class="bold_option_value">';
    if(typeof(properties[key]) === 'string' && properties[key].indexOf('/uploads/') > -1)
      property_desc += '<a href="' + properties[key] + '" data-bold-lang="uploaded_file">' + (BOLD.language['uploaded_file'] || 'Uploaded file') + '</a></\span></div>';
    else
      property_desc += properties[key] + '</\span></div>';

  }
  property_desc += '</div>';
  return property_desc;
};

BOLD.helpers.recurringDisplay = function(properties){
  if(properties && properties.frequency_num && properties.frequency_type_text){
    return (BOLD.language['recurring_desc_prefix'] || 'Delivered every ') + properties.frequency_num + (BOLD.language['recurring_desc_spacer'] || ' ') + properties.frequency_type_text + (BOLD.language['recurring_desc_suffix'] || '');
  }
  return '';
};

BOLD.helpers.recurringFormattedDisplay = function(properties){
  if(properties && properties.frequency_num && properties.frequency_type_text){
    return '<div class = "bold_recurring_desc"><span class="bold_ro_every"  data-bold-lang="recurring_desc_prefix">' + (BOLD.language['recurring_desc_prefix'] || 'Delivered every ') + '</\span><span class="bold_ro_frequency_num">' + properties.frequency_num + '</\span>' + (BOLD.language['recurring_desc_spacer'] ? '<span class="bold_ro_frequency_spacer" data-bold-lang="recurring_desc_spacer">' + BOLD.language['recurring_desc_spacer'] + '</\span>' : ' ') + '<span class="bold_ro_frequency_type_text">' + properties.frequency_type_text + '</span>' + (BOLD.language['recurring_desc_suffix'] ? '<span class="bold_ro_frequency_suffix" data-bold-lang="recurring_desc_suffix">' + BOLD.language['recurring_desc_suffix'] + '</\span>' : '') + '</div>';
  }
  return '';
};

BOLD.helpers.onetimeDisplay = function(cost, money_format){
  if(!cost) return '';

  if(!money_format) money_format = BOLD.shop.money_format || Shopify.money_format || "$ {{ amount }}";
  return '<div class="bold_onetime_summary"><span class="bold_onetime_prefix" data-bold-lang="onetime_charge_prefix">' + (BOLD.language['onetime_charge_prefix'] || 'Including one-time charge of ') + '</\span><span class="bold_onetime_charge">' + BOLD.helpers.formatMoney(cost, money_format) + '</\span><span class="bold_onetime_suffix" data-bold-lang="onetime_charge_suffix">' + (BOLD.language['onetime_charge_suffix'] || '') + '</\span></div>';
}

/* Shopify doesn't let us set objects as cart attributes - this pair of functions lets us stringify data and retrieve it later */
BOLD.helpers.setCartAttrObject = function(name, attributes, success_callback, error_callback){
  var data = { attributes: {} };
  data.attributes[name] = encodeURIComponent(JSON.stringify(attributes));
  var params = {
    url: '/cart/update.js',
    type: 'post',
    dataType: 'json',
    data: data,
    success: success_callback || function(c){ console.info(c) },
    error: error_callback || function(a, b){ console.error(a, b)}
  };
  jQuery.ajax(params);
}

BOLD.helpers.getCartAttrObj = function(name, cart){
  if(typeof(cart)!=='object'){
    BOLD.helpers.getCart(function(c) { BOLD.helpers.getCartAttrObj(name, c) });
    return;
  }
  try {
    return BOLD.cart['data_' + name] = JSON.parse(decodeURIComponent(cart.attributes[name]));
  } catch (e) {
    return BOLD.cart['data_' + name] = false;
  }
};

//     Bold: Helper for using Quantity Breaks with Quick-Shop
//    Run on JS function that opens Quickshop. Add data-product-id="" somewhere on the form
BOLD.helpers.update_message_quickshop = function(productID){
jQuery("#shappify-qty-msg-" + productID).html(jQuery('[data-product-id="' + productID +'"] #variant_html_' + jQuery('[data-product-id="' + productID +'"] [name="id"]').val()).html());

if(jQuery('[data-product-id="' + productID +'"] [name="id"]:checked').length){
  jQuery("#shappify-qty-msg-" + productID).html(jQuery('#variant_html_' + jQuery("[name='id']:checked").val()).html());
}
  var prds=jQuery(".shapp_qb_prod");
  var i=0;
  for(i=0;i<prds.length;i++){
    var shapp_var_id=jQuery(prds[i]).find("[name='id']").val();
    var shapp_message=jQuery("#variant_html_"+ shapp_var_id).html();
    var shapp_message_container=jQuery(prds[i]).find(".shappify-qty-msg");
    shapp_message_container.html(shapp_message);
  }
}

// Bold: Helper functions for updating BTM quantities and updating old BTM installs with new BTM property fields
BOLD.helpers.upgradeBTMFields = function(form){
  var $form = jQuery(form);
  $form.find('.btm_upgrade').remove();  //Remove the BTM upgrade fields (if they exist) before adding new ones
  $form.find('.btm_quantity_input[name="properties[quantity]"]').attr('name', 'properties[_btm_quantity]')

  if($form.find('.bold-btm .measurement_div').length){
    var btm_qty = 1;

    if($form.find('.btm_quantity_input').length)
      btm_qty = parseInt($form.find('.btm_quantity_input').attr('name', "properties[_btm_quantity]").val());
    else
      $form.prepend('<input type="hidden" class="btm_upgrade btm_qty" name="properties[_btm_quantity]" value=' + btm_qty + '>');

    var true_qty = parseInt($form.find('[name="quantity"]').last().val());
    var btm_ratio = true_qty / btm_qty;

    var option_qty_input = '<input type="hidden" class="btm_upgrade btm_options" name="quantity" value=' + btm_qty + '>';
    var btm_ratio_input = '<input type="hidden" class="btm_upgrade btm_ratio" name="properties[_btm_ratio]" value=' + btm_ratio + '>'
    $form.prepend(option_qty_input).prepend(btm_ratio_input);
  }

}

BOLD.helpers.calcBTMTotal = function(variant, form){
  if(!variant.btm || typeof(mathEval)!='function') return variant.price;
  parsedFormula = variant.btm.formula;
  for(var key in variant.btm){
    var field = variant.btm[key];
    var field_value = (jQuery(form).find('[name="properties[' + field + ']"]').val() || 0);
    parsedFormula = parsedFormula.split('{' + field + '}').join(field_value);
  }
  return (Math.ceil(mathEval(parsedFormula)) || 1) * variant.price;
};
BOLD.helpers.calcOptionsTotal = function(form){
  var extrasList = jQuery(form).find('.shappify_option_value [data-variant]:selected');
  if(!extrasList.length) return 0;

  var totalExtras = 0;
  extrasList.each(function(index, obj){ totalExtras += jQuery(obj).data('price') * 100; });
  return parseInt(totalExtras);
};
BOLD.helpers.calcTotal = function(variant, form){ return BOLD.helpers.calcBTMTotal(variant,form) + BOLD.helpers.calcOptionsTotal(form); };

/* Functions for integrating Options/Builder/Recurring Orders with Rivets-based themes */
BOLD.helpers.rivetsInit = function(){
  jQuery(document).on('cart.ready, cart.requestComplete',BOLD.helpers.rivetsUpdate);
};

BOLD.helpers.rivetsUpdate = function(){
  CartJS.updateItem = function(line, qty){ BOLD.helpers.changeItem(line, qty, function(cart){jQuery(document).trigger('cart.requestComplete', [cart]);})};
  BOLD.helpers.getCart(function(cart){

    for(var key in CartJS.cart.items){
      if(isNaN(key)){
        //Transfer across all the extra functionality in CartJS
        cart.items[key] = CartJS.cart.items[key];
      }
      else{
        for(var attr in CartJS.cart.items[key]){
          if(typeof(CartJS.cart.items[key][attr]) === 'function' && cart.items[key])
            cart.items[key][attr] = CartJS.cart.items[key][attr];
        }
      }
    }
    for(var key in cart){
      CartJS.cart[key]=cart[key];
    }
  });
};
/*  Shopify API functions that we need but are not guaranteed to pre-exist on the site   */
BOLD.helpers.getCart = function(callback, options) {
  jQuery.getJSON("/cart.js", function(cart, n) {
    if(typeof(options)!=='object' || !options.raw)
      BOLD.helpers.cleanCart(cart);

    if(typeof(callback)==='function')
      callback(cart);
    else if(typeof(Shopify)==='object' && typeof(Shopify.onCartUpdate)==='function')
      Shopify.onCartUpdate(cart);
  });
};

BOLD.helpers.addItemFromForm = function(form, success_callback, error_callback, options){
  var data, contentType, processData;
  var options = options || {};

  var url = options.endpoint || '/cart/add'; //The return object from /cart/add and /cart/add.js are slightly different
  var formObj;

  //Check what kind of object we were passed.
  if(typeof form === 'string'){
    if(form.indexOf('#')==0){
      form = form.substr(1);
    }
    formObj = document.getElementById(form);
  }
  else if(form.jquery){
    formObj = form[0];
  }
  else{
    formObj = form;
  }

  //Check to see if we need to abort to an old-fashioned form submit
  var data;
  var hasUsableFormData = (typeof FormData === 'function');
  if(hasUsableFormData){
    data = new FormData(formObj);
    if(typeof data.getAll !== 'function'){
      hasUsableFormData = false;
    }
  }

  if(!hasUsableFormData){
    var formElements = form.length;
    data = '';
    for(var i=0; i < formElements; i++){
      var fieldType = (typeof form[i].type === 'string' ? form[i].type.toLowerCase() : null);
      if(fieldType === 'file'){
        //No usable FormData object - we will need to do a manual submit
        formObj.submit();
        return false;
      }

      var fieldValue = ((fieldType !== 'radio' && fieldType !== 'checkbox') || form[i].checked ? form[i].value : null);
      var fieldName = form[i].name || '';
      if(!fieldValue || !fieldName) continue;
      data += (data.length ? '&' : '' ) + fieldName + '=' + fieldValue;
    }
  }

  //Make the XHR post
  var request = new XMLHttpRequest();

  request.open('POST', url, true);
  if(!hasUsableFormData){
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  }
  request.onload = function (response) {

    if(typeof success_callback === 'function'){
      success_callback(response);
    }
    else if(typeof Shopify === 'object' && typeof Shopify.onItemAdded ==='function'){
      Shopify.onItemAdded(response);
    }
    else if(typeof ShopifyAPI === 'object' && typeof ShopifyAPI.onItemAdded === 'function'){
      ShopifyAPI.onItemAdded(response);
    }

    //Update inventory quantities if we set them up
    if(typeof beforeBoldSelectCallback === 'function' && formObj.variant && formObj.variant.selector){
      var qty = (formObj.quantity ? parseInt(formObj.quantity.value) : 1);
      var variant = formObj.variant;
      if(typeof variant.inventory_in_cart !== 'undefined'){
        variant.inventory_in_cart += qty;
      }
      if(typeof variant.inventory_remaining !== 'undefined' && variant.inventory_management){
        variant.inventory_remaining -= qty;
      }
      if(variant.inventory_remaining <= 0 && variant.inventory_management && variant.inventory_policy === 'deny'){
        variant.available = false;
      }

      beforeBoldSelectCallback(variant, variant.selector);
    }
  };

  if(typeof error_callback === 'function'){
    request.onerror = error_callback;
  }

  request.send(data);
};

BOLD.helpers.updateCartFromForm = function(t, e) {
    var n = {
        type: "POST",
        url: "/cart/update.js",
        data: jQuery("#" + t).serialize(),
        dataType: "json",
        success: function(t) {
            "function" == typeof e ? e(BOLD.helpers.cleanCart(t)) : Shopify.onCartUpdate(BOLD.helpers.cleanCart(t))
        },
        error: function(t, e) {
            Shopify.onError(t, e)
        }
    };
    jQuery.ajax(n)
};

BOLD.helpers.changeItem = function(line, qty, success_callback, error_callback){
  var index = line - 1; //Shopify uses 1-based indexing
  //Get the cart to see if the given line item hasa builder ID. If it does, use our code. Otherwise, just update the line normally.
  BOLD.helpers.getCart(function(cart){
    if(cart.items[index].builder_id)
      BOLD.helpers.updateItemWithOptions(cart, cart.items[index].builder_id, qty, success_callback, error_callback);

    else{
      //Make sure that BTM products are correctly updated
      if(cart.items[index].qty_ratio) qty *= cart.items[index].qty_ratio;

      var params = {
        type: "POST",
        url: "/cart/change.js",
        data: "quantity=" + qty + "&line=" + line,
        dataType: "json",
        success: function(data) {
          if(typeof(success_callback)==='function')
            success_callback(data);
          else if(typeof(Shopify.onCartUpdate)==='function')
            Shopify.onCartUpdate(data)
        },
        error: function(t, e) {
          if(typeof(error_callback)==='function')
            error_callback(t, e);
          else if(typeof(Shopify.onError)==='function')
            Shopify.onError(t, e);
        }
      };
      jQuery.ajax(params);
    }
  });

};

BOLD.helpers.updateProperties = function(line, qty, properties, success_callback, error_callback, options){

  var params = {
    url: '/cart/change.js',
    data: {
      line: line,
      quantity: qty,
      properties: properties
    },
    type: 'post',
    dataType: 'json',
    success: function(data){
      if(typeof(success_callback)==='function') success_callback(BOLD.helpers.cleanCart(data));
    },
    error: function(a, b){
      if(typeof(error_callback)==='function') error_callback(a, b);
    }
  }

  if(typeof options == 'object' && options.sequential) {
    params.async = false;
  }
  jQuery.ajax(params);
}

BOLD.helpers.formatMoney = Shopify.formatMoney || function(t, e) {
    function n(t, e) {
        return "undefined" == typeof t ? e : t
    }
    function r(t, e, r, i) {
        if (e = n(e, 2),
        r = n(r, ","),
        i = n(i, "."),
        isNaN(t) || null == t)
            return 0;
        t = (t / 100).toFixed(e);
        var o = t.split(".")
          , a = o[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + r)
          , s = o[1] ? i + o[1] : "";
        return a + s
    }
    "string" == typeof t && (t = t.replace(".", ""));
    var i = ""
      , o = /\{\{\s*(\w+)\s*\}\}/
      , a = e || this.money_format;
    switch (a.match(o)[1]) {
    case "amount":
        i = r(t, 2);
        break;
    case "amount_no_decimals":
        i = r(t, 0);
        break;
    case "amount_with_comma_separator":
        i = r(t, 2, ".", ",");
        break;
    case "amount_no_decimals_with_comma_separator":
        i = r(t, 0, ".", ",")
    }
    return a.replace(o, i)
};

//Polyfill functions to ensure compatibility with older browsers
if (![].includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
    'use strict';
    var O = Object(this);
    var len = parseInt(O.length) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1]) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) {
        return true;
      }
      k++;
    }
    return false;
  };
}



//    option_selection.js
function floatToString(t,e){var o=t.toFixed(e).toString();return o.match(/^\.\d+/)?"0"+o:o}"undefined"==typeof window.Shopify&&(window.Shopify={}),Shopify.each=function(t,e){for(var o=0;o<t.length;o++)e(t[o],o)},Shopify.map=function(t,e){for(var o=[],i=0;i<t.length;i++)o.push(e(t[i],i));return o},Shopify.arrayIncludes=function(t,e){for(var o=0;o<t.length;o++)if(t[o]==e)return!0;return!1},Shopify.uniq=function(t){for(var e=[],o=0;o<t.length;o++)Shopify.arrayIncludes(e,t[o])||e.push(t[o]);return e},Shopify.isDefined=function(t){return void 0!==t},Shopify.getClass=function(t){return Object.prototype.toString.call(t).slice(8,-1)},Shopify.extend=function(t,e){function o(){}o.prototype=e.prototype,t.prototype=new o,t.prototype.constructor=t,t.baseConstructor=e,t.superClass=e.prototype},Shopify.locationSearch=function(){return window.location.search},Shopify.locationHash=function(){return window.location.hash},Shopify.replaceState=function(t){window.history.replaceState({},document.title,t)},Shopify.urlParam=function(t){var e=RegExp("[?&]"+t+"=([^&#]*)").exec(Shopify.locationSearch());return e&&decodeURIComponent(e[1].replace(/\+/g," "))},Shopify.newState=function(t,e){return(Shopify.urlParam(t)?Shopify.locationSearch().replace(RegExp("("+t+"=)[^&#]+"),"$1"+e):""===Shopify.locationSearch()?"?"+t+"="+e:Shopify.locationSearch()+"&"+t+"="+e)+Shopify.locationHash()},Shopify.setParam=function(t,e){Shopify.replaceState(Shopify.newState(t,e))},Shopify.Product=function(t){Shopify.isDefined(t)&&this.update(t)},Shopify.Product.prototype.update=function(t){for(property in t)this[property]=t[property]},Shopify.Product.prototype.optionNames=function(){return"Array"==Shopify.getClass(this.options)?this.options:[]},Shopify.Product.prototype.optionValues=function(t){if(!Shopify.isDefined(this.variants))return null;var e=Shopify.map(this.variants,function(e){var o="option"+(t+1);return e[o]==undefined?null:e[o]});return null==e[0]?null:Shopify.uniq(e)},Shopify.Product.prototype.getVariant=function(t){var e=null;return t.length!=this.options.length?e:(Shopify.each(this.variants,function(o){for(var i=!0,r=0;r<t.length;r++){o["option"+(r+1)]!=t[r]&&(i=!1)}if(1==i)return void(e=o)}),e)},Shopify.Product.prototype.getVariantById=function(t){for(var e=0;e<this.variants.length;e++){var o=this.variants[e];if(t==o.id)return o}return null},Shopify.money_format="${{amount}}",Shopify.formatMoney=function(t,e){function o(t,e){return void 0===t?e:t}function i(t,e,i,r){if(e=o(e,2),i=o(i,","),r=o(r,"."),isNaN(t)||null==t)return 0;t=(t/100).toFixed(e);var n=t.split(".");return n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1"+i)+(n[1]?r+n[1]:"")}"string"==typeof t&&(t=t.replace(".",""));var r="",n=/\{\{\s*(\w+)\s*\}\}/,a=e||this.money_format;switch(a.match(n)[1]){case"amount":r=i(t,2);break;case"amount_no_decimals":r=i(t,0);break;case"amount_with_comma_separator":r=i(t,2,".",",");break;case"amount_with_space_separator":r=i(t,2," ",",");break;case"amount_with_period_and_space_separator":r=i(t,2," ",".");break;case"amount_no_decimals_with_comma_separator":r=i(t,0,".",",");break;case"amount_no_decimals_with_space_separator":r=i(t,0," ");break;case"amount_with_apostrophe_separator":r=i(t,2,"'",".")}return a.replace(n,r)},Shopify.OptionSelectors=function(t,e){return this.selectorDivClass="selector-wrapper",this.selectorClass="single-option-selector",this.variantIdFieldIdSuffix="-variant-id",this.variantIdField=null,this.historyState=null,this.selectors=[],this.domIdPrefix=t,this.product=new Shopify.Product(e.product),this.onVariantSelected=Shopify.isDefined(e.onVariantSelected)?e.onVariantSelected:function(){},this.replaceSelector(t),this.initDropdown(),e.enableHistoryState&&(this.historyState=new Shopify.OptionSelectors.HistoryState(this)),!0},Shopify.OptionSelectors.prototype.initDropdown=function(){var t={initialLoad:!0};if(!this.selectVariantFromDropdown(t)){var e=this;setTimeout(function(){e.selectVariantFromParams(t)||e.fireOnChangeForFirstDropdown.call(e,t)})}},Shopify.OptionSelectors.prototype.fireOnChangeForFirstDropdown=function(t){this.selectors[0].element.onchange(t)},Shopify.OptionSelectors.prototype.selectVariantFromParamsOrDropdown=function(t){this.selectVariantFromParams(t)||this.selectVariantFromDropdown(t)},Shopify.OptionSelectors.prototype.replaceSelector=function(t){var e=document.getElementById(t),o=e.parentNode;Shopify.each(this.buildSelectors(),function(t){o.insertBefore(t,e)}),e.style.display="none",this.variantIdField=e},Shopify.OptionSelectors.prototype.selectVariantFromDropdown=function(t){var e=document.getElementById(this.domIdPrefix).querySelector("[selected]");if(e||(e=document.getElementById(this.domIdPrefix).querySelector('[selected="selected"]')),!e)return!1;var o=e.value;return this.selectVariant(o,t)},Shopify.OptionSelectors.prototype.selectVariantFromParams=function(t){var e=Shopify.urlParam("variant");return this.selectVariant(e,t)},Shopify.OptionSelectors.prototype.selectVariant=function(t,e){var o=this.product.getVariantById(t);if(null==o)return!1;for(var i=0;i<this.selectors.length;i++){var r=this.selectors[i].element,n=r.getAttribute("data-option"),a=o[n];null!=a&&this.optionExistInSelect(r,a)&&(r.value=a)}return"undefined"!=typeof jQuery?jQuery(this.selectors[0].element).trigger("change",e):this.selectors[0].element.onchange(e),!0},Shopify.OptionSelectors.prototype.optionExistInSelect=function(t,e){for(var o=0;o<t.options.length;o++)if(t.options[o].value==e)return!0},Shopify.OptionSelectors.prototype.insertSelectors=function(t,e){Shopify.isDefined(e)&&this.setMessageElement(e),this.domIdPrefix="product-"+this.product.id+"-variant-selector";var o=document.getElementById(t);Shopify.each(this.buildSelectors(),function(t){o.appendChild(t)})},Shopify.OptionSelectors.prototype.buildSelectors=function(){for(var t=0;t<this.product.optionNames().length;t++){var e=new Shopify.SingleOptionSelector(this,t,this.product.optionNames()[t],this.product.optionValues(t));e.element.disabled=!1,this.selectors.push(e)}var o=this.selectorDivClass,i=this.product.optionNames();return Shopify.map(this.selectors,function(t){var e=document.createElement("div");if(e.setAttribute("class",o),i.length>1){var r=document.createElement("label");r.htmlFor=t.element.id,r.innerHTML=t.name,e.appendChild(r)}return e.appendChild(t.element),e})},Shopify.OptionSelectors.prototype.selectedValues=function(){for(var t=[],e=0;e<this.selectors.length;e++){var o=this.selectors[e].element.value;t.push(o)}return t},Shopify.OptionSelectors.prototype.updateSelectors=function(t,e){var o=this.selectedValues(),i=this.product.getVariant(o);i?(this.variantIdField.disabled=!1,this.variantIdField.value=i.id):this.variantIdField.disabled=!0,this.onVariantSelected(i,this,e),null!=this.historyState&&this.historyState.onVariantChange(i,this,e)},Shopify.OptionSelectorsFromDOM=function(t,e){var o=e.optionNames||[],i=e.priceFieldExists||!0,r=e.delimiter||"/",n=this.createProductFromSelector(t,o,i,r);e.product=n,Shopify.OptionSelectorsFromDOM.baseConstructor.call(this,t,e)},Shopify.extend(Shopify.OptionSelectorsFromDOM,Shopify.OptionSelectors),Shopify.OptionSelectorsFromDOM.prototype.createProductFromSelector=function(t,e,o,i){if(!Shopify.isDefined(o))var o=!0;if(!Shopify.isDefined(i))var i="/";var r=document.getElementById(t),n=r.childNodes,a=(r.parentNode,e.length),s=[];Shopify.each(n,function(t){if(1==t.nodeType&&"option"==t.tagName.toLowerCase()){var r=t.innerHTML.split(new RegExp("\\s*\\"+i+"\\s*"));0==e.length&&(a=r.length-(o?1:0));var n=r.slice(0,a),p=o?r[a]:"",l=(t.getAttribute("value"),{available:!t.disabled,id:parseFloat(t.value),price:p,option1:n[0],option2:n[1],option3:n[2]});s.push(l)}});var p={variants:s};if(0==e.length){p.options=[];for(var l=0;l<a;l++)p.options[l]="option "+(l+1)}else p.options=e;return p},Shopify.SingleOptionSelector=function(t,e,o,i){this.multiSelector=t,this.values=i,this.index=e,this.name=o,this.element=document.createElement("select");for(var r=0;r<i.length;r++){var n=document.createElement("option");n.value=i[r],n.innerHTML=i[r],this.element.appendChild(n)}return this.element.setAttribute("class",this.multiSelector.selectorClass),this.element.setAttribute("data-option","option"+(e+1)),this.element.id=t.domIdPrefix+"-option-"+e,this.element.onchange=function(o,i){i=i||{},t.updateSelectors(e,i)},!0},Shopify.Image={preload:function(t,e){for(var o=0;o<t.length;o++){var i=t[o];this.loadImage(this.getSizedImageUrl(i,e))}},loadImage:function(t){(new Image).src=t},switchImage:function(t,e,o){if(t&&e){var i=this.imageSize(e.src),r=this.getSizedImageUrl(t.src,i);o?o(r,t,e):e.src=r}},imageSize:function(t){var e=t.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);return null!==e?e[1]:null},getSizedImageUrl:function(t,e){if(null==e)return t;if("master"==e)return this.removeProtocol(t);var o=t.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);if(null!=o){var i=t.split(o[0]),r=o[0];return this.removeProtocol(i[0]+"_"+e+r)}return null},removeProtocol:function(t){return t.replace(/http(s)?:/,"")}},Shopify.OptionSelectors.HistoryState=function(t){this.browserSupports()&&this.register(t)},Shopify.OptionSelectors.HistoryState.prototype.register=function(t){window.addEventListener("popstate",function(){t.selectVariantFromParamsOrDropdown({popStateCall:!0})})},Shopify.OptionSelectors.HistoryState.prototype.onVariantChange=function(t,e,o){this.browserSupports()&&(!t||o.initialLoad||o.popStateCall||Shopify.setParam("variant",t.id))},Shopify.OptionSelectors.HistoryState.prototype.browserSupports=function(){return window.history&&window.history.replaceState};


//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,w=Object.keys,_=i.bind,j=function(n){return n instanceof j?n:this instanceof j?void(this._wrapped=n):new j(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=j),exports._=j):n._=j,j.VERSION="1.6.0";var A=j.each=j.forEach=function(n,t,e){if(null==n)return n;if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a=j.keys(n),u=0,i=a.length;i>u;u++)if(t.call(e,n[a[u]],a[u],n)===r)return;return n};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var O="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(O);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=j.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(O);return r},j.find=j.detect=function(n,t,r){var e;return k(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,e){t||(t=j.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var k=j.some=j.any=function(n,t,e){t||(t=j.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};j.contains=j.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:k(n,function(n){return n===t})},j.invoke=function(n,t){var r=o.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,j.property(t))},j.where=function(n,t){return j.filter(n,j.matches(t))},j.findWhere=function(n,t){return j.find(n,j.matches(t))},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);var e=-1/0,u=-1/0;return A(n,function(n,i,a){var o=t?t.call(r,n,i,a):n;o>u&&(e=n,u=o)}),e},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);var e=1/0,u=1/0;return A(n,function(n,i,a){var o=t?t.call(r,n,i,a):n;u>o&&(e=n,u=o)}),e},j.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e},j.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=j.values(n)),n[j.random(n.length-1)]):j.shuffle(n).slice(0,Math.max(0,t))};var E=function(n){return null==n?j.identity:j.isFunction(n)?n:j.property(n)};j.sortBy=function(n,t,r){return t=E(t),j.pluck(j.map(n,function(n,e,u){return{value:n,index:e,criteria:t.call(r,n,e,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=E(r),A(t,function(i,a){var o=r.call(e,i,a,t);n(u,o,i)}),u}};j.groupBy=F(function(n,t,r){j.has(n,t)?n[t].push(r):n[t]=[r]}),j.indexBy=F(function(n,t,r){n[t]=r}),j.countBy=F(function(n,t){j.has(n,t)?n[t]++:n[t]=1}),j.sortedIndex=function(n,t,r,e){r=E(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;r.call(e,n[o])<u?i=o+1:a=o}return i},j.toArray=function(n){return n?j.isArray(n)?o.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:o.call(n,0,t)},j.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var M=function(n,t,r){return t&&j.every(n,j.isArray)?c.apply(r,n):(A(n,function(n){j.isArray(n)||j.isArguments(n)?t?a.apply(r,n):M(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return M(n,t,[])},j.without=function(n){return j.difference(n,o.call(arguments,1))},j.partition=function(n,t){var r=[],e=[];return A(n,function(n){(t(n)?r:e).push(n)}),[r,e]},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:j.contains(a,r))||(a.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=o.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.contains(t,n)})})},j.difference=function(n){var t=c.apply(e,o.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var R=function(){};j.bind=function(n,t){var r,e;if(_&&n.bind===_)return _.apply(n,o.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));R.prototype=n.prototype;var u=new R;R.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=o.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===j&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},j.bindAll=function(n){var t=o.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return A(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(o.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=r.leading===!1?0:j.now(),a=null,i=n.apply(e,u),e=u=null};return function(){var l=j.now();o||r.leading!==!1||(o=l);var f=t-(l-o);return e=this,u=arguments,0>=f?(clearTimeout(a),a=null,o=l,i=n.apply(e,u),e=u=null):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u,i,a,o,c=function(){var l=j.now()-a;t>l?e=setTimeout(c,t-l):(e=null,r||(o=n.apply(i,u),i=u=null))};return function(){i=this,u=arguments,a=j.now();var l=r&&!e;return e||(e=setTimeout(c,t)),l&&(o=n.apply(i,u),i=u=null),o}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return j.partial(t,n)},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=function(n){if(!j.isObject(n))return[];if(w)return w(n);var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},j.pairs=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},j.invert=function(n){for(var t={},r=j.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)j.contains(r,u)||(t[u]=n[u]);return t},j.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]===void 0&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o)&&"constructor"in n&&"constructor"in t)return!1;r.push(n),e.push(t);var c=0,f=!0;if("[object Array]"==u){if(c=n.length,f=c==t.length)for(;c--&&(f=S(n[c],t[c],r,e)););}else{for(var s in n)if(j.has(n,s)&&(c++,!(f=j.has(t,s)&&S(n[s],t[s],r,e))))break;if(f){for(s in t)if(j.has(t,s)&&!c--)break;f=!c}}return r.pop(),e.pop(),f};j.isEqual=function(n,t){return S(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=x||function(n){return"[object Array]"==l.call(n)},j.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return n===void 0},j.has=function(n,t){return f.call(n,t)},j.noConflict=function(){return n._=t,this},j.identity=function(n){return n},j.constant=function(n){return function(){return n}},j.property=function(n){return function(t){return t[n]}},j.matches=function(n){return function(t){if(t===n)return!0;for(var r in n)if(n[r]!==t[r])return!1;return!0}},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},j.now=Date.now||function(){return(new Date).getTime()};var T={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};T.unescape=j.invert(T.escape);var I={escape:new RegExp("["+j.keys(T.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(T.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(I[n],function(t){return T[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){A(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(j,n))}})};var N=0;j.uniqueId=function(n){var t=++N+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(D,function(n){return"\\"+B[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=new Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},j.chain=function(n){return j(n).chain()};var z=function(n){return this._chain?j(n).chain():n};j.mixin(j),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];j.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}}),"function"==typeof define&&define.amd&&define("underscore",[],function(){return j})}).call(this);
//# sourceMappingURL=underscore-min.map

/* Backbone.js v1.1.2 */
(function(t,e){if(typeof define==="function"&&define.amd){define(["underscore","jquery","exports"],function(i,r,s){t.Backbone=e(t,s,i,r)})}else if(typeof exports!=="undefined"){var i=require("underscore");e(t,exports,i)}else{t.Backbone=e(t,{},t._,t.jQuery||t.Zepto||t.ender||t.$)}})(this,function(t,e,i,r){var s=t.Backbone;var n=[];var a=n.push;var o=n.slice;var h=n.splice;e.VERSION="1.1.2";e.$=r;e.noConflict=function(){t.Backbone=s;return this};e.emulateHTTP=false;e.emulateJSON=false;var u=e.Events={on:function(t,e,i){if(!c(this,"on",t,[e,i])||!e)return this;this._events||(this._events={});var r=this._events[t]||(this._events[t]=[]);r.push({callback:e,context:i,ctx:i||this});return this},once:function(t,e,r){if(!c(this,"once",t,[e,r])||!e)return this;var s=this;var n=i.once(function(){s.off(t,n);e.apply(this,arguments)});n._callback=e;return this.on(t,n,r)},off:function(t,e,r){var s,n,a,o,h,u,l,f;if(!this._events||!c(this,"off",t,[e,r]))return this;if(!t&&!e&&!r){this._events=void 0;return this}o=t?[t]:i.keys(this._events);for(h=0,u=o.length;h<u;h++){t=o[h];if(a=this._events[t]){this._events[t]=s=[];if(e||r){for(l=0,f=a.length;l<f;l++){n=a[l];if(e&&e!==n.callback&&e!==n.callback._callback||r&&r!==n.context){s.push(n)}}}if(!s.length)delete this._events[t]}}return this},trigger:function(t){if(!this._events)return this;var e=o.call(arguments,1);if(!c(this,"trigger",t,e))return this;var i=this._events[t];var r=this._events.all;if(i)f(i,e);if(r)f(r,arguments);return this},stopListening:function(t,e,r){var s=this._listeningTo;if(!s)return this;var n=!e&&!r;if(!r&&typeof e==="object")r=this;if(t)(s={})[t._listenId]=t;for(var a in s){t=s[a];t.off(e,r,this);if(n||i.isEmpty(t._events))delete this._listeningTo[a]}return this}};var l=/\s+/;var c=function(t,e,i,r){if(!i)return true;if(typeof i==="object"){for(var s in i){t[e].apply(t,[s,i[s]].concat(r))}return false}if(l.test(i)){var n=i.split(l);for(var a=0,o=n.length;a<o;a++){t[e].apply(t,[n[a]].concat(r))}return false}return true};var f=function(t,e){var i,r=-1,s=t.length,n=e[0],a=e[1],o=e[2];switch(e.length){case 0:while(++r<s)(i=t[r]).callback.call(i.ctx);return;case 1:while(++r<s)(i=t[r]).callback.call(i.ctx,n);return;case 2:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a);return;case 3:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a,o);return;default:while(++r<s)(i=t[r]).callback.apply(i.ctx,e);return}};var d={listenTo:"on",listenToOnce:"once"};i.each(d,function(t,e){u[e]=function(e,r,s){var n=this._listeningTo||(this._listeningTo={});var a=e._listenId||(e._listenId=i.uniqueId("l"));n[a]=e;if(!s&&typeof r==="object")s=this;e[t](r,s,this);return this}});u.bind=u.on;u.unbind=u.off;i.extend(e,u);var p=e.Model=function(t,e){var r=t||{};e||(e={});this.cid=i.uniqueId("c");this.attributes={};if(e.collection)this.collection=e.collection;if(e.parse)r=this.parse(r,e)||{};r=i.defaults({},r,i.result(this,"defaults"));this.set(r,e);this.changed={};this.initialize.apply(this,arguments)};i.extend(p.prototype,u,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(t){return i.clone(this.attributes)},sync:function(){return e.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return i.escape(this.get(t))},has:function(t){return this.get(t)!=null},set:function(t,e,r){var s,n,a,o,h,u,l,c;if(t==null)return this;if(typeof t==="object"){n=t;r=e}else{(n={})[t]=e}r||(r={});if(!this._validate(n,r))return false;a=r.unset;h=r.silent;o=[];u=this._changing;this._changing=true;if(!u){this._previousAttributes=i.clone(this.attributes);this.changed={}}c=this.attributes,l=this._previousAttributes;if(this.idAttribute in n)this.id=n[this.idAttribute];for(s in n){e=n[s];if(!i.isEqual(c[s],e))o.push(s);if(!i.isEqual(l[s],e)){this.changed[s]=e}else{delete this.changed[s]}a?delete c[s]:c[s]=e}if(!h){if(o.length)this._pending=r;for(var f=0,d=o.length;f<d;f++){this.trigger("change:"+o[f],this,c[o[f]],r)}}if(u)return this;if(!h){while(this._pending){r=this._pending;this._pending=false;this.trigger("change",this,r)}}this._pending=false;this._changing=false;return this},unset:function(t,e){return this.set(t,void 0,i.extend({},e,{unset:true}))},clear:function(t){var e={};for(var r in this.attributes)e[r]=void 0;return this.set(e,i.extend({},t,{unset:true}))},hasChanged:function(t){if(t==null)return!i.isEmpty(this.changed);return i.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?i.clone(this.changed):false;var e,r=false;var s=this._changing?this._previousAttributes:this.attributes;for(var n in t){if(i.isEqual(s[n],e=t[n]))continue;(r||(r={}))[n]=e}return r},previous:function(t){if(t==null||!this._previousAttributes)return null;return this._previousAttributes[t]},previousAttributes:function(){return i.clone(this._previousAttributes)},fetch:function(t){t=t?i.clone(t):{};if(t.parse===void 0)t.parse=true;var e=this;var r=t.success;t.success=function(i){if(!e.set(e.parse(i,t),t))return false;if(r)r(e,i,t);e.trigger("sync",e,i,t)};q(this,t);return this.sync("read",this,t)},save:function(t,e,r){var s,n,a,o=this.attributes;if(t==null||typeof t==="object"){s=t;r=e}else{(s={})[t]=e}r=i.extend({validate:true},r);if(s&&!r.wait){if(!this.set(s,r))return false}else{if(!this._validate(s,r))return false}if(s&&r.wait){this.attributes=i.extend({},o,s)}if(r.parse===void 0)r.parse=true;var h=this;var u=r.success;r.success=function(t){h.attributes=o;var e=h.parse(t,r);if(r.wait)e=i.extend(s||{},e);if(i.isObject(e)&&!h.set(e,r)){return false}if(u)u(h,t,r);h.trigger("sync",h,t,r)};q(this,r);n=this.isNew()?"create":r.patch?"patch":"update";if(n==="patch")r.attrs=s;a=this.sync(n,this,r);if(s&&r.wait)this.attributes=o;return a},destroy:function(t){t=t?i.clone(t):{};var e=this;var r=t.success;var s=function(){e.trigger("destroy",e,e.collection,t)};t.success=function(i){if(t.wait||e.isNew())s();if(r)r(e,i,t);if(!e.isNew())e.trigger("sync",e,i,t)};if(this.isNew()){t.success();return false}q(this,t);var n=this.sync("delete",this,t);if(!t.wait)s();return n},url:function(){var t=i.result(this,"urlRoot")||i.result(this.collection,"url")||M();if(this.isNew())return t;return t.replace(/([^\/])$/,"$1/")+encodeURIComponent(this.id)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(t){return this._validate({},i.extend(t||{},{validate:true}))},_validate:function(t,e){if(!e.validate||!this.validate)return true;t=i.extend({},this.attributes,t);var r=this.validationError=this.validate(t,e)||null;if(!r)return true;this.trigger("invalid",this,r,i.extend(e,{validationError:r}));return false}});var v=["keys","values","pairs","invert","pick","omit"];i.each(v,function(t){p.prototype[t]=function(){var e=o.call(arguments);e.unshift(this.attributes);return i[t].apply(i,e)}});var g=e.Collection=function(t,e){e||(e={});if(e.model)this.model=e.model;if(e.comparator!==void 0)this.comparator=e.comparator;this._reset();this.initialize.apply(this,arguments);if(t)this.reset(t,i.extend({silent:true},e))};var m={add:true,remove:true,merge:true};var y={add:true,remove:false};i.extend(g.prototype,u,{model:p,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return e.sync.apply(this,arguments)},add:function(t,e){return this.set(t,i.extend({merge:false},e,y))},remove:function(t,e){var r=!i.isArray(t);t=r?[t]:i.clone(t);e||(e={});var s,n,a,o;for(s=0,n=t.length;s<n;s++){o=t[s]=this.get(t[s]);if(!o)continue;delete this._byId[o.id];delete this._byId[o.cid];a=this.indexOf(o);this.models.splice(a,1);this.length--;if(!e.silent){e.index=a;o.trigger("remove",o,this,e)}this._removeReference(o,e)}return r?t[0]:t},set:function(t,e){e=i.defaults({},e,m);if(e.parse)t=this.parse(t,e);var r=!i.isArray(t);t=r?t?[t]:[]:i.clone(t);var s,n,a,o,h,u,l;var c=e.at;var f=this.model;var d=this.comparator&&c==null&&e.sort!==false;var v=i.isString(this.comparator)?this.comparator:null;var g=[],y=[],_={};var b=e.add,w=e.merge,x=e.remove;var E=!d&&b&&x?[]:false;for(s=0,n=t.length;s<n;s++){h=t[s]||{};if(h instanceof p){a=o=h}else{a=h[f.prototype.idAttribute||"id"]}if(u=this.get(a)){if(x)_[u.cid]=true;if(w){h=h===o?o.attributes:h;if(e.parse)h=u.parse(h,e);u.set(h,e);if(d&&!l&&u.hasChanged(v))l=true}t[s]=u}else if(b){o=t[s]=this._prepareModel(h,e);if(!o)continue;g.push(o);this._addReference(o,e)}o=u||o;if(E&&(o.isNew()||!_[o.id]))E.push(o);_[o.id]=true}if(x){for(s=0,n=this.length;s<n;++s){if(!_[(o=this.models[s]).cid])y.push(o)}if(y.length)this.remove(y,e)}if(g.length||E&&E.length){if(d)l=true;this.length+=g.length;if(c!=null){for(s=0,n=g.length;s<n;s++){this.models.splice(c+s,0,g[s])}}else{if(E)this.models.length=0;var k=E||g;for(s=0,n=k.length;s<n;s++){this.models.push(k[s])}}}if(l)this.sort({silent:true});if(!e.silent){for(s=0,n=g.length;s<n;s++){(o=g[s]).trigger("add",o,this,e)}if(l||E&&E.length)this.trigger("sort",this,e)}return r?t[0]:t},reset:function(t,e){e||(e={});for(var r=0,s=this.models.length;r<s;r++){this._removeReference(this.models[r],e)}e.previousModels=this.models;this._reset();t=this.add(t,i.extend({silent:true},e));if(!e.silent)this.trigger("reset",this,e);return t},push:function(t,e){return this.add(t,i.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);this.remove(e,t);return e},unshift:function(t,e){return this.add(t,i.extend({at:0},e))},shift:function(t){var e=this.at(0);this.remove(e,t);return e},slice:function(){return o.apply(this.models,arguments)},get:function(t){if(t==null)return void 0;return this._byId[t]||this._byId[t.id]||this._byId[t.cid]},at:function(t){return this.models[t]},where:function(t,e){if(i.isEmpty(t))return e?void 0:[];return this[e?"find":"filter"](function(e){for(var i in t){if(t[i]!==e.get(i))return false}return true})},findWhere:function(t){return this.where(t,true)},sort:function(t){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");t||(t={});if(i.isString(this.comparator)||this.comparator.length===1){this.models=this.sortBy(this.comparator,this)}else{this.models.sort(i.bind(this.comparator,this))}if(!t.silent)this.trigger("sort",this,t);return this},pluck:function(t){return i.invoke(this.models,"get",t)},fetch:function(t){t=t?i.clone(t):{};if(t.parse===void 0)t.parse=true;var e=t.success;var r=this;t.success=function(i){var s=t.reset?"reset":"set";r[s](i,t);if(e)e(r,i,t);r.trigger("sync",r,i,t)};q(this,t);return this.sync("read",this,t)},create:function(t,e){e=e?i.clone(e):{};if(!(t=this._prepareModel(t,e)))return false;if(!e.wait)this.add(t,e);var r=this;var s=e.success;e.success=function(t,i){if(e.wait)r.add(t,e);if(s)s(t,i,e)};t.save(null,e);return t},parse:function(t,e){return t},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0;this.models=[];this._byId={}},_prepareModel:function(t,e){if(t instanceof p)return t;e=e?i.clone(e):{};e.collection=this;var r=new this.model(t,e);if(!r.validationError)return r;this.trigger("invalid",this,r.validationError,e);return false},_addReference:function(t,e){this._byId[t.cid]=t;if(t.id!=null)this._byId[t.id]=t;if(!t.collection)t.collection=this;t.on("all",this._onModelEvent,this)},_removeReference:function(t,e){if(this===t.collection)delete t.collection;t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,r){if((t==="add"||t==="remove")&&i!==this)return;if(t==="destroy")this.remove(e,r);if(e&&t==="change:"+e.idAttribute){delete this._byId[e.previous(e.idAttribute)];if(e.id!=null)this._byId[e.id]=e}this.trigger.apply(this,arguments)}});var _=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample"];i.each(_,function(t){g.prototype[t]=function(){var e=o.call(arguments);e.unshift(this.models);return i[t].apply(i,e)}});var b=["groupBy","countBy","sortBy","indexBy"];i.each(b,function(t){g.prototype[t]=function(e,r){var s=i.isFunction(e)?e:function(t){return t.get(e)};return i[t](this.models,s,r)}});var w=e.View=function(t){this.cid=i.uniqueId("view");t||(t={});i.extend(this,i.pick(t,E));this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()};var x=/^(\S+)\s*(.*)$/;var E=["model","collection","el","id","attributes","className","tagName","events"];i.extend(w.prototype,u,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();this.stopListening();return this},setElement:function(t,i){if(this.$el)this.undelegateEvents();this.$el=t instanceof e.$?t:e.$(t);this.el=this.$el[0];if(i!==false)this.delegateEvents();return this},delegateEvents:function(t){if(!(t||(t=i.result(this,"events"))))return this;this.undelegateEvents();for(var e in t){var r=t[e];if(!i.isFunction(r))r=this[t[e]];if(!r)continue;var s=e.match(x);var n=s[1],a=s[2];r=i.bind(r,this);n+=".delegateEvents"+this.cid;if(a===""){this.$el.on(n,r)}else{this.$el.on(n,a,r)}}return this},undelegateEvents:function(){this.$el.off(".delegateEvents"+this.cid);return this},_ensureElement:function(){if(!this.el){var t=i.extend({},i.result(this,"attributes"));if(this.id)t.id=i.result(this,"id");if(this.className)t["class"]=i.result(this,"className");var r=e.$("<"+i.result(this,"tagName")+">").attr(t);this.setElement(r,false)}else{this.setElement(i.result(this,"el"),false)}}});e.sync=function(t,r,s){var n=T[t];i.defaults(s||(s={}),{emulateHTTP:e.emulateHTTP,emulateJSON:e.emulateJSON});var a={type:n,dataType:"json"};if(!s.url){a.url=i.result(r,"url")||M()}if(s.data==null&&r&&(t==="create"||t==="update"||t==="patch")){a.contentType="application/json";a.data=JSON.stringify(s.attrs||r.toJSON(s))}if(s.emulateJSON){a.contentType="application/x-www-form-urlencoded";a.data=a.data?{model:a.data}:{}}if(s.emulateHTTP&&(n==="PUT"||n==="DELETE"||n==="PATCH")){a.type="POST";if(s.emulateJSON)a.data._method=n;var o=s.beforeSend;s.beforeSend=function(t){t.setRequestHeader("X-HTTP-Method-Override",n);if(o)return o.apply(this,arguments)}}if(a.type!=="GET"&&!s.emulateJSON){a.processData=false}if(a.type==="PATCH"&&k){a.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")}}var h=s.xhr=e.ajax(i.extend(a,s));r.trigger("request",r,h,s);return h};var k=typeof window!=="undefined"&&!!window.ActiveXObject&&!(window.XMLHttpRequest&&(new XMLHttpRequest).dispatchEvent);var T={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};e.ajax=function(){return e.$.ajax.apply(e.$,arguments)};var $=e.Router=function(t){t||(t={});if(t.routes)this.routes=t.routes;this._bindRoutes();this.initialize.apply(this,arguments)};var S=/\((.*?)\)/g;var H=/(\(\?)?:\w+/g;var A=/\*\w+/g;var I=/[\-{}\[\]+?.,\\\^$|#\s]/g;i.extend($.prototype,u,{initialize:function(){},route:function(t,r,s){if(!i.isRegExp(t))t=this._routeToRegExp(t);if(i.isFunction(r)){s=r;r=""}if(!s)s=this[r];var n=this;e.history.route(t,function(i){var a=n._extractParameters(t,i);n.execute(s,a);n.trigger.apply(n,["route:"+r].concat(a));n.trigger("route",r,a);e.history.trigger("route",n,r,a)});return this},execute:function(t,e){if(t)t.apply(this,e)},navigate:function(t,i){e.history.navigate(t,i);return this},_bindRoutes:function(){if(!this.routes)return;this.routes=i.result(this,"routes");var t,e=i.keys(this.routes);while((t=e.pop())!=null){this.route(t,this.routes[t])}},_routeToRegExp:function(t){t=t.replace(I,"\\$&").replace(S,"(?:$1)?").replace(H,function(t,e){return e?t:"([^/?]+)"}).replace(A,"([^?]*?)");return new RegExp("^"+t+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(t,e){var r=t.exec(e).slice(1);return i.map(r,function(t,e){if(e===r.length-1)return t||null;return t?decodeURIComponent(t):null})}});var N=e.History=function(){this.handlers=[];i.bindAll(this,"checkUrl");if(typeof window!=="undefined"){this.location=window.location;this.history=window.history}};var R=/^[#\/]|\s+$/g;var O=/^\/+|\/+$/g;var P=/msie [\w.]+/;var C=/\/$/;var j=/#.*$/;N.started=false;i.extend(N.prototype,u,{interval:50,atRoot:function(){return this.location.pathname.replace(/[^\/]$/,"$&/")===this.root},getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getFragment:function(t,e){if(t==null){if(this._hasPushState||!this._wantsHashChange||e){t=decodeURI(this.location.pathname+this.location.search);var i=this.root.replace(C,"");if(!t.indexOf(i))t=t.slice(i.length)}else{t=this.getHash()}}return t.replace(R,"")},start:function(t){if(N.started)throw new Error("Backbone.history has already been started");N.started=true;this.options=i.extend({root:"/"},this.options,t);this.root=this.options.root;this._wantsHashChange=this.options.hashChange!==false;this._wantsPushState=!!this.options.pushState;this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var r=this.getFragment();var s=document.documentMode;var n=P.exec(navigator.userAgent.toLowerCase())&&(!s||s<=7);this.root=("/"+this.root+"/").replace(O,"/");if(n&&this._wantsHashChange){var a=e.$('<iframe src="javascript:0" tabindex="-1">');this.iframe=a.hide().appendTo("body")[0].contentWindow;this.navigate(r)}if(this._hasPushState){e.$(window).on("popstate",this.checkUrl)}else if(this._wantsHashChange&&"onhashchange"in window&&!n){e.$(window).on("hashchange",this.checkUrl)}else if(this._wantsHashChange){this._checkUrlInterval=setInterval(this.checkUrl,this.interval)}this.fragment=r;var o=this.location;if(this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!this.atRoot()){this.fragment=this.getFragment(null,true);this.location.replace(this.root+"#"+this.fragment);return true}else if(this._hasPushState&&this.atRoot()&&o.hash){this.fragment=this.getHash().replace(R,"");this.history.replaceState({},document.title,this.root+this.fragment)}}if(!this.options.silent)return this.loadUrl()},stop:function(){e.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl);if(this._checkUrlInterval)clearInterval(this._checkUrlInterval);N.started=false},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(t){var e=this.getFragment();if(e===this.fragment&&this.iframe){e=this.getFragment(this.getHash(this.iframe))}if(e===this.fragment)return false;if(this.iframe)this.navigate(e);this.loadUrl()},loadUrl:function(t){t=this.fragment=this.getFragment(t);return i.any(this.handlers,function(e){if(e.route.test(t)){e.callback(t);return true}})},navigate:function(t,e){if(!N.started)return false;if(!e||e===true)e={trigger:!!e};var i=this.root+(t=this.getFragment(t||""));t=t.replace(j,"");if(this.fragment===t)return;this.fragment=t;if(t===""&&i!=="/")i=i.slice(0,-1);if(this._hasPushState){this.history[e.replace?"replaceState":"pushState"]({},document.title,i)}else if(this._wantsHashChange){this._updateHash(this.location,t,e.replace);if(this.iframe&&t!==this.getFragment(this.getHash(this.iframe))){if(!e.replace)this.iframe.document.open().close();this._updateHash(this.iframe.location,t,e.replace)}}else{return this.location.assign(i)}if(e.trigger)return this.loadUrl(t)},_updateHash:function(t,e,i){if(i){var r=t.href.replace(/(javascript:|#).*$/,"");t.replace(r+"#"+e)}else{t.hash="#"+e}}});e.history=new N;var U=function(t,e){var r=this;var s;if(t&&i.has(t,"constructor")){s=t.constructor}else{s=function(){return r.apply(this,arguments)}}i.extend(s,r,e);var n=function(){this.constructor=s};n.prototype=r.prototype;s.prototype=new n;if(t)i.extend(s.prototype,t);s.__super__=r.prototype;return s};p.extend=g.extend=$.extend=w.extend=N.extend=U;var M=function(){throw new Error('A "url" property or function must be specified')};var q=function(t,e){var i=e.error;e.error=function(r){if(i)i(t,r,e);t.trigger("error",t,r,e)}};return e});
//# sourceMappingURL=backbone-min.map

/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,o=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=o,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var o={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof exports?module.exports=t(e,require("wolfy87-eventemitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(window,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"===d.call(e)}function o(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);else t.push(e);return t}function s(e,t,n){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),a&&(this.jqDeferred=new a.Deferred);var r=this;setTimeout(function(){r.check()})}function f(e){this.img=e}function c(e){this.src=e,v[e]=this}var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);var i=n.nodeType;if(i&&(1===i||9===i||11===i))for(var r=n.querySelectorAll("img"),o=0,s=r.length;s>o;o++){var f=r[o];this.addImage(f)}}},s.prototype.addImage=function(e){var t=new f(e);this.images.push(t)},s.prototype.check=function(){function e(e,r){return t.options.debug&&h&&u.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},a&&(a.fn.imagesLoaded=function(e,t){var n=new s(this,e,t);return n.jqDeferred.promise(a(this))}),f.prototype=new t,f.prototype.check=function(){var e=v[this.img.src]||new c(this.img.src);if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this;e.on("confirm",function(e,n){return t.confirm(e.isLoaded,n),!0}),e.check()},f.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var v={};return c.prototype=new t,c.prototype.check=function(){if(!this.isChecked){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},c.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},c.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},c.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},c.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},c.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},s});

/*global jQuery */
/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null,
      ignore: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement('div');
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function(){
        var $this = $(this);
        if($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
        {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );

/*!
 * Masonry PACKAGED v3.1.5
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!function(a){function b(){}function c(a){function c(b){b.prototype.option||(b.prototype.option=function(b){a.isPlainObject(b)&&(this.options=a.extend(!0,this.options,b))})}function e(b,c){a.fn[b]=function(e){if("string"==typeof e){for(var g=d.call(arguments,1),h=0,i=this.length;i>h;h++){var j=this[h],k=a.data(j,b);if(k)if(a.isFunction(k[e])&&"_"!==e.charAt(0)){var l=k[e].apply(k,g);if(void 0!==l)return l}else f("no such method '"+e+"' for "+b+" instance");else f("cannot call methods on "+b+" prior to initialization; attempted to call '"+e+"'")}return this}return this.each(function(){var d=a.data(this,b);d?(d.option(e),d._init()):(d=new c(this,e),a.data(this,b,d))})}}if(a){var f="undefined"==typeof console?b:function(a){console.error(a)};return a.bridget=function(a,b){c(b),e(a,b)},a.bridget}}var d=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],c):c(a.jQuery)}(window),function(a){function b(b){var c=a.event;return c.target=c.target||c.srcElement||b,c}var c=document.documentElement,d=function(){};c.addEventListener?d=function(a,b,c){a.addEventListener(b,c,!1)}:c.attachEvent&&(d=function(a,c,d){a[c+d]=d.handleEvent?function(){var c=b(a);d.handleEvent.call(d,c)}:function(){var c=b(a);d.call(a,c)},a.attachEvent("on"+c,a[c+d])});var e=function(){};c.removeEventListener?e=function(a,b,c){a.removeEventListener(b,c,!1)}:c.detachEvent&&(e=function(a,b,c){a.detachEvent("on"+b,a[b+c]);try{delete a[b+c]}catch(d){a[b+c]=void 0}});var f={bind:d,unbind:e};"function"==typeof define&&define.amd?define("eventie/eventie",f):"object"==typeof exports?module.exports=f:a.eventie=f}(this),function(a){function b(a){"function"==typeof a&&(b.isReady?a():f.push(a))}function c(a){var c="readystatechange"===a.type&&"complete"!==e.readyState;if(!b.isReady&&!c){b.isReady=!0;for(var d=0,g=f.length;g>d;d++){var h=f[d];h()}}}function d(d){return d.bind(e,"DOMContentLoaded",c),d.bind(e,"readystatechange",c),d.bind(a,"load",c),b}var e=a.document,f=[];b.isReady=!1,"function"==typeof define&&define.amd?(b.isReady="function"==typeof requirejs,define("doc-ready/doc-ready",["eventie/eventie"],d)):a.docReady=d(a.eventie)}(this),function(){function a(){}function b(a,b){for(var c=a.length;c--;)if(a[c].listener===b)return c;return-1}function c(a){return function(){return this[a].apply(this,arguments)}}var d=a.prototype,e=this,f=e.EventEmitter;d.getListeners=function(a){var b,c,d=this._getEvents();if(a instanceof RegExp){b={};for(c in d)d.hasOwnProperty(c)&&a.test(c)&&(b[c]=d[c])}else b=d[a]||(d[a]=[]);return b},d.flattenListeners=function(a){var b,c=[];for(b=0;b<a.length;b+=1)c.push(a[b].listener);return c},d.getListenersAsObject=function(a){var b,c=this.getListeners(a);return c instanceof Array&&(b={},b[a]=c),b||c},d.addListener=function(a,c){var d,e=this.getListenersAsObject(a),f="object"==typeof c;for(d in e)e.hasOwnProperty(d)&&-1===b(e[d],c)&&e[d].push(f?c:{listener:c,once:!1});return this},d.on=c("addListener"),d.addOnceListener=function(a,b){return this.addListener(a,{listener:b,once:!0})},d.once=c("addOnceListener"),d.defineEvent=function(a){return this.getListeners(a),this},d.defineEvents=function(a){for(var b=0;b<a.length;b+=1)this.defineEvent(a[b]);return this},d.removeListener=function(a,c){var d,e,f=this.getListenersAsObject(a);for(e in f)f.hasOwnProperty(e)&&(d=b(f[e],c),-1!==d&&f[e].splice(d,1));return this},d.off=c("removeListener"),d.addListeners=function(a,b){return this.manipulateListeners(!1,a,b)},d.removeListeners=function(a,b){return this.manipulateListeners(!0,a,b)},d.manipulateListeners=function(a,b,c){var d,e,f=a?this.removeListener:this.addListener,g=a?this.removeListeners:this.addListeners;if("object"!=typeof b||b instanceof RegExp)for(d=c.length;d--;)f.call(this,b,c[d]);else for(d in b)b.hasOwnProperty(d)&&(e=b[d])&&("function"==typeof e?f.call(this,d,e):g.call(this,d,e));return this},d.removeEvent=function(a){var b,c=typeof a,d=this._getEvents();if("string"===c)delete d[a];else if(a instanceof RegExp)for(b in d)d.hasOwnProperty(b)&&a.test(b)&&delete d[b];else delete this._events;return this},d.removeAllListeners=c("removeEvent"),d.emitEvent=function(a,b){var c,d,e,f,g=this.getListenersAsObject(a);for(e in g)if(g.hasOwnProperty(e))for(d=g[e].length;d--;)c=g[e][d],c.once===!0&&this.removeListener(a,c.listener),f=c.listener.apply(this,b||[]),f===this._getOnceReturnValue()&&this.removeListener(a,c.listener);return this},d.trigger=c("emitEvent"),d.emit=function(a){var b=Array.prototype.slice.call(arguments,1);return this.emitEvent(a,b)},d.setOnceReturnValue=function(a){return this._onceReturnValue=a,this},d._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},d._getEvents=function(){return this._events||(this._events={})},a.noConflict=function(){return e.EventEmitter=f,a},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return a}):"object"==typeof module&&module.exports?module.exports=a:this.EventEmitter=a}.call(this),function(a){function b(a){if(a){if("string"==typeof d[a])return a;a=a.charAt(0).toUpperCase()+a.slice(1);for(var b,e=0,f=c.length;f>e;e++)if(b=c[e]+a,"string"==typeof d[b])return b}}var c="Webkit Moz ms Ms O".split(" "),d=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return b}):"object"==typeof exports?module.exports=b:a.getStyleProperty=b}(window),function(a){function b(a){var b=parseFloat(a),c=-1===a.indexOf("%")&&!isNaN(b);return c&&b}function c(){for(var a={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},b=0,c=g.length;c>b;b++){var d=g[b];a[d]=0}return a}function d(a){function d(a){if("string"==typeof a&&(a=document.querySelector(a)),a&&"object"==typeof a&&a.nodeType){var d=f(a);if("none"===d.display)return c();var e={};e.width=a.offsetWidth,e.height=a.offsetHeight;for(var k=e.isBorderBox=!(!j||!d[j]||"border-box"!==d[j]),l=0,m=g.length;m>l;l++){var n=g[l],o=d[n];o=h(a,o);var p=parseFloat(o);e[n]=isNaN(p)?0:p}var q=e.paddingLeft+e.paddingRight,r=e.paddingTop+e.paddingBottom,s=e.marginLeft+e.marginRight,t=e.marginTop+e.marginBottom,u=e.borderLeftWidth+e.borderRightWidth,v=e.borderTopWidth+e.borderBottomWidth,w=k&&i,x=b(d.width);x!==!1&&(e.width=x+(w?0:q+u));var y=b(d.height);return y!==!1&&(e.height=y+(w?0:r+v)),e.innerWidth=e.width-(q+u),e.innerHeight=e.height-(r+v),e.outerWidth=e.width+s,e.outerHeight=e.height+t,e}}function h(a,b){if(e||-1===b.indexOf("%"))return b;var c=a.style,d=c.left,f=a.runtimeStyle,g=f&&f.left;return g&&(f.left=a.currentStyle.left),c.left=b,b=c.pixelLeft,c.left=d,g&&(f.left=g),b}var i,j=a("boxSizing");return function(){if(j){var a=document.createElement("div");a.style.width="200px",a.style.padding="1px 2px 3px 4px",a.style.borderStyle="solid",a.style.borderWidth="1px 2px 3px 4px",a.style[j]="border-box";var c=document.body||document.documentElement;c.appendChild(a);var d=f(a);i=200===b(d.width),c.removeChild(a)}}(),d}var e=a.getComputedStyle,f=e?function(a){return e(a,null)}:function(a){return a.currentStyle},g=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],d):"object"==typeof exports?module.exports=d(require("get-style-property")):a.getSize=d(a.getStyleProperty)}(window),function(a,b){function c(a,b){return a[h](b)}function d(a){if(!a.parentNode){var b=document.createDocumentFragment();b.appendChild(a)}}function e(a,b){d(a);for(var c=a.parentNode.querySelectorAll(b),e=0,f=c.length;f>e;e++)if(c[e]===a)return!0;return!1}function f(a,b){return d(a),c(a,b)}var g,h=function(){if(b.matchesSelector)return"matchesSelector";for(var a=["webkit","moz","ms","o"],c=0,d=a.length;d>c;c++){var e=a[c],f=e+"MatchesSelector";if(b[f])return f}}();if(h){var i=document.createElement("div"),j=c(i,"div");g=j?c:f}else g=e;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return g}):window.matchesSelector=g}(this,Element.prototype),function(a){function b(a,b){for(var c in b)a[c]=b[c];return a}function c(a){for(var b in a)return!1;return b=null,!0}function d(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function e(a,e,f){function h(a,b){a&&(this.element=a,this.layout=b,this.position={x:0,y:0},this._create())}var i=f("transition"),j=f("transform"),k=i&&j,l=!!f("perspective"),m={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[i],n=["transform","transition","transitionDuration","transitionProperty"],o=function(){for(var a={},b=0,c=n.length;c>b;b++){var d=n[b],e=f(d);e&&e!==d&&(a[d]=e)}return a}();b(h.prototype,a.prototype),h.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},h.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},h.prototype.getSize=function(){this.size=e(this.element)},h.prototype.css=function(a){var b=this.element.style;for(var c in a){var d=o[c]||c;b[d]=a[c]}},h.prototype.getPosition=function(){var a=g(this.element),b=this.layout.options,c=b.isOriginLeft,d=b.isOriginTop,e=parseInt(a[c?"left":"right"],10),f=parseInt(a[d?"top":"bottom"],10);e=isNaN(e)?0:e,f=isNaN(f)?0:f;var h=this.layout.size;e-=c?h.paddingLeft:h.paddingRight,f-=d?h.paddingTop:h.paddingBottom,this.position.x=e,this.position.y=f},h.prototype.layoutPosition=function(){var a=this.layout.size,b=this.layout.options,c={};b.isOriginLeft?(c.left=this.position.x+a.paddingLeft+"px",c.right=""):(c.right=this.position.x+a.paddingRight+"px",c.left=""),b.isOriginTop?(c.top=this.position.y+a.paddingTop+"px",c.bottom=""):(c.bottom=this.position.y+a.paddingBottom+"px",c.top=""),this.css(c),this.emitEvent("layout",[this])};var p=l?function(a,b){return"translate3d("+a+"px, "+b+"px, 0)"}:function(a,b){return"translate("+a+"px, "+b+"px)"};h.prototype._transitionTo=function(a,b){this.getPosition();var c=this.position.x,d=this.position.y,e=parseInt(a,10),f=parseInt(b,10),g=e===this.position.x&&f===this.position.y;if(this.setPosition(a,b),g&&!this.isTransitioning)return void this.layoutPosition();var h=a-c,i=b-d,j={},k=this.layout.options;h=k.isOriginLeft?h:-h,i=k.isOriginTop?i:-i,j.transform=p(h,i),this.transition({to:j,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},h.prototype.goTo=function(a,b){this.setPosition(a,b),this.layoutPosition()},h.prototype.moveTo=k?h.prototype._transitionTo:h.prototype.goTo,h.prototype.setPosition=function(a,b){this.position.x=parseInt(a,10),this.position.y=parseInt(b,10)},h.prototype._nonTransition=function(a){this.css(a.to),a.isCleaning&&this._removeStyles(a.to);for(var b in a.onTransitionEnd)a.onTransitionEnd[b].call(this)},h.prototype._transition=function(a){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(a);var b=this._transn;for(var c in a.onTransitionEnd)b.onEnd[c]=a.onTransitionEnd[c];for(c in a.to)b.ingProperties[c]=!0,a.isCleaning&&(b.clean[c]=!0);if(a.from){this.css(a.from);var d=this.element.offsetHeight;d=null}this.enableTransition(a.to),this.css(a.to),this.isTransitioning=!0};var q=j&&d(j)+",opacity";h.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:q,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(m,this,!1))},h.prototype.transition=h.prototype[i?"_transition":"_nonTransition"],h.prototype.onwebkitTransitionEnd=function(a){this.ontransitionend(a)},h.prototype.onotransitionend=function(a){this.ontransitionend(a)};var r={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};h.prototype.ontransitionend=function(a){if(a.target===this.element){var b=this._transn,d=r[a.propertyName]||a.propertyName;if(delete b.ingProperties[d],c(b.ingProperties)&&this.disableTransition(),d in b.clean&&(this.element.style[a.propertyName]="",delete b.clean[d]),d in b.onEnd){var e=b.onEnd[d];e.call(this),delete b.onEnd[d]}this.emitEvent("transitionEnd",[this])}},h.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(m,this,!1),this.isTransitioning=!1},h.prototype._removeStyles=function(a){var b={};for(var c in a)b[c]="";this.css(b)};var s={transitionProperty:"",transitionDuration:""};return h.prototype.removeTransitionStyles=function(){this.css(s)},h.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.emitEvent("remove",[this])},h.prototype.remove=function(){if(!i||!parseFloat(this.layout.options.transitionDuration))return void this.removeElem();var a=this;this.on("transitionEnd",function(){return a.removeElem(),!0}),this.hide()},h.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var a=this.layout.options;this.transition({from:a.hiddenStyle,to:a.visibleStyle,isCleaning:!0})},h.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var a=this.layout.options;this.transition({from:a.visibleStyle,to:a.hiddenStyle,isCleaning:!0,onTransitionEnd:{opacity:function(){this.isHidden&&this.css({display:"none"})}}})},h.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},h}var f=a.getComputedStyle,g=f?function(a){return f(a,null)}:function(a){return a.currentStyle};"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property"],e):(a.Outlayer={},a.Outlayer.Item=e(a.EventEmitter,a.getSize,a.getStyleProperty))}(window),function(a){function b(a,b){for(var c in b)a[c]=b[c];return a}function c(a){return"[object Array]"===l.call(a)}function d(a){var b=[];if(c(a))b=a;else if(a&&"number"==typeof a.length)for(var d=0,e=a.length;e>d;d++)b.push(a[d]);else b.push(a);return b}function e(a,b){var c=n(b,a);-1!==c&&b.splice(c,1)}function f(a){return a.replace(/(.)([A-Z])/g,function(a,b,c){return b+"-"+c}).toLowerCase()}function g(c,g,l,n,o,p){function q(a,c){if("string"==typeof a&&(a=h.querySelector(a)),!a||!m(a))return void(i&&i.error("Bad "+this.constructor.namespace+" element: "+a));this.element=a,this.options=b({},this.constructor.defaults),this.option(c);var d=++r;this.element.outlayerGUID=d,s[d]=this,this._create(),this.options.isInitLayout&&this.layout()}var r=0,s={};return q.namespace="outlayer",q.Item=p,q.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},b(q.prototype,l.prototype),q.prototype.option=function(a){b(this.options,a)},q.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),b(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},q.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},q.prototype._itemize=function(a){for(var b=this._filterFindItemElements(a),c=this.constructor.Item,d=[],e=0,f=b.length;f>e;e++){var g=b[e],h=new c(g,this);d.push(h)}return d},q.prototype._filterFindItemElements=function(a){a=d(a);for(var b=this.options.itemSelector,c=[],e=0,f=a.length;f>e;e++){var g=a[e];if(m(g))if(b){o(g,b)&&c.push(g);for(var h=g.querySelectorAll(b),i=0,j=h.length;j>i;i++)c.push(h[i])}else c.push(g)}return c},q.prototype.getItemElements=function(){for(var a=[],b=0,c=this.items.length;c>b;b++)a.push(this.items[b].element);return a},q.prototype.layout=function(){this._resetLayout(),this._manageStamps();var a=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,a),this._isLayoutInited=!0},q.prototype._init=q.prototype.layout,q.prototype._resetLayout=function(){this.getSize()},q.prototype.getSize=function(){this.size=n(this.element)},q.prototype._getMeasurement=function(a,b){var c,d=this.options[a];d?("string"==typeof d?c=this.element.querySelector(d):m(d)&&(c=d),this[a]=c?n(c)[b]:d):this[a]=0},q.prototype.layoutItems=function(a,b){a=this._getItemsForLayout(a),this._layoutItems(a,b),this._postLayout()},q.prototype._getItemsForLayout=function(a){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c];e.isIgnored||b.push(e)}return b},q.prototype._layoutItems=function(a,b){function c(){d.emitEvent("layoutComplete",[d,a])}var d=this;if(!a||!a.length)return void c();this._itemsOn(a,"layout",c);for(var e=[],f=0,g=a.length;g>f;f++){var h=a[f],i=this._getItemLayoutPosition(h);i.item=h,i.isInstant=b||h.isLayoutInstant,e.push(i)}this._processLayoutQueue(e)},q.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},q.prototype._processLayoutQueue=function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b];this._positionItem(d.item,d.x,d.y,d.isInstant)}},q.prototype._positionItem=function(a,b,c,d){d?a.goTo(b,c):a.moveTo(b,c)},q.prototype._postLayout=function(){this.resizeContainer()},q.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var a=this._getContainerSize();a&&(this._setContainerMeasure(a.width,!0),this._setContainerMeasure(a.height,!1))}},q.prototype._getContainerSize=k,q.prototype._setContainerMeasure=function(a,b){if(void 0!==a){var c=this.size;c.isBorderBox&&(a+=b?c.paddingLeft+c.paddingRight+c.borderLeftWidth+c.borderRightWidth:c.paddingBottom+c.paddingTop+c.borderTopWidth+c.borderBottomWidth),a=Math.max(a,0),this.element.style[b?"width":"height"]=a+"px"}},q.prototype._itemsOn=function(a,b,c){function d(){return e++,e===f&&c.call(g),!0}for(var e=0,f=a.length,g=this,h=0,i=a.length;i>h;h++){var j=a[h];j.on(b,d)}},q.prototype.ignore=function(a){var b=this.getItem(a);b&&(b.isIgnored=!0)},q.prototype.unignore=function(a){var b=this.getItem(a);b&&delete b.isIgnored},q.prototype.stamp=function(a){if(a=this._find(a)){this.stamps=this.stamps.concat(a);for(var b=0,c=a.length;c>b;b++){var d=a[b];this.ignore(d)}}},q.prototype.unstamp=function(a){if(a=this._find(a))for(var b=0,c=a.length;c>b;b++){var d=a[b];e(d,this.stamps),this.unignore(d)}},q.prototype._find=function(a){return a?("string"==typeof a&&(a=this.element.querySelectorAll(a)),a=d(a)):void 0},q.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var a=0,b=this.stamps.length;b>a;a++){var c=this.stamps[a];this._manageStamp(c)}}},q.prototype._getBoundingRect=function(){var a=this.element.getBoundingClientRect(),b=this.size;this._boundingRect={left:a.left+b.paddingLeft+b.borderLeftWidth,top:a.top+b.paddingTop+b.borderTopWidth,right:a.right-(b.paddingRight+b.borderRightWidth),bottom:a.bottom-(b.paddingBottom+b.borderBottomWidth)}},q.prototype._manageStamp=k,q.prototype._getElementOffset=function(a){var b=a.getBoundingClientRect(),c=this._boundingRect,d=n(a),e={left:b.left-c.left-d.marginLeft,top:b.top-c.top-d.marginTop,right:c.right-b.right-d.marginRight,bottom:c.bottom-b.bottom-d.marginBottom};return e},q.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},q.prototype.bindResize=function(){this.isResizeBound||(c.bind(a,"resize",this),this.isResizeBound=!0)},q.prototype.unbindResize=function(){this.isResizeBound&&c.unbind(a,"resize",this),this.isResizeBound=!1},q.prototype.onresize=function(){function a(){b.resize(),delete b.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var b=this;this.resizeTimeout=setTimeout(a,100)},q.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},q.prototype.needsResizeLayout=function(){var a=n(this.element),b=this.size&&a;return b&&a.innerWidth!==this.size.innerWidth},q.prototype.addItems=function(a){var b=this._itemize(a);return b.length&&(this.items=this.items.concat(b)),b},q.prototype.appended=function(a){var b=this.addItems(a);b.length&&(this.layoutItems(b,!0),this.reveal(b))},q.prototype.prepended=function(a){var b=this._itemize(a);if(b.length){var c=this.items.slice(0);this.items=b.concat(c),this._resetLayout(),this._manageStamps(),this.layoutItems(b,!0),this.reveal(b),this.layoutItems(c)}},q.prototype.reveal=function(a){var b=a&&a.length;if(b)for(var c=0;b>c;c++){var d=a[c];d.reveal()}},q.prototype.hide=function(a){var b=a&&a.length;if(b)for(var c=0;b>c;c++){var d=a[c];d.hide()}},q.prototype.getItem=function(a){for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];if(d.element===a)return d}},q.prototype.getItems=function(a){if(a&&a.length){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c],f=this.getItem(e);f&&b.push(f)}return b}},q.prototype.remove=function(a){a=d(a);var b=this.getItems(a);if(b&&b.length){this._itemsOn(b,"remove",function(){this.emitEvent("removeComplete",[this,b])});for(var c=0,f=b.length;f>c;c++){var g=b[c];g.remove(),e(g,this.items)}}},q.prototype.destroy=function(){var a=this.element.style;a.height="",a.position="",a.width="";for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];d.destroy()}this.unbindResize(),delete this.element.outlayerGUID,j&&j.removeData(this.element,this.constructor.namespace)},q.data=function(a){var b=a&&a.outlayerGUID;return b&&s[b]},q.create=function(a,c){function d(){q.apply(this,arguments)}return Object.create?d.prototype=Object.create(q.prototype):b(d.prototype,q.prototype),d.prototype.constructor=d,d.defaults=b({},q.defaults),b(d.defaults,c),d.prototype.settings={},d.namespace=a,d.data=q.data,d.Item=function(){p.apply(this,arguments)},d.Item.prototype=new p,g(function(){for(var b=f(a),c=h.querySelectorAll(".js-"+b),e="data-"+b+"-options",g=0,k=c.length;k>g;g++){var l,m=c[g],n=m.getAttribute(e);try{l=n&&JSON.parse(n)}catch(o){i&&i.error("Error parsing "+e+" on "+m.nodeName.toLowerCase()+(m.id?"#"+m.id:"")+": "+o);continue}var p=new d(m,l);j&&j.data(m,a,p)}}),j&&j.bridget&&j.bridget(a,d),d},q.Item=p,q}var h=a.document,i=a.console,j=a.jQuery,k=function(){},l=Object.prototype.toString,m="object"==typeof HTMLElement?function(a){return a instanceof HTMLElement}:function(a){return a&&"object"==typeof a&&1===a.nodeType&&"string"==typeof a.nodeName},n=Array.prototype.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1};"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","doc-ready/doc-ready","eventEmitter/EventEmitter","get-size/get-size","matches-selector/matches-selector","./item"],g):a.Outlayer=g(a.eventie,a.docReady,a.EventEmitter,a.getSize,a.matchesSelector,a.Outlayer.Item)}(window),function(a){function b(a,b){var d=a.create("masonry");return d.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var a=this.cols;for(this.colYs=[];a--;)this.colYs.push(0);this.maxY=0},d.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var a=this.items[0],c=a&&a.element;this.columnWidth=c&&b(c).outerWidth||this.containerWidth}this.columnWidth+=this.gutter,this.cols=Math.floor((this.containerWidth+this.gutter)/this.columnWidth),this.cols=Math.max(this.cols,1)},d.prototype.getContainerWidth=function(){var a=this.options.isFitWidth?this.element.parentNode:this.element,c=b(a);this.containerWidth=c&&c.innerWidth},d.prototype._getItemLayoutPosition=function(a){a.getSize();var b=a.size.outerWidth%this.columnWidth,d=b&&1>b?"round":"ceil",e=Math[d](a.size.outerWidth/this.columnWidth);e=Math.min(e,this.cols);for(var f=this._getColGroup(e),g=Math.min.apply(Math,f),h=c(f,g),i={x:this.columnWidth*h,y:g},j=g+a.size.outerHeight,k=this.cols+1-f.length,l=0;k>l;l++)this.colYs[h+l]=j;return i},d.prototype._getColGroup=function(a){if(2>a)return this.colYs;for(var b=[],c=this.cols+1-a,d=0;c>d;d++){var e=this.colYs.slice(d,d+a);b[d]=Math.max.apply(Math,e)}return b},d.prototype._manageStamp=function(a){var c=b(a),d=this._getElementOffset(a),e=this.options.isOriginLeft?d.left:d.right,f=e+c.outerWidth,g=Math.floor(e/this.columnWidth);g=Math.max(0,g);var h=Math.floor(f/this.columnWidth);h-=f%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var i=(this.options.isOriginTop?d.top:d.bottom)+c.outerHeight,j=g;h>=j;j++)this.colYs[j]=Math.max(i,this.colYs[j])},d.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var a={height:this.maxY};return this.options.isFitWidth&&(a.width=this._getContainerFitWidth()),a},d.prototype._getContainerFitWidth=function(){for(var a=0,b=this.cols;--b&&0===this.colYs[b];)a++;return(this.cols-a)*this.columnWidth-this.gutter},d.prototype.needsResizeLayout=function(){var a=this.containerWidth;return this.getContainerWidth(),a!==this.containerWidth},d}var c=Array.prototype.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0,d=a.length;d>c;c++){var e=a[c];if(e===b)return c}return-1};"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],b):a.Masonry=b(a.Outlayer,a.getSize)}(window);

/*********************************************************************
*  #### Twitter Post Fetcher v14.0 ####
*  Coded by Jason Mayes 2015. A present to all the developers out there.
*  www.jasonmayes.com
*  Please keep this disclaimer with my code if you use it. Thanks. :-)
*  Got feedback or questions, ask here:
*  http://www.jasonmayes.com/projects/twitterApi/
*  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
*  Updates will be posted to this site.
*********************************************************************/

(function(B,n){"function"===typeof define&&define.amd?define([],n):"object"===typeof exports?module.exports=n():n()})(this,function(){function B(a){if(null===r){for(var g=a.length,c=0,k=document.getElementById(C),f="<ul>";c<g;)f+="<li>"+a[c]+"</li>",c++;k.innerHTML=f+"</ul>"}else r(a)}function n(a){return a.replace(/<b[^>]*>(.*?)<\/b>/gi,function(a,c){return c}).replace(/class=".*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,"")}function D(a){a=a.getElementsByTagName("a");for(var g=a.length-1;0<=
g;g--)a[g].setAttribute("target","_blank")}function l(a,g){for(var c=[],k=new RegExp("(^| )"+g+"( |$)"),f=a.getElementsByTagName("*"),h=0,b=f.length;h<b;h++)k.test(f[h].className)&&c.push(f[h]);return c}function E(a){if(void 0!==a)return a=a.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0],decodeURIComponent(a).split('"')[1]}var C="",g=20,F=!0,w=[],y=!1,x=!0,t=!0,z=null,A=!0,G=!0,r=null,H=!0,I=!1,u=!0,J=!0,K=!1,m=null,L={fetch:function(a){void 0===a.maxTweets&&(a.maxTweets=20);void 0===a.enableLinks&&
(a.enableLinks=!0);void 0===a.showUser&&(a.showUser=!0);void 0===a.showTime&&(a.showTime=!0);void 0===a.dateFunction&&(a.dateFunction="default");void 0===a.showRetweet&&(a.showRetweet=!0);void 0===a.customCallback&&(a.customCallback=null);void 0===a.showInteraction&&(a.showInteraction=!0);void 0===a.showImages&&(a.showImages=!1);void 0===a.linksInNewWindow&&(a.linksInNewWindow=!0);void 0===a.showPermalinks&&(a.showPermalinks=!0);void 0===a.dataOnly&&(a.dataOnly=!1);if(y)w.push(a);else{y=!0;C=a.domId;
g=a.maxTweets;F=a.enableLinks;t=a.showUser;x=a.showTime;G=a.showRetweet;z=a.dateFunction;r=a.customCallback;H=a.showInteraction;I=a.showImages;u=a.linksInNewWindow;J=a.showPermalinks;K=a.dataOnly;var l=document.getElementsByTagName("head")[0];null!==m&&l.removeChild(m);m=document.createElement("script");m.type="text/javascript";m.src="https://cdn.syndication.twimg.com/widgets/timelines/"+a.id+"?&lang="+(a.lang||"en")+"&callback=twitterFetcher.callback&suppress_response_codes=true&rnd="+Math.random();
l.appendChild(m)}},callback:function(a){function m(a){var b=a.getElementsByTagName("img")[0];b.src=b.getAttribute("data-src-2x");return a}var c=document.createElement("div");c.innerHTML=a.body;"undefined"===typeof c.getElementsByClassName&&(A=!1);a=[];var k=[],f=[],h=[],b=[],p=[],q=[],e=0;if(A)for(c=c.getElementsByClassName("tweet");e<c.length;){0<c[e].getElementsByClassName("retweet-credit").length?b.push(!0):b.push(!1);if(!b[e]||b[e]&&G)a.push(c[e].getElementsByClassName("e-entry-title")[0]),p.push(c[e].getAttribute("data-tweet-id")),
k.push(m(c[e].getElementsByClassName("p-author")[0])),f.push(c[e].getElementsByClassName("dt-updated")[0]),q.push(c[e].getElementsByClassName("permalink")[0]),void 0!==c[e].getElementsByClassName("inline-media")[0]?h.push(c[e].getElementsByClassName("inline-media")[0]):h.push(void 0);e++}else for(c=l(c,"tweet");e<c.length;)a.push(l(c[e],"e-entry-title")[0]),p.push(c[e].getAttribute("data-tweet-id")),k.push(m(l(c[e],"p-author")[0])),f.push(l(c[e],"dt-updated")[0]),q.push(l(c[e],"permalink")[0]),void 0!==
l(c[e],"inline-media")[0]?h.push(l(c[e],"inline-media")[0]):h.push(void 0),0<l(c[e],"retweet-credit").length?b.push(!0):b.push(!1),e++;a.length>g&&(a.splice(g,a.length-g),k.splice(g,k.length-g),f.splice(g,f.length-g),b.splice(g,b.length-g),h.splice(g,h.length-g),q.splice(g,q.length-g));var c=[],e=a.length,d=0;if(K)for(;d<e;)c.push({tweet:a[d].innerHTML,author:k[d].innerHTML,time:f[d].innerText,image:E(h[d]),rt:b[d],tid:p[d],permalinkURL:q[d].href}),d++;else for(;d<e;){if("string"!==typeof z){var b=
f[d].getAttribute("datetime"),v=new Date(f[d].getAttribute("datetime").replace(/-/g,"/").replace("T"," ").split("+")[0]),b=z(v,b);f[d].setAttribute("aria-label",b);if(a[d].innerText)if(A)f[d].innerText=b;else{var v=document.createElement("p"),r=document.createTextNode(b);v.appendChild(r);v.setAttribute("aria-label",b);f[d]=v}else f[d].textContent=b}b="";F?(u&&(D(a[d]),t&&D(k[d])),t&&(b+='<div class="user">'+n(k[d].innerHTML)+"</div>"),b+='<p class="tweet">'+n(a[d].innerHTML)+"</p>",x&&(b=J?b+('<p class="timePosted"><a href="'+
q[d]+'">'+f[d].getAttribute("aria-label")+"</a></p>"):b+('<p class="timePosted">'+f[d].getAttribute("aria-label")+"</p>"))):a[d].innerText?(t&&(b+='<p class="user">'+k[d].innerText+"</p>"),b+='<p class="tweet">'+a[d].innerText+"</p>",x&&(b+='<p class="timePosted">'+f[d].innerText+"</p>")):(t&&(b+='<p class="user">'+k[d].textContent+"</p>"),b+='<p class="tweet">'+a[d].textContent+"</p>",x&&(b+='<p class="timePosted">'+f[d].textContent+"</p>"));H&&(b+='<p class="interact"><a href="https://twitter.com/intent/tweet?in_reply_to='+
p[d]+'" class="twitter_reply_icon"'+(u?' target="_blank">':">")+'Reply</a><a href="https://twitter.com/intent/retweet?tweet_id='+p[d]+'" class="twitter_retweet_icon"'+(u?' target="_blank">':">")+'Retweet</a><a href="https://twitter.com/intent/favorite?tweet_id='+p[d]+'" class="twitter_fav_icon"'+(u?' target="_blank">':">")+"Favorite</a></p>");I&&void 0!==h[d]&&(b+='<div class="media"><img src="'+E(h[d])+'" alt="Image from tweet" /></div>');c.push(b);d++}B(c);y=!1;0<w.length&&(L.fetch(w[0]),w.splice(0,
1))}};return window.twitterFetcher=L});

// (c) Copyright 2014 Caroline Schnapp. All Rights Reserved. Contact: mllegeorgesand@gmail.com
// See http://docs.shopify.com/manual/configuration/store-customization/advanced-navigation/linked-product-options
// Edited by Connor Munro

var Shopify = Shopify || {};

Shopify.optionsMap = {};

Shopify.updateOptionsInSelector = function(selectorIndex, context, optionsMap) {

  switch (selectorIndex) {
    case 0:
      var key = 'root';
      var selector = jQuery("[data-product-id='" + context + "'] .single-option-selector:eq(0)");
      break;
    case 1:
      var key = jQuery("[data-product-id='" + context + "'] .single-option-selector:eq(0)").val();
      var selector = jQuery("[data-product-id='" + context + "'] .single-option-selector:eq(1)");
      break;
    case 2:
      var key = jQuery("[data-product-id='" + context + "'] .single-option-selector:eq(0)").val();
      key += ' / ' + jQuery("[data-product-id='" + context + "'] .single-option-selector:eq(1)").val();
      var selector = jQuery("[data-product-id='" + context + "'] .single-option-selector:eq(2)");
  }

  var initialValue = selector.val();
  var availableOptions = optionsMap[key];
  var options = selector.find("option");
  var optionsLength = options.length;

  options.prop("disabled", false);

  if (availableOptions) {
    for (var i = 0; i < availableOptions.length; i++) {
      var option = availableOptions[i];
      selector.find("option[value='" + option + "']").addClass("available");
    }
  }

  for (var i = 0; i < optionsLength; i++) {
    var option = options.eq(i);
    if (!option.hasClass("available")) {
      option.prop("disabled", true);
      if (option.is(":selected")) {
        option
          .prop("selected", false)
          .next().prop("selected", true)
      }
    }
  }

  options.removeClass("available");

  jQuery('.swatch[data-option-index="' + selectorIndex + '"] .swatch-element').each(function() {
    if (jQuery.inArray($(this).attr('data-value'), availableOptions) !== -1) {
      $(this).removeClass('soldout').show().find(':radio').removeAttr('disabled','disabled').removeAttr('checked');
    }
    else {
      $(this).addClass('soldout').hide().find(':radio').removeAttr('checked').attr('disabled','disabled');
    }
  });
  if (jQuery.inArray(initialValue, availableOptions) !== -1) {
    selector.val(initialValue);
  }
  selector.trigger('change');

};

Shopify.linkOptionSelectors = function(product, context) {

  Shopify.optionsMap[context] = {};
  // Building our mapping object.
  for (var i = 0; i < product.variants.length; i++) {
    var variant = product.variants[i];
    // Gathering values for the 1st drop-down.
    if (variant.available) {
      Shopify.optionsMap[context]['root'] = Shopify.optionsMap[context]['root'] || [];
      Shopify.optionsMap[context]['root'].push(variant.option1);
      Shopify.optionsMap[context]['root'] = Shopify.uniq(Shopify.optionsMap[context]['root']);
      // Gathering values for the 2nd drop-down.
      if (product.options.length > 1) {
        var key = variant.option1;
        Shopify.optionsMap[context][key] = Shopify.optionsMap[context][key] || [];
        Shopify.optionsMap[context][key].push(variant.option2);
        Shopify.optionsMap[context][key] = Shopify.uniq(Shopify.optionsMap[context][key]);
      }
      // Gathering values for the 3rd drop-down.
      if (product.options.length === 3) {
        var key = variant.option1 + ' / ' + variant.option2;
        Shopify.optionsMap[context][key] = Shopify.optionsMap[context][key] || [];
        Shopify.optionsMap[context][key].push(variant.option3);
        Shopify.optionsMap[context][key] = Shopify.uniq(Shopify.optionsMap[context][key]);
      }
    }
  }

  // Update options right away.
  Shopify.updateOptionsInSelector(0, context, Shopify.optionsMap[context]);
  if (product.options.length > 1) Shopify.updateOptionsInSelector(1, context, Shopify.optionsMap[context]);
  if (product.options.length === 3) Shopify.updateOptionsInSelector(2, context, Shopify.optionsMap[context]);
  // When there is an update in the first dropdown.
  jQuery("[data-product-id='" + context + "'] .single-option-selector:eq(0)").change(function() {
    if (product.options.length > 1) Shopify.updateOptionsInSelector(1, context, Shopify.optionsMap[context]);
    if (product.options.length === 3) Shopify.updateOptionsInSelector(2, context, Shopify.optionsMap[context]);
    return true;
  });
  // When there is an update in the second dropdown.
  jQuery("[data-product-id='" + context + "'] .single-option-selector:eq(1)").change(function() {
    if (product.options.length === 3) Shopify.updateOptionsInSelector(2, context, Shopify.optionsMap[context]);
    return true;
  });

};


alert = function() {};


/*<![CDATA[ */
var search_params = window.location.search;
var customer_id = 'ODouLjo0NDI1Pw==';
/* ]]> */


if(document !== null && document.body !== null){
	var paramsStr = '';
	if (search_params != null && search_params !== undefined && search_params != "undefined" && search_params != '' && search_params.indexOf("keyword") > -1) {
		search_params = search_params.replace("?", "");
		search_params = decodeURIComponent(escape(search_params));
		var img_tag = '<img height="1" width="1" style="display:none;border-style:none;" alt="" src="//clk.anticlickfraudsystem.com/Click?customer_id='+customer_id+'&'+search_params+'" />';
		var img = document.createElement("img");
		img.height = 1;
		img.width = 1;
		img.style = 'display:none;border-style:none;';
		img.src = '//clk.anticlickfraudsystem.com/Click?customer_id='+customer_id+'&'+search_params;

		document.body.appendChild(img);
	}
}

/************* start klaviyo Tracking Tag ************************/
var _learnq = _learnq || [];

_learnq.push(['account', 'AJGx3d']);

(function () {
var b = document.createElement('script'); b.type = 'text/javascript'; b.async = true;
b.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'a.klaviyo.com/media/js/analytics/analytics.js';
var a = document.getElementsByTagName('script')[0]; a.parentNode.insertBefore(b, a);
})();


/**************** Twitter universal website tag code *********************/
!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
// Insert Twitter Pixel ID and Standard Event data below
twq('init','nxbad');
twq('track','PageView');



/******************** taxi tag code *********************/
(function () {
var tagjs = document.createElement("script");
var s = document.getElementsByTagName("script")[0]; tagjs.async = true;
tagjs.src = "//s.btstatic.com/tag.js#site=1PR3l09"; s.parentNode.insertBefore(tagjs, s);
}());



/*********************** Linked tag code ************************/
_linkedin_data_partner_id = "161817";
(function(){var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})();
