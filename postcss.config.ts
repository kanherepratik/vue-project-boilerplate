import path = require('path');

module.exports = {
  plugins: {
    'postcss-import': {
      resolve(id, basedir): string {
        // resolve alias @css, @import '@css/style.css'
        // because @css/ has 5 chars
        if (id.startsWith('@css')) {
          return path.resolve('./src/assets/styles/css', id.slice(5));
        }
        // resolve alias @pcss, @import '@pcss/style.css'
        // because @pcss/ has 6 chars
        if (id.startsWith('@pcss')) {
          return path.resolve('./src/assets/styles/pcss', id.slice(6));
        }
        // resolve alias @pcss, @import '@common/style.pcss'
        // because @common/ has 8 chars
        if (id.startsWith('@common')) {
          return path.resolve('./src/common/assets/styles/pcss', id.slice(8));
        }

        // resolve node_modules, @import '~normalize.css/normalize.css'
        // similar to how css-loader's handling of node_modules
        if (id.startsWith('~')) {
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
      url(assets, dir): string {
        // get index of src folder from the absolute path of file folder
        const srcIndex = dir.file.lastIndexOf('/vue-project-boilerplate');
        // resolve alias @images, url('@images/checkmark.svg')
        if (assets.url.startsWith('@images') && srcIndex >= 0) {
          // base path in src folder
          const basePath = 'public/images/';
          // get number of folders a path needs to go up to the src folder
          // path is the file folder path from where the alias is called
          const upstreamDirCount = (dir.file.slice(srcIndex).match(/\//g) || []).length;
          // upstream path
          let finalUpstreamPath = './';
          if (upstreamDirCount > 1) {
            finalUpstreamPath = Array(upstreamDirCount).join('../');
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
