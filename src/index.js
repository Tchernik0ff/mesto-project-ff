import './index.css';
import { validationConfig } from './components/validationConfig.js';
import { openModal, closeModal} from './components/modal.js';
import { createCard, likeCard, removeCard} from './components/card.js';
import { enableValidation, clearValidation} from './components/validation.js';
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
let userId;

Promise.all([getInfo(), getCardsData()])
  .then(([userInfo, cards]) => {
    userId = userInfo._id;
    profileTitle.textContent = userInfo.name;
    profileDesc.textContent = userInfo.about;
    profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
    cards.forEach(cardData => {
      addCard(removeCard, likeCard, openCardImage, cardData, userId);
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
  editProfileSubmitBtn.textContent = 'Сохранение...'
  updateInfo(profileNameInputField.value, profileDescInputField.value)
  .then(data => {
    profileTitle.textContent = data.name;
    profileDesc.textContent = data.about;
    closeModal(popupEditProfile);
  })
  .catch(error => {
    console.error('Ошибка обновления данных:', error);
  })
  .finally(() => {
    editProfileSubmitBtn.textContent = 'Сохранить';
  });
};

function submitAvatarForm(event) {
  event.preventDefault();
  editAvatarSubmitBtn.textContent = 'Сохранение...';
  updateAvatar(popupAvatarFormField.value)
  .then(data => {
    profileAvatar.style.backgroundImage = `url(${data.avatar})`;
    closeModal(popupAvatar);
  })
  .catch(error => {
    console.error('Ошибка обновления аватара:', error);
  })
  .finally(() => {
    editAvatarSubmitBtn.textContent = 'Сохранить';
  })
};

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

function addCard(removeCard, likeCard, openCardImage, cardData, userId) {
  const card = createCard(removeCard, likeCard, openCardImage, cardData, userId);
  if (!popupNewCard.classList.contains('popup_is-opened')) { 
  placeList.append(card);
  } else {
    placeList.prepend(card); 
  }
};

function addCustomCard(event) {
  event.preventDefault();
  newCardSubmitBtn.textContent = 'Сохранение...';
  const newCardName = document.querySelector('.popup__input_type_card-name').value;
  const newCardLink = document.querySelector('.popup__input_type_url').value;
  createCardOnServer(newCardName, newCardLink)
    .then(data => {
      addCard(removeCard, likeCard, openCardImage, data, userId);
      closeModal(popupNewCard);
      popupNewCardForm.reset();
      clearValidation(popupNewCardForm, validationConfig);
    })
    .catch(error => {
      console.log('Не удалось добавить карточку на сервер', error);
    })
    .finally(() => {
      newCardSubmitBtn.textContent = 'Сохранить';
    })
}

closeButtons.forEach(button => {
  const openedPopup = button.closest('.popup');
  button.addEventListener('click', function() {
    closeModal(openedPopup);
  })
});