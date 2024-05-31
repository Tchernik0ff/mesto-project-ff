export function openModal(popup) {
  document.addEventListener('keyup', handleEscKey);
  document.addEventListener('click', handleOverlayClick);
  popup.classList.add('popup_is-opened');
}

export function closeModal(test) {
  document.removeEventListener('keyup', handleEscKey);
  document.removeEventListener('click', handleOverlayClick);
  test.classList.remove('popup_is-opened');
}

export function handleEscKey(event) {
  const closingTarget = document.querySelector('.popup_is-opened');
  if ((event.code === 'Escape' && closingTarget)){
    closeModal(closingTarget);
  }
} 

export function handleOverlayClick(event) {
  const closingTarget = document.querySelector('.popup_is-opened');
  if (event.target.classList.contains('popup_is-opened') && !event.target.classList.contains('popup_content')) {
    closeModal(closingTarget);
  }
}