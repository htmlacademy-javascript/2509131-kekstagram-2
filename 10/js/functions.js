/* eslint-disable no-console */
/* Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее */
const checkStringLength = (string = '', maxLength = 1) => string.length <= maxLength;

console.log(checkStringLength('132434', 3));
console.log(checkStringLength('132434', 6));
console.log(checkStringLength('132434', 10));
console.log(checkStringLength('', 10));

/* Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево */

const isPalindrome = (string = '') => {

  string = string.replaceAll(' ', '').toLowerCase();

  let reversedString = '';

  for (let index = string.length - 1; index >= 0; index--) {
    reversedString += string[index];
  }

  return string === reversedString;
};

console.log(isPalindrome('Лёша на полке клопа нашёл '));
console.log(isPalindrome('Кек с'));

/* Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN */

const pickNumbers = (string) => {
  let result = '';
  string = string.toString();

  for (let i = 0; i <= string.length - 1; i++) {
    const number = parseInt(string[i], 10);
    if (Number.isNaN(number) === false) {
      result += number;
    }
  }
  console.log (result);
};

pickNumbers('8dghnka90');
