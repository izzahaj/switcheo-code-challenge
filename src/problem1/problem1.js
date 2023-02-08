// for loop approach
var sum_to_n_a = function(n) {
  var sum = 0;
  for (i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// recursive approach
var sum_to_n_b = function(n) {
  if (n === 1) {
    return n;
  } else {
    return n + sum_to_n_b(n - 1);
  }
};

// using sum to n formula
var sum_to_n_c = function(n) {
  return 0.5 * n * (n + 1);
};

// For testing
// var n = 10
// console.log(sum_to_n_a(n));
// console.log(sum_to_n_b(n));
// console.log(sum_to_n_c(n));