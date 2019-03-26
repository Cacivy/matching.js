import matching from '../src'

test('Basic matching width single Char', () => {
  const result = matching('aaa[bbb]ccc', {
    startChar: '[',
    endChar: ']',
  })
  expect(result).toEqual(['aaa', 'bbb', 'ccc'])
});

test('Option cb return text', () => {
  const result = matching('aaa[bbb]ccc', {
    startChar: '[',
    endChar: ']',
    cb: (str: string) => str.slice(0, 1)
  })
  expect(result).toEqual(['aaa', 'b', 'ccc'])
});

test('Option cb return object', () => {
  const result = matching('aaa[bbb]ccc', {
    startChar: '[',
    endChar: ']',
    cb: (str: string) => ({ str })
  })
  expect(result).toEqual(['aaa', { str: 'bbb' }, 'ccc'])
});

test('Multiple characters', () => {
  const result = matching('aaabbbcccddd', {
    startChar: 'bbb',
    endChar: 'ddd'
  })
  expect(result).toEqual(['aaa', 'ccc'])
});

test('Multiple content', () => {
  const result = matching('aaa*bbb*ccc*ddd*', {
    startChar: '*',
    endChar: '*'
  })
  expect(result).toEqual(['aaa', 'bbb', 'ccc', 'ddd'])
});

test('Multiple content & lazy', () => {
  const result = matching('aaa*bbb*ccc*ddd*eee', {
    startChar: '*',
    endChar: '*',
    isGreedy: true
  })
  expect(result).toEqual(['aaa', 'bbb*ccc*ddd', 'eee'])
});
