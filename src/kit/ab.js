/**
 * Created by fdm on 2017/2/4.
 */

var Utils = require('../utils');

function _flushAb(reset) {
    var qn621 = Utils.cookie('QN621');
    var obj = qn621 ? Utils.queryToParam(decodeURIComponent(qn621)) : {};

    obj = reset(obj);

    var str = Utils.collectParams(obj);
    Utils.cookie('QN621', str, {
        expires:365,
        domain: Utils.getDomain(document.domain)
    })
}

function _del(obj, key) {
    delete obj[key];
    return obj;
}

var AB = {
    set: function (key, value) {
        _flushAb(function (obj) {
            if (value || value === 0) {
                obj[key] = value;
            } else {
                obj = _del(obj, key);
            }
            return obj;
        })
    },
    del: function (key) {
        _flushAb(function (obj) {
            return _del(obj, key);
        })
    }
}

module.exports = AB;