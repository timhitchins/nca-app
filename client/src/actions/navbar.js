export const TOGGLE_NAV_DRAWER = "TOGGLE_NAV_DRAWER";

export function togglenavDrawerAction(isOpen) {
  return {
    type: TOGGLE_NAV_DRAWER,
    payload: {
      isOpen,
    },
  };
}
