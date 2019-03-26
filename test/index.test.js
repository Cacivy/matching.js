"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = __importDefault(require("../src"));
test('Basic matching width single Char', function () {
    var result = src_1.default('aaa[bbb]ccc', {
        startChar: '[',
        endChar: ']',
    });
    expect(result).toEqual(['aaa', 'bbb', 'ccc']);
});
test('Option cb return text', function () {
    var result = src_1.default('aaa[bbb]ccc', {
        startChar: '[',
        endChar: ']',
        cb: function (str) { return str.slice(0, 1); }
    });
    expect(result).toEqual(['aaa', 'b', 'ccc']);
});
test('Option cb return object', function () {
    var result = src_1.default('aaa[bbb]ccc', {
        startChar: '[',
        endChar: ']',
        cb: function (str) { return ({ str: str }); }
    });
    expect(result).toEqual(['aaa', { str: 'bbb' }, 'ccc']);
});
test('Multiple characters', function () {
    var result = src_1.default('aaabbbcccddd', {
        startChar: 'bbb',
        endChar: 'ddd'
    });
    expect(result).toEqual(['aaa', 'ccc']);
});
test('Multiple content', function () {
    var result = src_1.default('aaa*bbb*ccc*ddd*', {
        startChar: '*',
        endChar: '*'
    });
    expect(result).toEqual(['aaa', 'bbb', 'ccc', 'ddd']);
});
test('Multiple content & lazy', function () {
    var result = src_1.default('aaa*bbb*ccc*ddd*eee', {
        startChar: '*',
        endChar: '*',
        isGreedy: true
    });
    expect(result).toEqual(['aaa', 'bbb*ccc*ddd', 'eee']);
});
//# sourceMappingURL=index.test.js.map