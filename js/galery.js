import { openBigPicture } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');

export const initGalery = () => {
  picturesContainer.addEventListener ('click', (evt) => {
    const currentPicture = evt.target.closest('.picture');

    if (currentPicture) {
      evt.preventDefault();
      openBigPicture(currentPicture.dataset.pictureId);
    }
  });
};


