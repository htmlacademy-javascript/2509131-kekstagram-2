function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function createNumberInOrder () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

function createRandomUniqIntegerNumber () {
  const previousValues = [];

  return function () {
    let currentValue = Math.floor(Math.random() * 1000);
    while (previousValues.includes(currentValue)) {
      currentValue = Math.floor(Math.random() * 1000);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export {getRandomInteger, createNumberInOrder, getRandomArrayElement, createRandomUniqIntegerNumber};
