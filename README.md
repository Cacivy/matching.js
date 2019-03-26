## matching.js

### Install

```node
npm install mathing.js -S

or

yarn add mathing.js
```

### Usage

```typescript
import matching from 'mathing.js'

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
type Mathing<T = any> = (str: string, option: Option<T>) => T[]

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