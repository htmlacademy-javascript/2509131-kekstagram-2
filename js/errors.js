import { isEscapeKey } from './util.js';

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const uploadingErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorButton = uploadingErrorTemplate.querySelector('.error__button');
const body = document.querySelector('body');
const REMOVE_ERROR_MESSAGE_TIME = 5000;

export const showLoadingDataError = () => {
  const dataErrorMessage = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorMessage);
  setTimeout(() => {
    dataErrorMessage.remove();
  }, REMOVE_ERROR_MESSAGE_TIME);
};


export const showUploadingDataError = () => {
  const uploadingErrorMessage = uploadingErrorTemplate.cloneNode(true);
  document.body.append(uploadingErrorMessage);
  errorButton.addEventListener('click', onErrorButtonClick);
  body.addEventListener('keydown', onBodyEscKeydown);
  body.addEventListener('click', onBodyClick);

  function removeUploadingErrorMessage () {
    uploadingErrorMessage.remove();
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
    if(!evt.target.closest('.error__inner')) {
      removeUploadingErrorMessage();
    }
  }
};
