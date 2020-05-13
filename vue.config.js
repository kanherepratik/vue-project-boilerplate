const path = require('path');
const chalk = require('chalk');
const BundleTracker = require('webpack-bundle-tracker');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const PORT = process.env.PORT || 3000;
const STATIC_URL = process.env.VUE_APP_STATIC_URL || '/static/';

module.exports = {
  // baseUrl: STATIC_URL,
  outputDir: './dist/',
  devServer: {
    writeToDisk: true,
    port: PORT,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-id, Content-Length, X-Requested-With',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    },
  },
  configureWebpack: (config) => {
    console.log('');
    console.log(chalk.yellow('--------------------------------------'));
    console.log(chalk.yellow('BUILDING VUE BUNDLES'));
    console.log(chalk.yellow('--------------------------------------'));
    config.module.rules.push({
      test: /\.postcss$/,
      use: ['style-loader', 'postcss-loader' ]
    });

    config.plugins.push(
      new BundleTracker({
        filename: './webpack-stats.json',
      })
    );
    config.resolve.extensions = ['.ts', '.js', '.vue', '.json', '.scss', '.css', '.pcss'];
    config.output.filename = '[name]-[hash].js';
  },
  chainWebpack: (config) => {
    config.plugins.delete('preload');
  },
};
