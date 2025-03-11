import {picturesContainer} from './thumbnails.js';
import {openBigPicture} from './big-picture.js';

picturesContainer.addEventListener ('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    evt.preventDefault();
    openBigPicture(currentPicture.dataset.pictureId);
  }
});

