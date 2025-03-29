import { isEscapeKey } from './util.js';

const successSection = document.querySelector('#success').content;
const successMessage = successSection.querySelector('.success');
const successButton = successSection.querySelector('.success__button');
const successInner = successSection.querySelector('.success__inner');

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

export function showSuccessMessage () {
  document.body.append(successMessage);
  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('click', onDocumentClick);
}
