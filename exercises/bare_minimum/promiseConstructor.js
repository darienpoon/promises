/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('needle');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  var myPromise = new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        data = data.toString().split('\n');
        resolve(data[0]);
      }
    });
  });
  return myPromise;
};


// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  var ourPromise = new Promise((resolve, reject) => {
    request.get(url, (err, res) => {
      if (err) {
        reject(err);
      } else {
        var statusCode = res.statusCode;
        resolve(statusCode);
      }
    });
  });
  return ourPromise;
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
