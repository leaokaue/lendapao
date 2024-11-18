export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 2))
  //element.addEventListener('space',() => setCounter(0))
  setCounter(0)
}
