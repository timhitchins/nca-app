export function calculateSectionScrollTo(sections, scrollTop) {
  const breaks = sections.map((section) => section.current.offsetTop);
  const sectionNos = breaks.map((sectionBreak, index) => {
    if (scrollTop >= sectionBreak) return index;
    return null;
  });
  return Math.max(...sectionNos);
}

// export function calculateHost(serverPort) {
//   const { protocol, hostname } = window.location;
//   return `${protocol}//${hostname}:${serverPort}`;
// }
