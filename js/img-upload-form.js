import { isEscapeKey } from './util';

const imgUploadSection = document.querySelector('.img-upload');
const imgUploadForm = imgUploadSection.querySelector('.img-upload__form');
const imgUploadInput = imgUploadSection.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadSection.querySelector('.img-upload__overlay');
const body = document.querySelector('.body');
const imgUploadCancelButton = imgUploadSection.querySelector('.img-upload__cancel');
const textHashtags = imgUploadSection.querySelector('.text__hashtags');
const textDescription = imgUploadSection.querySelector('.text__description');

imgUploadInput.addEventListener('change', openUploadForm);
imgUploadCancelButton.addEventListener('click', closeUploadForm);
document.addEventListener('keydown', onDocumentEscKeydown);

function onDocumentEscKeydown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

function openUploadForm () {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
}

function closeUploadForm () {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadCancelButton.removeEventListener('click', closeUploadForm);
  document.removeEventListener('keydown', onDocumentEscKeydown);
  imgUploadInput.value = '';
}

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'has-danger',
  successClass: 'has-success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

function validateHashtags () {
  const hashtags = textHashtags.split(' ');
  const validHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  for (let i = 0; i < hashtags.length; i++) {
    return validHashtag.test(hashtags[i]);
  }
}

pristine.addValidator(textHashtags, validateHashtags, 'неправильный хэштэг');

function validateTextDescription () {
  return textDescription.value.length <= 140;
}

pristine.addValidator(textDescription, validateTextDescription, 'длина комментария не может быть больше 140 символов');

imgUploadForm.addEventListener('submit', (evt) => {
  //evt.preventDefault();
  pristine.validate();
});
