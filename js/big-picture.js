import { isEscapeKey } from './util.js';
import { addComments, clearComments } from './comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentTotalCount = document.querySelector('.social__comment-total-count');
const body = document.querySelector('body');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
let pictures = [];

export const fillPictures = (photos) => {
  pictures = photos;
};

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onCloseButtonClick = () => {
  closeBigPicture();
};

export const openBigPicture = (pictureId) => {
  const currentPhoto = pictures.find((photo) =>
    photo.id === Number(pictureId)
  );
  if (!currentPhoto) {
    return;
  }
  bigPictureImg.src = currentPhoto.url;
  likesCount.textContent = currentPhoto.likes;
  socialCaption.textContent = currentPhoto.description;
  socialCommentTotalCount.textContent = currentPhoto.comments.length;
  clearComments();
  addComments(currentPhoto.comments);
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
};

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  clearComments();
  document.removeEventListener('keydown', onDocumentEscKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  body.classList.remove('modal-open');
}


