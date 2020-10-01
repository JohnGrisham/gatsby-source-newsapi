const axios = require(`axios`)

exports.fetchArticles = (apiKey, sources, queries) => {
  const url = `https://newsapi.org/v2/everything${ queries ? `?q=${queries.join(' OR ')}`: ''}${ sources ? `${queries ? '&' : '?'}sources=${sources.join(',')}`: ''}&pageSize=100&langauge=en`;
  return axios.get(url, { headers: { "X-Api-Key": `${apiKey}` } });
}