//* disable developer inspect tool options
export const disabledInspect = (time) => {
  document.onkeydown = function (e) {
    if (e.keyCode === 123) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode === 'I'.charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode === 'C'.charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode === 'J'.charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode === 'M'.charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) {
      return false;
    }
  }
}

// *Email Regex
export const emailRegex = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[a-z]{2,3}$'