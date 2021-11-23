const { httpGet } = require('./mock-http-interface');

// @param {string[]} urls The urls to be requested
// @return {Promise} A promise which resolves to a results array.
const getArnieQuotes = async (urls) => {
  const resultKey = Object.freeze({
    success: 'Arnie Quote',
    failure: 'FAILURE',
  });

  const formatResultObject = (response) => {
    const key = response.status === 200 ? resultKey.success : resultKey.failure;
    const value = JSON.parse(response.body).message;
    return { [key]: value };
  };

  const apiPromises = urls.map((url) => httpGet(url));

  const results = Promise.all(apiPromises).then((responses) => {
    const partialResults = [];

    responses.forEach((response) => {
      partialResults.push(formatResultObject(response));
    });

    return partialResults;
  });

  return results;
};

module.exports = {
  getArnieQuotes,
};
