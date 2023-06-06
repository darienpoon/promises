/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var { getGitHubProfileAsync } = require('./promisification');
Promise.promisifyAll(fs);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // return a "promise"
  // 1. invoke fs.readFile to return first line of file
  return fs.readFileAsync(readFilePath).then((data)=> {
    if (!data) {
      throw new Error('File not read');
    } else {
      data = data.toString().split('\n');
      return data[0];
    }
  })
    .then ((username) => {
      return getGitHubProfileAsync(username);
    })
    .then ((userData) => {
      if (!userData) {
        throw new Error ('User info not found');
      } else {
        return fs.writeFileAsync (writeFilePath, JSON.stringify(userData));
      }
    });
};



// 2. invoke getGitHubProfileAsync and pass in username return from last step, returns user's profile?
// 3. invokes fs.writeFile to "writeFilePath" and write the profile return from previous step




// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
