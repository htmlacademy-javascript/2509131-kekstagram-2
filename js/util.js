
export const isEscapeKey = (evt) => evt.key === 'Escape';

export const getRandomUniquePhotos = (photos, count) => {
  const availablePhotos = [...photos];
  const result = [];
  while (result.length < count && availablePhotos.length > 0) {
    const randomIndex = Math.floor(Math.random() * availablePhotos.length);
    result.push(availablePhotos.splice(randomIndex, 1)[0]);
  }
  return result;
};

export const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
