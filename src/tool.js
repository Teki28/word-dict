function dispatchEventStroage () {
  const signSetItem = localStorage.setItem
  localStorage.setItem = function (key, val) {
    let setEvent = new Event('setItemEvent')
    setEvent.key = key
    setEvent.newValue = val
    window.dispatchEvent(setEvent)
    signSetItem.apply(this, arguments)
  }
  const signRemoveItem = localStorage.removeItem
  localStorage.removeItem = function (key) {
    let removeEvent = new Event('removeItemEvent')
    removeEvent.key = key
    window.dispatchEvent(removeEvent)
    signRemoveItem.apply(this, arguments)
  }
}

export default dispatchEventStroage;
