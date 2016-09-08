#!/usr/bin/env node
'use strict';
const meow = require('meow');
const chalk = require('chalk');
const rfdScrapper = require('rfd-scrapper');
const cli = meow(`
  Usage
    $ rfd-scrapper [--limit=<number>]
  Flags
    --limit=<number> Limit number of returned entries
`);
const limit = cli.flags.limit || 10;

function getNumberOfPages(limit) {
  const entriesPerPage = 30;
  return Math.ceil(limit / entriesPerPage);
}

rfdScrapper({ limit: getNumberOfPages(limit) })
  .then((items) => {
    items
      .slice(0, limit)
      .forEach((item, index) => {
        console.log(chalk.green.bold(item.title));
        console.log(item.url);
        console.log(`${item.created_at} \n`);
      });
  })
  .catch(console.error)
