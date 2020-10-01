const { fetch } = require('./fetch');
const { process } = require('./process');

exports.sourceNodes = async ({ boundActionCreators }, { apiKey, variables }) => {
  try {
  const { createNode } = boundActionCreators;
  const { sources, queries } = variables;

  // Do the initial fetch
  console.time(`\nFetch NewsAPI data`)
  console.log(`Starting to fetch data from NewsAPI...`)
  console.log(sources, queries)

  // Create nodes here, generally by downloading data
  // from a remote API.
  const  { data } = await fetch(apiKey, sources, queries);
  console.timeEnd(`\nFetch NewsAPI data`)

  // Process data into nodes.
  const { articles } = data;
  articles.forEach(article => createNode(process(article)));

  // We're done, return.
  return;
  } catch(e) {
    console.log(e.message)
  }
};