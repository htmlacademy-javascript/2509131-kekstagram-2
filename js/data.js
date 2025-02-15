import {getRandomInteger, createIdGenerator, getRandomArrayElement, createCommentId} from './util.js';

const DESCRIPTIONS = [
  'красивый закат',
  'природа - лучший художник',
  'потрясающий вид',
  'еда как искусство',
  'новые места, новые истории',
  'дорога зовёт',
  'ещё один город, ещё одно приключение'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENTATOR_NAMES = [
  'Иван',
  'Светлана',
  'Мария',
  'Кристофер',
  'Виктор',
  'Юлия',
  'Леонид',
  'Василий',
];

const LIKES_NUMBER = {
  MIN: 15,
  MAX: 200
};

const COMMENTS_NUMBER = {
  MIN: 0,
  MAX: 30
};

const PHOTOS_NUMBER = 25;

const getPhotoId = createIdGenerator();

const getUrlNumber = createIdGenerator();

const getCommentId = createCommentId();

function getComment () {
  return {
    CommentId: getCommentId(),
    avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(COMMENTATOR_NAMES)
  };
}

function getPhotoDescription () {
  return {
    id: getPhotoId(),
    url: `photos/${ getUrlNumber() }.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LIKES_NUMBER.MIN, LIKES_NUMBER.MAX),
    comments: Array.from({length: getRandomInteger(COMMENTS_NUMBER.MIN, COMMENTS_NUMBER.MAX)}, getComment)
  };
}

const createMockPhotos = () => Array.from({length: PHOTOS_NUMBER}, getPhotoDescription);

export {createMockPhotos};
