/**
 * Created by fdm on 2017/2/4.
 */

var Utils = require('./utils');

/**
 * 初始化页面from
 */
var from = Utils.getQueryString('from');
if (from) {
    GodEye.AB.set('fr', from);
}

/***
 * 发出页面view信息的统计,主要用于PV/UV,包括屏幕和其他信息
 */

var viewEye = GodEye.getEye('view');
viewEye.set('rf', document && document.referrer || -1);
viewEye.set('sc', screen.availWidth + "*" + screen.availHeight + "*" + window.devicePixelRatio);
viewEye.log();

/**
 * 页面性能统计,onload之后触发
 */
Utils.addEvent(window, 'load', function () {
    //todo 如果一直没有onload,计时触发?
    var speedEye = GodEye.getEye('speed', window.__start_time);
    speedEye.add('ready', window.__ready_time);
    speedEye.add('load', new Date().getTime());
    speedEye.log();
});

/**
 * 如果页面内有 __page_id 的配置,直接初始化
 */
if (window.__page_id) {
    GodEye.init({
        pageId: window.__page_id
    })
}