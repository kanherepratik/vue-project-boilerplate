const path = require('path');

module.exports = {
  plugins: {
    'postcss-import': {
      resolve(id, basedir) {
        // resolve alias @css, @import '@css/style.css'
        // because @css/ has 5 chars
        if (/^@css/.test(id)) {
          return path.resolve('./src/assets/styles/css', id.slice(5));
        }
        // resolve alias @pcss, @import '@pcss/style.css'
        // because @pcss/ has 6 chars
        if (/^@pcss/.test(id)) {
          return path.resolve(
            './src/assets/styles/pcss',
            id.slice(6),
          );
        }
        // resolve alias @pcss, @import '@common/style.pcss'
        // because @common/ has 8 chars
        if (/^@common/.test(id)) {
          return path.resolve(
            './src/common/assets/styles/pcss',
            id.slice(8),
          );
        }

        // resolve node_modules, @import '~normalize.css/normalize.css'
        // similar to how css-loader's handling of node_modules
        if (/^~/.test(id)) {
          return path.resolve('./node_modules', id);
        }

        // resolve relative path, @import './components/style.css'
        return path.resolve(basedir, id);
      },
    },
    'postcss-mixins': {},
    'postcss-simple-vars': {},
    'postcss-color-function': {},
    'postcss-nested': {},
    'postcss-extend-rule': {},
    'postcss-discard-comments': {},
    'postcss-discard-empty': {},
    'postcss-discard-unused': {},
    'postcss-url': {
      url(assets, dir) {
        // get index of src folder from the absolute path of file folder
        var srcIndex = dir.file.lastIndexOf('/ulip-frontend');
        // var srcIndex = dir.file.indexOf('/src');
        // resolve alias @images, url('@images/checkmark.svg')
        if (/^@images/.test(assets.url) && srcIndex >= 0) {
          // base path in src folder
          var basePath = 'public/images/';
          // var basePath = 'assets/images/';
          // get number of folders a path needs to go up to the src folder
          // path is the file folder path from where the alias is called
          var upstreamDirCount = (
            dir.file.slice(srcIndex).match(/\//g) || []
          ).length;
          // upstream path
          var finalUpstreamPath = './';
          if (upstreamDirCount > 1) {
            var finalUpstreamPath = Array(upstreamDirCount).join(
              '../',
            );
          }
          // return new path with upstream path and the base path
          // 8 because @images/ has 8 characters
          return finalUpstreamPath + basePath + assets.url.slice(8);
        }

        // return original url if alias is not used
        return assets.url;
      },
    },
    autoprefixer: {
      overrideBrowserslist: '> 1%, IE 6, Explorer >= 10, Safari >= 7',
    },
    cssnano: {},
  },
};