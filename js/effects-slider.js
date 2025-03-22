
const imgUploadSection = document.querySelector('.img-upload');
const imgUploadPreview = imgUploadSection.querySelector('.img-upload__preview img');
const effectSlider = imgUploadSection.querySelector('.effect-level__slider');
const effectLevel = imgUploadSection.querySelector('.effect-level__value');
const effects = imgUploadSection.querySelectorAll('.effects__radio');
const originalEffect = imgUploadSection.querySelector('#effect-none');
const chromeEffect = imgUploadSection.querySelector('#effect-chrome');
const sepiaEffect = imgUploadSection.querySelector('#effect-sepia');
const marvinEffect = imgUploadSection.querySelector('#effect-marvin');
const phobosEffect = imgUploadSection.querySelector('#effect-phobos');
const heatEffect = imgUploadSection.querySelector('#effect-heat');
const sliderContainer = imgUploadSection.querySelector('.img-upload__effect-level');

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

if (originalEffect.checked) {
  sliderContainer.classList.add('hidden');
  effectSlider.classList.add('hidden');
}

for (const effect of effects) {
  effect.addEventListener('change', () => {
    sliderContainer.classList.remove('hidden');
    effectSlider.classList.remove('hidden');

    if (originalEffect.checked) {
      sliderContainer.classList.add('hidden');
      effectSlider.classList.add('hidden');
      effectLevel.value = 0;
      imgUploadPreview.style.filter = 'none';
    } else if (chromeEffect.checked) {
      effectSlider.noUiSlider.on('update', () => {
        effectLevel.value = effectSlider.noUiSlider.get();
        imgUploadPreview.style.filter = `grayscale(${effectLevel.value})`;
      });
    } else if (sepiaEffect.checked) {
      effectSlider.noUiSlider.on('update', () => {
        effectLevel.value = effectSlider.noUiSlider.get();
        imgUploadPreview.style.filter = `sepia(${effectLevel.value})`;
      });

    } else if (marvinEffect.checked) {
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      effectSlider.noUiSlider.on('update', () => {
        effectLevel.value = effectSlider.noUiSlider.get();
        imgUploadPreview.style.filter = `invert(${effectLevel.value}%)`;
      });

    } else if (phobosEffect.checked) {
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      effectSlider.noUiSlider.on('update', () => {
        effectLevel.value = effectSlider.noUiSlider.get();
        imgUploadPreview.style.filter = `blur(${effectLevel.value}px)`;
      });

    } else if (heatEffect.checked) {
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      effectSlider.noUiSlider.on('update', () => {
        effectLevel.value = effectSlider.noUiSlider.get();
        imgUploadPreview.style.filter = `brightness(${effectLevel.value})`;
      });
    }
  });
}
