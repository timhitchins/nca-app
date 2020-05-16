import { useEffect, useState } from "react";

export const useIsVisible = ({ element }) => {
  const container = document.querySelectorAll(".content-section");

  // section2 = container[2];

  const [visible, setVisible] = useState(false);
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== "undefined" ? null : null
    // section2.offset
  );

  useEffect(() => {
    if (element.current) {
      // setWindowHeight(window.innerHeight);
      setWindowHeight(element.current.offsetTop);
      isVisible(); // initial visible check
      window.addEventListener("scroll", debounce(isVisible, 200));
    }

    return () => window.removeEventListener("scroll", isVisible);
  }, [element]);

  // check element rect top
  const isVisible = () => {
    const top = element.current.getBoundingClientRect().top;

    // if (top >= 56 && top <= windowHeight) {
    if (top >= 1142 && top <= 2535) {
      //offsetTop
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  // debounce function execution
  function debounce(func, delay) {
    console.log(element);
    let timeout = null;
    return function () {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(function () {
        func();
      }, delay);
    };
  }

  return visible;
};
