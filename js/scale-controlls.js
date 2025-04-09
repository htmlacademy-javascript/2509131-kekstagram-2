const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const imgUploadSection = document.querySelector('.img-upload');
const imgUploadPreview = imgUploadSection.querySelector('.img-upload__preview img');
const scaleControlValue = imgUploadSection.querySelector('.scale__control--value');
const scaleControlSmaller = imgUploadSection.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadSection.querySelector('.scale__control--bigger');

const changeScale = (value) => {
  scaleControlValue.value = `${value}%`;
  imgUploadPreview.style.transform = `scale(${ value / 100})`;
};

const onScaleControlSmallerClick = () => {
  const scaleControlValueNumber = parseFloat(scaleControlValue.value);
  if (scaleControlValueNumber === MIN_SCALE) {
    return;
  }
  const scaleSize = scaleControlValueNumber - SCALE_STEP;
  changeScale(scaleSize);
};

const onScaleControllBiggerClick = () => {
  const scaleControlValueNumber = parseFloat(scaleControlValue.value);
  if (scaleControlValueNumber === MAX_SCALE) {
    return;
  }
  const scaleSize = scaleControlValueNumber + SCALE_STEP;
  changeScale(scaleSize);
};

export const initScale = () => {
  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControllBiggerClick);
};

export const resetScale = () => {
  scaleControlValue.value = '100%';
  imgUploadPreview.style.transform = 'none';
  scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.removeEventListener('click', onScaleControllBiggerClick);
};
