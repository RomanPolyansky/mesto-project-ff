export function createCard({ cardObject, cardTemplate, imagePopup, userId }, functions) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.data = cardObject;

  const cardImage = card.querySelector('.card__image');
  const likeButton = card.querySelector('.card__like-button');
  const likeCounter = card.querySelector('.card__like-counter');
  const deleteButton = card.querySelector('.card__delete-button');

  cardImage.src = cardObject.link;
  cardImage.alt = cardObject.name;
  countLikes(likeCounter, cardObject.likes);

  setUserLike(userId, cardObject.likes, likeButton);

  card.querySelector('.card__title').textContent = cardImage.alt;

  setDeleteButtonVisibility(deleteButton, userId, cardObject.owner._id);
  deleteButton.addEventListener('click', () => functions.handleCardDelete(card, functions.cardDeleteRequest));

  likeButton.addEventListener('click', () => 
    functions.handleCardLike(
      likeButton, 
      likeCounter, 
      functions.cardLikeRequest,
      functions.cardDislikeRequest,
      card.data._id)
    );
  cardImage.addEventListener('click', () => functions.handleImageClick(cardImage, imagePopup));

  return card;
}

export function handleCardLike(button, likeCounter, cardLikeRequest, cardDislikeRequest, id) {
  let request = button.classList.contains('card__like-button_is-active') ? 
    cardDislikeRequest : cardLikeRequest;
  button.classList.toggle('card__like-button_is-active');
  request(id)
  .then((res) => {
    countLikes(likeCounter, res.likes);
  })
  .catch((err) => {
    console.log(err);
    button.classList.toggle('card__like-button_is-active'); // Revert the button state
  });
}

function countLikes(counterElement, likes) {
  counterElement.textContent = likes.length;
}

export const handleCardDelete = (card, cardDeleteRequest) => {
  cardDeleteRequest(card.data._id).then((res) => {
    card.remove();
  })
  .catch((err) => {
    console.log(err);
  });
}

export const setUserLike = (userId, likes, likeButton) => {
  if (likes.some((like) => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }
}

const setDeleteButtonVisibility = (button, userId, cardOwnerId) => {
  if (userId !== cardOwnerId) {
    button.style.display = 'none';
  }
}