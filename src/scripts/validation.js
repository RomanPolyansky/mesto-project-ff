const setEventListeners = (formElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, selectors);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, selectors);
      toggleButtonState(inputList, buttonElement, selectors);
    });
  });
}

const toggleButtonState = (inputList, buttonElement, selectors) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectors.inactiveButtonClass)
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(selectors.inactiveButtonClass)
    buttonElement.disabled = false;
  }
}

const checkInputValidity = (formElement, inputElement, selectors) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, selectors.inputErrorClass, selectors.errorClass, inputElement.validationMessage);
    inputElement.classList.add('input_invalid');
  } else {
    hideInputError(formElement, inputElement, selectors.inputErrorClass, selectors.errorClass);
    inputElement.classList.remove('input_invalid');
  }
};

const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => {
  inputElement.classList.add(inputErrorClass);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
  }
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  inputElement.classList.remove(inputErrorClass);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid || inputElement.validity.patternMismatch;
  });
}

export const enableValidation = (selectors) => {
  const forms = Array.from(document.querySelectorAll(selectors.formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, selectors);
  });
}

export const clearValidation = (form, validationConfig) => {
  const inputList = Array.from(form.querySelectorAll('input'));
  inputList.forEach((inputElement) => {
    hideInputError(form, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
  });
} 