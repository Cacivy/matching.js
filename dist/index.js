(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
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
    const matching = (str = '', option) => {
        const { startChar = '', endChar = '', cb, isGreedy = false } = option;
        let strList = [];
        let tempStrArr = [];
        let status = Status.init;
        const push = (trigger = false) => {
            let str = tempStrArr.join('');
            if (!str) {
                return;
            }
            if (trigger && cb) {
                str = cb(str);
            }
            strList.push(str);
            tempStrArr = [];
        };
        for (let i = 0; i < str.length; i++) {
            const length = Status.init ? startChar.length : endChar.length;
            const val = str.slice(i, i + length);
            i += (length - 1);
            if (val === startChar && status === Status.init) {
                status = Status.start;
                push();
                continue;
            }
            if (val === endChar && status === Status.start) {
                if (isGreedy) {
                    push(true);
                    const [first, ...content] = strList;
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
    /*
    export const matchingByRegExp: Matching = (str = '', option) => {
      const { startChar = '', endChar = '', cb, isGreedy = false } = option
    
      const regexp = new RegExp(`${startChar}(\\S*${isGreedy ? '?' : ''})${endChar}`)
      return str.split(regexp).filter(x => !!x)
    }
    */
    exports.default = matching;
});
