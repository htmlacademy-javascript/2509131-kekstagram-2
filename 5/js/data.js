import {getRandomInteger, getNumberInOrder, getRandomArrayElement, getRandomUniqIntegerNumber} from './util.js';

const DESCRIPTIONS = [
  'красивый закат',
  'природа - лучший художник',
  'потрясающий вид',
  'еда как искусство',
  'новые места, новые истории',
  'дорога зовёт',
  'ещё один город, ещё одно приключение',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
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

const SETTINGS = {
  'LIKES NUMBER MIN': 15,
  'LIKES NUMBER MAX': 200,
  'COMMENTS NUMBER MIN': 0,
  'COMMENTS NUMBER MAX': 30,
  'AVATAR ID NUMBER MIN': 1,
  'AVATAR ID NUMBER MAX': 6,
  'PHOTOS NUMBER': 25,
};

const getPhotoId = getNumberInOrder();

const getUrlNumber = getNumberInOrder();

const getCommentId = getRandomUniqIntegerNumber();

function getComment () {
  return {
    CommentId: getCommentId(),
    avatar: `img/avatar-${ getRandomInteger(SETTINGS['AVATAR ID NUMBER MIN'], SETTINGS['AVATAR ID NUMBER MAX']) }.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(COMMENTATOR_NAMES)
  };
}

function getPhotoDescription () {
  return {
    id: getPhotoId(),
    url: `photos/${ getUrlNumber() }.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(SETTINGS['LIKES NUMBER MIN'], SETTINGS['LIKES NUMBER MAX']),
    comments: Array.from({length: getRandomInteger(SETTINGS['COMMENTS NUMBER MIN'], SETTINGS['COMMENTS NUMBER MAX'])}, getComment)
  };
}

const createMockPhotos = () => Array.from({length: SETTINGS['PHOTOS NUMBER']}, getPhotoDescription);

const mockPhotos = createMockPhotos();

export {mockPhotos};
