'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  isWeChat: false,
  NODE_ENV: '"development"',
  BASE_API: 'http://127.0.0.1:8080/你自己的项目url'
})
