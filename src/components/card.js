function getCardTemplate() {
  const cardTemplate = document.querySelector('#card-template').content;
  const template = cardTemplate.cloneNode(true);
  const removeBtn = template.querySelector('.card__delete-button');
  const cardImage = template.querySelector('.card__image');
  const cardTitle = template.querySelector('.card__title');
  const likeButton = template.querySelector('.card__like-button');
  return {template, removeBtn, cardImage, cardTitle, likeButton};
}

export function createCard(name, link, removeCard, likeCard, imageOpeningHandler) {
  const {template, removeBtn, cardImage, cardTitle, likeButton} = getCardTemplate();
  cardImage.src = link;
  cardImage.alt = name;
  cardImage.onerror = imageErrorHandler;
  cardTitle.textContent = name;
  removeBtn.addEventListener('click', removeCard);
  likeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', imageOpeningHandler);
  return template;
}

export function likeCard(event) { 
  event.target.classList.toggle('card__like-button_is-active');
}

export function removeCard(event) {
  const listItem = event.target.closest('.places__item');
  listItem.remove();
}

export function imageErrorHandler() {
  const placeholderImage = new URL('../../images/placeholder.jpg', import.meta.url);
  this.src = placeholderImage;
}