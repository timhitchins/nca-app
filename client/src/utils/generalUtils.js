export function debounced(delay, fn) {
  let timerId;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
}

export function throttled(delay, fn) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
}

export function calculateSectionScrollTo(sections, scrollTop) {
  console.log(scrollTop);
  const breaks = sections.map((section) => section.current.offsetTop);

  const sectionNos = breaks.map((sectionBreak, index) => {
    if (scrollTop >= sectionBreak) return index;
    return null;
  });

  return Math.max(...sectionNos);
}

// function counter(initValue) {
//   let currentValue = initValue;

//   let increment = function (step) {
//     currentValue += step;

//   };

//   let decrement = function (step) {
//     currentValue -= step;;
//   };

//   return { increment, decrement };
// }
