define([],function(){
	var tracker = (function () {
    var
    url_tracker = 'https://maidian.ypzdw.com/da/log/log?',
	param = {},
	formatParam = function (obj) {
	    var str = '';
	    for (var i in obj) {
	        str += i + "=" + encodeURIComponent(obj[i]) + "&";
	    }
	    str = str.substring(0, str.length - 1);
	    return str;
	},
    getTid = function () {
        var
        // Generate four random hex digits.
        S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        // Generate a pseudo-GUID by concatenating random hexadecimal.
        guid = function() {
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        };
        /**
		 * cookie获取和设置
		 * cookie.get(_name)
		 * cookie.set(_name,_value,_day,_domain)
		 */
        cookie = (function () {
            var
			domain = window.location.host,
			get = function (_name) {
			    var arr, reg = new RegExp("(^| )" + _name + "=([^;]*)(;|$)");
			    if (arr = document.cookie.match(reg))
			        return arr[2];
			    else
			        return "";
			},
			set = function (_name, _value, _day) {
			    var Days = _day || 1;
			    var exp = new Date();
			    exp.setUTCHours("0");
			    exp.setUTCMinutes("0");
			    exp.setUTCSeconds("0");
			    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
			    document.cookie = _name + "=" + _value + ";path=/;domain=" + domain + ";expires=" + exp.toGMTString();
			};
            return {
                get: get,
                set: set
            };
        }());
        var tid = cookie.get("tid");
        if (tid == "") {
            var uuid = guid();
            cookie.set("tid", uuid, 1);
            tid = uuid;
        }
        return tid;
    },
	getDefaultParam = function () {
	    param["tid"] = getTid();
	    param["pn"] = $("#trackPn").val();
	    param["mc"] = $("#trackMc").val();
	    param["pf"] = $("#trackPf").val();
	    param["u"] = $("#UserId").val();
	    param["url"] = window.location.href;
	    param["ref"] = document.referrer;
	    param["ci"] = window.navigator.userAgent;
	},
	loadInterface = function () {
	    var script = document.createElement("script");
	    script.type = "text/javascript";
	    script.src = url_tracker + formatParam(param);
	    document.getElementsByTagName("head")[0].appendChild(script);
	},
	onload = function () {
	    getDefaultParam();
	    param["et"] = "onload";
	    loadInterface();
	},
	/*
	tracker.trace("getcoupon",{
		"shopid" : 1,
		"coutepid" : 2
	});
	*/
	trace = function (en, pas) {
	    getDefaultParam();
	    param["et"] = "click";
	    param["en"] = en;
	    if (pas) {
	        param["pas"] = formatParam(pas);
	    }
	    loadInterface();
	},
    popup = function (en, pas) {
        getDefaultParam();
        param["et"] = "Popup";
        param["en"] = en;
        if (pas) {
            param["pas"] = formatParam(pas);
        }
        loadInterface();
    }
    onload();
    return { onload: onload, trace: trace, popup: popup }
}())
	return tracker;
})