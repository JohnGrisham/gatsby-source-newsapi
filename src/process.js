const uuidv4 = require('uuid/v4')
const crypto = require(`crypto`)

exports.process = article => {
  return {
    ...article,
    id: uuidv4(),
    parent: null,
    children: [],
    internal: {
      type: `NewsApiEverything`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(article))
        .digest(`hex`),
    }
  }
}