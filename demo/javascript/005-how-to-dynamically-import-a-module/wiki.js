// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

"use strict";

const defaultParams_WikiSearch = {
  language: "en",
  url: "wikipedia.org/w/api.php",
  action: "query",
  list: "search",
  srsearch: "Hello World",
  srlimit: 500,
  srprop: "size|wordcount|timestamp|snippet",
  utf8: "",
  format: "json",
  origin: "*",
};

export function wikiSearchQuery(options = {}) {
  const params = { ...defaultParams_WikiSearch, ...options };
  return `https://${params.language}.${params.url}?action=${params.action}&list=${params.list}&srsearch=${params.srsearch}&srlimit=${params.srlimit}&srprop=${params.srprop}&utf8=${params.utf8}&format=${params.format}&origin=${params.origin}`;
}