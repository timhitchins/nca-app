export const TOGGLE_IMAGE_OPACITY = "TOGGLE_IMAGE_OPACITY";

export function toggleImageOpacityAction(isVisible) {
  return {
    type: TOGGLE_IMAGE_OPACITY,
    payload: {
      isVisible,
    },
  };
}
