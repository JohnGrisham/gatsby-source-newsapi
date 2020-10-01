const { fetchArticles } = require('./fetch-articles');
const { fetchSources } = require('./fetch-sources');
const { process } = require('./process');

exports.sourceNodes = async ({ boundActionCreators }, { apiKey, variables }) => {
  try {
  const { createNode } = boundActionCreators;
  const { sources, queries } = variables;

  // Do the initial fetch
  console.time(`\nFetch NewsAPI data`)
  console.log(`Starting to fetch data from NewsAPI...`)

  // Create nodes here, generally by downloading data
  // from a remote API.
  const { data: { sources }} = await fetchSources(apiKey)
  const  { data: { articles } } = await fetchArticles(apiKey, sources, queries);
  console.timeEnd(`\nFetch NewsAPI data`)

  articles.forEach(article => createNode(process(article, 'newsArticles')));
  sources.forEach(source => createNode(process(source, 'newsSources')));

  // We're done, return.
  return;
  } catch(e) {
    console.log(e.message)
  }
};