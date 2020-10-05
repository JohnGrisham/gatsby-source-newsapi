"use strict";

var axios = require("axios");

exports.fetchSources = function (apiKey) {
  var url = "https://newsapi.org/v2/sources";
  return axios.get(url, { headers: { "X-Api-Key": "" + apiKey } });
};