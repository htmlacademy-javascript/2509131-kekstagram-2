import { isEscapeKey } from './util.js';
import { validateHashtags, getErrorMessage } from './validate-hashtags.js';
import { showUploadingDataError } from './errors.js';
import { sendData } from './api.js';

export const imgUploadSection = document.querySelector('.img-upload');
const imgUploadForm = imgUploadSection.querySelector('.img-upload__form');
const imgUploadInput = imgUploadSection.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadSection.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgUploadCancelButton = imgUploadSection.querySelector('.img-upload__cancel');
export const textHashtags = imgUploadSection.querySelector('.text__hashtags');
const textDescription = imgUploadSection.querySelector('.text__description');
const MAX_TEXT_DESCRIPTION_LENGTH = 140;

function onDocumentEscKeydown (evt) {
  if(!isEscapeKey(evt)) {
    return;
  }
  evt.preventDefault();
  const INPUT_FIELDS = [textHashtags, textDescription];
  if(INPUT_FIELDS.includes(document.activeElement)) {
    evt.stopPropagation();
    return;
  }
  closeUploadForm();
}

function onimgUploadCancelButtonClick () {
  closeUploadForm();
}

function onImgUploadInputChange () {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  imgUploadCancelButton.addEventListener('click', onimgUploadCancelButtonClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
}

function closeUploadForm () {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadCancelButton.removeEventListener('click', onimgUploadCancelButtonClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
  imgUploadInput.value = '';
}

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

function validateTextDescription () {
  return textDescription.value.length <= MAX_TEXT_DESCRIPTION_LENGTH;
}

const setImgUploadFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(!pristine.validate()) {
      return;
    }
    textHashtags.value = textHashtags.value.trim().replaceAll(/\s+/g, ' ');

    sendData(new FormData(evt.target))
      .then(onSuccess)
      .catch(() => {
        showUploadingDataError();
      });
  });
};

setImgUploadFormSubmit(closeUploadForm);

imgUploadInput.addEventListener('change', onImgUploadInputChange);

pristine.addValidator(textHashtags, validateHashtags, getErrorMessage);

pristine.addValidator(textDescription, validateTextDescription, `длина комментария не может быть больше ${MAX_TEXT_DESCRIPTION_LENGTH} символов`);

