import { isEscapeKey } from './util.js';

const dataError = document.querySelector('#data-error').content.querySelector('.data-error');
const uploadingError = document.querySelector('#error').content.querySelector('.error');
const errorButton = uploadingError.querySelector('.error__button');
const body = document.querySelector('body');
const errorInner = uploadingError.querySelector('.error__inner');
const REMOVE_ERROR_MESSAGE_TIME = 5000;

export const showLoadingDataError = () => {
  document.body.append(dataError);
  setTimeout(() => {
    dataError.remove();
  }, REMOVE_ERROR_MESSAGE_TIME);
};

function removeUploadingErrorMessage () {
  uploadingError.remove();
  errorButton.removeEventListener('click', onErrorButtonClick);
  body.removeEventListener('keydown', onBodyEscKeydown);
  body.removeEventListener('click', onBodyClick);
}

function onErrorButtonClick () {
  removeUploadingErrorMessage();
}

function onBodyEscKeydown (evt) {
  if(!isEscapeKey(evt)) {
    return;
  }
  evt.preventDefault();
  evt.stopPropagation();
  removeUploadingErrorMessage();
}

function onBodyClick (evt) {
  if(evt.target === errorInner) {
    return;
  }
  removeUploadingErrorMessage();
}

export const showUploadingDataError = () => {
  document.body.append(uploadingError);
  errorButton.addEventListener('click', onErrorButtonClick);
  body.addEventListener('keydown', onBodyEscKeydown);
  body.addEventListener('click', onBodyClick);
};
