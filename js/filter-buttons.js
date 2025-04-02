const imgFilters = document.querySelector('.img-filters');
const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');

const removeActiveClass = () => {
  const activeFilterButton = document.querySelector('.img-filters__button--active');
  activeFilterButton.classList.remove('img-filters__button--active');
};

const addActiveClass = (button) => {
  button.classList.add('img-filters__button--active');
};

export const compareCommentsNumbers = (photoA, photoB) => {
  const photoAComments = photoA.comments.length;
  const photoBComments = photoB.comments.length;
  return photoBComments - photoAComments;
};

export const setFilterDefaultButtonClick = (cb) => {
  filterDefaultButton.addEventListener('click', () => {
    removeActiveClass();
    addActiveClass(filterDefaultButton);
    cb();
  });
};

export const setFilterRandomButtonClick = (cb) => {
  filterRandomButton.addEventListener('click', () => {
    removeActiveClass();
    addActiveClass(filterRandomButton);
    cb();
  });
};

export const setFilterDiscussedButtonClick = (cb) => {
  filterDiscussedButton.addEventListener('click', () => {
    removeActiveClass();
    addActiveClass(filterDiscussedButton);
    cb();
  });
};

export const activateFilterButtons = () => imgFilters.classList.remove('img-filters--inactive');

