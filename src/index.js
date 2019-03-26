"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * step: init => start => init...
 *
 * @enum {number}
 */
var Status;
(function (Status) {
    Status[Status["init"] = 0] = "init";
    Status[Status["start"] = 1] = "start";
})(Status = exports.Status || (exports.Status = {}));
var matching = function (str, option) {
    if (str === void 0) { str = ''; }
    var _a = option.startChar, startChar = _a === void 0 ? '' : _a, _b = option.endChar, endChar = _b === void 0 ? '' : _b, cb = option.cb, _c = option.isGreedy, isGreedy = _c === void 0 ? false : _c;
    var strList = [];
    var tempStrArr = [];
    var status = Status.init;
    var push = function (trigger) {
        if (trigger === void 0) { trigger = false; }
        var str = tempStrArr.join('');
        if (!str) {
            return;
        }
        if (trigger && cb) {
            str = cb(str);
        }
        strList.push(str);
        tempStrArr = [];
    };
    for (var i = 0; i < str.length; i++) {
        var length_1 = Status.init ? startChar.length : endChar.length;
        var val = str.slice(i, i + length_1);
        i += (length_1 - 1);
        if (val === startChar && status === Status.init) {
            status = Status.start;
            push();
            continue;
        }
        if (val === endChar && status === Status.start) {
            if (isGreedy) {
                push(true);
                var first = strList[0], content = strList.slice(1);
                strList = [first, content.join('')];
                tempStrArr.push(val);
            }
            else {
                push(true);
                status = Status.init;
            }
            continue;
        }
        tempStrArr.push(val);
    }
    if (isGreedy) {
        tempStrArr.splice(0, 1);
    }
    push();
    return strList;
};
exports.matchingByRegExp = function (str, option) {
    if (str === void 0) { str = ''; }
    var _a = option.startChar, startChar = _a === void 0 ? '' : _a, _b = option.endChar, endChar = _b === void 0 ? '' : _b, cb = option.cb, _c = option.isGreedy, isGreedy = _c === void 0 ? false : _c;
    var regexp = new RegExp(startChar + "(\\S*" + (isGreedy ? '?' : '') + ")" + endChar);
    return str.split(regexp).filter(function (x) { return !!x; });
};
exports.default = matching;
