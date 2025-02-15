const cardsList = getCardsList();
renderCards();

function createCardElement(card) {
  const cardTemplate = getCardTemplate();
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardElement.querySelector('.card__title').textContent = card.name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

  return cardElement;
}

function deleteCard(event) {
  event.target.closest('.card').remove();
}

function renderCards() {
  initialCards.forEach((card) => {
    const cardElement = createCardElement(card);
    cardsList.append(cardElement);
  });
}

function getCardTemplate() {
  return document.querySelector('#card-template').content;
}

function getCardsList() {
  return document.querySelector('.places__list');
}