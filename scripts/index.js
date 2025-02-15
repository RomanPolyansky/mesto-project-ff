const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');
renderCards();

function createCardElement(card, deleteCardFunction) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardElement.querySelector('.card__title').textContent = card.name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCardFunction(cardElement));

  return cardElement;
}

function deleteCard(card) {
  card.remove();
}

function renderCards() {
  initialCards.forEach((card) => {
    const cardElement = createCardElement(card, deleteCard);
    cardsList.append(cardElement);
  });
}