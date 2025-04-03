const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadForm = document.querySelector('.img-upload__form');
const MAX_TEXT_DESCRIPTION_LENGTH = 140;
let errorMessage = '';

export const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

function validateTextDescription () {
  return textDescription.value.length <= MAX_TEXT_DESCRIPTION_LENGTH;
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
      check: hashtags.some((item, index, array) => array.includes(item, index + 1)),
      errorMessage: 'Хэштэги не могут повторяться'
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

pristine.addValidator(textDescription, validateTextDescription, `длина комментария не может быть больше ${MAX_TEXT_DESCRIPTION_LENGTH} символов`);


export function resetFormValidators () {
  pristine.reset();
}
