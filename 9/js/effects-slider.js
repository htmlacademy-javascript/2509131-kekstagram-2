
const imgUploadSection = document.querySelector('.img-upload');
const imgUploadPreview = imgUploadSection.querySelector('.img-upload__preview img');
const effectSlider = imgUploadSection.querySelector('.effect-level__slider');
const effectLevel = imgUploadSection.querySelector('.effect-level__value');
const effectsList = imgUploadSection.querySelector('.effects__list');
const sliderContainer = imgUploadSection.querySelector('.img-upload__effect-level');

const EFFECT_SETTINGS = {
  none: {
    hidden: true,
  },
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    filter: (value) => `grayscale(${value})`,
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    filter: (value) => `sepia(${value})`,
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    filter: (value) => `invert(${value}%)`,
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    filter: (value) => `blur(${value}px)`,
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    filter: (value) => `brightness(${value})`,
  },
};

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderContainer.classList.add('hidden');

function onEffectsListChange (evt) {
  const effect = evt.target.value;
  const filterSettings = EFFECT_SETTINGS[effect];

  if(effect === 'none') {
    sliderContainer.classList.add('hidden');
    imgUploadPreview.style.filter = 'none';
    effectLevel.value = 0;
  } else {
    sliderContainer.classList.remove('hidden');

    effectSlider.noUiSlider.updateOptions({
      range: filterSettings.range,
      start: filterSettings.start,
      step: filterSettings.step,
    });

    effectSlider.noUiSlider.on('update', () => {
      effectLevel.value = effectSlider.noUiSlider.get();
      imgUploadPreview.style.filter = filterSettings.filter(effectLevel.value);
    });
  }
}

effectsList.addEventListener('change', onEffectsListChange);
