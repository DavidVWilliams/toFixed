function toFixed(value, digits) {
  var result = value.toFixed(digits); 
  var characterToMove = '.';
  var indexOfDecimal;
  var combineString;
  var roundNumber;
  var newArray = [];

// RangeError check, digits should be between 0 and 20.
  if (digits < 0 || digits > 20) {
    throw new RangeError('Parameter must be between 0 and 20.');
  }  

  // If "value" is not an Number throw TypeError
  if (typeof value !== 'number') {
    throw new TypeError(value + ' must be a Number.')
  }

  // Check for optional digits. if no digits, digits === 0;
  if (digits === undefined) {
    digits = 0;
  } else {

    var valueToString = value.toString();
    var countAfterDecimal = valueToString.substr(valueToString.indexOf(".") + 1);
    var afterDecimalLength = countAfterDecimal.length - 1;
    
    if (valueToString.indexOf('.') < 0) {
      valueToString = valueToString.concat('.');

  }

  // Append zeros to end of number if digits > length of numbers after decimal
  if (afterDecimalLength < digits) {
    for (var count = afterDecimalLength; count < digits; count++) {
     valueToString += '0';
    }
  }
  
  for (var i = 0; i < valueToString.length; i++) {
    if (valueToString[i] === characterToMove) {
      indexOfDecimal = i;
    }
    newArray.push(valueToString[i]);
    
  }  

  // Remove decimal 
  newArray.splice(indexOfDecimal,1,);
  // Insert decimal at new position
  newArray.splice(digits + indexOfDecimal, 0, '.')

  combineString = newArray.reduce(function(a, b) {
    return a + b;
  }, '');
  
  // Round Number
  roundNumber = Math.round(Number(combineString)).toString().split('');
  if (digits === 0) {
    return result;
  }

  roundNumber.splice(roundNumber.length - digits, 0, '.');
  result = roundNumber.reduce(function(a, b) {
      return a + b;
    }, '');
  }	
  return result;
}

/******************** [ Tests ] ********************/

tests({
  'If digits is undefined, set to 0 and return .': function() {
    var result = toFixed(1.005);
    eq(result, 1);
},
  'It should return a RangeError if digits is < 0.': function() {
    var errorWasThrown = false;
    try {
      toFixed(10, -2);
    }
    catch (e) {
      errorWasThrown = true;
      eq(e instanceof RangeError, true);
    }
    eq(errorWasThrown, true);
  },
  'It should return a RangeError if digits is > 20.': function() {
    var errorWasThrown = false;
    try {
      toFixed(10, 21);
    }
    catch (e) {
      errorWasThrown = true;
      eq(e instanceof RangeError, true);
    }
    eq(errorWasThrown, true);
  },
  'It should throw a TypeError if first argument is not a number.': function() {
    var errorWasThrown = false;
    try {
      toFixed(undefined, 2);
    }
    catch (e) {
      errorWasThrown = true;
      eq(e instanceof TypeError, true);
    }
    eq(errorWasThrown, true);
  },
  'it should work on the edge cases outlined in the docs': function() {
    eq(toFixed(.615, 2), '.62');
    eq(toFixed(10.235, 2), '10.24');
    eq(toFixed(1.005, 2), '1.01');
  },
  'It should round number .': function() {
    eq(toFixed(8, 2), '8.00');
    eq(toFixed(8.09, 0), '8');
    eq(toFixed(8.09, 1), '8.1');
  },
});