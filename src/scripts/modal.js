export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', (evt) => handleKeyEscape(evt, popup))
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', (evt) => handleKeyEscape(evt, popup));
}

function handleKeyEscape(evt, popup) {
  if (evt.key === "Escape") {
    popup.classList.remove('popup_is-opened');
  }
}