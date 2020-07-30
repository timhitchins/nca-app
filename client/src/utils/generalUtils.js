export function calculateSectionScrollTo(sections, scrollTop) {
  const breaks = sections.map((section) => section.current.offsetTop);
  const sectionNos = breaks.map((sectionBreak, index) => {
    if (scrollTop >= sectionBreak) return index;
    return null;
  });
  return Math.max(...sectionNos);
}

export function calculatePanelScrollToHeight(panel, panelRef) {
  let scrollToHeight;
  switch (panel) {
    case "panel-1":
      scrollToHeight = 0;
      break;
    case "panel-2":
      const { offsetTop, offsetHeight } = panelRef.current.children[0];
      scrollToHeight = offsetTop + offsetHeight;
      break;
    default:
      scrollToHeight = 0;
      break;
  }
  return scrollToHeight;
}
