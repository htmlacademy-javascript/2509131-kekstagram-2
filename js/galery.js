import { renderPhotoCards } from './thumbnails.js';
import { fillPictures, openBigPicture } from './big-picture.js';
import { showLoadingDataError } from './errors.js';
import { getData } from './api.js';
import { initFilters } from './filter-buttons.js';
import { initImgUploadForm } from './img-upload-form.js';

const picturesContainer = document.querySelector('.pictures');

function initApp () {
  getData()
    .then((photos) => {
      fillPictures(photos);
      renderPhotoCards(photos);
      initFilters(photos);
    }
    )
    .catch(() => {
      showLoadingDataError();
    });

  initImgUploadForm();
}

initApp();


picturesContainer.addEventListener ('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    evt.preventDefault();
    openBigPicture(currentPicture.dataset.pictureId);
  }
});

