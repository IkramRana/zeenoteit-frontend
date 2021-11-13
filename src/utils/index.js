//* disable developer inspect tool options
export const disabledInspect = (time) => {
  //   document.onkeydown = function (e) {
  //     if (e.keyCode === 123) {
  //       return false;
  //     }
  //     if (e.ctrlKey && e.shiftKey && e.keyCode === 'I'.charCodeAt(0)) {
  //       return false;
  //     }
  //     if (e.ctrlKey && e.shiftKey && e.keyCode === 'C'.charCodeAt(0)) {
  //       return false;
  //     }
  //     if (e.ctrlKey && e.shiftKey && e.keyCode === 'J'.charCodeAt(0)) {
  //       return false;
  //     }
  //     if (e.ctrlKey && e.shiftKey && e.keyCode === 'M'.charCodeAt(0)) {
  //       return false;
  //     }
  //     if (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) {
  //       return false;
  //     }
  //   }
}

// *Email Regex
export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// *Current Date
export const CurrentDate = () => {
  let date = new Date();
  let currentDate = date.getDate().toString().padStart(2, "0") + ' ' + date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear();

  return (
    <div>
      {currentDate}
    </div>
  )
}

// *Date Format
export const DateFormat = (string) => {
  const todayDate = new Date(string);
  const date = todayDate.getDate() + ' ' + todayDate.toLocaleString('en-us', { month: 'short' }) + ' ' + todayDate.getFullYear();
  return date;
}