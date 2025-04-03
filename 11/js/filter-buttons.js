import { renderPhotoCards } from './thumbnails.js';
import { getRandomUniquePhotos } from './util.js';
import { debounce } from './util.js';

const imgFilters = document.querySelector('.img-filters');
const RANDOM_PHOTOS_NUMBER = 10;
const RERENDER_DELAY = 500;
let currentFilter = 'filter-default';
let photosData = [];

const FILTERS = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const compareCommentsNumbers = (photoA, photoB) => {
  const photoAComments = photoA.comments.length;
  const photoBComments = photoB.comments.length;
  return photoBComments - photoAComments;
};

function getFilteredPhotos (filterType) {
  switch (filterType) {
    case FILTERS.RANDOM:
      return getRandomUniquePhotos(photosData, RANDOM_PHOTOS_NUMBER);
    case FILTERS.DISCUSSED:
      return photosData.slice().sort(compareCommentsNumbers);
    case FILTERS.DEFAULT:
    default:
      return photosData;
  }
}

function onImgFiltersClick (evt) {
  const clickedButton = evt.target.closest('.img-filters__button');

  if (!clickedButton || clickedButton.id === currentFilter) {
    return;
  }

  const filteredPhotos = getFilteredPhotos(clickedButton.id);
  currentFilter = clickedButton.id;
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  clickedButton.classList.add('img-filters__button--active');

  renderPhotoCards(filteredPhotos);
}

export function initFilters (photos) {
  photosData = photos;
  imgFilters.addEventListener('click', debounce(onImgFiltersClick, RERENDER_DELAY));
}

export const activateFilterButtons = () => imgFilters.classList.remove('img-filters--inactive');

