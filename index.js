module.exports = function (list, opts) {
  var createElement = opts.createElement
  var states = opts.states
  var stateKey = opts.key || 'id'
  var each = opts.each

  var children = list.children
  var existing = {}

  // remove old
  for (var i = 0; i < children.length; i++) {
    var child = children[i]
    if (!child) break
    var key = child.state[stateKey]
    var exists = false
    for (var n = 0; n < states.length; n++) {
      if (states[n][stateKey] === key) {
        exists = true
        break
      }
    }
    if (exists) {
      existing[key] = child
    } else {
      list.removeChild(child)
      i--
    }
  }

  // add missing and sort
  states.forEach(function (state, i) {
    var key = state[stateKey]
    var existingChild = existing[key]
    if (!existingChild) {
      existingChild = new createElement(state, i)
    }
    existingChild.state = state
    var child = children[i]
    if (child !== existingChild) {
      list.insertBefore(existingChild, child)
    }
    if (each) {
      each(existingChild)
    }
  })
}
