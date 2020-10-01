const uuidv4 = require('uuid/v4')
const crypto = require(`crypto`)

exports.process = (item, type) => {
  return {
    ...item,
    id: uuidv4(),
    parent: null,
    children: [],
    internal: {
      type,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(item))
        .digest(`hex`),
    }
  }
}