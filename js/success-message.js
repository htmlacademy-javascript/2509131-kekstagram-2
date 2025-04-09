import { isEscapeKey } from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');

export const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');
  document.body.append(successMessage);
  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('click', onDocumentClick);

  function onSuccessButtonClick () {
    removeSuccessMessage();
  }

  function removeSuccessMessage () {
    successMessage.remove();
    successButton.removeEventListener('click', onSuccessButtonClick);
    document.removeEventListener('keydown', onDocumentEscKeydown);
    document.removeEventListener('click', onDocumentClick);
  }

  function onDocumentEscKeydown (evt) {
    if (!isEscapeKey(evt)) {
      return;
    }
    evt.preventDefault();
    removeSuccessMessage();
  }

  function onDocumentClick (evt) {
    if (!evt.target.closest('.success__inner')) {
      removeSuccessMessage();
    }
  }
};
