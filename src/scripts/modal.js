const handleEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscape);
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscape);
}

export function handleClickOutsideOfContent(evt, popup) {
  if (evt.target.classList.contains('popup')) {
    closePopup(popup);
  }
}

export const setModalWindowEventListeners = (modalWindow) => {
  // Click close button to close popup
  modalWindow
    .querySelector('.popup__close')
    .addEventListener('click', () => closePopup(modalWindow));

  // Close popup when pressing outisde of the content
  modalWindow.addEventListener('mousedown', (evt) => handleClickOutsideOfContent(evt, modalWindow))
};