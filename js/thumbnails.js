import {mockPhotos} from './data.js';

const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const documentFragment = document.createDocumentFragment();

function fillPictureTemplate (picture) {
  const thumbnail = templatePicture.cloneNode(true);
  const thumbnailImg = thumbnail.querySelector('.picture__img');
  const thumbnailComments = thumbnail.querySelector('.picture__comments');
  const pictureLikes = thumbnail.querySelector('.picture__likes');

  thumbnailImg.src = picture.url;
  thumbnailImg.alt = picture.description;
  thumbnailComments.textContent = picture.comments.length;
  pictureLikes.textContent = picture.likes;

  return thumbnail;
}

function fillDocumentFragment (photos) {
  photos.forEach((photo) => {
    documentFragment.append(fillPictureTemplate(photo));
  });

  return documentFragment;
}

function renderPhotoCards (container, photosArray) {
  container.append(fillDocumentFragment(photosArray));
}

renderPhotoCards(picturesContainer, mockPhotos);

