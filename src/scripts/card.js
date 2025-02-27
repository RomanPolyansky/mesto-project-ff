import { openPopup } from './modal.js';

export function createCard(cardObject, cardTemplate, imagePopup,  handleCardLike, handleImageClick) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  cardImage.src = cardObject.link;
  cardImage.alt = cardObject.name;

  card.querySelector('.card__title').textContent = cardImage.alt;
  card.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(card));

  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => handleCardLike(likeButton));
  cardImage.addEventListener('click', () => handleImageClick(cardImage, imagePopup));
  return card;
}

export function handleCardLike(button) {
  button.classList.toggle('card__like-button_is-active');
}

export function handleImageClick(cardImage, imagePopup) {
  const imgElementOfPopup = imagePopup.querySelector('.popup__image');
  imgElementOfPopup.src = cardImage.src;
  imgElementOfPopup.alt = cardImage.alt;
  imagePopup.querySelector('.popup__caption').innerText = cardImage.alt;
  openPopup(imagePopup);
}

function deleteCard(card) {
  card.remove();
}