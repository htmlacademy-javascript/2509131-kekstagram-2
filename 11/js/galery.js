import { renderPhotoCards } from './thumbnails.js';
import { fillPictures, openBigPicture } from './big-picture.js';
import { showLoadingDataError } from './errors.js';
import { getData } from './api.js';
import { getRandomUniquePhotos, debounce } from './util.js';
import { setFilterDefaultButtonClick, setFilterRandomButtonClick, setFilterDiscussedButtonClick, activateFilterButtons, compareCommentsNumbers } from './filter-buttons.js';

const picturesContainer = document.querySelector('.pictures');
const RANDOM_PHOTOS_NUMBER = 10;
const RERENDER_DELAY = 500;

getData()
  .then((photos) => {
    fillPictures(photos);
    renderPhotoCards(photos);

    setFilterDefaultButtonClick(debounce(
      () => {
        renderPhotoCards(photos);
      }, RERENDER_DELAY));

    setFilterRandomButtonClick(debounce(
      () => {
        const randomPhotos = getRandomUniquePhotos(photos, RANDOM_PHOTOS_NUMBER);
        renderPhotoCards(randomPhotos);
      }, RERENDER_DELAY));

    setFilterDiscussedButtonClick(debounce(
      () => {
        const discussedPhotos = photos.slice().sort(compareCommentsNumbers);
        renderPhotoCards(discussedPhotos);
      }, RERENDER_DELAY));
  }
  )
  .then(activateFilterButtons())
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

