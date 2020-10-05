const { fetchArticles } = require('./fetch-articles');
const { fetchSources } = require('./fetch-sources');
const uuidv4 = require('uuid/v4')

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, { apiKey, variables }) => {
  try {
  const { createNode } = actions;
  const { sources: userSources, queries } = variables;

  // Do the initial fetch
  console.time(`\nFetch NewsAPI data`)
  console.log(`Starting to fetch data from NewsAPI...`)

  // Create nodes here, generally by downloading data
  // from a remote API.
  const { data: { sources }} = await fetchSources(apiKey)
  const  { data: { articles } } = await fetchArticles(apiKey, userSources, queries);
  
  console.timeEnd(`\nFetch NewsAPI data`)

  articles.forEach(article => createNode({
    ...article,
    id: createNodeId(`NewsArticles-${uuidv4()}`),
    parent: null,
    children: [],
    internal: {
      type: 'NewsArticles',
      content: JSON.stringify(article),
      contentDigest: createContentDigest(article)
    }
  }));
  sources.forEach(source => createNode({
    ...source,
    id: `${source.id}`,
    parent: null,
    children: [],
    internal: {
      type: 'NewsSources',
      content: JSON.stringify(source),
      contentDigest: createContentDigest(source)
    }
  }));

  // We're done, return.
  return;
  } catch(e) {
    console.log(e.message)
  }
};