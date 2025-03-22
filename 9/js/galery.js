import {renderPhotoCards} from './thumbnails.js';
import {mockPhotos} from './data.js';
import {openBigPicture} from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');

renderPhotoCards(picturesContainer, mockPhotos);

picturesContainer.addEventListener ('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    evt.preventDefault();
    openBigPicture(currentPicture.dataset.pictureId);
  }
});

