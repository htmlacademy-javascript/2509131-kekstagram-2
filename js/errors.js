import { isEscapeKey } from './util.js';

const REMOVE_ERROR_MESSAGE_TIME = 5000;
const dataError = document.querySelector('#data-error').content.querySelector('.data-error');
const uploadingError = document.querySelector('#error').content.querySelector('.error');
const errorButton = uploadingError.querySelector('.error__button');
export const errorInner = uploadingError.querySelector('.error__inner');

export const showLoadingDataError = () => {
  document.body.append(dataError);
  setTimeout(() => {
    dataError.remove();
  }, REMOVE_ERROR_MESSAGE_TIME);
};

function removeUploadingErrorMessage () {
  uploadingError.remove();
}

function onErrorButtonClick () {
  removeUploadingErrorMessage();
}

function onDocumentEscKeydown (evt) {
  if(!isEscapeKey(evt)) {
    return;
  }
  evt.preventDefault();
  removeUploadingErrorMessage();
}

function onDocumentClick (evt) {
  if(evt.target === errorInner) {
    return;
  }
  removeUploadingErrorMessage();
}

export const showUploadingDataError = () => {
  document.body.append(uploadingError);
  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('click', onDocumentClick);
};
