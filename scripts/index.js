const item = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCards(name, link, removeCard) {
  const template = item.cloneNode(true);
  const removeBtn = template.querySelector('.card__delete-button');
  template.querySelector('.card__image').src = link;
  template.querySelector('.card__image').alt = name;
  template.querySelector('.card__title').textContent = name;
  removeBtn.addEventListener('click', removeCard);
  placesList.append(template);
}

function removeCard(event) {
  const listitem = event.target.closest('.places__item');
  listitem.remove();
}

initialCards.forEach(place => {
  createCards(place.name,place.link, removeCard);
});
