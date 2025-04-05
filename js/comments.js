const socialComments = document.querySelector('.social__comments');
const socialCommentTemplate = socialComments.querySelector('.social__comment');
const socialCommentShownCount = document.querySelector('.social__comment-shown-count');
const commentsLoader = document.querySelector('.comments-loader');
const COUNT_STEP = 5;
let comments = [];
let currentCount = 0;

export function clearComments () {
  currentCount = 0;
  socialComments.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', addMoreComments);
}

function addMoreComments () {
  const shownComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const shownCommentsLength = shownComments.length + currentCount;

  shownComments.forEach((comment) => {
    const socialComment = socialCommentTemplate.cloneNode(true);
    const socialCommentPicture = socialComment.querySelector('.social__picture');
    const socialCommentText = socialComment.querySelector('.social__text');
    socialCommentPicture.src = comment.avatar;
    socialCommentPicture.alt = comment.name;
    socialCommentText.textContent = comment.message;
    socialComments.append(socialComment);
  });

  socialCommentShownCount.textContent = shownCommentsLength;

  if(shownCommentsLength === comments.length) {
    commentsLoader.classList.add('hidden');
  }

  currentCount += COUNT_STEP;
}

export function addComments (photoComments) {
  comments = photoComments;
  addMoreComments();
  commentsLoader.addEventListener('click', addMoreComments);
}
