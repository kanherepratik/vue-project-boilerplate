module.exports = {
  componentsRoot: 'src/components', // the folder where CLI will start searching for components.
  components: '**/[A-Z]*.vue', // the glob to define what files should be documented as components (relative to componentRoot)
  outDir: 'public/docs/components', // folder to save components docs in (relative to the current working directry)
};
