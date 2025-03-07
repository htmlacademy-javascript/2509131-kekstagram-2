import { mockPhotos } from './data.js';
console.log(mockPhotos);

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const photoDescription = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentTemplate = socialComments.querySelector('.social__comment');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');


export function openBigPicture (pictureId) {
  const currentPhoto = mockPhotos.find((photo) =>
    photo.id === Number(pictureId)
  );
  bigPictureImg.src = currentPhoto.url;
  likesCount.textContent = currentPhoto.likes;
  //по заданию надо вставить строкой
  photoDescription.textContent = currentPhoto.description;
  socialCommentTotalCount.textContent = currentPhoto.comments.length;

  currentPhoto.comments.forEach((comment) => {
    const socialComment = socialCommentTemplate.cloneNode(true);
    const socialCommentPicture = socialComment.querySelector('.social__picture');
    const socialCommentText = socialComment.querySelector('.social__text');
    socialCommentPicture.src = comment.avatar;
    socialCommentPicture.alt = comment.name;
    socialCommentText.textContent = comment.message;
    socialComments.append(socialComment);
  });

  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');
}

//const o
