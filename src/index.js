import './styles/index.css';
import * as modalComponent from './scripts/modal.js';
import * as profileComponent from './scripts/profile.js';
import * as cardComponent from './scripts/card.js';
import { initialCards } from './scripts/cards.js';

const renderedCards = document.querySelector('.places__list');

const imagePopup = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');

const editProfilePopup = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');

const profileForm = document.forms['edit-profile'];
const profileInfo = document.querySelector('.profile__info');

const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const addCardForm = document.forms['new-place'];
const cardTemplate = document.querySelector('#card-template').content;

// Buttons listeners
editProfileButton.addEventListener('click', (evt) => {
  modalComponent.openPopup(editProfilePopup);
  profileComponent.populateFormByProfileInfo(profileForm, profileInfo);
});
addCardButton.addEventListener('click', () => {
  addCardForm.reset();
  modalComponent.openPopup(addCardPopup);
});

// Modals common listeners
popups.forEach((popup) => {
  // Click X to close popup
  const xButton = popup.querySelector('.popup__close');
  xButton.addEventListener('click', modalComponent.closePopup(popup));

  // Close popup when pressing outisde of the content
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      modalComponent.closePopup(popup);
    } 
  });
});

profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileComponent.updateProfileInfo(profileForm, profileInfo);
  modalComponent.closePopup(editProfilePopup);
});

initialCards.forEach((cardObject) => {
  addNewCard(cardObject);
});

addCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = addCardForm.elements['place-name'].value;
  const link = addCardForm.elements.link.value;
  addNewCard({ name, link });
  addCardForm.reset();
  modalComponent.closePopup(addCardForm.closest('.popup'));
});

function addNewCard(cardObject) {
  const newCard = cardComponent.createCard(cardObject, 
    cardTemplate, 
    imagePopup, 
    cardComponent.handleCardLike, 
    cardComponent.handleImageClick
  );
  renderedCards.prepend(newCard);
}