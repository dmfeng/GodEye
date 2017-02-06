/**
 * Created by fdm on 2017/1/24.
 */

var Utils = require('./utils');

var getCurrTime = (function () {
    var lastTime = 0;
    return function () {
        var time = Utils.getTime();
        if (time === lastTime) {
            time++;
        }
        lastTime = time;
        return lastTime;
    }
})();

//本次进入页面的时间  是否已经初始化
var pt = Utils.getTime(), initEd = false;

/**
 * merge 一些公共的数据和统计参数
 * @param trace
 * @returns {*}
 */
function wrapBaseInfo(logger) {
    logger.pt = pt;  //页面进入的时间
    logger.at = getCurrTime(); //事件发生的时间
    return logger;
}

function sendLogger(url, param) {
    param.pageId = pageId;
    var _url = url + '?' + Utils.collectParams(param);
    try {
        if (navigator.sendBeacon) {
            navigator.sendBeacon(_url);
        } else {
            (new Image()).src = _url;
        }
    } catch (e) {
        (new Image()).src = _url;
    }
}

var pushAllLog = (function () {
    var cacheList = [];
    return function (logger) {

        if (logger) {
            cacheList.push(wrapBaseInfo(logger));
        }
        if (initEd) {
            for (var i = 0, len = cacheList.length; i < len; i++) {
                sendLogger(url, cacheList[i]);
            }
            cacheList.length = 0;
        }
    }

})();


var pageId, url;
exports.init = function (info) {
    initEd = true;
    pageId = info.pageId;
    url = info.url || 'asdf';
    pushAllLog();
}


/**发送请求**/
exports.log = function (trace) {
    pushAllLog(trace);
}

exports.getTime = Utils.getTime;