export const TOGGLE_MODAL = "TOGLE_MODAL";

export function toggleModal(modalIsOpen) {
  return {
    type: TOGGLE_MODAL,
    payload: { modalIsOpen },
  };
}
