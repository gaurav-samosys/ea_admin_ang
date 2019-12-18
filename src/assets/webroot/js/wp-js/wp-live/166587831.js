// if (typeof window.awf_Form_=='undefined') window.awf_Form_ = new Object();
// awf_Form_.isPreview = false;
// awf_Form_.setCookie = function(name, value, expires, path, domain, secure) {
//     var curCookie = name + "=" + escape(value) +
//         ((expires) ? "; expires=" + expires.toGMTString() : "") +
//         ((path) ? "; path=" + path : "") +
//         ((domain) ? "; domain=" + domain : "") +
//         ((secure) ? "; secure" : "");
//     document.cookie = curCookie;
// }

// awf_Form_.getCookie = function(name) {
//     var dc = document.cookie;
//     var prefix = name + "=";
//     var begin = dc.indexOf("; " + prefix);
//     if (begin == -1) {
//         begin = dc.indexOf(prefix);
//         if (begin != 0) return null;
//     } else
//         begin += 2;
//     var end = document.cookie.indexOf(";", begin);
//     if (end == -1)
//         end = dc.length;
//     return unescape(dc.substring(begin + prefix.length, end));
// }
// awf_Form_.showForm = function() {
//     /*@cc_on
//     /*@if (@_jscript_version > 5.5)
//            var isIE = true;
//       @else
//            var deprecatedBrowser = true;
//       @end @*/
//     if (typeof isIE == 'undefined') {
//         var isIE = false;
//     }
//     if (!isIE && !window.XMLHttpRequest) {
//         var deprecatedBrowser = true;
//     }

//     // Exit early for TY Landing Page option
//     if (document.location.href.indexOf('meta_web_form_id') > 0) return;

