export function makeSubject(startWith) {
  var subscribers = []

  function forEach(fnIdx, data) {
    if (subscribers) {
      var fns = subscribers.slice(0)

      subscribers.forEach(function(fnList) {
        if (typeof fnList[fnIdx] === "function") fnList[fnIdx](data)
      })
    }
  }

  return {
    subscribe: function(nextFn, errFn, completeFn) {
      if (subscribers) {
        var fnList = [nextFn, errFn, completeFn]
        subscribers.push(fnList)

        if (startWith !== undefined) {
          nextFn(startWith)
        }

        return function() {
          var idx = subscribers.indexOf(fnList)
          if (idx > -1) subscribers.splice(idx, 1)
        }
      }
    },

    next: function(data) {
      forEach(0, data)
    },

    error: function(error) {
      forEach(1, error)
      this.complete()
    },

    complete: function() {
      forEach(2)
      subscribers = undefined
    }
  }
}
