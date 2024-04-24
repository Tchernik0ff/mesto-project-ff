const cardTemplate = document.querySelector('#card-template').content;
const placeList = document.querySelector('.places__list');

function createCard(name, link, removeCard) {
  const template = cardTemplate.cloneNode(true);
  const removeBtn = template.querySelector('.card__delete-button');
  const cardImage = template.querySelector('.card__image');
  const cardTitle = template.querySelector('.card__title');
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  removeBtn.addEventListener('click', removeCard);
  return template;
}

function addCard(name, link, removeCard) {
  const card = createCard(name, link, removeCard);
  placeList.append(card);
}

function removeCard(event) {
  const listItem = event.target.closest('.places__item');
  listItem.remove();
}

initialCards.forEach(place => {
  addCard(place.name,place.link, removeCard);
});