import { setupModalListeners, removeModalListeners} from '../index.js';

export let openedPopup;
export let openedPopupCloseBtn;

export function openModal(popup) {
  openedPopup = popup;
  openedPopupCloseBtn = popup.querySelector('.popup__close');
  popup.classList.add('popup_is-animated')
  setupModalListeners();
  setTimeout(() => popup.classList.remove('popup_is-animated'), 600);
  setTimeout(() => popup.classList.add('popup_is-opened'), 0); 
}

export function closeModal() {
  removeModalListeners();
  openedPopup.classList.remove('popup_is-opened');
  openedPopup.classList.add('popup_is-animated')
  setTimeout(() => openedPopup.classList.remove('popup_is-animated'), 600);
}

export function handleEscKey(event) {
  if ((event.code === 'Escape' && !openedPopup.classList.contains('popup_is-animated'))){
    closeModal();
  }
}