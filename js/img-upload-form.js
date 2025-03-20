import { isEscapeKey } from './util.js';
import { validateHashtags, getErrorMessage } from './validate-hashtags.js';
import { onScaleControlSmallerClick, onScaleControllBiggerClick } from './on-scale-controlls-click.js';

export const imgUploadSection = document.querySelector('.img-upload');
const imgUploadForm = imgUploadSection.querySelector('.img-upload__form');
const imgUploadInput = imgUploadSection.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadSection.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgUploadCancelButton = imgUploadSection.querySelector('.img-upload__cancel');
export const textHashtags = imgUploadSection.querySelector('.text__hashtags');
const textDescription = imgUploadSection.querySelector('.text__description');
const MAX_TEXT_DESCRIPTION_LENGTH = 140;
const scaleControlSmaller = imgUploadSection.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadSection.querySelector('.scale__control--bigger');

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
  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControllBiggerClick);
  imgUploadForm.addEventListener('submit', onImgUploadFormSubmit);
}

function closeUploadForm () {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadCancelButton.removeEventListener('click', onimgUploadCancelButtonClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
  scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.removeEventListener('click', onScaleControllBiggerClick);
  imgUploadForm.removeEventListener('submit', onImgUploadFormSubmit);
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

function onImgUploadFormSubmit (evt) {
  evt.preventDefault();
  if(!pristine.validate()) {
    return;
  }
  textHashtags.value = textHashtags.value.trim().replaceAll(/\s+/g, ' ');
  imgUploadForm.submit();
}

imgUploadInput.addEventListener('change', onImgUploadInputChange);

pristine.addValidator(textHashtags, validateHashtags, getErrorMessage);

pristine.addValidator(textDescription, validateTextDescription, `длина комментария не может быть больше ${MAX_TEXT_DESCRIPTION_LENGTH} символов`);

