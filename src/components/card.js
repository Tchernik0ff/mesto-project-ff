import { deleteCardFromServer, cardLikeApi, cardDislikeApi} from "./api.js";
const cardTemplate = document.querySelector('#card-template').content;

function getCardTemplate() {
  const template = cardTemplate.cloneNode(true);
  return template;
};

export function createCard(removeCard, likeCard, imageOpeningHandler, cardData, userId) {
  const template = getCardTemplate();
  const removeBtn = template.querySelector('.card__delete-button');
  const cardImage = template.querySelector('.card__image');
  const cardTitle = template.querySelector('.card__title');
  const likeButton = template.querySelector('.card__like-button');
  const likeCount = template.querySelector('.like-counter');
  const card = template.querySelector('.card')
  card.setAttribute('data-id', cardData._id);
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likeCount.textContent = cardData.likes.length;
  cardImage.onerror = imageErrorHandler;
  cardTitle.textContent = cardData.name;
  if (cardData.owner._id !== userId) {
    removeBtn.style.display = 'none';
  } else {
    removeBtn.addEventListener('click', removeCard);
  }
  likeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', imageOpeningHandler);
  if(cardData.likes.some(check => check._id === userId)) { 
    likeButton.classList.add("card__like-button_is-active"); 
  }
  return template;
};

export function likeCard(event) { 
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
  
  const likeMethod = isLiked ? cardDislikeApi : cardLikeApi;
  likeMethod(cardId)
    .then(data => {
      // Обновляем счетчик лайков на карточке 
      event.target.classList.toggle('card__like-button_is-active'); 
      const likeCount = event.target.parentElement.querySelector('.like-counter'); 
      likeCount.textContent = data.likes.length; 
    })
    .catch(error => {
      console.error('Произошла ошибка:', error);
    });
};

export function imageErrorHandler() {
  const placeholderImage = new URL('../../images/placeholder.jpg', import.meta.url);
  this.src = placeholderImage;
};