import { isEscapeKey } from './util.js';

const successSection = document.querySelector('#success').content;
const successTemplate = successSection.querySelector('.success');
const successButton = successSection.querySelector('.success__button');
const successInner = successSection.querySelector('.success__inner');


export function showSuccessMessage () {
  const successMessage = successTemplate.cloneNode(true);
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
    if(evt.target === successInner) {
      return;
    }
    removeSuccessMessage();
  }

}
