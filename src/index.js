/**
 * Created by fdm on 2017/1/24.
 */

var GodEye = require('./godEye');

GodEye.getEye = require('./kit/getEye');
GodEye.AB = require('./kit/AB');

//挂载到全局
window.GodEye = GodEye;
//初始化过程中发出监控请求
require('./eyeDefaultInit');
