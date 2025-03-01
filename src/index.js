import './styles/index.css';
import * as modalComponent from './scripts/modal.js';
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

const populateFormByProfileInfo = (form, profileInfo) => {
  const name = profileInfo.querySelector('.profile__title').textContent;
  const description = profileInfo.querySelector('.profile__description').textContent;
  setFormFields(form, name, description);
}

const updateProfileInfo = (form, profileInfo) => {
  const name = form.elements.name.value;
  const description = form.elements.description.value;
  setProfileInfo(profileInfo, name, description);
}

const setFormFields = (form, name, description) => {
  form.elements.name.value = name;
  form.elements.description.value = description;
}

const setProfileInfo = (profileInfo, name, description) => {
  profileInfo.querySelector('.profile__title').textContent = name;
  profileInfo.querySelector('.profile__description').textContent = description;
}

const addNewCard = (cardObject) => {
  const newCard = cardComponent.createCard(
      { cardObject, cardTemplate, imagePopup }, 
      { 
        handleCardLike: cardComponent.handleCardLike, 
        handleImageClick: handleImageClick,
        handleCardDelete: cardComponent.handleCardDelete
      }
    )
  renderedCards.prepend(newCard);
}

// Buttons listeners
editProfileButton.addEventListener('click', (evt) => {
  modalComponent.openPopup(editProfilePopup);
  populateFormByProfileInfo(profileForm, profileInfo);
});

addCardButton.addEventListener('click', () => {
  addCardForm.reset();
  modalComponent.openPopup(addCardPopup);
});

// Modals common listeners
popups.forEach((popup) => modalComponent.setModalWindowEventListeners(popup));

profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  updateProfileInfo(profileForm, profileInfo);
  modalComponent.closePopup(editProfilePopup);
});

const handleImageClick = (cardImage, imagePopup) => {
  const imgElementOfPopup = imagePopup.querySelector('.popup__image');
  imgElementOfPopup.src = cardImage.src;
  imgElementOfPopup.alt = cardImage.alt;
  imagePopup.querySelector('.popup__caption').textContent = cardImage.alt;
  modalComponent.openPopup(imagePopup);
}

initialCards.forEach((cardObject) => {
  addNewCard(cardObject);
});

addCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = addCardForm.elements['place-name'].value;
  const link = addCardForm.elements.link.value;
  addNewCard({ name, link });
  addCardForm.reset();
  modalComponent.closePopup(addCardPopup);
});