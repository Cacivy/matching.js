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

matching('it's a *highlight code*!', {
  startChar: '*',
  endChar: '*',
  cb: (str) => (<span class="hign-light">{str}</span>)
})
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