AsteroidCheck = {};

/**
 * Helpers to check params skip in meteor publish
 */
AsteroidCheck.positiveIntegerCheck = Match.Where(function(value) {
  check(value, Match.Integer);
  return value >= 0;
});

/**
 * Helpers to check sort direction params in meteor publish
 */
AsteroidCheck.sortDirectionCheck = Match.Where(function(direction) {
  if (direction) {
    check(direction, String);
    return direction === 'asc' || direction === 'desc';
  } else {
    return true;
  }
});