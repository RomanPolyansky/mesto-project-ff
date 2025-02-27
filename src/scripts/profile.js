export function populateFormByProfileInfo(form, profileInfo) {
  const name = profileInfo.querySelector('.profile__title').textContent;
  const description = profileInfo.querySelector('.profile__description').textContent;
  setFormFields(form, name, description);
}

export function updateProfileInfo(form, profileInfo) {
  const name = form.elements.name.value;
  const description = form.elements.description.value;
  setProfileInfo(profileInfo, name, description);
}

function setFormFields(form, name, description) {
  form.elements.name.value = name;
  form.elements.description.value = description;
}

function setProfileInfo(profileInfo, name, description) {
  profileInfo.querySelector('.profile__title').textContent = name;
  profileInfo.querySelector('.profile__description').textContent = description;
}