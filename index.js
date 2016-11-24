#!/usr/bin/env node
module.exports = {
    parser: require('./lib/config-parser')(),
    utils: require('./lib/utils')()
};
