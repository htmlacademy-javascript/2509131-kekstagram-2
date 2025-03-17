import { isEscapeKey } from './util';

const imgUploadSection = document.querySelector('.img-upload');
const imgUploadForm = imgUploadSection.querySelector('.img-upload__form');
const imgUploadInput = imgUploadSection.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadSection.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgUploadCancelButton = imgUploadSection.querySelector('.img-upload__cancel');
const textHashtags = imgUploadSection.querySelector('.text__hashtags');
const textDescription = imgUploadSection.querySelector('.text__description');
let errorMessage = '';

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
  //errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

function validateTextDescription () {
  return textDescription.value.length <= 140;
}

const getErrorMessage = () => errorMessage;

function validateHashtags () {
  errorMessage = '';
  const hashtags = textHashtags.value.toLowerCase().trim().split(/\s+/);
  const MAX_SYMBOLS = 20;
  const MAX_HASHTAGS = 5;
  const rules = [
    {
      check: hashtags.some((item) => item === '#'),
      errorMessage: 'Хэштэг не может состоять только из одной решётки'
    },
    {
      check: hashtags.some((item) => item[0] !== '#'),
      errorMessage: 'Хэштэг должен начинаться с решётки'
    },
    {
      check: hashtags.some((item) => item.slice(1).includes('#')),
      errorMessage: 'Хэштэги должны разделяться пробелами'
    },
    {
      check: hashtags.some((item) => item.length > MAX_SYMBOLS),
      errorMessage: `Хэштэг не может быть длинее ${MAX_SYMBOLS} символов, включая решётку`
    },
    {
      check: hashtags.length > MAX_HASHTAGS,
      errorMessage: `Хэштэгов не может быть больше ${MAX_HASHTAGS}`
    },
    {
      check: hashtags.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      errorMessage: 'Хэштэг содержит недопустимые символы'
    },
    {
      check: hashtags.some((item, num, array) => array.includes(item, num + 1)),
      errorMessage: 'Хэштэги должны разделяться пробелами'
    },
  ];

  if (textHashtags.value.length === 0) {
    return true;
  }

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.errorMessage;
    }
    return !isInvalid;
  });
}

pristine.addValidator(textHashtags, validateHashtags, getErrorMessage);

pristine.addValidator(textDescription, validateTextDescription, 'длина комментария не может быть больше 140 символов');

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    imgUploadForm.submit();
  }
});
