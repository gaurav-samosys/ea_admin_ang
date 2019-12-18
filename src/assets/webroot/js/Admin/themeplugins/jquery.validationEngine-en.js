(function($){
    $.fn.validationEngineLanguage = function(){
    };
    $.validationEngineLanguage = {
        newLang: function(){
            $.validationEngineLanguage.allRules = {
                "required": { // Add your regex rules here, you can take telephone as an example
                    "regex": "none",
                    "alertText": "* This field is required",
                    "alertTextCheckboxMultiple": "* Please select an option",
                    "alertTextCheckboxe": "* This checkbox is required",
                    "alertTextDateRange": "* Both date range fields are required"
                },
                "requiredInFunction": { 
                    "func": function(field, rules, i, options){
                        return (field.val() == "test") ? true : false;
                    },
                    "alertText": "* Field must equal test"
                },
                "dateRange": {
                    "regex": "none",
                    "alertText": "* Invalid ",
                    "alertText2": "Date Range"
                },
				"checkDuplicate": {
					"regex": "none",
					"alertText": "* Duplicate entry"
					},
                "dateTimeRange": {
                    "regex": "none",
                    "alertText": "* Invalid ",
                    "alertText2": "Date Time Range"
                },
                "minSize": {
                    "regex": "none",
                    "alertText": "* Minimum ",
                    "alertText2": " digits required"
                },
				
				"minSizePassing": {
                    "regex": "none",
                    "alertText": "* Maximum ",
                    "alertText2": " digits required"
                },
                "maxSize": {
                    "regex": "none",
                    "alertText": "* Maximum ",
                    "alertText2": " digits allowed"
                },
		"groupRequired": {
                    "regex": "none",
                    "alertText": "* You must fill one of the following fields",
                    "alertTextCheckboxMultiple": "* Please select an option",
                    "alertTextCheckboxe": "* This checkbox is required"
                },
                "min": {
                    "regex": "none",
                    "alertText": "* Minimum value is "
                },
                "max": {
                    "regex": "none",
                    "alertText": "* Maximum value is "
                },
                "past": {
                    "regex": "none",
                    "alertText": "* Date prior to "
                },
                "future": {
                    "regex": "none",
                    "alertText": "* Date past "
                },	
                "maxCheckbox": {
                    "regex": "none",
                    "alertText": "* Maximum ",
                    "alertText2": " options allowed"
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "* Please select ",
                    "alertText2": " options"
                },
                "equals": {
                    "regex": "none",
                    "alertText": "* Fields do not match"
                },
                "creditCard": {
                    "regex": "none",
                    "alertText": "* Invalid credit card number"
                },
                "phone": {
                    // credit: jquery.h5validate.js / orefalo
                    "regex":/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/,
					///^[2-9]\d{2}-\d{3}-\d{4}$/,
					///^([\(]{1}[0-9]{3}[\)]{1}[ |\-]{0,1}|^[0-9]{3}[\-| ])?[0-9]{3}(\-| ){1}[0-9]{4}$/, 
					///^([\+][0-9]{1,3}([ \.\-])?)?([\(][0-9]{1,6}[\)])?([0-9 \.\-]{1,32})(([A-Za-z \:]{1,11})?[0-9]{1,4}?)$/,
                    "alertText": "* Invalid phone number"
                },
				
				
				"filetype": {
                    // credit: jquery.h5validate.js / orefalo
                    "regex": /^.*\.(jpg|JPG|gif|GIF|png|docx|DOCX|doc|DOC|pdf|PDF|xls|xlsx)$/,
                    "alertText": "*Invalid file type allowed JPG|GIF|png|DOCX|DOC|PDF|xls|xlsx extention"
                },
				"newmobile": {
                    // credit: jquery.h5validate.js / orefalo
                    "regex": /^[1-9]{1}[0-9]{9}$/,
                    "alertText": "* Invalid phone number "
                },
                "email": {
                    // HTML5 compatible email regex ( http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#    e-mail-state-%28type=email%29 )
                    "regex":
				/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,	///^((([a-z]|\d|[!#\$%&'\*\+\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/,					///^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    "alertText": "* Invalid email address"
                },
                "fullname": {
                    "regex":/^([a-zA-Z]+[\'\,\.\-]?[a-zA-Z ]*)+[ ]([a-zA-Z]+[\'\,\.\-]?[a-zA-Z ]+)+$/,
                    "alertText":"* Must be first and last name"
                },
				"username": {
                    "regex":/^([a-zA-Z]+[\'\,\.\-]?[a-zA-Z ]*)$/,
                    "alertText":"* please enter valid username"
                },
                "zip": {
                    "regex":
					///^[1-9]{5}-[1-9]{4}|[1-9]{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/,
					/^([1-9]{5}-[1-9]{4}|[0-9]{5}|[0-9]{6}|[0-9]{9})$|^([a-zA-Z]\d[a-zA-Z]( )?\d[a-zA-Z]\d)$/,
					///(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$)/,
					///(^\d{5}$)|(^\d{5}-\d{4}$)/,
                    "alertText":"* Invalid zip format(e.g. 00000 | 000000 | 00000-0000 | T2P 3C7)"
                },
                "datenew": {
                    "regex":/^[0,1]?\d{1}\/(([0-2]?\d{1})|([3][0,1]{1}))\/(([1]{1}[9]{1}[9]{1}\d{1})|([2-9]{1}\d{3}))$/,
                    "alertText":"* Invalid date format allow MM/DD/YYYY"
                },
                "imagenew": {
                    "regex":/^.*\.(jpg|jpeg|gif|JPG|png|PNG)$/,
                    "alertText":"* Valid image format allowed jpg|gif|png"
                },
                "integer": {
                    "regex": /^[\-\+]?\d+$/,
                    "alertText": "* Not a valid integer"
                },
                "integer_new": {
                    "regex": /^[1-9]+[0-9]*$/,
                    "alertText": "* Not a valid integer"
                },
				"decimal": {
                    // Number, including positive, negative, and floating decimal.
                    "regex": /^\d+(?:\.\d\d?)?$/,
                    "alertText": "* Invalid floating decimal number"
                },
				"integer_new1": {
                    "regex": /^[1-9]+[0-9]*$/,
                    "alertText": "* Enter numbers only"
                },
				"integer_price": {
                    "regex": /^(([1-9][0-9]*)|((([0])|([1-9][0-9]*))\.[0-9]+)|((([1-9][0-9]*)|((([0])|([1-9][0-9]*))\.[0-9]+))\:)*(([1-9][0-9]*)|((([0])|([1-9][0-9]*))\.[0-9]+)))$/,
                    "alertText": "* Invalid Price"
                },
                "number": {
                    // Number, including positive, negative, and floating decimal. credit: orefalo
                    "regex": /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
                    "alertText": "* Invalid Price"
                },
                "date": {                    
                    //	Check if date is valid by leap year
			"func": function (field) {
					var pattern = new RegExp(/^(\d{4})[\/\-\.](0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])$/);
					var match = pattern.exec(field.val());
					if (match == null)
					   return false;
	
					var year = match[1];
					var month = match[2]*1;
					var day = match[3]*1;					
					var date = new Date(year, month - 1, day); // because months starts from 0.
	
					return (date.getFullYear() == year && date.getMonth() == (month - 1) && date.getDate() == day);
				},                		
			 "alertText": "* Invalid date, must be in YYYY-MM-DD format"
                },
                "ipv4": {
                    "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText": "* Invalid IP address"
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    "alertText": "* Invalid URL"
                },
                "onlyNumberSp": {
                    "regex": /^[0-9\ ]+$/,
                    "alertText": "* Numbers only"
                },
                "onlyLetterSp": {
                    "regex": /^[a-zA-Z\ \']+$/,
                    "alertText": "* Letters only"
                },
                "onlyLetterNumber": {
                    "regex": /^[0-9a-zA-Z | \ \']+$/,
                    "alertText": "* No special characters allowed"
                },
				"onlyLetterSp22": {
                    "regex": /^[a-zA-Z]+$/,
                    "alertText": "* Letters only without whitespace"
                },
				"uniqueUserEmail":{
				"url": "customers/../../uniqueUserEmail",
				"alertTextOk":"* Great! This Email id is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this Email id already been taken"				
				},
				"uniqueClientUserEmail":{
				"url": "customers/../uniqueUserEmail",
				"alertTextOk":"* Great! This Email id is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this Email id already been taken"				
				},
				"uniqueUserEmailadmin":{
				"url": "customers/../uniqueUserEmail",
				"alertTextOk":"* Great! This Email id is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this Email id already been taken"				
				},
                 "uniqueEmailUser":{
				"url": "registrations/../uniqueEmailRegistrationsUser",
				"alertTextOk":"* Great! This Email id is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this Email id already been taken"				
				},
                "uniqueUserEmailadminexists":{
				"url": "registrations/uniqueUserEmail",
				"alertTextOk":"* Great! This Email id is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this Email id already been taken"				
				},
				"uniqueCompanyEmail":{
				"url": "companies/../uniqueCompanyEmail",
				"alertTextOk":"* Great! This Email id is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this Email id already been taken"				
				}, 
                "uniqueCatname":{
                "url": "admins/../../uniqueCatname",
                "alertTextOk":"* Great! This Topic Name is available",    
                "alertTextLoad":"* Loading, please wait",
                "alertText":"* Sorry, this Topic Name already been taken"               
                }, 
				"uniqueVerticalName":{
				"url": "admins/../uniqueVerticalName",
				"alertTextOk":"* Great! This Vertical Name is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this Vertical Name already been taken"				
				},
                 "uiqueStudentCode":{
				"url": "admins/../uiqueStudentCodeIds",
				"alertTextOk":"* Great! This code is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this code already been taken"				
				},
				"uniqueVideoName":{
				"url": "admins/../../uniqueVideoName",
				"alertTextOk":"* Great! This Video Name is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this Video Name already been taken"				
				},
				"uniqueCustomer":{
				"url": "customers/../../uniqueCustomer",
				"alertTextOk":"* Great! This User Name is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this User Name already been taken"				
				},
				"uniqueCustomerReg":{
				"url": "registrations/uniqueCustomerReg",
				"alertTextOk":"* Great! This User Name is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this User Name already been taken"				
				},
                                "uiqueStudentCodeFrontend":{
				"url": "registrations/uiqueStudentCodeIdsFrontend",
				"alertTextOk":"* Great! This code is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this code is not a valid code"				
				},
				"uniqueClientCustomer":{
				"url": "customers/../uniqueCustomer",
				"alertTextOk":"* Great! This User Name is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this User Name already been taken"				
				},
				
				"uniqueCustomeradmin":{
				"url": "customers/../uniqueCustomer",
				"alertTextOk":"* Great! This User Name is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this User Name already been taken"				
				},
				"uniqueEmail":{
				"url": "admins/../uniqueEmail",
				"alertTextOk":"* Great! This Email id is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this Email id already been taken"				
				},
				"uniqueCompany":{
				"url": "companies/../uniqueCompany",
				"alertTextOk":"* Great! This Company Name is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this Company Name already been taken"				
				},
				"uniqueUsername":{
				"url": "admins/../uniqueUsername",
				"alertTextOk":"* Great! This User Name is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this User Name is already been taken"				
				},
				"uniqueClientname":{
				"url": "admins/../uniqueClientname",
				"alertTextOk":"* Great! This Client Name is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this Client Name is already been taken"				
				},
				"uniqueDomain":{
				"url": "admins/../uniqueDomain",
				"alertTextOk":"* Great! This Domain id is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this Domain id already been taken"				
				},
				"customeremail":{
				"url": "users/../uniqueEmail",
				"alertTextOk":"* Great! This Email id is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this Email id already been taken"				
				},
				"courseEmail":{
				"url": "courses/../courseEmail",
				"alertTextOk":"* Great! This Email id is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this Email id already been taken"				
				},
				"exitssponsorecategory":{
				"url": "sponsors/../exitssponsorecategory",
				"alertTextOk":"* Great! This Name is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this Name already been taken"				
				},
				"uniqueEmail":{
				"url": "uniqueEmail",
				"alertTextOk":"* Great! This Email id is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this Email id already been taken"				
				},
				"uniqueQuiz":{
				"url": "quizzes/../uniqueQuiz",
				"alertTextOk":"* Great! This Quiz Name is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Sorry, this Quiz Name already been taken"
				},
				"oldpasswordcheck":{
				"url": "../oldpasswordcheck",
				"alertTextOk":"* Your Old password has been matched",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* Your Old password does not match"				
				},
				"exitsname":{
				"url": "sites/../exitsname",
				"alertTextOk":"* Great! This Name  is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* * Sorry, this name already been taken"				
				}
				,
				"exitsentertainment":{
				"url": "entertainment/../exitsentertainment",
				"alertTextOk":"* Great! This Entertainment type  is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* * Sorry, this Entertainment type  already been taken"				
				}
				,
				"exitscategory":{
					"url": "category/../exitscategory",
				"alertTextOk":"* Great! This Topic  is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* * Sorry, this Topic  already been taken"				
				}
				,
				"exitssubcategory":{
				"url": "category/../exitssubcategory",
				"alertTextOk":"* Great! This Subcategory  is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* * Sorry, this Subcategory  already been taken"				
				}
				,
				"exitssubsubcategory":{
				"url": "category/../exitssubsubcategory",
				"alertTextOk":"* Great! This Subsubcategory  is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* * Sorry, This Subsubcategory  already been taken"				
				}
				,
				"existdiscussion":{
				"url": "discussions/../existdiscussion",
				"alertTextOk":"* Great! This Discussion name is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* * Sorry, This Discussion name already been taken"				
				}
				,
				"existcousre":{
				"url": "courses/../../existcousre",
				"alertTextOk":"* Great! This Course name is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* * Sorry, This Course name already been taken"				
				},
				
				"existsubscriptionplan":{
				"url": "prices/../existsubscriptionplan",
				"alertTextOk":"* Great! This Plan name is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* * Sorry, This Plan name already been taken"				
				},
				
				"existideabook":{
				"url": "ideabooks/../existideabook",
				"alertTextOk":"* Great! This Ideabook name is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* * Sorry, This Ideabook name already been taken"				
				},
				
				"existlookbook":{
				"url": "lookbooks/../existlookbook",
				"alertTextOk":"* Great! This Lookbook name is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* * Sorry, This Lookbook name already been taken"				
				},
				
				"existproduct":{
				"url": "products/../existproduct",
				"alertTextOk":"* Great! This Product name is available",    
				"alertTextLoad":"* Loading, please wait",
				"alertText":"* * Sorry, This Product name already been taken"				
				}
				,
                // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
                "ajaxUserCall": {
                    "url": "ajaxValidateFieldUser",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    "alertText": "* This user is already taken",
                    "alertTextLoad": "* Validating, please wait"
                },
				"ajaxUserCallPhp": {
                    "url": "phpajax/ajaxValidateFieldUser.php",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* This username is available",
                    "alertText": "* This user is already taken",
                    "alertTextLoad": "* Validating, please wait"
                },
                "ajaxNameCall": {
                    // remote json service location
                    "url": "ajaxValidateFieldName",
                    // error
                    "alertText": "* This name is already taken",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "* This name is available",
                    // speaks by itself
                    "alertTextLoad": "* Validating, please wait"
                },
				 "ajaxNameCallPhp": {
	                    // remote json service location
	                    "url": "phpajax/ajaxValidateFieldName.php",
	                    // error
	                    "alertText": "* This name is already taken",
	                    // speaks by itself
	                    "alertTextLoad": "* Validating, please wait"
	                },"checkFileType": {
                    "regex": "none",
                    "alertText": "* Wrong file Type."                    
                },"validateMIME":  {
					"func": function(field, rules, i, options){
				   //add to input tag: data-validation-engine="validate[required, custom[validateMIME[image/jpeg|image/png]]]"

					var fileInput = field[0].files[0];
					var MimeFilter = new RegExp(rules[3],'i');

					if (fileInput) {
						return MimeFilter.test(fileInput.type);
					} else { return true;}
				  },
				"alertText": "* Wrong Mime Type."

				},
                "validate2fields": {
                    "alertText": "* Please input HELLO"
                },
	            //tls warning:homegrown not fielded 
                "dateFormat":{
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
                    "alertText": "* Invalid Date"
                },
                //tls warning:homegrown not fielded 
				"dateTimeFormat": {
	                "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
                    "alertText": "* Invalid Date or Date Format",
                    "alertText2": "Expected Format: ",
                    "alertText3": "mm/dd/yyyy hh:mm:ss AM|PM or ", 
                    "alertText4": "yyyy-mm-dd hh:mm:ss AM|PM"
	            }
            };
            
        }
    };

    $.validationEngineLanguage.newLang();
    
})(jQuery);
