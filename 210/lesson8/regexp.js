// 1. 
function isUrl(string){
  return !!string.match(/^https?:\/\/\S+$/);
}

console.log(isUrl('http://launchschool.com'));   // -> true
console.log(isUrl('https://example.com'));       // -> true
console.log(isUrl('https://example.com hello')); // -> false
console.log(isUrl('   https://example.com'));    // -> false

// 2.
// Write a method that returns all of the fields in a haphazardly formatted string. The fields are separated by a variety of spaces, tabs, and commas, with possibly multiple occurrences of theses characters.

function fields(string) {
  return string.split(/[ \t,]+/);
}

console.log(fields("Pete,201,Student"));
// -> ['Pete', '201', 'Student']

console.log(fields("Pete \t 201    ,  TA"));
// -> ['Pete', '201', 'TA']

console.log(fields("Pete \t 201"));
// -> ['Pete', '201'']

// 3.
// Write a method that changes the first arithmetic operator (+, -, *, /) in a string to a '?' and returns the resulting string. The original string should not be modified.

function mysteryMath(expression) {
  return expression.replace(/[+\-*\/]/, '?');
}
// Note that we need to escape the - and / characters in our character class.

console.log(mysteryMath('4 + 3 - 5 = 2'));
// -> '4 ? 3 - 5 = 2'

console.log(mysteryMath('(4 * 3 + 2) / 7 - 1 = 1'));
// -> '(4 ? 3 + 2) / 7 - 1 = 1'

// 4
// Write a method that changes every sequence of consecutive arithmetic operators (+, -, *, /) to a '?' and returns the resulting string. The original string should not be modified.

function mysteriousMath (expression) {
  return expression.replace(/[+\-*\/]/g, '?');
}

console.log(mysteriousMath('4 + 3 - 5 = 2'));           // -> '4 ? 3 ? 5 = 2'
console.log(mysteriousMath('(4 * 3 + 2) / 7 - 1 = 1')); // -> '(4 ? 3 ? 2) ? 7 ? 1 = 1'

// 5. 
// Write a method that changes the first occurrence of the word apple, blueberry, or cherry in a string to danish.

function danish (text) {
  return text.replace(/\b(apple|blueberry|cherry)\b/, 'danish');
}

console.log(danish('An apple a day keeps the doctor away'));
// -> 'An danish a day keeps the doctor away'

console.log(danish('My favorite is blueberry pie'));
// -> 'My favorite is danish pie'

console.log(danish('The cherry of my eye'));
// -> 'The danish of my eye'

console.log(danish('apple. cherry. blueberry.'));
// -> 'danish. cherry. blueberry.'

console.log(danish('I love pineapple'));
// -> 'I love pineapple'


// 6
// Challenge: write a method that changes dates in the format 2016-06-17 to the format 17.06.2016. You must use a regular expression and should only use only methods described in this section.

// split by -
// reverse
// join by .
function formatDate_1 (dateString) {
  return dateString.split('-').reverse().join('.');
}

// captire group
var formatDate = function (original_date) {
  return original_date.replace(/^(\d\d\d\d)-(\d\d)-(\d\d)$/, '$3.$2.$1');
};

console.log(formatDate('2016-06-17')); // -> '17.06.2016'
console.log(formatDate('2016/06/17')); // -> '2016/06/17' (no change)

// 7
// Challenge: write a method that changes dates in the format 2016-06-17 or 2016/06/17 to the format 17.06.2016. You must use a regular expression and should only use only methods described in this section.

var format_date_wrong = function (original_date) {
  return original_date.replace(/^(\d\d\d\d)[-/](\d\d)[-/](\d\d)$/, '$3.$2.$1');
}

//use function chain to process the secon
var format_date = function (original_date) {
  return original_date
    .replace(/^(\d\d\d\d)-(\d\d)-(\d\d)$/, '$3.$2.$1')
    .replace(/^(\d\d\d\d)\/(\d\d)\/(\d\d)$/, '$3.$2.$1');
}

console.log(format_date('2016-06-17')); // -> '17.06.2016'
console.log(format_date('2017/05/03')); // -> '03.05.2017'
console.log(format_date('2015/01-31')); // -> '2015/01-31' (no change)