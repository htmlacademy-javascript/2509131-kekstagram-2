import { isEscapeKey } from './util.js';

const successSection = document.querySelector('#success').content;
const successTemplate = successSection.querySelector('.success');

export function showSuccessMessage () {
  const successMessage = successTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');
  document.body.append(successMessage);
  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('click', onDocumentClick);

  function removeSuccessMessage () {
    successMessage.remove();
  }

  function onSuccessButtonClick () {
    removeSuccessMessage();
  }

  function onDocumentEscKeydown (evt) {
    if(!isEscapeKey(evt)) {
      return;
    }
    evt.preventDefault();
    removeSuccessMessage();
  }

  function onDocumentClick (evt) {
    if(!evt.target.closest('.success__inner')) {
      removeSuccessMessage();
    }
  }
}
