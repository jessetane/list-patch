var tape = require('tape')
var patch = require('../')

// not required, I just like experimenting with custom elements
require('custom-elements')

function XRow () {
  HTMLElement.call(this)
}
XRow.prototype = Object.create(HTMLElement.prototype)
XRow.prototype.attachedCallback = function () {
  this.innerHTML = this.state.id
}
document.defineElement('x-row', XRow)

function createRow (state, i) {
  return document.createElement('x-row')
}

var states = [
  { id: 'a' },
  { id: 'c' },
  { id: 'b' }
]

tape('add', function (t) {
  t.plan(1)

  patch(document.body, {
    createElement: createRow,
    states: states
  })

  t.equal(
    document.body.innerHTML,
    `<x-row>a</x-row>
<x-row>c</x-row>
<x-row>b</x-row>`.replace(/\n/g, '')
  )
})

tape('sort', function (t) {
  t.plan(1)

  states.splice(1, 0, states.pop())

  patch(document.body, {
    createElement: createRow,
    states: states
  })

  t.equal(
    document.body.innerHTML,
    `<x-row>a</x-row>
<x-row>b</x-row>
<x-row>c</x-row>`.replace(/\n/g, '')
  )
})

tape('remove', function (t) {
  t.plan(1)

  states.shift()

  patch(document.body, {
    createElement: createRow,
    states: states
  })

  t.equal(
    document.body.innerHTML,
    `<x-row>b</x-row>
<x-row>c</x-row>`.replace(/\n/g, '')
  )
})

tape('custom key and each callback', function (t) {
  t.plan(1)

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

  t.equal(
    document.body.innerHTML,
    `<x-row>a</x-row>
<x-row>b</x-row>
<x-row>c</x-row>`.replace(/\n/g, '')
  )
})
