/**
 * Created by fdm on 2017/2/4.
 */

var Utils = require('../utils');
var GodEye = require('../godEye');

var _eyes = {};
function _createEye(type, time) {

    var Eye = {}, _log = {
        action: type,
        _bt: time || Utils.getTime() //基准时间 basetime
    };

    //增加一个时间间隔
    Eye.add = function (key, time) {
        _log[key] = ( time || Utils.getTime() ) - _log._bt;
    }
    //设置任意的值
    Eye.set = function (key, value) {
        _log[key] = value;
    }

    Eye.log = function () {
        GodEye.log(_log);
    }

    return Eye;
}

module.exports = function (type, time) {
    return _eyes[type] = _eyes[type] || _createEye(type, time);
};