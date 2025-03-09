import './styles/index.css';
import * as modalComponent from './scripts/modal.js';
import * as cardComponent from './scripts/card.js';
import * as validationComponent from './scripts/validation.js';
import * as apiComponent from './scripts/api.js';


const renderedCards = document.querySelector('.places__list');

const imagePopup = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');

const editProfilePopup = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');

const editProfileImageButton = document.querySelector('.profile__image');
const editProfileImagePopup = document.querySelector('.popup_type_edit-image');
const editProfileImageForm = document.forms['edit-profile-image'];

const profileForm = document.forms['edit-profile'];
const profileInfo = document.querySelector('.profile__info');
const profileImage = document.querySelector('.profile__image');

const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardButton = document.querySelector('.profile__add-button');
const addCardForm = document.forms['new-place'];
const cardTemplate = document.querySelector('#card-template').content;

validationComponent.enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

const populateFormByProfileInfo = (form, profileInfo) => {
  const name = profileInfo.querySelector('.profile__title').textContent;
  const description = profileInfo.querySelector('.profile__description').textContent;
  setFormFields(form, name, description);
}

const updateProfileInfo = (button, form, profileInfo) => {
  const buttonText = setIdling(button);
  const name = form.elements.name.value;
  const description = form.elements.description.value;
  apiComponent.editProfile(name, description)
  .then(res => {
    setProfileInfo(profileInfo, res.name, res.about);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    exitIdling(button, buttonText);
  }); 
}

const setFormFields = (form, name, description) => {
  form.elements.name.value = name;
  form.elements.description.value = description;
}

const setProfileImage = (avatarElement, avatarUrl) => {
  avatarElement.style = `background-image: url(${avatarUrl})`;
}

const setProfileInfo = (profileInfo, name, description) => {
  profileInfo.querySelector('.profile__title').textContent = name;
  profileInfo.querySelector('.profile__description').textContent = description;
}

const addNewCard = (cardObject, me) => {
  const newCard = cardComponent.createCard(
      { cardObject, cardTemplate, imagePopup, userId: me._id }, 
      { 
        handleCardLike: cardComponent.handleCardLike, 
        cardLikeRequest: apiComponent.likeCard,
        cardDislikeRequest: apiComponent.dislikeCard,
        handleImageClick: handleImageClick,
        handleCardDelete: cardComponent.handleCardDelete,
        cardDeleteRequest: apiComponent.deleteCard
      }
    )
  renderedCards.prepend(newCard);
}

// Buttons listeners
editProfileButton.addEventListener('click', (evt) => {
  modalComponent.openPopup(editProfilePopup);
  populateFormByProfileInfo(profileForm, profileInfo);
  validationComponent.clearValidation(profileForm, {
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'form__input-error'
  });
});

editProfileImageButton.addEventListener('click', (evt) => {
  modalComponent.openPopup(editProfileImagePopup);
  validationComponent.clearValidation(profileForm, {
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'form__input-error'
  });
});

addCardButton.addEventListener('click', () => {
  addCardForm.reset();
  modalComponent.openPopup(addCardPopup);
  validationComponent.clearValidation(addCardForm, {
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'form__input-error'
  });
});

// Modals common listeners
popups.forEach((popup) => modalComponent.setModalWindowEventListeners(popup));

profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  updateProfileInfo(evt.submitter, profileForm, profileInfo);
  modalComponent.closePopup(editProfilePopup);
});

editProfileImagePopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const buttonText = setIdling(evt.submitter);
  const avatarUrl = editProfileImageForm.elements['link'].value;
  apiComponent.editProfileImage(avatarUrl)
  .then(res => {
    setProfileImage(profileImage, res.avatar);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    editProfileImageForm.reset();
    exitIdling(evt.submitter, buttonText);
    modalComponent.closePopup(editProfileImagePopup);
  })
});

addCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const buttonText = setIdling(evt.submitter);
  const name = addCardForm.elements['place-name'].value;
  const link = addCardForm.elements.link.value;
  apiComponent.addCard(name, link)
  .then((res) => {
    me.then((me) => {
      addNewCard(res, me);
    });
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    exitIdling(evt.submitter, buttonText);
    addCardForm.reset();
    modalComponent.closePopup(addCardPopup);
  });
});

const handleImageClick = (cardImage, imagePopup) => {
  const imgElementOfPopup = imagePopup.querySelector('.popup__image');
  imgElementOfPopup.src = cardImage.src;
  imgElementOfPopup.alt = cardImage.alt;
  imagePopup.querySelector('.popup__caption').textContent = cardImage.alt;
  modalComponent.openPopup(imagePopup);
}

const setIdling = (button) => {
  const initalMessage = button.textContent;
  button.textContent = 'Сохранение...';
  return initalMessage;
}

const exitIdling = (button, message) => {
  button.textContent = message;
}

const me = apiComponent.getMe()
.then(res => {
  setProfileInfo(profileInfo, res.name, res.about);
  setProfileImage(profileImage, res.avatar);
  return res;
})
.catch((err) => {
  console.log(err);
});

const cards = apiComponent.getCards()
.then(res => {
  return res;
})

const sortByCreatedAt = (a, b) => {
  let time = new Date(a.createdAt) - new Date(b.createdAt);
  return time;
};

Promise.all([me, cards])
.then(([me, cards]) => {
  cards.sort(sortByCreatedAt);
  cards.forEach((cardObject) => {
    addNewCard(cardObject, me);
  });
})
.catch((err) => {
  console.log(err);
});