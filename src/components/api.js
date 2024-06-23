// Конфиг
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16',
  headers: {
    authorization: '57108712-c7d4-4893-a583-03b34dde65b3',
    'Content-Type': 'application/json'
  }
}

// Получение данных пользователя
export function getInfo(profileTitle, profileDesc, profileAvatar) {
  return fetch(`${config.baseUrl}/users/me `, {
  headers: config.headers
})
  .then(res => res.json())
  .then(data => {
    profileTitle.textContent = data.name;
    profileDesc.textContent = data.about;
    profileAvatar.style.backgroundImage = `url(${data.avatar})`;
  })
  .catch(error => {
    console.error('Ошибка получения данных:', error);
  });
};



export const getCardsData = fetch(`${config.baseUrl}/cards `, {
  headers: config.headers
});

// Обновление данных пользователя
export function updateInfo(profileName, profileAbout, updateButton, callback) {
  updateButton.textContent = 'Сохранение...';
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileAbout
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  })
  .then(data => {
    updateButton.textContent = 'Сохранить';
    callback();
  })
  .catch(error => {
    console.error('Ошибка обновления данных:', error);
  });
};

// Обновление аватара
export function updateAvatar(profileAvatar, profileImgElement, updateButton, callback) {
  updateButton.textContent = 'Сохранение...';
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: profileAvatar
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  })
  .then(data => {
    // Обновляем изображение в разметке
    profileImgElement.style.backgroundImage = `url(${data.avatar})`;
    updateButton.textContent = 'Сохранить';
    callback();
  })
  .catch(error => {
    updateButton.textContent = 'Сохраненить'
    console.error('Ошибка обновления аватара:', error);
  })
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
  .then(response => response.json());
};

// Удаление карточки с сервера
export function deleteCardFromServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(response => response.json());
};

// Лайк карточки
export function cardLikeApi(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  });
};

// Дизлайк карточки
export function cardDislikeApi(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  });
};
