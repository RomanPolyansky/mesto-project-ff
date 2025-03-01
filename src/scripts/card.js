export function createCard({ cardObject, cardTemplate, imagePopup },  {handleCardLike, handleImageClick, handleCardDelete}) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  cardImage.src = cardObject.link;
  cardImage.alt = cardObject.name;

  card.querySelector('.card__title').textContent = cardImage.alt;
  card.querySelector('.card__delete-button').addEventListener('click', () => handleCardDelete(card));

  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => handleCardLike(likeButton));
  cardImage.addEventListener('click', () => handleImageClick(cardImage, imagePopup));
  return card;
}

export function handleCardLike(button) {
  button.classList.toggle('card__like-button_is-active');
}

export const handleCardDelete = (card) => {
  card.remove();
}