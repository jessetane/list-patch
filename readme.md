# list-patch
Patch a list of DOM elements.

## Why
You want to apply changes to a list of dom elements as lazily as possible.

## How
Remove old, add new, sort.

## Example
Add some elements:
``` javascript
import patch from 'list-patch'

var states = [
  { id: 'a' },
  { id: 'c' },
  { id: 'b' }
]

document.defineElement('x-row', class extends HTMLElement {
  attachedCallback () {
    this.innerHTML = this.state.id
  }
})

function createRow (state, i) {
  return document.createElement('x-row')
}

patch(document.body, {
  createElement: createRow,
  states: states
})

console.log(document.body.innerHTML)
// <x-row>a</x-row>
// <x-row>c</x-row>
// <x-row>b</x-row>
```

Reorder:
``` javascript
states.splice(1, 0, states.pop())

patch(document.body, {
  createElement: createRow,
  states: states
})

console.log(document.body.innerHTML)
// <x-row>a</x-row>
// <x-row>b</x-row>
// <x-row>c</x-row>
```

Remove:
``` javascript
states.shift()

patch(document.body, {
  createElement: createRow,
  states: states
})

console.log(document.body.innerHTML)
// <x-row>b</x-row>
// <x-row>c</x-row>
```

Custom key name, each callback:
``` javascript
var states = [
  { name: 'a' },
  { name: 'b' },
  { name: 'c' }
]

patch(document.body, {
  createElement: createRow,
  states: states,
  key: 'name',
  each: el => {
    el.innerHTML = el.state.name
  }
})

console.log(document.body.innerHTML)
// <x-row>b</x-row>
// <x-row>c</x-row>
```

## License
Public Domain
