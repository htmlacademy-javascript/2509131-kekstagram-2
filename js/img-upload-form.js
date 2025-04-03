import { isEscapeKey } from './util.js';
import { showUploadingDataError } from './errors.js';
import { sendData } from './api.js';
import { initScale, resetScale } from './scale-controlls.js';
import { resetEffect, initEffect } from './effects-slider.js';
import { showSuccessMessage } from './success-message.js';
import { pristine } from './pristine.js';

const imgUploadSection = document.querySelector('.img-upload');
const imgUploadForm = imgUploadSection.querySelector('.img-upload__form');
const imgUploadInput = imgUploadSection.querySelector('.img-upload__input');
const imgUploadPreview = imgUploadSection.querySelector('.img-upload__preview img');
const imgUploadOverlay = imgUploadSection.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgUploadCancelButton = imgUploadSection.querySelector('.img-upload__cancel');
const textHashtags = imgUploadSection.querySelector('.text__hashtags');
const textDescription = imgUploadSection.querySelector('.text__description');
const submitButton = imgUploadSection.querySelector('.img-upload__submit');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

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

function onImgUploadInputChange () {
  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
  }
  openUploadForm();
}

function openUploadForm () {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeydown);
  imgUploadCancelButton.addEventListener('click', closeUploadForm);
}

function closeUploadForm () {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadCancelButton.removeEventListener('click', closeUploadForm);
  document.removeEventListener('keydown', onDocumentEscKeydown);
  imgUploadForm.reset();
  resetScale();
  resetEffect();
  pristine.reset();
}

function blockSubmitButton () {
  submitButton.disabled = true;
}

function unblockSubmitButton () {
  submitButton.disabled = false;
}

const setImgUploadFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(!pristine.validate()) {
      return;
    }
    textHashtags.value = textHashtags.value.trim().replaceAll(/\s+/g, ' ');

    blockSubmitButton();

    sendData(new FormData(evt.target))
      .then(onSuccess)
      .then(showSuccessMessage)
      .catch(() => {
        showUploadingDataError();
      })
      .finally(unblockSubmitButton);
  });
};

export function initImgUploadForm () {
  imgUploadInput.addEventListener('change', onImgUploadInputChange);
  setImgUploadFormSubmit(closeUploadForm);
  initScale();
  initEffect();
}

