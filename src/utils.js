/**
 * Created by fdm on 2017/2/4.
 */

var Utils = { 
    getHashString: function (f) {
        var h = window.location.hash.toString();
        var g = new RegExp("" + f + "=([^&?]*)", "ig");
        return ((h.match(g)) ? decodeURIComponent((h.match(g)[0].substr(f.length + 1))) : "");
    },
    getQueryString: function (f) {
        var h = window.location.search.toString();
        var g = new RegExp("" + f + "=([^&?]*)", "ig");
        return ((h.match(g)) ? decodeURIComponent((h.match(g)[0].substr(f.length + 1))) : "");
    },
    collectParams: function (param) {
        //todo 0 null undefined 怎么处理?
        var arr = [];
        for (var key in param) {
            arr.push(key + '=' + encodeURIComponent(param[key]));
        }
        return arr.join('&');
    },
    queryToParam: function (query) {
        var obj = {}, arr,
            arr2 = query.split('&');
        for (var i = 0, len = arr2.length; i < len; i++) {
            arr = arr2[i].split('=');
            obj[arr[0]] = decodeURIComponent(arr[1]);
        }
        return obj;
    },
    addEvent: (function () {
        if (document.addEventListener) {
            return function (el, type, fn) {
                el.addEventListener(type, fn, false);
            };
        } else {
            return function (el, type, fn) {
                el.attachEvent('on' + type, function () {
                    return fn.call(el, window.event);
                })
            };
        }
    })(),
    getTime: function () {
        return new Date().getTime();
    },
    cookie: function (i, j, g) {
        if (arguments.length > 1 && String(j) !== "[object Object]") {
            g = g || {};
            if (j === null || j === undefined) {
                g.expires = -1;
            }
            if (typeof g.expires === "number") {
                var l = g.expires, h = g.expires = new Date();
                h.setDate(h.getDate() + l);
            }
            j = String(j);
            return (document.cookie = [encodeURIComponent(i), "=", g.raw ? j : encodeURIComponent(j), g.expires ? "; expires=" + g.expires.toUTCString() : "", g.path ? "; path=" + g.path : "; path=/", g.domain ? "; domain=" + g.domain : "", g.secure ? "; secure" : ""].join(""));
        }
        g = j || {};
        var f, k = g.raw ? function (m) {
            return m;
        } : decodeURIComponent;
        return (f = new RegExp("(?:^|; )" + encodeURIComponent(i) + "=([^;]*)").exec(document.cookie)) ? k(f[1]) : null;
    },
    getDomain: function (f) {
        return (f || "").replace(/^.+\.(.+?\..+)$/, "$1");
    }
}

module.exports = Utils;