# Installation
`npm install --save nano-subject` or `yarn add nano-subject`

# Usage
```js
const {makeSubject} = require('nano-subject')

const numberStream = makeSubject(0)

numberStream.subscribe(
  function(number) {
    console.log(number) // 0, 1, 5
  },
  function(error) {
    console.log(error) // message
  },
  function() {
    console.log('complete') // complete
  }
)

numberStream.next(1)
numberStream.next(5)
numberStream.error('message')
numberStream.next(7)
```
