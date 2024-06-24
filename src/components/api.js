// Конфиг
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16',
  headers: {
    authorization: '57108712-c7d4-4893-a583-03b34dde65b3',
    'Content-Type': 'application/json'
  }
}

// Обработка ответа от сервера
function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}

// Получение данных пользователя
export function getInfo() {
  return fetch(`${config.baseUrl}/users/me `, {
  headers: config.headers
})
  .then(response => handleResponse(response))
};

export function getCardsData() {
  return fetch(`${config.baseUrl}/cards `, {
  headers: config.headers
})
  .then(response => handleResponse(response))
};

// Обновление данных пользователя
export function updateInfo(profileName, profileAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileAbout
    })
  })
  .then(response => handleResponse(response))
};

// Обновление аватара
export function updateAvatar(profileAvatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: profileAvatar
    })
  })
  .then(response => handleResponse(response))
};

// Добавление карточки на сервер
export function createCardOnServer(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(response => handleResponse(response))
};

// Удаление карточки с сервера
export function deleteCardFromServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(response => handleResponse(response))
};

// Лайк карточки
export function cardLikeApi(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(response => handleResponse(response))
};

// Дизлайк карточки
export function cardDislikeApi(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(response => handleResponse(response))
};
