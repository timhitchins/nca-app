export const TOGGLE_LOADING_INDICATOR = "TOGGLE_LOADING_INDICATOR";

export function toggleLoadingIndicator(isLoading) {
  return {
    type: TOGGLE_LOADING_INDICATOR,
    payload: isLoading,
  };
}
