import {initialCards} from './cards.js'
import './index.css';
import { openModal, closeModal} from './components/modal.js';
import { createCard, likeCard, removeCard} from './components/card.js';

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditProfileForm = document.querySelector('[name="edit-profile"]');
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const profileEditBtn = document.querySelector('.profile__edit-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
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

function fillInFormInputs() {
  profileNameInputField.value = profileTitle.textContent;
  profileDescInputField.value = profileDesc.textContent;
}

function submitEditProfileForm(event) {
  event.preventDefault();
  profileTitle.textContent = profileNameInputField.value;
  profileDesc.textContent = profileDescInputField.value;
  closeModal(popupEditProfile);
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
}

profileEditBtn.addEventListener('click', function() {
  openModal(popupEditProfile);
  fillInFormInputs();
})

addProfileBtn.addEventListener('click', function() {
  openModal(popupNewCard);
})

popupNewCardForm.addEventListener('submit', addCustomCard);

popupEditProfileForm.addEventListener('submit', submitEditProfileForm)

function addCard(name, link, removeCard, likeCard, openCardImage) {
  const card = createCard(name, link, removeCard, likeCard, openCardImage);
  if (!popupNewCard.classList.contains('popup_is-opened')) { 
  placeList.append(card);
  } else {
    placeList.prepend(card); 
  }
}

function addCustomCard(event) {
  event.preventDefault();
  const newCardName = document.querySelector('.popup__input_type_card-name').value;
  const newCardLink = document.querySelector('.popup__input_type_url').value ;
  addCard(newCardName, newCardLink, removeCard, likeCard, openCardImage); 
  closeModal(popupNewCard); 
  popupNewCardForm.reset(); 
}

initialCards.forEach(place => {
  addCard(place.name,place.link, removeCard, likeCard, openCardImage);
});

closeButtons.forEach(button => {
  const openedPopup = button.closest('.popup');
  button.addEventListener('click', function() {
    closeModal(openedPopup);
  })
})