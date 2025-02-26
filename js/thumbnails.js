import {createMockPhotos} from './data.js';

const templatePicture = document.querySelector('#picture').content.querySelector('.picture');

const picturesContainer = document.querySelector('.pictures');

const documentFragment = document.createDocumentFragment();

const mockPhotos = createMockPhotos();

mockPhotos.forEach(({url, description, likes, comments}) => {
  const picture = templatePicture.cloneNode(true);
  const pictureImg = picture.querySelector('.picture__img');
  const pictureComments = picture.querySelector('.picture__comments');
  const pictureLikes = picture.querySelector('.picture__likes');

  pictureImg.src = url;
  pictureImg.textContent = description;
  pictureComments.textContent = comments.length;
  pictureLikes.textContent = likes;

  documentFragment.appendChild(picture);
});

picturesContainer.appendChild(documentFragment);
