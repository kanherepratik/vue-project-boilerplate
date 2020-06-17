module.exports = {
  // set your styleguidist configuration here
  title: 'Vue Style Guide',
  components: ['src/components/*.vue'],
  // defaultExample: true,
  sections: [
    {
      name: 'Form Builder',
      components: 'src/FormBuilder/**/*.vue',
    },
    {
      name: 'Form Builder ReadMe',
      content: 'src/FormBuilder/*.md',
    },
  ],
  // webpackConfig: {
  //   // custom config goes here
  // },
  exampleMode: 'expand',
};
