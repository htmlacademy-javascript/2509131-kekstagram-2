const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const documentFragment = document.createDocumentFragment();
export const picturesContainer = document.querySelector('.pictures');

function fillPictureTemplate (picture) {
  const thumbnail = templatePicture.cloneNode(true);
  const thumbnailImg = thumbnail.querySelector('.picture__img');
  const thumbnailComments = thumbnail.querySelector('.picture__comments');
  const pictureLikes = thumbnail.querySelector('.picture__likes');

  thumbnailImg.src = picture.url;
  thumbnailImg.alt = picture.description;
  thumbnailComments.textContent = picture.comments.length;
  pictureLikes.textContent = picture.likes;
  thumbnail.dataset.pictureId = picture.id;

  return thumbnail;
}

function fillDocumentFragment (photos) {
  photos.forEach((photo) => {
    documentFragment.append(fillPictureTemplate(photo));
  });

  return documentFragment;
}

export function renderPhotoCards (photosArray) {
  picturesContainer.append(fillDocumentFragment(photosArray));
}
