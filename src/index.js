import {initialCards} from './cards.js'
import './index.css'
import { openModal, closeModal, handleEscKey, openedPopup, openedPopupCloseBtn} from './components/modal.js';
import { likeCard, addCard, removeCard, addCustomCard} from './components/card.js';

export const placeholderImage = new URL('../images/placeholder.jpg', import.meta.url)
const popupEditProfile = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupNewCardForm = document.querySelector('[name="new-place"]');
const imagePopup = document.querySelector('.popup_type_image')
export const cardTemplate = document.querySelector('#card-template').content;
export const placeList = document.querySelector('.places__list');
const profileNameInputField = document.querySelector('.popup__input_type_name');
const profileDescInputField = document.querySelector('.popup__input_type_description');


function returnFormValue() {
  profileNameInputField.value = document.querySelector('.profile__title').textContent;
  profileDescInputField.value = document.querySelector('.profile__description').textContent;
}

function handleFormSubmit(event) {
  event.preventDefault();
  document.querySelector('.profile__title').textContent = profileNameInputField.value;
  document.querySelector('.profile__description').textContent = profileDescInputField.value;
  closeModal();
}

//Добавление слушателей событий
export function setupModalListeners() {
  document.addEventListener('keyup', handleEscKey);
  if (openedPopup == popupNewCard) {
    openedPopup.addEventListener('submit', addCustomCard);
  }
  if (openedPopup == popupEditProfile) {
    openedPopup.addEventListener('submit', handleFormSubmit)
  }
  openedPopupCloseBtn.addEventListener('click', closeModal);
}

//Снятие слушателей событий
export function removeModalListeners() {
  document.removeEventListener('keyup', handleEscKey);
  if (openedPopup == popupNewCard) {
    openedPopup.removeEventListener('submit', addCustomCard);
  }
  if (openedPopup == popupEditProfile) {
    openedPopup.removeEventListener('submit', handleFormSubmit)
  }
  openedPopupCloseBtn.removeEventListener('click', closeModal);
}

//Слушаем документ
document.addEventListener('click', function(event) {
  const target = event.target;
  if (target.classList.contains('profile__edit-button')) {
    openModal(popupEditProfile);
    returnFormValue();
  } else if (target.classList.contains('profile__add-button')) {
    openModal(popupNewCard);
  } else if (target.classList.contains('card__image')) { 
    const cardImageSrc = target.src;
    const cardImageAlt = target.alt;
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupImageCaption = imagePopup.querySelector('.popup__caption');
    const card = target.closest('.card');
    const cardTitle = card.querySelector('.card__title');
    const cardName = cardTitle.textContent;
    popupImageCaption.textContent = cardName;
    popupImage.src = cardImageSrc;
    popupImage.alt = cardImageAlt;
    openModal(imagePopup);
  } else if (target.classList.contains('popup_is-opened') && !target.classList.contains('popup_content') && !target.classList.contains('popup_is-animated')) {
    closeModal();
  }
});

initialCards.forEach(place => {
  addCard(place.name,place.link, removeCard, likeCard);
});