//     if (deprecatedBrowser) {
//        window.open('https://forms.aweber.com/form/31/166587831.html','winPopUp','resizable=1,scrollbars=1,location=0,width=303,height=614');
//        awf_Form_.setExpirationCookie();
//        return true;
//     }
//     if (typeof awf_Form_.scriptAppended=='undefined') {
//         try {
//             var script = document.createElement('script');
//             script.src = "https://forms.aweber.com/form/styled_popovers_and_lightboxes.js";
//             script.type = 'text/javascript';
//             document.getElementsByTagName('HEAD')[0].appendChild(script);
//         } catch(e) {
//             //IE5 for Mac and IE timeout issues
//             try {
//                 document.write('<script type="text/javascript" src="' + src + '"></scr'+'ipt>');
//             } catch(e) { }
//         }
//         awf_Form_.scriptAppended = true;
//     }
//     var loadForm = function() {
//         awf_Form_.form = new awf_Form_.AWFormGenerator( {"_log":null,"id":"166587831","form":"<form method=\"post\" class=\"af-form-wrapper\" accept-charset=\"UTF-8\" action=\"https:\/\/www.aweber.com\/scripts\/addlead.pl\"  >\n<div style=\"display: none;\">\n<input type=\"hidden\" name=\"meta_web_form_id\" value=\"166587831\" \/>\n<input type=\"hidden\" name=\"meta_split_id\" value=\"\" \/>\n<input type=\"hidden\" name=\"listname\" value=\"awlist3934558\" \/>\n<input type=\"hidden\" name=\"redirect\" value=\"http:\/\/www.aweber.com\/thankyou.htm?m=default\" id=\"redirect_1008bf2ca2a3860db03cdffc44ded0f3\" \/>\n\n<input type=\"hidden\" name=\"meta_adtracking\" value=\"E-Book\" \/>\n<input type=\"hidden\" name=\"meta_message\" value=\"1\" \/>\n<input type=\"hidden\" name=\"meta_required\" value=\"name,email\" \/>\n\n<input type=\"hidden\" name=\"meta_tooltip\" value=\"\" \/>\n<\/div>\n<div id=\"af-form-166587831\" class=\"af-form\"><div id=\"af-header-166587831\" class=\"af-header\"><div class=\"bodyText\"><p style=\"text-align: center;\"><span style=\"font-size: 24px; color: #ffffff;\"><strong><span style=\"text-decoration: underline; font-family: helvetica; font-size: 36px;\">Get Your Free E-Book<\/span><br style=\"color: #ffffff;\" \/><\/strong><\/span><\/p>\n<p style=\"text-align: center;\"><span style=\"font-size: 24px; color: #ffffff;\"><strong><br \/><\/strong><\/span><\/p>\n<p style=\"text-align: center;\"><span style=\"color: #ffffff;\"><span style=\"font-size: 24px;\"><strong>\"5 Money Myths To <em>Avoid<\/em> \"<\/strong><\/span><span style=\"font-size: 24px;\"><strong><br \/><\/strong><\/span><\/span><\/p><\/div><\/div>\n<div id=\"af-body-166587831\" class=\"af-body af-standards\">\n<div class=\"af-element\">\n<label class=\"previewLabel\" for=\"awf_field-77299993\">Name: <\/label>\n<div class=\"af-textWrap\">\n<input id=\"awf_field-77299993\" type=\"text\" name=\"name\" class=\"text\" value=\"\"  onfocus=\" if (this.value == '') { this.value = ''; }\" onblur=\"if (this.value == '') { this.value='';} \" tabindex=\"500\" \/>\n<\/div>\n<div class=\"af-clear\"><\/div><\/div>\n<div class=\"af-element\">\n<label class=\"previewLabel\" for=\"awf_field-77299994\">Email: <\/label>\n<div class=\"af-textWrap\"><input class=\"text\" id=\"awf_field-77299994\" type=\"text\" name=\"email\" value=\"\" tabindex=\"501\" onfocus=\" if (this.value == '') { this.value = ''; }\" onblur=\"if (this.value == '') { this.value='';} \" \/>\n<\/div><div class=\"af-clear\"><\/div>\n<\/div>\n<div class=\"af-element buttonContainer\">\n<input name=\"submit\" class=\"submit\" type=\"submit\" value=\"Submit\" tabindex=\"502\" \/>\n<div class=\"af-clear\"><\/div>\n<\/div>\n<\/div>\n<div id=\"af-footer-166587831\" class=\"af-footer\"><div class=\"bodyText\"><p style=\"text-align: center;\"><span style=\"color: #ffffff; font-size: 18px;\">Enter Your Details to Download Your E-book <br \/><\/span><\/p><\/div><\/div>\n<\/div>\n<\/form>\n<script type=\"text\/javascript\">\n\/\/ Special handling for facebook iOS since it cannot open new windows\n(function() {\n    if (navigator.userAgent.indexOf('FBIOS') !== -1 || navigator.userAgent.indexOf('Twitter for iPhone') !== -1) {\n        document.getElementById('af-form-166587831').parentElement.removeAttribute('target');\n    }\n})();\n<\/script>","styles":"#af-form-166587831 .af-body .af-textWrap{width:98%;display:block;float:none;}\n#af-form-166587831 .af-body a{color:#95CBDB;text-decoration:underline;font-style:normal;font-weight:normal;}\n#af-form-166587831 .af-body input.text, #af-form-166587831 .af-body textarea{background-color:#CCCCCC;border-color:#FFFFFF;border-width:1px;border-style:solid;color:#000000;text-decoration:none;font-style:normal;font-weight:normal;font-size:12px;font-family:Verdana, sans-serif;}\n#af-form-166587831 .af-body input.text:focus, #af-form-166587831 .af-body textarea:focus{background-color:#FFFFFF;border-color:#FFFFFF;border-width:1px;border-style:solid;}\n#af-form-166587831 .af-body label.previewLabel{display:block;float:none;text-align:left;width:auto;color:#FFFFFF;text-decoration:none;font-style:normal;font-weight:normal;font-size:14px;font-family:Helvetica, sans-serif;}\n#af-form-166587831 .af-body{padding-bottom:30px;padding-top:1px;background-repeat:repeat-y;background-position:inherit;background-image:url(\"https:\/\/forms.aweber.com\/images\/forms\/book-cover\/charcoal\/body.png\");color:#FFFFFF;font-size:12px;font-family:Helvetica, sans-serif;}\n#af-form-166587831 .af-footer{padding-bottom:100px;padding-top:5px;padding-right:25px;padding-left:55px;background-color:transparent;background-repeat:no-repeat;background-position:bottom left;background-image:url(\"https:\/\/forms.aweber.com\/images\/forms\/book-cover\/charcoal\/footer.png\");border-width:1px;border-bottom-style:none;border-left-style:none;border-right-style:none;border-top-style:none;color:#FFFFFF;font-size:12px;font-family:Helvetica, sans-serif;}\n#af-form-166587831 .af-header{padding-bottom:5px;padding-top:115px;padding-right:20px;padding-left:50px;background-color:transparent;background-repeat:no-repeat;background-position:top left;background-image:url(\"https:\/\/forms.aweber.com\/images\/forms\/book-cover\/charcoal\/header.png\");border-width:1px;border-bottom-style:none;border-left-style:none;border-right-style:none;border-top-style:none;color:#FFFFFF;font-size:18px;font-family:Helvetica, sans-serif;}\n#af-form-166587831 .af-quirksMode .bodyText{padding-top:2px;padding-bottom:2px;}\n#af-form-166587831 .af-quirksMode{padding-right:20px;padding-left:50px;}\n#af-form-166587831 .af-standards .af-element{padding-right:20px;padding-left:50px;}\n#af-form-166587831 .bodyText p{margin:1em 0;}\n#af-form-166587831 .buttonContainer input.submit{background-image:url(\"https:\/\/forms.aweber.com\/images\/auto\/gradient\/button\/9cd.png\");background-position:top left;background-repeat:repeat-x;background-color:#79acbd;border:1px solid #79acbd;color:#000000;text-decoration:none;font-style:normal;font-weight:normal;font-size:14px;font-family:Verdana, sans-serif;}\n#af-form-166587831 .buttonContainer input.submit{width:auto;}\n#af-form-166587831 .buttonContainer{text-align:left;}\n#af-form-166587831 body,#af-form-166587831 dl,#af-form-166587831 dt,#af-form-166587831 dd,#af-form-166587831 h1,#af-form-166587831 h2,#af-form-166587831 h3,#af-form-166587831 h4,#af-form-166587831 h5,#af-form-166587831 h6,#af-form-166587831 pre,#af-form-166587831 code,#af-form-166587831 fieldset,#af-form-166587831 legend,#af-form-166587831 blockquote,#af-form-166587831 th,#af-form-166587831 td{float:none;color:inherit;position:static;margin:0;padding:0;}\n#af-form-166587831 button,#af-form-166587831 input,#af-form-166587831 submit,#af-form-166587831 textarea,#af-form-166587831 select,#af-form-166587831 label,#af-form-166587831 optgroup,#af-form-166587831 option{float:none;position:static;margin:0;}\n#af-form-166587831 div{margin:0;}\n#af-form-166587831 fieldset{border:0;}\n#af-form-166587831 form,#af-form-166587831 textarea,.af-form-wrapper,.af-form-close-button,#af-form-166587831 img{float:none;color:inherit;position:static;background-color:none;border:none;margin:0;padding:0;}\n#af-form-166587831 input,#af-form-166587831 button,#af-form-166587831 textarea,#af-form-166587831 select{font-size:100%;}\n#af-form-166587831 p{color:inherit;}\n#af-form-166587831 select,#af-form-166587831 label,#af-form-166587831 optgroup,#af-form-166587831 option{padding:0;}\n#af-form-166587831 table{border-collapse:collapse;border-spacing:0;}\n#af-form-166587831 ul,#af-form-166587831 ol{list-style-image:none;list-style-position:outside;list-style-type:disc;padding-left:40px;}\n#af-form-166587831,#af-form-166587831 .quirksMode{width:100%;max-width:303px;}\n#af-form-166587831.af-quirksMode{overflow-x:hidden;}\n#af-form-166587831{background-color:transparent;border-color:transparent;border-width:1px;border-style:none;}\n#af-form-166587831{display:block;}\n.af-body .af-textWrap{text-align:left;}\n.af-body input.image{border:none!important;}\n.af-body input.submit,.af-body input.image,.af-form .af-element input.button{float:none!important;}\n.af-body input.text{width:100%;float:none;padding:2px!important;}\n.af-body.af-standards input.submit{padding:4px 12px;}\n.af-clear{clear:both;}\n.af-element label{text-align:left;display:block;float:left;}\n.af-element{padding-bottom:5px;padding-top:5px;}\n.af-form-wrapper{text-indent:0;}\n.af-form{text-align:left;margin:auto;}\n.af-header,.af-footer{margin-bottom:0;margin-top:0;padding:10px;}\n.af-quirksMode .af-element{padding-left:0!important;padding-right:0!important;}\n.lbl-right .af-element label{text-align:right;}\nbody {\n}","height":"614","width":"303","plPath":"forms.aweber.com","delay":"4","popupURL":"https:\/\/forms.aweber.com\/form\/31\/166587831.html","formType":"lightbox","animation":"slide from top","redirectId":"redirect_1008bf2ca2a3860db03cdffc44ded0f3","returnToPage":0} );
//     };
//     if (typeof awf_Form_.AWFormGenerator == 'undefined') {
//         var unique_track = new Image();
//         unique_track.src = "https://forms.aweber.com/form/displays.htm?id=jGxsrBzsHMyM";
//         if (typeof awf_Form_.FormQueue == 'undefined') { awf_Form_.FormQueue = []; }
//         awf_Form_.FormQueue.push(loadForm);
//     } else {
//         var unique_track = new Image();
//         unique_track.src = "https://forms.aweber.com/form/displays.htm?id=jGxsrBzsHMyM";
//         loadForm();
//     }
//     awf_Form_.setExpirationCookie();
// }

// awf_Form_.setExpirationCookie = function() {
//     awf_Form_.expDate = new Date();
//     awf_Form_.expDate.setTime(awf_Form_.expDate.getTime() + 315360000000);
//     awf_Form_.setCookie('awpopup_166587831', '1', awf_Form_.expDate, '/', document.domain, 0);
// }

// if ((awf_Form_.isPreview || !awf_Form_.getCookie('awpopup_166587831')) && typeof hide_awf_Form=='undefined') {
//     awf_Form_.showForm();
// }