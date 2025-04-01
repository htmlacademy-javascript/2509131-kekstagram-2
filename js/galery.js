import { renderPhotoCards } from './thumbnails.js';
import { fillPictures, openBigPicture } from './big-picture.js';
import { showLoadingDataError } from './errors.js';
import { getData } from './api.js';

const picturesContainer = document.querySelector('.pictures');

getData()
  .then((photos) => {
    fillPictures(photos);
    renderPhotoCards(photos);
  }
  )
  .catch(() => {
    showLoadingDataError();
  });

picturesContainer.addEventListener ('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    evt.preventDefault();
    openBigPicture(currentPicture.dataset.pictureId);
  }
});

