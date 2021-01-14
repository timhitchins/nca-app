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
      const { offsetHeight } = panelRef.current.children[0];
      scrollToHeight = 56 + offsetHeight;
      break;
    default:
      scrollToHeight = 0;
      break;
  }
  return scrollToHeight;
}

/* function to create permit date.
choose thie ISSUED datae first and if null
use the create date*/
export function calculatePermitDate(issueDate, createDate) {
  let permitDate = {};
  if (Number(issueDate)) {
    const permitIssueDate = new Date(issueDate);
    permitDate.date = permitIssueDate.toLocaleDateString();
    permitDate.title = "Permit Issue Date:";
  } else if (Number(createDate)) {
    const permitCreateDate = new Date(createDate);
    permitDate.date = permitCreateDate.toLocaleDateString();
    permitDate.title = "Permit Create Date:";
  } else {
    permitDate = null;
  }
  return permitDate;
}
