import './index.css';
import { openModal, closeModal} from './components/modal.js';
import { createCard, likeCard, removeCard} from './components/card.js';
import { enableValidation, clearValidation, validationConfig } from './components/validation.js';
import { getInfo, updateInfo, updateAvatar, createCardOnServer, getCardsData} from './components/api.js';

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditProfileForm = document.querySelector('[name="edit-profile"]');
const editProfileSubmitBtn = popupEditProfileForm.querySelector('.popup__button');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAvatar = document.querySelector('.profile__image');
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupAvatarForm = document.querySelector('[name="new-avatar"]');
const editAvatarSubmitBtn = popupAvatarForm.querySelector('.popup__button')
const popupAvatarFormField = document.querySelector('.popup__input_type_ava');
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardSubmitBtn = popupNewCard.querySelector('.popup__button');
const addProfileBtn = document.querySelector('.profile__add-button');
const popupNewCardForm = document.querySelector('[name="new-place"]');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupImageCaption = imagePopup.querySelector('.popup__caption');
const placeList = document.querySelector('.places__list');
const profileNameInputField = document.querySelector('.popup__input_type_name');
const profileDescInputField = document.querySelector('.popup__input_type_description');
const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

getInfo(profileTitle, profileDesc, profileAvatar);

Promise.all([getCardsData])
  .then(responses => {
    return Promise.all(responses.map(response => {
      return response.json();
    }));
  })
  .then(data => {
    const cardsData = data[0]; // данные карточек
    cardsData.forEach(card => {
      addCard(card.name,card.link, removeCard, likeCard, openCardImage, card.likes, card.owner._id, card._id);
    });

  })
  .catch(error => {
    console.error('Произошла ошибка при загрузке данных:', error);
  });

enableValidation(validationConfig);

function fillInFormInputs() {
  profileNameInputField.value = profileTitle.textContent;
  profileDescInputField.value = profileDesc.textContent;
}

function submitEditProfileForm(event) {
  event.preventDefault();
  updateInfo(profileNameInputField.value, profileDescInputField.value, editProfileSubmitBtn, () => {
    profileTitle.textContent = profileNameInputField.value;
    profileDesc.textContent = profileDescInputField.value;
    closeModal(popupEditProfile);
  });
}

function submitAvatarForm(event) {
  event.preventDefault();
  updateAvatar(popupAvatarFormField.value, profileAvatar, editAvatarSubmitBtn, () => {
   closeModal(popupAvatar); 
  });
}

popups.forEach(element => {
  element.classList.add('popup_is-animated');
})

function openCardImage(event) {
  if (event.target.classList.contains('card__image')) { 
    const cardImageSrc = event.target.src;
    const cardImageAlt = event.target.alt;
    const card = event.target.closest('.card');
    const cardTitle = card.querySelector('.card__title');
    const cardName = cardTitle.textContent;
    popupImageCaption.textContent = cardName;
    popupImage.src = cardImageSrc;
    popupImage.alt = cardImageAlt;
    openModal(imagePopup);
  }
};

profileAvatar.addEventListener('click', function() {
  openModal(popupAvatar);
  popupAvatarForm.reset();
  clearValidation(popupAvatarForm, validationConfig);
});

profileEditBtn.addEventListener('click', function() {
  openModal(popupEditProfile);
  fillInFormInputs();
  clearValidation(popupEditProfileForm, validationConfig);
});

addProfileBtn.addEventListener('click', function() {
  openModal(popupNewCard);
});

popupNewCardForm.addEventListener('submit', addCustomCard);

popupEditProfileForm.addEventListener('submit', submitEditProfileForm);

popupAvatarForm.addEventListener('submit', submitAvatarForm);

function addCard(name, link, removeCard, likeCard, openCardImage, likeArray, ownerId, cardId) {
  const card = createCard(name, link, removeCard, likeCard, openCardImage, likeArray, ownerId, cardId);
  if (!popupNewCard.classList.contains('popup_is-opened')) { 
  placeList.append(card);
  } else {
    placeList.prepend(card); 
  }
};

function addCustomCard(event) {
  event.preventDefault();
  newCardSubmitBtn.textContent = 'Сохранить...';
  const newCardName = document.querySelector('.popup__input_type_card-name').value;
  const newCardLink = document.querySelector('.popup__input_type_url').value;
  createCardOnServer(newCardName, newCardLink)
    .then(data => {
      const likeArray = data.likes;
      const ownerId = data.owner._id;
      const cardId = data._id;
      addCard(newCardName, newCardLink, removeCard, likeCard, openCardImage, likeArray, ownerId, cardId);
      closeModal(popupNewCard);
      popupNewCardForm.reset();
      clearValidation(popupNewCardForm, validationConfig);
      newCardSubmitBtn.textContent = 'Сохранить';
    })
    .catch(error => {
      console.log('Не удалось добавить карточку на сервер', error);
    });
}

closeButtons.forEach(button => {
  const openedPopup = button.closest('.popup');
  button.addEventListener('click', function() {
    closeModal(openedPopup);
  })
});