import { deleteCardFromServer, cardLikeApi, cardDislikeApi} from "./api.js";
const cardTemplate = document.querySelector('#card-template').content;

function getCardTemplate() {
  const template = cardTemplate.cloneNode(true);
  return template;
};

export function createCard(name, link, removeCard, likeCard, imageOpeningHandler, likeArray, ownerId, cardId) {
  const template = getCardTemplate();
  const removeBtn = template.querySelector('.card__delete-button');
  const cardImage = template.querySelector('.card__image');
  const cardTitle = template.querySelector('.card__title');
  const likeButton = template.querySelector('.card__like-button');
  const likeCount = template.querySelector('.like-counter');
  const card = template.querySelector('.card')
  card.setAttribute('data-id', cardId);
  cardImage.src = link;
  cardImage.alt = name;
  likeCount.textContent = likeArray.length;
  cardImage.onerror = imageErrorHandler;
  cardTitle.textContent = name;
  if (ownerId !== '42c4fefa56069aac06601143') {
    removeBtn.style.display = 'none';
  } else {
    removeBtn.addEventListener('click', removeCard);
  }
  likeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', imageOpeningHandler);
  likeArray.forEach(check => {
    if (check._id === '42c4fefa56069aac06601143') {
      likeButton.classList.add('card__like-button_is-active');
    }
  })
  return template;
};

export function likeCard(event) { 
  event.target.classList.toggle('card__like-button_is-active');
  likeCardServ(event)
};

export function removeCard(event) {
  const listItem = event.target.closest('.places__item');
  const cardId = listItem.getAttribute('data-id');
  
  deleteCardFromServer(cardId)
    .then(() => {
      listItem.remove();
    })
    .catch(error => {
      console.log('Произошла ошибка при удалении карточки:', error);
    });
};

export function likeCardServ(event) {
  const cardId = event.target.closest('.card').getAttribute('data-id');
  const isLiked = event.target.classList.contains('card__like-button_is-active');
  
  if (isLiked) {
    cardLikeApi(cardId)
    .then(data => {
      // Обновляем счетчик лайков на карточке
      event.target.classList.add('card__like-button_is-active');
      const likeCount = event.target.parentElement.querySelector('.like-counter');
      likeCount.textContent = data.likes.length;
    })
    .catch(error => {
      console.error('Произошла ошибка:', error);
    });
  } else {
    cardDislikeApi(cardId)
    .then(data => {
      // Обновляем счетчик лайков на карточке
      event.target.classList.remove('card__like-button_is-active');
      const likeCount = event.target.parentElement.querySelector('.like-counter');
      likeCount.textContent = data.likes.length;
    })
    .catch(error => {
      console.log('Произошла ошибка:', error);
    });
  }
};

export function imageErrorHandler() {
  const placeholderImage = new URL('../../images/placeholder.jpg', import.meta.url);
  this.src = placeholderImage;
};