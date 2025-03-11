const socialComments = document.querySelector('.social__comments');
const socialCommentTemplate = socialComments.querySelector('.social__comment');


export function clearComments () {
  socialComments.innerHTML = '';
}

export function addComments (photo) {
  clearComments();
  photo.comments.forEach((comment) => {
    const socialComment = socialCommentTemplate.cloneNode(true);
    const socialCommentPicture = socialComment.querySelector('.social__picture');
    const socialCommentText = socialComment.querySelector('.social__text');
    socialCommentPicture.src = comment.avatar;
    socialCommentPicture.alt = comment.name;
    socialCommentText.textContent = comment.message;
    socialComments.append(socialComment);
  });
}

