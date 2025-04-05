const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const documentFragment = document.createDocumentFragment();
const picturesContainer = document.querySelector('.pictures');

const fillPictureTemplate = (picture) => {
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
};

const fillDocumentFragment = (photos) => {
  photos.slice().forEach((photo) => {
    documentFragment.append(fillPictureTemplate(photo));
  });

  return documentFragment;
};

const clearPhotoCards = () => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

export const renderPhotoCards = (photosArray) => {
  clearPhotoCards();
  picturesContainer.append(fillDocumentFragment(photosArray));
};
