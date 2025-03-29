const imgUploadSection = document.querySelector('.img-upload');
export const imgUploadPreview = imgUploadSection.querySelector('.img-upload__preview img');
export const scaleControlValue = imgUploadSection.querySelector('.scale__control--value');
const scaleControlSmaller = imgUploadSection.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadSection.querySelector('.scale__control--bigger');
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

export function resetScale () {
  scaleControlValue.value = '100%';
  imgUploadPreview.style.transform = 'none';
}

function changeScale (value) {
  scaleControlValue.value = `${value}%`;
  imgUploadPreview.style.transform = `scale(${ value / 100})`;
}

function onScaleControlSmallerClick () {
  const scaleControlValueNumber = parseFloat(scaleControlValue.value);
  if(scaleControlValueNumber === MIN_SCALE) {
    return;
  }
  const scaleSize = scaleControlValueNumber - SCALE_STEP;
  changeScale(scaleSize);
}

function onScaleControllBiggerClick () {
  const scaleControlValueNumber = parseFloat(scaleControlValue.value);
  if(scaleControlValueNumber === MAX_SCALE) {
    return;
  }
  const scaleSize = scaleControlValueNumber + SCALE_STEP;
  changeScale(scaleSize);
}

scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
scaleControlBigger.addEventListener('click', onScaleControllBiggerClick);
