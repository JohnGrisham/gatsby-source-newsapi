const axios = require(`axios`)

exports.fetchSources = (apiKey) => {
  const url = `https://newsapi.org/v2/sources`;
  return axios.get(url, { headers: { "X-Api-Key": `${apiKey}` } });
}