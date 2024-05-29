import {cardTemplate, placeList, popupNewCard, popupNewCardForm, placeholderImage} from '../index.js'
import { closeModal } from './modal.js';

export function createCard(name, link, removeCard, likeCard) {
  const template = cardTemplate.cloneNode(true);
  const removeBtn = template.querySelector('.card__delete-button');
  const cardImage = template.querySelector('.card__image');
  const cardTitle = template.querySelector('.card__title');
  const likeButton = template.querySelector('.card__like-button')
  cardImage.src = link;
  cardImage.alt = name;
  cardImage.onerror = imageErrorHandler;
  cardTitle.textContent = name;
  removeBtn.addEventListener('click', removeCard);
  likeButton.addEventListener('click', likeCard);

  return template;
}

export function addCard(name, link, removeCard, likeCard) {
  const card = createCard(name, link, removeCard, likeCard);
  if (!popupNewCard.classList.contains('popup_is-opened')) { 
  placeList.append(card);
  } else {
    placeList.prepend(card); 
  }
}

export function addCustomCard(event) {
  event.preventDefault();
  const newCardName = document.querySelector('.popup__input_type_card-name').value;
  const newCardLink = document.querySelector('.popup__input_type_url').value ;
  addCard(newCardName, newCardLink, removeCard, likeCard); 
  closeModal(); 
  popupNewCardForm.reset(); 
}

export function likeCard(event) { 
  event.target.classList.toggle('card__like-button_is-active');
}

export function removeCard(event) {
  const listItem = event.target.closest('.places__item');
  listItem.remove();
}

export function imageErrorHandler() {
  this.src = placeholderImage;
}