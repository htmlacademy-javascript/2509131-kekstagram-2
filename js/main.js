import { renderPhotoCards } from './thumbnails.js';
import { fillPictures } from './big-picture.js';
import { showLoadingDataError } from './errors.js';
import { getData } from './api.js';
import { initFilters } from './filter-buttons.js';
import { initImgUploadForm } from './img-upload-form.js';
import { initGalery } from './galery.js';

const initApp = () => {
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
  initGalery();
};

initApp();
