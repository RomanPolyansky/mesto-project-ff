const TOKEN = '7cb290a2-a3f9-40c7-9678-818c151bd929';
const GROUP_ID = 'wff-cohort-33';

const url = `https://nomoreparties.co/v1/${GROUP_ID}`;

export const getMe = () => {
  return fetch(`${url}/users/me`, {
    headers: { authorization: TOKEN }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
}

export const getCards = () => {
  return fetch(`${url}/cards`, {
    headers: { authorization: TOKEN }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
}

export const editProfile = (name, about) => {
  return fetch(`${url}//users/me `, {
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
}

export const addCard = (name, link) => {
  return fetch(`${url}/cards`, {
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
}

export const deleteCard = (id) => {
  return fetch(`${url}/cards/${id}`, {
    headers: {
      authorization: TOKEN
    },
    method: 'DELETE'
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
}

export const likeCard = (id) => {
  return fetch(`${url}/cards/likes/${id}`, {
    headers: {
      authorization: TOKEN
    },
    method: 'PUT'
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
};

export const dislikeCard = (id) => {
  return fetch(`${url}/cards/likes/${id}`, {
    headers: {
      authorization: TOKEN
    },
    method: 'DELETE'
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
};

export const editProfileImage = (link) => {
  return fetch(`${url}/users/me/avatar`, {
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify({
      avatar: link
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    })
};