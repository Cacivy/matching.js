import mathing from '../src'

test('Basic mathing width single Char', () => {
  const result = mathing('aaa[bbb]ccc', {
    startChar: '[',
    endChar: ']',
  })
  expect(result).toEqual(['aaa', 'bbb', 'ccc'])
});

test('Option cb return text', () => {
  const result = mathing('aaa[bbb]ccc', {
    startChar: '[',
    endChar: ']',
    cb: (str: string) => str.slice(0, 1)
  })
  expect(result).toEqual(['aaa', 'b', 'ccc'])
});

test('Option cb return object', () => {
  const result = mathing('aaa[bbb]ccc', {
    startChar: '[',
    endChar: ']',
    cb: (str: string) => ({ str })
  })
  expect(result).toEqual(['aaa', { str: 'bbb' }, 'ccc'])
});

test('Multiple characters', () => {
  const result = mathing('aaabbbcccddd', {
    startChar: 'bbb',
    endChar: 'ddd'
  })
  expect(result).toEqual(['aaa', 'ccc'])
});
