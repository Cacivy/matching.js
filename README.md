## matching.js

[![codecov](https://codecov.io/gh/Cacivy/matching.js/branch/master/graph/badge.svg)](https://codecov.io/gh/Cacivy/matching.js)
[![npm version](https://badge.fury.io/js/matching.js.svg)](https://badge.fury.io/js/matching.js)

### Install

```node
npm install matching.js -S

or

yarn add matching.js
```

### Usage

```typescript
import matching from 'matching.js'

matching('interface *highlight code* end', {
  startChar: '*',
  endChar: '*',
  cb: (str) => (<span class="hign-light">{str}</span>)
})

// output
['interface', <span class="hign-light">highlight code</span>, ' end']
```

### Interface Type

```typescript
type Matching<T = any> = (str: string, option: Option<T>) => T[]

interface Option<T> {
  /**
   * start chartacter
   */
  startChar: string
  /**
   * end chartacter
   */
  endChar: string
  /**
   * matching map
   */
  cb?: (str: string) => T
  /**
   * greedy mode
   */
  isGreedy?: boolean
}
```

### Dev

```bash
npm start
```
