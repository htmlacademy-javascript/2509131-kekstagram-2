//import { imgUploadPreview } from './effects-slider.js';

const imgUploadSection = document.querySelector('.img-upload');
const imgUploadPreview = imgUploadSection.querySelector('.img-upload__preview').querySelector('img');
const scaleControlValue = imgUploadSection.querySelector('.scale__control--value');
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

export function onScaleControlSmallerClick () {
  const scaleControlValueNumber = parseFloat(scaleControlValue.value);
  if(scaleControlValueNumber === MIN_SCALE) {
    return;
  }
  scaleControlValue.value = `${scaleControlValueNumber - SCALE_STEP}%`;
  const scaleSize = (scaleControlValueNumber - SCALE_STEP) / 100;
  imgUploadPreview.style.transform = `scale(${ scaleSize})`;
}

export function onScaleControllBiggerClick () {
  const scaleControlValueNumber = parseFloat(scaleControlValue.value);
  if(scaleControlValueNumber === MAX_SCALE) {
    return;
  }
  scaleControlValue.value = `${scaleControlValueNumber + SCALE_STEP}%`;
  const scaleSize = (scaleControlValueNumber + SCALE_STEP) / 100;
  imgUploadPreview.style.transform = `scale(${ scaleSize})`;
}
