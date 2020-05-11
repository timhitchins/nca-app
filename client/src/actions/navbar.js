export const TOGGLE_NAV_DRAWER = "TOGGLE_NAV_DRAWER";
export const TOGGLE_NAV_PAGE = "TOGGLE_NAV_PAGE";

export function togglenavDrawerAction(isOpen) {
  return {
    type: TOGGLE_NAV_DRAWER,
    payload: {
      isOpen,
    },
  };
}

export function toggleNavbarPageAction(page) {
  return {
    type: TOGGLE_NAV_PAGE,
    payload: {
      page,
    },
  };
}
