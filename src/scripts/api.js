import { checkResponse } from './utils.js';

const TOKEN = '7cb290a2-a3f9-40c7-9678-818c151bd929';
const GROUP_ID = 'wff-cohort-33';

const baseUrl = `https://nomoreparties.co/v1/${GROUP_ID}`;

const request = (url, options) => {
  return fetch(baseUrl + url, options)
    .then(checkResponse);
}

export const getMe = () => {
  return request('/users/me', {
    headers: { authorization: TOKEN }
  });
}

export const getCards = () => {
  return request('/cards', {
    headers: { authorization: TOKEN }
  });
}

export const editProfile = (name, about) => {
  return request('/users/me', {
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify({
      name: name,
      about: about
    })
  });
}

export const addCard = (name, link) => {
  return request('/cards', {
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      name: name,
      link: link
    })
  });
}

export const deleteCard = (id) => {
  return request(`/cards/${id}`, {
    headers: {
      authorization: TOKEN
    },
    method: 'DELETE'
  });
}

export const likeCard = (id) => {
  return request(`/cards/likes/${id}`, {
    headers: {
      authorization: TOKEN
    },
    method: 'PUT'
  });
};

export const dislikeCard = (id) => {
  return request(`/cards/likes/${id}`, {
    headers: {
      authorization: TOKEN
    },
    method: 'DELETE'
  });
};

export const editProfileImage = (link) => {
  return request(`/users/me/avatar`, {
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify({
      avatar: link
    })
  });
};