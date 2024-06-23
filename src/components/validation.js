//Конфиг
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Скрытие ошибки
function showError(formElement, inputElement, errorMessage, validationConfig) { 
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass); 
  errorElement.classList.add(validationConfig.errorClass); 
  errorElement.textContent = errorMessage;
};

// Показ ошибки
function hideError(formElement, inputElement, validationConfig) { 
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass); 
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

// Смена состояний кнопки
function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

// Проверка валидности поля
const isValid = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    if (inputElement.validity.patternMismatch) {
      showError(formElement, inputElement, inputElement.dataset.errorMessage, validationConfig);
    } else {
      showError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    }
  } else {
    hideError(formElement, inputElement, validationConfig);
  }
};

// Установка слушателей
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

// Функция включения валидации
export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

// Очистка
export const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideError(formElement, inputElement, validationConfig);
  });
  toggleButtonState(inputList, buttonElement, validationConfig)
};